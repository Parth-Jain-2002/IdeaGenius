from django.contrib import admin

# Register your models here.
from .models import UserAction, Chat, User

admin.site.register(UserAction)
admin.site.register(Chat)
admin.site.register(User)
