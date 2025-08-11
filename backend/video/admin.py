from django.contrib import admin
from .models import Video

# Register your models here.


class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'type',
                    'thumbnail', 'video_file', 'created_at')


admin.site.register(Video, VideoAdmin)
