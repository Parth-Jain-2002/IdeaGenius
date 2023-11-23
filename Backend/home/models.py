from django.db import models

# Create your models here.

class UserAction(models.Model):
    url = models.CharField(max_length=255)
    userid = models.CharField(max_length=50)
    action = models.CharField(max_length=50)