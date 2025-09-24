from rest_framework import serializers
from .models import WeatherPosition


class WeatherPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherPosition
        fields = ['id', 'country', 'lat', 'lon', 'name',
                  'local_name', 'created_at', 'updated_at']
