from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from .views import ImageUploadView, CategoryViewSet, CommentViewSet, ReplyViewSet, LikePostAPIView, PostViewSet

app_name = "posts"

router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"comment", CommentViewSet)
router.register(r"reply", ReplyViewSet)
router.register(r"post", PostViewSet)

urlpatterns = [
    # re_path(r'^upload_image$', views.upload_image, name='upload_image'),
    path("", include(router.urls)),
    path('upload-postimage/', ImageUploadView.as_view(), name='upload-postimage'),
]
