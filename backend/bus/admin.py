from django.contrib import admin
from .models import *


class BusStopAdmin(admin.ModelAdmin):
    list_display = ('id', 'stationId', 'stationName', 'x', 'y',
                    'mobileNo', 'regionName', 'centerYn', 'distance', 'created_at', 'updated_at')


admin.site.register(BusStop, BusStopAdmin)
