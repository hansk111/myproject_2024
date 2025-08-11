from django.shortcuts import render
from rest_framework import viewsets
from .models import Note, Image
from .serializers import NoteSerializer, ImageSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# Create your views here.


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_queryset(self):
        # return self.queryset.filter(user=self.request.user)
        return self.queryset

    def create(self, request):

        print("request====", request.data)

        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        title = request.data.get('title')
        color = request.data.get('scolor')
        print("title====", title)
        print("scolor====", color)
        print("user====", user)
        if not title or not color:
            return Response({'error': 'Title and scolor are required'}, status=status.HTTP_400_BAD_REQUEST)
        if Note.objects.filter(title=title, user=user).exists():
            return Response({'error': 'Note with this title already exists'}, status=status.HTTP_400_BAD_REQUEST)

        note = Note.objects.create(user=user, title=title, color=color)
        serializer = NoteSerializer(note)
        answer = serializer.data
        return Response(answer, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        title = request.data.get('title')
        color = request.data.get('color')
        content = request.data.get('content')
        if not title or not color:
            return Response({'error': 'Title and scolor are required'}, status=status.HTTP_400_BAD_REQUEST)

        note = Note.objects.filter(id=pk, user=user).first()
        if not note:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)

        note.title = title
        note.color = color
        note.content = content
        note.save()

        answer = {'message': 'Note updated successfully'}
        return Response(answer, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        note = Note.objects.filter(id=pk, user=user).first()
        if not note:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(note)

        answer = {'message': 'Note deleted successfully'}
        return Response(answer, status=status.HTTP_200_OK)

    def list(self, request):
        user = request.user if request.user.is_authenticated else None
        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        notes = Note.objects.filter(user=user, deleted=False)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ImageUploadView(APIView):
    def post(self, request, format=None):
        print("request====", request.data)
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'url': serializer.data['image']}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
