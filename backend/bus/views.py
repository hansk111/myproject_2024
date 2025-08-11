from django.shortcuts import render
from rest_framework import viewsets
from .models import BusStop
from .serializers import BusStopSerializer


class BusStopViewSet(viewsets.ModelViewSet):
    queryset = BusStop.objects.all().order_by('-created_at')
    # queryset = BusStop.objects.all()
    serializer_class = BusStopSerializer
