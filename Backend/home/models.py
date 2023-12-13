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
    company = models.CharField(max_length=255, default="")
    jobtitle = models.CharField(max_length=255, default="")
    jobdescription = models.TextField(default="")
    currentplan = models.CharField(max_length=7, default="Free")
    institution = models.CharField(max_length=255, default="")
    trumio = models.CharField(max_length=255, default='https://prod-app.trumio.ai/profile/TALENT/')
    profilePic = models.TextField(default='https://images.unsplash.com/photo-1639605762180-c291953c008c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8dXNlciwke3JhbmRvbVNlZWR9fHx8fHx8MTcwMjA0MTkzOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150')
    bannerPic = models.TextField(default='https://www.eikojones.com/wp-content/uploads/2016/01/esperanza-inlet-sunrise-1080x480.jpg')
    topics = models.JSONField(default=dict)
    student_experience = models.JSONField(default=dict)

class Topic(models.Model):
    userid = models.CharField(max_length=50)
    topicid = models.CharField(max_length=50, default="")
    title = models.CharField(max_length=255, default="")
    description = models.CharField(max_length=255, default="")
    generated = models.BooleanField(default=False)
    time_insight = models.JSONField(default=dict)
    cost_insight = models.JSONField(default=dict)
    subtask = models.TextField(default="")
    # This is a JSON object that contains the following keywords: {keywords: ['Finance', 'Investment', 'Stocks']}
    keywords = models.JSONField(default=dict)
    chatid = models.UUIDField(default=uuid.uuid4)
    visiondoctext = models.TextField(default="")
    market_insights = models.JSONField(default=dict)
    similar_insights = models.TextField(default="")

    class Meta:
        unique_together = ('userid', 'topicid',)