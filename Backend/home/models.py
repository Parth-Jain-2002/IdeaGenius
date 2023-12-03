import uuid
from django.db import models

# Create your models here.

class UserAction(models.Model):
    url = models.CharField(max_length=255)
    userid = models.CharField(max_length=50)
    action = models.CharField(max_length=50)

class Chat(models.Model):
    userid = models.CharField(max_length=50)
    chatid = models.UUIDField(default=uuid.uuid4, editable=False)
    message = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Thread(models.Model):
    userid = models.CharField(max_length=50)
    chatid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length=255)
    imgsrc = models.CharField(max_length=255)
    url = models.CharField(max_length=255, default="")
    vectorstore_path = models.CharField(max_length=255, default="")

class UserDoc(models.Model):
    userid = models.CharField(max_length=50)
    email = models.CharField(max_length=255, default="", unique=True)
    name = models.CharField(max_length=255, default="")
    topics = models.JSONField(default=dict)

class Topic(models.Model):
    userid = models.CharField(max_length=50)
    topicid = models.CharField(max_length=50, default="", unique=True)
    title = models.CharField(max_length=255, default="")
    description = models.CharField(max_length=255, default="")
    generated = models.BooleanField(default=False)
    time_constraint_value = models.IntegerField(default=0)
    budget_constraint_value = models.IntegerField(default=0)
    subtask = models.TextField(default="")
    # This is a JSON object that contains the following keywords: {keywords: ['Finance', 'Investment', 'Stocks']}
    keywords = models.JSONField(default=dict)