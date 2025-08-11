from langchain_openai import ChatOpenAI
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from .models import ChatMessage, ChatSession
import os
from rest_framework import viewsets
from .serializers import ChatMessageSerializer, SessionSerializer
from rest_framework import permissions, status, viewsets
# from .filters import ChatSessionFilter
from rest_framework.filters import SearchFilter, OrderingFilter

import uuid


class QuestionAnswerViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['session']

    def get_queryset(self):
        queryset = super().get_queryset()

        session = self.request.query_params.get('session', None)
        print("session===", session)
        if session:
            queryset = queryset.filter(session__session=session)
        print("queryset===", queryset)
        return queryset

    def create(self, request, *args, **kwargs):
        session = request.query_params.get('session')
        message = request.query_params.get('message')
        llm = ChatOpenAI(model="gpt-4o-mini",
                         temperature=0.0)
        messages = [
            (
                "system",
                "You are a helpful assistant. Please answer in markdown format.",
            ),
            ("human", message),
        ]
        response = llm.invoke(messages)
        answer = response.content
        user = request.user if request.user.is_authenticated else None
        if session:
            session_obj = ChatSession.objects.get(session=session)
        print("session_obj===", session_obj)
        # 질문과 답변을 데이터베이스에 저장
        ChatMessage.objects.create(
            user=user, session=session_obj, message=message, response=answer)
        return Response(answer, status=status.HTTP_201_CREATED)


class ChatSessionViewSet(viewsets.ModelViewSet):
    queryset = ChatSession.objects.all().order_by('-created_at')
    serializer_class = SessionSerializer

    def create(self, request, *args, **kwargs):
        session = str(uuid.uuid1())
        user = request.user if request.user.is_authenticated else None
        print('user', user)
        if session:
            ChatSession.objects.create(user=user, session=session)
        queryset = ChatSession.objects.all().order_by('-created_at')
        serializer = SessionSerializer(queryset, many=True)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        queryset = ChatSession.objects.filter(
            user=user).order_by('-created_at')
        serializer = SessionSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        instance = self.get_object()
        self.perform_destroy(instance)
        queryset = ChatSession.objects.filter(
            user=user).order_by('-created_at')
        serializer = SessionSerializer(queryset, many=True)
        return Response(serializer.data)
