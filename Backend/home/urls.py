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
    path('get_idea_chat',views.get_idea_chat, name='get_idea_chat'),
    path('get_threads',views.get_threads, name='get_threads'),
    path('get_thread',views.get_thread, name='get_thread'),

    path('chat_interface',views.chat_interface, name='chat_interface'),
    path('idea_interface',views.idea_interface, name='idea_interface'),

    path('get_user',views.get_user, name='get_user'),
    path('new_user',views.new_user, name='new_user'),
    path('update_user',views.update_user, name='update_user'),
    path('get_topics',views.get_topics, name='get_topics'),
    path('get_topics_details',views.get_topics_details, name='get_topics_details'),
    path('get_topic',views.get_topic, name='get_topic'),
    path('new_topic',views.new_topic, name='new_topic'),
    path('edit_topic',views.edit_topic, name='edit_topic'),
    path('update_topic',views.update_topic, name='update_topic'),
    path('select_idea',views.select_idea, name='select_idea'),

    path('generate_idea',views.generate_idea, name='generate_idea'),
    path('get_insights',views.get_insights, name='get_insights'),

    path('get_cost_insights',views.get_cost_insights, name='get_cost_insights'),
    path('get_time_insights',views.get_time_insights, name='get_time_insights'),
    path('get_similar_insights',views.get_similar_insights, name='get_similar_insights'),
    path('get_subtasks',views.get_subtasks, name='get_subtasks'),

    path('get_recommended_people', views.get_recommended_people, name='get_recommended_people'),
    path('add_random_users', views.add_random_users, name='add_random_users')
]