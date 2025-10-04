from django.contrib import admin
from django.urls import path
from django.urls import include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenBlacklistView


from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="SmartHAN API",
        default_version='v1',
        description="SmartHAN API description",
        terms_of_service="https://smarthan.store/policies/terms/",
        contact=openapi.Contact(email="smarthan@smarthan.site"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('djoser.urls')),
    path('api/', include('users.urls')),
    path('api/', include('chat.urls')),
    path('api/', include('note.urls')),
    path('api/', include('posts.urls')),
    path('api/', include('weight.urls')),
    path('api/', include('todos.urls')),  # 'api/' 경로로 todos 앱의 URL 포함
    path('api/', include('bus.urls')),
    path('api/', include('video.urls')),
    path('api/', include('weather.urls')),

    path('api/token/blacklist/', TokenBlacklistView.as_view(),
         name='token_blacklist'),
    # path("api/post/", include("posts.urls", namespace="posts")),
    # path("api/note/", include("note.urls", namespace="note")),
    # path("api-auth/", include("rest_framework.urls", namespace='rest_framework')),
    path("api/", include("rest_framework.urls", namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += [
        path('swagger<format>/', schema_view.without_ui(cache_timeout=0),
             name='schema-json'),
        path('swagger/', schema_view.with_ui('swagger',
             cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc',
             cache_timeout=0), name='schema-redoc'),
    ]
