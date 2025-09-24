from django.shortcuts import render
from rest_framework import viewsets
from .models import WeatherPosition
from .serializers import WeatherPositionSerializer


class WeatherPositionViewSet(viewsets.ModelViewSet):
    queryset = WeatherPosition.objects.all().order_by('-created_at')
    # queryset = BusStop.objects.all()
    serializer_class = WeatherPositionSerializer

