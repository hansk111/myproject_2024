from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet

app_name = "video"

router = DefaultRouter()
router.register(r'video', VideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
