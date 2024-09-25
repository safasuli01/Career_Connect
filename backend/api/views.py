from django.shortcuts import render
from rest_framework.response import Response
from .models import User, Profile
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer



class IsVerifiedCompany(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'company' and request.user.is_verified

@api_view(['GET'])
@permission_classes([IsVerifiedCompany])
def company_dashboard(request):
    return Response({'message': 'Welcome to the company dashboard!'}, status=200)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        context = f"Hey {request.user}, you are seeing a GET request"
        return Response({'response': context}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        context = "Hello Post"
        return Response({'response': context}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
