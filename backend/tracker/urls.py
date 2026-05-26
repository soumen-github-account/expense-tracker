from rest_framework.routers import DefaultRouter
from .views import TrackDataViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'trackdata', TrackDataViewSet, basename="trackdata")

urlpatterns = [
    path('', include(router.urls)),
]
