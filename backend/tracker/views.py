from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import TrackData
from .serializers import TrackDataSerializer

class TrackDataViewSet(viewsets.ModelViewSet):
    queryset = TrackData.objects.all()
    serializer_class = TrackDataSerializer
