from django.contrib import admin

# Register your models here.
from .models import UserAction, Chat, User, Thread

admin.site.register(UserAction)
admin.site.register(Chat)
admin.site.register(User)
admin.site.register(Thread)
