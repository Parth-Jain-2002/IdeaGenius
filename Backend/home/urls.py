from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('ai_response',views.ai_response, name='ai_response'),
    path('test',views.test, name='test'),
    path('url_test',views.url_test, name='url_test'),
    path('get_chats',views.get_chats, name='get_chats'),
    path('get_chat',views.get_chat, name='get_chat'),
]