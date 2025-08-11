from django.urls import include, path
from rest_framework import routers
from .views import QuestionAnswerViewSet, ChatSessionViewSet


app_name = "chat"

router = routers.DefaultRouter()
router.register(r'chat', QuestionAnswerViewSet)
router.register(r'session', ChatSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
