from rest_framework import serializers
from users.models import Profile
from users.serializers import ProfileSerializer
from .models import Mybodydata
from django.contrib.auth import get_user_model

User = get_user_model()


class MybodydataSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField()

    class Meta:
        model = Mybodydata
        fields = '__all__'
        read_only_fields = ('user', 'createdAt')
