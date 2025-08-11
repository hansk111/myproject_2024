from django.contrib import admin
from .models import *


class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content', 'color', 'user', 'deleted')


admin.site.register(Note, NoteAdmin)
