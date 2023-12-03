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
    path('get_threads',views.get_threads, name='get_threads'),
    path('get_thread',views.get_thread, name='get_thread'),
    path('chat_interface',views.chat_interface, name='chat_interface'),

    path('get_user',views.get_user, name='get_user'),
    path('new_user',views.new_user, name='new_user'),
    path('get_topics',views.get_topics, name='get_topics'),
    path('new_topic',views.new_topic, name='new_topic'),
    path('edit_topic',views.edit_topic, name='edit_topic'),
    path('select_idea',views.select_idea, name='select_idea'),

    path('generate_idea',views.generate_idea, name='generate_idea'),
    path('get_insights',views.get_insights, name='get_insights'),
]