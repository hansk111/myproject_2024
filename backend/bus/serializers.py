from rest_framework import serializers
from .models import BusStop


class BusStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusStop
        fields = ['id', 'stationId', 'stationName', 'x', 'y',
                  'mobileNo', 'regionName', 'centerYn', 'distance']
