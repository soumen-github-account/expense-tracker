from rest_framework.routers import DefaultRouter
from .views import TrackDataViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'trackdata', TrackDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
