# from froala_editor.adapters import DjangoAdapter
# from froala_editor import File, Image, Video, S3
import os
import sys
import json
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.http import HttpResponse
import wand.image

from posts.models import Category, Comment, Reply, Post
from posts.serializers import (
    CategorySerializer,
    CommentReadSerializer,
    CommentWriteSerializer,
    ReplyReadSerializer,
    ReplyWriteSerializer,
    PostReadSerializer,
    PostWriteSerializer,
    ImageSerializer,
)
from users.serializers import ProfileSerializer

from .permissions import IsAuthorOrReadOnly
from rest_framework.pagination import PageNumberPagination

# Category is going to be read-only, so we use ReadOnlyModelViewSet


class PostPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 100


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)


class PostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    parser_classes = [FormParser, MultiPartParser]
    pagination_class = PostPagination

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return PostWriteSerializer
        return PostReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (permissions.AllowAny,)

        return super().get_permissions()

    @action(detail=True, methods=['GET'])
    def increase_views(self, request, pk=None):
        # print("post viewset")
        post = self.get_object()
        post.view += 1
        # print('post view=', post.view)
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        print("post create")
        print("request.data===", request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # 이미지를 가져옴
            coverImg = request.data.get('coverImg')
            print('coverImg==', coverImg)
            print('request.user==', request.user)
            # 이미지를 serializer에 설정\
            serializer.validated_data['author'] = request.user
            serializer.validated_data['coverImg'] = coverImg
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()

    def get_queryset(self):
        res = super().get_queryset()
        post_id = self.kwargs.get("post_id")
        return res.filter(post__id=post_id)

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return CommentWriteSerializer

        return CommentReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (permissions.AllowAny,)

        return super().get_permissions()


class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all()

    def get_queryset(self):
        res = super().get_queryset()
        comment_id = self.kwargs.get("comment_id")
        return res.filter(comment__id=comment_id)

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return ReplyWriteSerializer

        return ReplyReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (permissions.AllowAny,)

        return super().get_permissions()


class LikePostAPIView(APIView):
    """
    Like, Dislike a post
    """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk):
        user = request.user
        post = get_object_or_404(Post, pk=pk)

        if user in post.likes.all():
            post.likes.remove(user)

        else:
            post.likes.add(user)

        return Response(status=status.HTTP_200_OK)


# def upload_image(request):
#     try:
#         response = Image.upload(DjangoAdapter(request), '/public/')
#     except Exception:
#         response = {'error': str(sys.exc_info()[1])}
#     return HttpResponse(json.dumps(response), content_type="application/json")

class ImageUploadView(APIView):
    def post(self, request, format=None):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'url': serializer.data['image']}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
