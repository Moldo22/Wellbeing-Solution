import re
from django.utils.timezone import datetime
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView

from Users.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import EmailTokenObtainPairSerializer, RegisterSerializer, UserListSerializer
from rest_framework import generics, status
from rest_framework.response import Response

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT token
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": serializer.data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)


class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserListSerializer(users, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

