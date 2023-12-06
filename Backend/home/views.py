from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from pytrends.request import TrendReq
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs, urljoin
from googlesearch import search

import requests
from readability import Document
import re
import json
import uuid
import os
import pdfplumber
import docx2txt
from .promptTemplate import idea_generation, source_document_generation, final_source_generation, generate_cost_insights_prompt, generate_time_insights_prompt, idea_info, generate_subtasks_prompt

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

from .models import UserAction, Chat, UserDoc, Thread, Topic

# load llm and embeddings
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

# Function for summarizing the text
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

# Function for actionable insights from the text
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

# Function for deep diving into the text
def deep_dive(url,chatid):
    db = add_to_research_bank(url,chatid)
    retriever = db.as_retriever()

    # create a QA chain
    qa = RetrievalQA.from_chain_type(llm = llm, chain_type='stuff', retriever=retriever,return_source_documents=True)

    # deep dive into the text
    query_to_ask = "Deep dive into this article in 5 ordered list points"
    ai_deep_dive = qa({"query": query_to_ask})
    
    return ai_deep_dive['result']

# Function for adding the text to the research bank
def add_to_research_bank(url,chatid):
    # scrape the url
    summary = scrape(url)
    text_array = []

    # Split the summary into chunks of 200 words
    words = summary.split()
    for i in range(0, len(words), 200):
        text_array.append(" ".join(words[i:i+200]))

    # print(text_array)

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
    
# Function for scraping the url
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

# Function for scraping the youtube url
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

        # Fallback to Whisper failed. Delete the audio file.
        print("Deleting audio file:", file_path)
        try:
            os.remove(file_path)
            print("File deleted successfully.")
        except Exception as delete_error:
            print("Error deleting file:", delete_error)

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


# Function for summarizing the document
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
    try:
        userid = request.GET['userid']
        ideaid = request.GET['ideaid']
        
        userDoc = UserDoc.objects.get(userid=userid)
        topics = userDoc.topics
        chatids = topics[ideaid]

        # Convert the chatids to UUID
        print(chatids)
        chatids = [chatid['chatid'] for chatid in chatids]
        print(chatids)
        chatids = [uuid.UUID(chatid) for chatid in chatids]
        print(chatids)
        threads = Thread.objects.filter(chatid__in=chatids)

        # convert the chats to json
        response = []
        for thread in threads:
            response.append({'title':thread.title, 'imgsrc':thread.imgsrc, 'url':thread.url, 'chatid':thread.chatid})

        return JsonResponse({'data':response})
    except Exception as e:
        print(e)
        return JsonResponse({'data':[]})
    

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

    # Add the topic to the "Miscellaneous" topic
    user = UserDoc.objects.get(userid=userid)
    topics = user.topics
    topics['Miscellaneous'].append({'title':title, 'chatid':str(chatid)})
    user.topics = topics
    user.save()

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

@csrf_exempt
def get_idea_chat(request):
    ideaid = request.GET['ideaid']
    userid = request.GET['userid']

    # Get the chatid from the topic
    topic = Topic.objects.get(userid=userid, topicid=ideaid)
    chatid = topic.chatid

    if chatid == "":
        return JsonResponse({'data':[]})

    chats = Chat.objects.filter(chatid=chatid)
    
    # convert the chats to json
    response = []
    for chat in chats:
        response.append({'message':chat.message, 'response':chat.response})

    return JsonResponse({'data':response})


@csrf_exempt
def idea_interface(request):
    data = json.loads(request.body.decode('utf-8'))
    print(data)
    message = data['message']
    ideaid = data['ideaid']
    userid = data['userid']

    idea = Topic.objects.get(userid=userid, topicid=ideaid)
    chatid = idea.chatid

    thread = Thread.objects.filter(chatid=chatid)
    # If the queryset is empty, then create a new thread
    if not thread:
        print("Thread does not exist")
        thread = Thread.objects.create(userid=userid, chatid=chatid)
        vectorstore_path = "./vector_store/chroma_db_" + str(chatid)
        thread.vectorstore_path = vectorstore_path
        # Update the vectorstore path in the database
        thread.save()

    chat = ''
    prompt = ''
    try:
        # Get the last chat from the database according to timestamp
        chat = Chat.objects.filter(chatid=chatid).order_by('-timestamp')[0]

        # Prompt
        prompt = "Here is the last query: " + chat.message + " and here is the last response: " + chat.response + ". What is your response to this query: " + message + "?"
    except:
        prompt = "What is your response to this query: " + message + "?"

    prompt= idea_info(idea) + prompt

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
@csrf_exempt
def get_topics(request):
    userid = request.GET['userid']
    user = UserDoc.objects.get(userid=userid)

    return JsonResponse({'topics':user.topics})

@csrf_exempt
def get_topics_details(request):
    userid = request.GET['userid']
    topics = Topic.objects.filter(userid=userid)

    response = {}
    response["Miscellaneous"] = {'title':"Miscellaneous", 'description':"Miscellaneous", 'generated':False, 'time_insight':{}, 'cost_insight':{}, 'subtask':"", 'keywords':{}, 'chatid':"", 'visiondoctext':""}
    for topic in topics:
        response[topic.topicid] = {'title':topic.title, 'description':topic.description, 'generated':topic.generated, 'time_insight':topic.time_insight, 'cost_insight':topic.cost_insight, 'subtask':topic.subtask, 'keywords':topic.keywords, 'chatid':topic.chatid, 'visiondoctext':topic.visiondoctext}

    return JsonResponse({'topics':response})

@csrf_exempt
def get_topic(request):
    userid = request.GET['userid']
    topicid = request.GET['topicid']

    print(topicid)

    topic = Topic.objects.get(userid=userid, topicid=topicid)
    response = {'title':topic.title, 'description':topic.description, 'time_insight':topic.time_insight, 'cost_insight':topic.cost_insight, 'subtask':topic.subtask, 'keywords':topic.keywords, 'generated':topic.generated,
    'chatid':topic.chatid, 'visiondoctext':topic.visiondoctext}

    return JsonResponse(response)

@csrf_exempt
def new_topic(request):
    data = json.loads(request.body.decode('utf-8'))
    userid = data['userid']
    topic = data['ideaid']
    description = data['description']

    # Create a new topic in the database
    user = UserDoc.objects.get(userid=userid)
    topics = user.topics
    topics[topic] = []
    user.topics = topics
    user.save()

    Topic.objects.create(userid=userid, topicid=topic, title="", description=description, generated=False, time_insight={}, cost_insight={}, subtask="", keywords={})

    return JsonResponse({'response':'Success'})

@csrf_exempt
def edit_topic(request):
    data = json.loads(request.body.decode('utf-8'))
    userid = data['userid']
    chatid = data['chatid']
    topicid = data['topicid']
    prevtopicid = data['prevtopicid']

    print(topicid)
    print(prevtopicid)

    thread = Thread.objects.get(chatid=chatid)

    userDoc = UserDoc.objects.get(userid=userid)
    topics = userDoc.topics

    # Remove the chatid from the previous topic
    prevtopic = topics[prevtopicid]
    prevtopic = [chat for chat in prevtopic if chat['chatid'] != str(chatid)]
    topics[prevtopicid] = prevtopic
    # Add the chatid to the new topic
    newtopic = topics[topicid]
    newtopic.append({'title':thread.title, 'chatid':str(chatid)})
    topics[topicid] = newtopic
    
    userDoc.topics = topics
    userDoc.save()

    return JsonResponse({'response':'Success'})


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

    if user is None:
        return JsonResponse({'response':'User does not exist'})

    return JsonResponse({'email':user.email, 'name':user.name})
  

#------------------------------------------------------------------------------------------
#--------------------------------IDEA GENERATION-------------------------------------------
#------------------------------------------------------------------------------------------

def generate_source_documents(answer, chatids):
    source_documents = ""
    for chatid in chatids:
        chat = Thread.objects.get(chatid=chatid)

        # Get the vectorstore path from the thread
        vectorstore_path = chat.vectorstore_path

        # Use the vectorstore from the thread
        db = Chroma(persist_directory=vectorstore_path, embedding_function=embeddings)
        retriever = db.as_retriever(search_kwargs={"k": 8})

        # create a QA chain
        qa = RetrievalQA.from_chain_type(llm = llm, chain_type='stuff', retriever=retriever,return_source_documents=True)
        response = qa({"query": source_document_generation(answer)})

        # If the response contains "No valid points ", then skip this chat
        if "No valid points" in response['result']:
            continue
        source_documents += response['result']

    response = llm(final_source_generation(source_documents,answer))
    return response

def validate(response):
    print(response)
    try:
        response = response.split("[")[1].split("]")[0]
        response = "[" + response + "]"
        response = json.loads(response)
        if len(response) == 4:
            # Check if the object contains title and description
            return True
        else:
            return False
    except:
        return False
    

@csrf_exempt
def generate_idea(request):
    data = json.loads(request.body.decode('utf-8'))
    answer = data['answer']
    idea = data['idea']
    userid = data['userid']

    answer = answer.split("###NewAnswer###")    
    print(answer)
    print(idea)
    print(userid)

    # # Get the all the chatid in the idea from UserDoc
    # user = UserDoc.objects.get(userid=userid)
    # topics = user.topics
    # chatids = topics[idea]

    # # Get the source documents from the chatids
    # source_documents = generate_source_documents(answer,chatids)

    prompt = idea_generation(answer, "")

    prompt+= "Title should be of max 10-15 words. Description should be of max 40-50 words. Return a JSON object array of the following format: [{\"title\": \"Title of the idea\", \"description\": \"Description of the idea\"} , { Ideas 2 }, { Ideas 3 }, { Ideas 4 }]"

    while True:
        response = llm(prompt)
        # Check if there is a array in the response or not with four elements of title and description
        if(validate(response)):
            break
    
    response = response.split("[")[1].split("]")[0]
    response = "[" + response + "]"

    return JsonResponse({'response':response})

@csrf_exempt
def select_idea(request):
    data = json.loads(request.body.decode('utf-8'))
    userid = data['userid']
    idea = data['idea']
    title = data['title']
    description = data['description']

    print(idea)

    # Get the Idea from the database
    topic = Topic.objects.get(userid=userid, topicid=idea)
    topic.title = title
    topic.description = description
    topic.generated = True
    topic.save()

    return JsonResponse({'response':'Success'})

#------------------------------------------------------------------------------------------
#------------------------------MARKET INSIGHTS---------------------------------------------
#------------------------------------------------------------------------------------------

def get_google_trends_data(keywords, timeframe='today 12-m', geo='IN'): 
    pytrends = TrendReq(retries=5)

    # Build payload
    pytrends.build_payload(
        kw_list=keywords,
        cat=0,
        timeframe=timeframe,
        geo=geo,
        gprop=''
    )
    interest_over_time_df = pytrends.interest_over_time()

    interest_over_time_df['sum_frequency'] = interest_over_time_df[keywords].sum(axis=1)    
    result_df = interest_over_time_df[['sum_frequency']]
    return result_df


def clean_google_url(google_url):    
    match = re.search(r'/url\?q=(.+?)&', google_url)
    return match.group(1) if match else google_url


def get_competitor_revenue(competitors):
    competitor_revenue=[]
    
    for competitor in competitors:        
        search_query = f"{competitor} annual revenue growjo"
        search_url = f'https://www.google.com/search?q={search_query}'
        response = requests.get(search_url)
        soup = BeautifulSoup(response.text, 'html.parser')        
        all_urls = [clean_google_url(a['href']) for a in soup.find_all('a', href=True)]
        filtered_urls = [url for url in all_urls if urlparse(url).hostname == "growjo.com"]
        
        if len(filtered_urls) > 0 and filtered_urls[0]!="https://growjo.com/":
            try:
                response = requests.get(filtered_urls[0], timeout=10)                
                soup = BeautifulSoup(response.text, 'html.parser')
                all_li_tags = soup.find_all('li')
                
                for li_tag in all_li_tags:
                    
                    
                    if 'estimated annual revenue is currently' in li_tag.get_text():
                        
                        revenue_match = re.search(r'\$\d+(?:,\d{3})*(?:\.\d+)?[BMK]?', li_tag.get_text())

                        if revenue_match:
                            revenue_data = revenue_match.group(0)
                            competitor_revenue.append(revenue_data)
                            
                        else:
                            competitor_revenue.append(0)
                
                
            except Exception as e:
                print(f"Error fetching data from {filtered_urls[0]}: {e}")
                competitor_revenue.append(0)
        else:
            competitor_revenue.append(0)
               
    final_competitor = [comp for comp, rev in zip(competitors, competitor_revenue) if rev != 0]
    final_competitor_revenue = [rev for rev in competitor_revenue if rev != 0]
    
    
    
    return final_competitor,final_competitor_revenue

def get_competitors(description):
    search_query = f"{description} top best"
    search_url = f'https://www.google.com/search?q={search_query}'
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    urls = [clean_google_url(a['href']) for a in soup.find_all('a', href=True) if 'top' in a.text.lower() or 'best' in a.text.lower()]
    print(urls)
    competitors = []
    for url in urls:
        
        try:
            response = requests.get(url, timeout=5)
            # print(f"HTTP request successful for URL: {url}")
            soup = BeautifulSoup(response.text, 'html.parser')
            numbered_titles = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], text=re.compile(r'\d+\.'))
            for title in numbered_titles:
                competitors.append(title.text.strip())
        except Exception as e:
            print(f"Error fetching data from {url}: {e}")
       
    
    competitors_without_numbering = [re.sub(r'^\d+\.\s*', '', competitor) for competitor in competitors]
    filtered_competitors = [competitor for competitor in competitors_without_numbering if len(competitor.split()) <= 2]
    unique_competitors=list(set(filtered_competitors))
    
    print(unique_competitors)
    
    return unique_competitors


def get_tables(description):
    search_query = f"{description} future market insights"
    search_url = f'https://www.google.com/search?q={search_query}'
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')        
    all_urls = [clean_google_url(a['href']) for a in soup.find_all('a', href=True)]   
    filtered_urls = [url for url in all_urls if urlparse(url).hostname == "www.futuremarketinsights.com"]    
    
    
    tables=[]
    images=[]
    for url in filtered_urls:        
        try:
            response = requests.get(url, timeout=5)            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            first_table = soup.find('table')
            table_content = []
            if first_table:
                for row in first_table.find_all('tr'):
                    columns = row.find_all(['th', 'td'])
                    row_data = [column.get_text(strip=True) for column in columns]
                    table_content.append(row_data)
                tables.append(table_content)
            
            image_urls = [urljoin(url, img['src']) for img in soup.find_all('img')]
            images.extend(image_urls)
            
        except Exception as e:
            print(f"Error fetching data from {url}: {e}")
        
    
    return tables,images

@csrf_exempt
def get_insights(request):    
    data = json.loads(request.body.decode('utf-8'))    
    ideaid = data['idea_id'] 
      
    idea = Topic(
        userid="ideagen_user_id",
        topicid="Streamline_Expense_Tracking",
        title="Streamline_Expense_Tracking",
        description="Develop an intuitive web and mobile app for efficient expense tracking, categorization, and reporting, leveraging AI for smart insights and automated receipt scanning",
        generated=True,
        time_insight={},  
        cost_insight={},  
        subtask={"Implement manual and automated expense entry and categorization.","Develop a user-friendly reporting system with customizable visualizations."},
        keywords={'keywords': ['Expense Tracking', 'Spending Insights','Finance Management App']}
    )
    
    description = idea.description
    print(description)
    unique_competitors=get_competitors(description)
    competitors,competitor_revenue=get_competitor_revenue(unique_competitors)
    tables,images =get_tables(description)    
    print(competitors,competitor_revenue)
    keyword_list=idea.keywords.get('keywords', [])
    interest_over_time = get_google_trends_data(keyword_list)
    
    # print("Interest Over Time:")
    # print(interest_over_time)  
    
    

    return JsonResponse({
        'competitors': competitors,
        'interest_over_time': interest_over_time.to_json(),
        'images': images,
        'tables': tables,
        'competitor_revenue': competitor_revenue
        #                 'keywords': keyword_list                             
                        })

#----------------------------------------------------------------------------------------
#-----------------------------------VISION DOC-------------------------------------------
#----------------------------------------------------------------------------------------

def validate_cost_insights(response):
    try:
        print(response)
        # Find the first "{" and the last "}" in response
        response = response[response.find("{"):response.rfind("}")+1]
        response = json.loads(response)
        print(response)
        if 'cost' in response and 'explanation' in response:
            return response 
        else:
            return "Invalid"
    except:
        return "Invalid"

def validate_time_insights(response):
    try:
        # Find the first "{" and the last "}" in response
        response = response[response.find("{"):response.rfind("}")+1]
        response = json.loads(response)
        if 'time' in response and 'explanation' in response:
            return response 
        else:
            return "Invalid"
    except:
        return "Invalid"

@csrf_exempt
def get_cost_insights(request):
    data = json.loads(request.body.decode('utf-8'))
    userid = data['userid']
    topicid = data['ideaid']

    # Get the topic from the database
    topic = Topic.objects.get(userid=userid, topicid=topicid)
    topic.cost_insight = {}

    prompt = generate_cost_insights_prompt(topic)
    
    while True:
        response = llm(prompt)
        validate = validate_cost_insights(response)
        print(validate)
        if validate != "Invalid":
            topic.cost_insight = validate
            topic.save()
            break

    return JsonResponse({'response':"Success"})

@csrf_exempt
def get_time_insights(request):
    data = json.loads(request.body.decode('utf-8'))
    userid = data['userid']
    topicid = data['ideaid']

    # Get the topic from the database
    topic = Topic.objects.get(userid=userid, topicid=topicid)
    topic.time_insight = {}

    prompt = generate_time_insights_prompt(topic)
    
    while True:
        response = llm(prompt)
        validate = validate_time_insights(response)
        print(validate)
        if validate != "Invalid":
            topic.time_insight = validate
            topic.save()
            break

    return JsonResponse({'response':"Success"})

@csrf_exempt
def get_subtasks(request):
    data = json.loads(request.body.decode('utf-8'))
    userid = data['userid']
    topicid = data['ideaid']

    print("I am here")

    # Get the topic from the database
    topic = Topic.objects.get(userid=userid, topicid=topicid)
    topic.subtask = ""

    prompt = generate_subtasks_prompt(topic)
    
    response = llm(prompt)
    topic.subtask = response
    topic.save()
    
    return JsonResponse({'response':"Success"})

@csrf_exempt
def update_topic(request):
    data = json.loads(request.body.decode('utf-8'))
    userid = data['userid']
    topicid = data['ideaid']
    title = data['title']
    description = data['description']
    subtask = data['subtask']
    visiondoctext = data['visiondoctext']
    time_insight = data['time_insight']
    cost_insight = data['cost_insight']

    print(visiondoctext)

    # Get the topic from the database
    topic = Topic.objects.get(userid=userid, topicid=topicid)
    topic.title = title
    topic.description = description
    topic.subtask = subtask
    topic.time_insight = time_insight
    topic.cost_insight = cost_insight
    topic.visiondoctext = visiondoctext
    topic.save()

    return JsonResponse({'response':"Success"})


#----------------------------------------------------------------------------------------
#--------------------------------RECOMMENDED PEOPLE--------------------------------------
#----------------------------------------------------------------------------------------
import pickle
from scipy.spatial.distance import cosine
from collections import Counter


def find_users_based_on_tags(input_tags, user_profiles, tag_embeddings, threshold=0.5):
    user_counter = Counter()  # Counter to track user occurrences

    for input_tag in input_tags:
        input_embedding = tag_embeddings[input_tag]
        
        # Find users with similar tags
        for user, user_tags in user_profiles.items():
            user_embedding = [tag_embeddings[tag] for tag in user_tags]
            
            # Calculate similarity between input tag and user tags
            similarity_scores = [1 - cosine(input_embedding, tag_embedding) for tag_embedding in user_embedding]
            
            # If at least one tag is similar, consider the user
            user_counter[user] += sum(score > threshold for score in similarity_scores)

    # Get users with the highest occurrences
    top_users = user_counter.most_common()
    return top_users

def get_input_tags(topicid):
    try:
        topic=Topic.objects.get(topicid=topicid)
        print(topic.keywords)
        return topic.keywords['keywords']
    except Exception as e:
        print(e)
        return ['Error']

@csrf_exempt
def get_recommended_people(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        ideaid = data['ideaid']
        input_tags = get_input_tags(ideaid)
        print("input tags: ", input_tags)
        # Assuming User Data comes from Some API
        with open ('home/user_profiles.pkl', 'rb') as f:
            user_profiles = pickle.load(f)
        # Pre-computed tag embeddings for all users
        with open ('home/tag_embeddings.pkl', 'rb') as f:
            tag_embeddings = pickle.load(f)
        # Find the users based on the tags
        top_users = find_users_based_on_tags(input_tags, user_profiles, tag_embeddings, threshold=0.5)

        # Get the top 6 users
        top_users = top_users[:6]
        top_users = [user[0] for user in top_users]
        users = UserDoc.objects.filter(userid__in=top_users)
        response=[]
        for user in users:
            response.append({'id':user.userid, 'name':user.name, 'jobTitle': user.jobtitle, 'jobDescription': 'I am a software engineer and i engineer software', 'institution': user.institution})
        return JsonResponse({'response':response})

    except Exception as e:
        print(e)
        return JsonResponse({'response':'Error'}, status=500)