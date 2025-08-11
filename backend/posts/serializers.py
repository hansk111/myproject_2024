from rest_framework import serializers
from rest_framework.decorators import action
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from .models import Category, Comment, Reply, Post, Image
from users.models import Profile
from users.serializers import ProfileSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class PostReadSerializer(serializers.ModelSerializer):

    # userprofile = ProfileSerializer()

    # author_email = serializers.CharField(source="author.email", read_only=True)
    author_firstname = serializers.CharField(
        source="author.first_name", read_only=True)
    # author_lastname = serializers.CharField(
    #     source="author.last_name", read_only=True)
    # author_image = serializers.CharField(
    #     source="userprofile.image", read_only=True)
    author = serializers.SerializerMethodField(read_only=True)
    categories = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    coverImg = serializers.ImageField(use_url=False, read_only=True)

    depth = 3

    class Meta:
        model = Post
        fields = ['id', 'title', 'author_firstname', 'author', 'featured', 'coverImg', 'categories',
                  'content', 'likes', 'createdAt', 'updatedAt', 'view', 'comments']

    def get_author(self, obj):
        author = ProfileSerializer(
            Profile.objects.get(user=obj.author)
        ).data
        return author

    def get_comments(self, obj):
        comments = CommentReadSerializer(
            Comment.objects.filter(post=obj.id), many=True
        ).data
        return comments

    def get_author_firstname(self, obj):
        author_firstname = list(
            cat.firstname for cat in obj.author.get_queryset().only("firstname")
        )
        return author_firstname

    def get_categories(self, obj):
        categories = list(
            cat.name for cat in obj.categories.get_queryset().only("name")
        )
        return categories

    def get_likes(self, obj):
        likes = list(
            like.email for like in obj.likes.get_queryset().only("email")
        )
        return likes

    # def get_comments(self, obj):
    #     comments = list(
    #         cat.body for cat in obj.comments.get_queryset().only("body")
    #     )
    #     return comments


class PostWriteSerializer(serializers.ModelSerializer):

    author = serializers.SerializerMethodField(
        default=serializers.CurrentUserDefault())

    def get_author(self, obj):
        author = ProfileSerializer(
            Profile.objects.get(user=obj.author)
        ).data
        return author

    class Meta:
        model = Post
        fields = ['title', 'author', 'featured',
                  'coverImg', 'categories', 'content']


class CommentReadSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.email", read_only=True)
    author_image = serializers.CharField(
        source="author.profile.image", read_only=True)
    replies = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"

    def get_replies(self, obj):
        replies = ReplyReadSerializer(
            Reply.objects.filter(comment=obj.id), many=True
        ).data
        return replies


class CommentWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = "__all__"


class ReplyReadSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.email", read_only=True)
    author_image = serializers.CharField(
        source="author.profile.image", read_only=True)

    class Meta:
        model = Reply
        fields = "__all__"


class ReplyWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Reply
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image',)
