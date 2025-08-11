from .views import CustomTokenObtainPairView, CustomTokenRefreshView, CustomTokenVerifyView, LogoutView, CustomProviderAuthView, ProfileList, ProfileRetrieveUpdateDestroyAPIView, UserAvatarAPIView
from django.urls import path, re_path


urlpatterns = [
    path('jwt/create/', CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('jwt/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),
    path('logout/', LogoutView.as_view()),
    re_path(r'^o/(?P<provider>\S+)/$',
            CustomProviderAuthView.as_view(), name='provider-auth'),

    # path('useraccounts/', useraccount_list),
    path('profiles/', ProfileList.as_view()),
    path('profiles/<int:pk>/', ProfileRetrieveUpdateDestroyAPIView.as_view()),

    path('users/profile/avatar/', UserAvatarAPIView.as_view(), name="user-avatar"),

]
