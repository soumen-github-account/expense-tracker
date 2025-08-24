from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password :
        return Response({"success": False, "message": "All fields are required"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"success": False, "message": "Email already registered"}, status=400)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password) 
    )

    refresh = RefreshToken.for_user(user)

    return Response({
        "success": True,
        "message": "User registered successfully",
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "success": True,
            "message": "Login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    else:
        return Response(
            {"success": False, "message": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })

