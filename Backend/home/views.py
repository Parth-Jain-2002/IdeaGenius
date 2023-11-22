from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from readability import Document
import re
import json

from .hfcb import HuggingFaceChatBot as HFCB

from youtube_transcript_api import YouTubeTranscriptApi
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

chatbot_instance = HFCB()

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
    ai_summary = chatbot_instance.query(query_to_ask)
    
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
    ai_insights = chatbot_instance.query(query_to_ask)
    
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
    ai_deep_dive = chatbot_instance.query(query_to_ask)
    
    response = {'response': str(ai_deep_dive)}
    return JsonResponse(response)

def scrape(url):
    # scrape the url and return the text
    html = requests.get(url).text
    doc = Document(html)
    summary = doc.summary()
    
    # remove the html tags
    clean = re.compile('<.*?>')
    summary = re.sub(clean, '', summary)

    return summary

