from rest_framework import serializers
from .models import ChatMessage, ChatSession
from users.serializers import ProfileSerializer
from users.models import Profile


class ChatMessageSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    session = serializers.StringRelatedField()

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'message', 'response', 'session', 'created_at']


class SessionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = ChatSession
        fields = ['id', 'user', 'session', 'created_at']
