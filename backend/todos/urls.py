from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

# DefaultRouter 인스턴스 생성
router = DefaultRouter()
# TodoViewSet을 '/todos' URL 경로와 연결하여 등록
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = [
    # router에 의해 자동 생성된 URL들을 포함
    path('', include(router.urls)),
]
