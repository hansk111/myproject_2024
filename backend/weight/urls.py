from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import MybodydataViewSet

app_name = "weight"

router = DefaultRouter()
router.register(r"weight", MybodydataViewSet)

urlpatterns = [
    path("", include(router.urls)),
    # path('weather/', weather, name='weather'),
]
