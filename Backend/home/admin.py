from django.contrib import admin

# Register your models here.
from .models import UserAction, Chat, UserDoc, Thread, Topic

admin.site.register(UserAction)
admin.site.register(Chat)
admin.site.register(UserDoc)
admin.site.register(Thread)
admin.site.register(Topic)