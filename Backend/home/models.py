import uuid
from django.db import models

# Create your models here.

class UserAction(models.Model):
    url = models.CharField(max_length=255)
    userid = models.CharField(max_length=50)
    action = models.CharField(max_length=50)

class Chat(models.Model):
    userid = models.CharField(max_length=50)
    chatid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    message = models.CharField(max_length=255)
    response = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    url = models.CharField(max_length=255, default="")
    vectorstore_path = models.CharField(max_length=255, default="")


class User(models.Model):
    userid = models.CharField(max_length=50)
    topics = models.JSONField()

