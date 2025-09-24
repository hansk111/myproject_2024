from django.contrib import admin
from .models import *


class WeatherPositionAdmin(admin.ModelAdmin):
    list_display = ('id', 'country', 'lat', 'lon', 'name',
                    'local_name', 'created_at', 'updated_at')


admin.site.register(WeatherPosition, WeatherPositionAdmin)