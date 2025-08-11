from django.shortcuts import render

from .models import Video
from .serializers import VideoSerializer, ThumbnailUpdateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response


from rest_framework import viewsets, status


from django.core.exceptions import ValidationError
import logging
# Create your views here.
logger = logging.getLogger(__name__)


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('-created_at')
    parser_classes = [FormParser, MultiPartParser]
    serializer_class = VideoSerializer

    @action(detail=True, methods=['patch'],
            serializer_class=ThumbnailUpdateSerializer,
            parser_classes=[MultiPartParser])  # FormParser 제거 - 파일 업로드에는 MultiPartParser만 필요
    def update_thumbnail(self, request, pk=None):
        logger.info("=== THUMBNAIL UPDATE REQUEST ===")
        logger.info(f"Request method: {request.method}")
        logger.info(f"Request FILES: {list(request.FILES.keys())}")
        logger.info(f"Request data: {request.data}")
        logger.info(f"Request content type: {request.content_type}")
        logger.info("================================")

        try:
            video = self.get_object()
        except Video.DoesNotExist:
            return Response(
                {'error': 'Video not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # 파일 검증
        if 'thumbnail' not in request.FILES:
            logger.error("ERROR: thumbnail not in request.FILES")
            return Response(
                {'error': 'Thumbnail file is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        thumbnail_file = request.FILES['thumbnail']

        # 파일 유효성 검증
        if not self._validate_thumbnail(thumbnail_file):
            return Response(
                {'error': 'Invalid thumbnail file. Please upload a valid image file.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # 기존 썸네일 삭제 (파일 시스템에서)
            if video.thumbnail:
                try:
                    video.thumbnail.delete(save=False)
                    logger.info("Previous thumbnail deleted successfully")
                except Exception as e:
                    logger.warning(f"Failed to delete previous thumbnail: {e}")

            # 새 썸네일 설정
            video.thumbnail = thumbnail_file
            video.save()

            logger.info(
                f"Thumbnail updated successfully for video ID: {video.id}")

            # 응답용 시리얼라이저
            serializer = self.get_serializer(video)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ValidationError as e:
            logger.error(f"Validation error during thumbnail save: {e}")
            return Response(
                {'error': f'Validation error: {e}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error during thumbnail save: {e}")
            return Response(
                {'error': 'Internal server error occurred while updating thumbnail'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _validate_thumbnail(self, file):
        """썸네일 파일 유효성 검증"""
        # 파일 크기 제한 (예: 5MB)
        max_size = 5 * 1024 * 1024  # 5MB
        if file.size > max_size:
            logger.error(f"File too large: {file.size} bytes")
            return False

        # 허용된 파일 형식 검증
        allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if hasattr(file, 'content_type') and file.content_type not in allowed_types:
            logger.error(f"Invalid file type: {file.content_type}")
            return False

        # 파일 확장자 검증 (추가 보안)
        allowed_extensions = ['.jpg', '.jpeg', '.png', '.webp']
        if hasattr(file, 'name') and file.name:
            extension = file.name.lower().split('.')[-1]
            if f'.{extension}' not in allowed_extensions:
                logger.error(f"Invalid file extension: {extension}")
                return False

        return True
