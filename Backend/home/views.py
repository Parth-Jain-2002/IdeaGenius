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
from langchain.chains import RetrievalQA, LLMChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceHubEmbeddings

import yt_dlp
import whisper
from django.conf import settings

from transformers import Pix2StructProcessor, Pix2StructForConditionalGeneration
from PIL import Image

from .models import UserAction, Chat, UserDoc, Thread

llm = HCA(email=os.getenv("EMAIL"), psw=os.getenv("PASSWORD"), cookie_path="./cookies_snapshot")
embeddings = HuggingFaceHubEmbeddings(repo_id="sentence-transformers/all-mpnet-base-v2",task="feature-extraction",huggingfacehub_api_token=os.getenv("HF_TOKEN"))

# Load whisper model
whisper_model = whisper.load_model("tiny")


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

def summarize(url, chatid):
    db = add_to_research_bank(url,chatid)
    retriever = db.as_retriever()

    # create a QA chain
    qa = RetrievalQA.from_chain_type(llm = llm, chain_type='stuff', retriever=retriever,return_source_documents=True)

    # summarize the text
    query_to_ask = "Summarize this in 5 ordered list points"
    ai_summary = qa({"query": query_to_ask})
    
    print(ai_summary)
    return ai_summary['result']

def insights(url,chatid):
    db = add_to_research_bank(url,chatid)
    retriever = db.as_retriever()

    # create a QA chain
    qa = RetrievalQA.from_chain_type(llm = llm, chain_type='stuff', retriever=retriever,return_source_documents=True)

    # actionable insights from the text
    query_to_ask = "Give me actionable insights from this article in 5 ordered list points"
    ai_insights = qa({"query": query_to_ask})
    print(ai_insights['result'])
    return ai_insights['result']

def deep_dive(url,chatid):
    db = add_to_research_bank(url,chatid)
    retriever = db.as_retriever()

    # create a QA chain
    qa = RetrievalQA.from_chain_type(llm = llm, chain_type='stuff', retriever=retriever,return_source_documents=True)

    # deep dive into the text
    query_to_ask = "Deep dive into this article in 5 ordered list points"
    ai_deep_dive = qa({"query": query_to_ask})
    
    return ai_deep_dive['result']

def add_to_research_bank(url,chatid):
    # scrape the url
    summary = scrape(url)
    text_array = []

    # Split the summary into chunks of 100 words
    words = summary.split()
    for i in range(0, len(words), 200):
        text_array.append(" ".join(words[i:i+200]))

    print(text_array)

    # Split the text into chunks of 1000 characters
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.create_documents(text_array)
    print(texts)
    db = Chroma.from_documents(texts, embeddings, persist_directory="./vector_store/chroma_db_" + str(chatid))

    # save vectorstore
    db.persist()
    return db


# Function for saving audio from input video id of YouTube
def download(video_id: str) -> str:
    video_url = f'https://www.youtube.com/watch?v={video_id}'
    ydl_opts = {
        'format': 'm4a/bestaudio/best',
        'paths': {'home': 'audio/'},
        'outtmpl': {'default': '%(id)s.%(ext)s'},
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'm4a',
        }]
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        error_code = ydl.download([video_url])
        if error_code != 0:
            raise Exception('Failed to download video')

    return f'audio/{video_id}.m4a'
    


# Function for saving audio from input video id of YouTube
def download(video_id: str) -> str:
    video_url = f'https://www.youtube.com/watch?v={video_id}'
    ydl_opts = {
        'format': 'm4a/bestaudio/best',
        'paths': {'home': 'audio/'},
        'outtmpl': {'default': '%(id)s.%(ext)s'},
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'm4a',
        }]
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        error_code = ydl.download([video_url])
        if error_code != 0:
            raise Exception('Failed to download video')

    return f'audio/{video_id}.m4a'
    

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

