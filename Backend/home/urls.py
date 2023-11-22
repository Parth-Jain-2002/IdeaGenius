from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('ai_response',views.ai_response, name='ai_response'),
    path('summarize',views.summarize, name='summarize'),
    path('insights',views.insights, name='insights'),
    path('deep_dive',views.deep_dive, name='deep_dive'),
    path('test',views.test, name='test')
]