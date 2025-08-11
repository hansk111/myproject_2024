from rest_framework import serializers
from .models import Note, Image


class NoteSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    title = serializers.CharField(required=True)
    color = serializers.CharField(required=True)

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image',)
