import re
from django.shortcuts import render
from rest_framework import permissions, status, viewsets
# Create your views here.
from .models import Mybodydata
from .serializers import MybodydataSerializer
from rest_framework.response import Response
import requests


class MybodydataViewSet(viewsets.ModelViewSet):

    queryset = Mybodydata.objects.all()
    serializer_class = MybodydataSerializer
    # permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        # return self.queryset.filter(user=self.request.user)
        return self.queryset

    def create(self, request, *args, **kwargs):

        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        weight1 = request.data.get('weight')
        weight = float(re.sub(r'[^\d.]', '', weight1))
        height1 = request.data.get('height')
        height = float(re.sub(r'[^\d.]', '', height1))
        smi1 = request.data.get('smi')
        smi = float(re.sub(r'[^\d.]', '', smi1))
        bodyfat1 = request.data.get('bodyfat')
        bodyfat = float(re.sub(r'[^\d.]', '', bodyfat1))
        bodywater1 = request.data.get('bodywater')
        bodywater = float(re.sub(r'[^\d.]', '', bodywater1))
        bmr1 = ((10 * weight) + (6.25 * height) - (5 * 52) + 5)
        bmr = round(bmr1, 1)
        bmi1 = (weight / ((height / 100) ** 2))
        bmi = round(bmi1, 1)

        mybodydata = Mybodydata.objects.create(
            weight=weight,
            height=height,
            smi=smi,
            bodyfat=bodyfat,
            bodywater=bodywater,
            bmr=bmr,
            bmi=bmi,
            user=user,
        )
        serializer = MybodydataSerializer(mybodydata)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        weight1 = request.data.get('weight')
        weight = float(re.sub(r'[^\d.]', '', weight1))
        height1 = request.data.get('height')
        height = float(re.sub(r'[^\d.]', '', height1))
        smi1 = request.data.get('smi')
        smi = float(re.sub(r'[^\d.]', '', smi1))
        bodyfat1 = request.data.get('bodyfat')
        bodyfat = float(re.sub(r'[^\d.]', '', bodyfat1))
        bodywater1 = request.data.get('bodywater')
        bodywater = float(re.sub(r'[^\d.]', '', bodywater1))
        bmr1 = ((10 * weight) + (6.25 * height) - (5 * 52) + 5)
        bmr = round(bmr1, 1)
        bmi1 = (weight / ((height / 100) ** 2))
        bmi = round(bmi1, 1)

        mybodydata = Mybodydata.objects.filter(id=pk, user=user).first()
        if not mybodydata:
            return Response({'error': 'Mybodydata not found'}, status=status.HTTP_404_NOT_FOUND)

        mybodydata.weight = weight
        mybodydata.height = height
        mybodydata.smi = smi
        mybodydata.bodyfat = bodyfat
        mybodydata.bodywater = bodywater
        mybodydata.bmr = bmr
        mybodydata.bmi = bmi
        mybodydata.save()

        serializer = MybodydataSerializer(mybodydata)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        mybodydata = Mybodydata.objects.filter(id=pk, user=user).first()
        if not mybodydata:
            return Response({'error': 'Mybodydata not found'}, status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(mybodydata)

        answer = {'message': 'Mybodydata deleted successfully'}
        return Response(answer, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        mybodydata = Mybodydata.objects.filter(user=user)
        serializer = MybodydataSerializer(mybodydata, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# def weather(request):
#     lat = request.params.get('lat')
#     lon = request.params.get('lon')

#     print(lat, lon)

#     url_current_location = 'https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&units=metric&lang=kr&appid=54005e91865c1dd6651460dd3bfb88e7'
#     url_4day_forecast = 'https://api.openweathermap.org/data/2.5/forecast/hourly?lat={}&lon={}&units=metric&lang=kr&appid=54005e91865c1dd6651460dd3bfb88e7'
#     url = 'https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&lang=kr&appid=54005e91865c1dd6651460dd3bfb88e7'

#     to_weather = requests.get(url_current_location.format(lat, lon)).json()
#     day4_weather = requests.get(url_4day_forecast.format(lat, lon)).json()
#     print(day4_weather)
#     weather = {
#         'city': to_weather['name'],
#         'temperature': to_weather['main']['temp'],
#         'humidity': to_weather['main']['humidity'],
#         'description': to_weather['weather'][0]['description'],
#         'icon': to_weather['weather'][0]['icon']

#     }
#     context = {'weather': weather}
#     return Response(context)