def scrape_youtube(video_url):
     # Extract video ID from the URL
    video_id = video_url.split('v=')[1].split('&')[0]

    try:
        # Try to get the transcript using YouTubeTranscriptApi
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        transcript_paragraph = ' '.join(entry['text'] for entry in transcript_list)
        print("Transcription:", transcript_paragraph)
        return transcript_paragraph
    except Exception as e:
        # If getting the transcript fails, use whisper as a fallback
        print("Error getting transcript:", e)
        print("Using whisper as a fallback.")

        file_path = download(video_id)
        print("file path : ", file_path)
        try:
            transcription = whisper_model.transcribe(file_path, fp16=False)
            transcript_paragraph = transcription['text']
            print("Whisper:", transcript_paragraph)
            return transcript_paragraph
        except Exception as whisper_error:
            print("Whisper transcription failed:", whisper_error)
    # Handle the error or log it as needed
            return "Fallback transcription using Whisper failed."
    
@csrf_exempt
def test(request):
    # Get the PDF file from the request
    doc = request.FILES.getlist('image')
    question = request.POST.get('question')

    print(question)

    image = Image.open(doc[0])
    response = visual_answering_data(image, question)
    print(response)
    return JsonResponse({'response':response})


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
    query_to_ask = "Here is the document text. Summarize this in 5 ordered list points: " + documents[0]
    ai_summary = llm(query_to_ask)

    # TODO: Create a vectorstore from the document and then create a QA chain
    return ai_summary
    
def visual_answering_data(image, question):
    response = visual_summary(image)

    prompt = PromptTemplate.from_template("Here is the data from the image: {image_data}. The question is: {question}")

    chain = LLMChain(llm=llm, prompt=prompt)
    answer_to_query = chain({"question": question, "image_data": response})
    return answer_to_query

def visual_summary(image):
    processor = Pix2StructProcessor.from_pretrained('google/deplot')
    model = Pix2StructForConditionalGeneration.from_pretrained('google/deplot')

    inputs = processor(images=image, text="Generate underlying data table of the figure below:", return_tensors="pt")
    predictions = model.generate(**inputs, max_new_tokens=512)

    response = processor.decode(predictions[0], skip_special_tokens=True)
    print(response)
    return response

def perform_task(url, action, chatid):
    if action == 'clicked_summary':
        return summarize(url, chatid)
    elif action == 'clicked_insights':
        return insights(url, chatid)
    elif action == 'clicked_deep_dive':
        return deep_dive(url, chatid)
    elif action == 'clicked_research_bank':
        add_to_research_bank(url, chatid)
        return "Add to research bank"
    else:
        return "No action found"

@csrf_exempt
def get_chats(request):
    # get the chats from the database
    userid = request.headers.get('userid', None)
    chats = Chat.objects.filter(userid=userid)
    
    # convert the chats to json
    chats_json = []
    for chat in chats:
        chats_json.append({'message':chat.message, 'response':chat.response, 'timestamp':chat.timestamp, 'url':chat.url, 'vectorstore_path':chat.vectorstore_path})

    return JsonResponse({'chats':chats_json})

@csrf_exempt
def get_chat(request):
    chatid = request.GET['chat_id']
    chats = Chat.objects.filter(chatid=chatid)
    
    # convert the chats to json
    response = []
    for chat in chats:
        response.append({'message':chat.message, 'response':chat.response})

    return JsonResponse({'data':response})

@csrf_exempt
def get_thread(request):
    chatid = request.GET['chat_id']
    thread = Thread.objects.get(chatid=chatid)
    
    # convert the chats to json
    response = {'title':thread.title, 'imgsrc':thread.imgsrc, 'url':thread.url, 'chatid':thread.chatid}

    return JsonResponse(response)

@csrf_exempt
def get_threads(request):
    userid = request.GET['userid']
    threads = Thread.objects.filter(userid=userid)
    
    # convert the chats to json
    response = []
    for thread in threads:
        response.append({'title':thread.title, 'imgsrc':thread.imgsrc, 'url':thread.url, 'chatid':thread.chatid})

    return JsonResponse({'data':response})

