from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, ImageUploadView


app_name = "note"

router = DefaultRouter()
router.register(r'note', NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload-noteimage/', ImageUploadView.as_view(), name='upload-noteimage'),
]
