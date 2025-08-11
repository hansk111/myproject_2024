from django.contrib import admin
from .models import *


class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'message', 'response', 'session')


class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session', 'created_at')


admin.site.register(ChatMessage, ChatMessageAdmin)
admin.site.register(ChatSession, ChatSessionAdmin)
