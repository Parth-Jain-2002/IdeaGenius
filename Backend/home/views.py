from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def index(request):
    response = {}
    response['status'] = 'OK'
    response['message'] = 'This is the home page'
    return JsonResponse(response)

def ai_response(request):
    # get the user input
    
    response = {}
    response['status'] = 'OK'
    response['message'] = 'This is the ai_response page'
    return JsonResponse(response)