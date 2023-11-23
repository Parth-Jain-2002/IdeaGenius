from django.contrib import admin

# Register your models here.
from .models import UserAction

admin.site.register(UserAction)