def create_thread(url, userid):
    # get the title and image from the url
    html = requests.get(url).text
    doc = Document(html)
    title = doc.title()
    
    summary = doc.summary()
    # If in summary, there is an image, then use that image
    imgsrc = ""
    
    img_match = re.search(r'<img.+?src="(.+?)".*?>', summary)
    if img_match:
        imgsrc = img_match.group(1)
    else:
        imgsrc = "https://www.lisedunetwork.com/wp-content/uploads/2014/02/Types-of-Information.jpg"

    # create a thread in the database
    thread = Thread.objects.create(userid=userid, title=title, imgsrc=imgsrc, url=url)
    chatid = thread.chatid
    vectorstore_path = "./vector_store/chroma_db_" + str(chatid)
    thread.vectorstore_path = vectorstore_path

    # Update the vectorstore path in the database
    thread.save()

    return chatid
    
@csrf_exempt
def url_test(request):
    # get the request url from request header
    url = request.headers.get('url', None)
    userid = request.headers.get('userid', None)
    action = request.headers.get('action', None)
    print("Url: ", url)
    print("User ID: ", userid)
    print("Action: ", action)

    # Save the url, userid, and action in the django database
    UserAction.objects.create(url=url, userid=userid, action=action)

    # Chat Thread creation
    chatid = create_thread(url, userid)
    print(chatid)

    # Perform the task, chat message
    response = perform_task(url, action,chatid)
    if action != 'clicked_research_bank':
        Chat.objects.create(userid=userid, message=action, response=response, chatid=chatid)

    return JsonResponse({'response':'test'})

@csrf_exempt
def chat_interface(request):
    data = json.loads(request.body.decode('utf-8'))
    print(data)
    message = data['message']
    chatid = data['chat_id']

    chat = ''
    prompt = ''
    try:
        # Get the last chat from the database according to timestamp
        chat = Chat.objects.filter(chatid=chatid).order_by('-timestamp')[0]

        # Prompt
        prompt = "Here is the last query: " + chat.message + " and here is the last response: " + chat.response + ". What is your response to this query: " + message + "?"
    except:
        prompt = "What is your response to this query: " + message + "?"

    # Use the vectorstore from the thread
    thread = Thread.objects.get(chatid=chatid)
    vectorstore_path = thread.vectorstore_path
    db = Chroma(persist_directory=vectorstore_path, embedding_function=embeddings)
    retriever = db.as_retriever()

    # create a QA chain
    qa = RetrievalQA.from_chain_type(llm = llm, chain_type='stuff', retriever=retriever,return_source_documents=True)
    response = qa({"query": prompt})
    print(response)
    response = response['result']

    # Add the response to the vectorstore
    word = response.split()
    word_array = []
    for i in range(0, len(word), 200):
        word_array.append(" ".join(word[i:i+200]))

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.create_documents(word_array)
    db.add_documents(texts)
    db.persist()

    # Save the chat in the database
    Chat.objects.create(userid=thread.userid, message=message, response=response, chatid=chatid)

    return JsonResponse({'response':response})

#------------------------------------------------------------------------------------------
#----------------------------------- USER -------------------------------------------------
#------------------------------------------------------------------------------------------

@csrf_exempt
def new_user(request):
    data = json.loads(request.body.decode('utf-8'))
    _id = data['_id']
    email = data['email']
    name = data['name']

    print("ID: " + _id + " Email: " + email + " Name: " + name)

    # Create a new user in the database
    try:
        UserDoc.objects.create(userid=_id, email=email, name=name, topics={"Miscellaneous":[]})
    except Exception as e:
        print(e)
        return JsonResponse({'response':'User already exists'})

    return JsonResponse({'response':'Success'})

@csrf_exempt
def get_user(request):
    userid = request.GET['userid']
    user = UserDoc.objects.get(userid=userid)

    return JsonResponse({'email':user.email, 'name':user.name})
