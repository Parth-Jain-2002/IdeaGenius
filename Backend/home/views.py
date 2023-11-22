from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from readability import Document
import re
import json
import os
import pdfplumber
import docx2txt

from .hfcb_lang import HuggingChat as HCA

from youtube_transcript_api import YouTubeTranscriptApi
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.text_splitter import CharacterTextSplitter

llm = HCA(email=os.getenv("EMAIL"), cookie_path="./cookies_snapshot")

@csrf_exempt
# Create your views here.
def index(request):
    response = {}
    response['status'] = 'OK'
    response['message'] = 'This is the home page'
    return JsonResponse(response)

@csrf_exempt
def ai_response(request):
    # get the user input
    
    response = {}
    response['status'] = 'OK'
    response['message'] = 'This is the ai_response page'
    return JsonResponse(response)

@csrf_exempt
def summarize(request):
    # get the request url from request body
    data = json.loads(request.body.decode('utf-8'))
    url = data.get('url', None)
    print(url)

    # scrape the url
    summary = scrape(url)

    # summarize the text
    query_to_ask = "Here is the article text. Summarize this in 5 ordered list points: " + summary
    ai_summary = llm(query_to_ask)
    
    response = {'response': str(ai_summary)}
    return JsonResponse(response)

@csrf_exempt
def insights(request):
    # get the request url from request body
    data = json.loads(request.body.decode('utf-8'))
    url = data.get('url', None)
    print(url)

    # scrape the url
    summary = scrape(url)

    # actionable insights from the text
    query_to_ask = "Here is the article text. What are the main actionable insights from this article in 5 ordered list points? " + summary
    ai_insights = llm(query_to_ask)
    
    response = {'response': str(ai_insights)}
    return JsonResponse(response)

@csrf_exempt
def deep_dive(request):
    # get the request url from request body
    data = json.loads(request.body.decode('utf-8'))
    url = data.get('url', None)
    print(url)

    # scrape the url
    summary = scrape(url)

    # deep dive into the text
    query_to_ask = "Here is the article text. Deep dive into this article. " + summary
    ai_deep_dive = llm(query_to_ask)
    
    response = {'response': str(ai_deep_dive)}
    return JsonResponse(response)

def scrape(url):
    # if the url contains youtube, then call other function
    if 'youtube' in url:
        return scrape_youtube(url)

    # scrape the url and return the text
    html = requests.get(url).text
    doc = Document(html)
    summary = doc.summary()
    
    # remove the html tags
    clean = re.compile('<.*?>')
    summary = re.sub(clean, '', summary)

    return summary

def scrape_youtube(url, transcript=True):
    # get the video id from the url
    yt_url = url.split('=')[1]

    # TODO: Afterwards use Whisper to get the transcript
    # Step 1: Get the transcript
    text_yt = []
    text_list = []
    all_text = ""
    transcript_list = YouTubeTranscriptApi.list_transcripts(yt_url)
    transcript_en = None
    last_language = ""
    for transcript in transcript_list:
        if transcript.language_code == 'en':
            transcript_en = transcript
            break
        else:
            last_language = transcript.language_code
    if transcript_en is None:   
        transcript_en = transcript_list.find_transcript([last_language])
        transcript_en = transcript_en.translate('en')

    text = transcript_en.fetch()
    text_yt.append(text)

    for i in range(len(text_yt)):
        for j in range(len(text_yt[i])):
            text_list.append(text_yt[i][j]['text'])
            all_text += text_yt[i][j]['text'] + " "
    
    if transcript:
        return all_text

    # Step 2: Create a vectorstore from the transcript
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.create_documents(text_list)
    # Select embeddings
    embeddings = st.session_state['hf']
    # Create a vectorstore from documents
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    db = Chroma.from_documents(texts, embeddings, persist_directory="./chroma_db_" + random_str)

    # Step 3: Create retriever interface
    # save vectorstore
    db.persist()
    #create .zip file of directory to download
    shutil.make_archive("./chroma_db_" + random_str, 'zip', "./chroma_db_" + random_str)
        

    # Step 4: Creating a QA chain
    # Create retriever interface
    retriever = db.as_retriever()
    # Create QA chain
    qa = RetrievalQA.from_chain_type(llm=st.session_state['LLM'], chain_type='stuff', retriever=retriever, return_source_documents=True)
    return qa

@csrf_exempt
def test(request):
    # Get the PDF file from the request
    doc = request.FILES
    upload_pdf = doc.get('upload_pdf', None)
    print(upload_pdf)

    response = summarize_document([upload_pdf])
    return JsonResponse({'response': response})


def summarize_document(document):
    # document can be pdf, docx, txt, etc.
    documents = []

    print(document[0].content_type)

    # Step 1: Get the text from the document                
    for upload_pdf in document:
        if upload_pdf.content_type == 'text/plain':
            documents += [upload_pdf.read().decode()]
        elif upload_pdf.content_type == 'application/pdf':
            with pdfplumber.open(upload_pdf) as pdf:
                documents += [page.extract_text() for page in pdf.pages]
        elif upload_pdf.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            text = docx2txt.process(upload_pdf)
            documents += [text]

    # Step 2: Summarize the text
    query_to_ask = "Here is the article text. Summarize this: " + documents[0]
    ai_summary = llm(query_to_ask)

    # TODO: Create a vectorstore from the document and then create a QA chain
    return ai_summary
    