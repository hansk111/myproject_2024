from rest_framework import serializers
from .models import Video


class VideoSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()  # 썸네일 URL 필드 추가

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'type',
                  'thumbnail', 'thumbnail_url', 'video_file', 'created_at']

    def get_thumbnail_url(self, obj):
        """썸네일 절대 URL 반환"""
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None


class ThumbnailUpdateSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=True)
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'thumbnail', 'thumbnail_url']

    def get_thumbnail_url(self, obj):
        """썸네일 절대 URL 반환"""
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None

    def validate_thumbnail(self, value):
        """썸네일 파일 유효성 검증"""
        # 파일 크기 제한
        max_size = 5 * 1024 * 1024  # 5MB
        if value.size > max_size:
            raise serializers.ValidationError(
                "File size too large. Maximum size is 5MB.")

        # 파일 형식 검증
        allowed_types = ['image/jpeg', 'image/png', 'image/webp']
        if hasattr(value, 'content_type') and value.content_type not in allowed_types:
            raise serializers.ValidationError(
                "Unsupported file type. Please upload JPEG, PNG, or WebP image.")

        return value
