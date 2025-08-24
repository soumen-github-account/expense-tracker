from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import signup, get_user

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='login'),   # login with JWT
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh access token
    path('me/', get_user, name='get_user')
    # path('logout/', logout, name='logout'),  # your custom logout view
]