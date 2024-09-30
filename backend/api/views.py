from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.db.models import Sum
# Restframework
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.decorators import api_view, permission_classes
<<<<<<< HEAD
###
from .models import Application, Post
from .serializers import ApplicationSerializer
=======
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime

# Others
import json
import random

# Custom Imports
from . import serializers as api_serializer
from . import models as api_models


>>>>>>> 30cb4ef1 (debug)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = api_models.User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.RegisterSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (AllowAny)
    serializer_class = api_serializer.ProfileSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)
        profile = api_models.Profile.objects.get(user=user)
        return profile

class IsVerifiedCompany(BasePermission):
    def has_permission(self, request, view):
        # Ensure user is authenticated, user type is 'company', and the company is verified
        return (
            request.user.is_authenticated and
            request.user.profile.user_type == 'company' and
            getattr(request.user.profile, 'is_verified', False)
        )

@api_view(['GET'])
@permission_classes([IsVerifiedCompany])
def company_dashboard(request):
    return Response({'message': 'Welcome to the company dashboard!'}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        context = f"Hey {request.user.username}, you are seeing a GET request"
        return Response({'response': context}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        context = "Hello Post"
        return Response({'response': context}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)

<<<<<<< HEAD
#Applying to job or project:
class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        post_id = self.kwargs.get('post_id')
        post = Post.objects.get(id=post_id)
        
        if post.author == request.user:
            return Response({'detail': 'You can not apply to your post'}, status=status.HTTP_400_BAD_REQUEST) 
        
        if Application.objects.filter(application=request.user, post=post).exists():
            return Response({'detail':'You can not apply twice to the same job'}, status=status.HTTP_400_BAD_REQUEST)
        
        return self.create(request, *args, **kwargs)
    
#View for the applicants to see their own Application:
class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Application.objects.filter(applicant=self.request.user)
    
# View for post authors to manage applications:
class PostApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        post = Post.objects.get(id=post_id)
        
        if post.author != self.request.user:
            return Application.objects.none()

        return Application.objects.filter(post=post)

# View to update application status (for the post author)
class ApplicationStatusUpdateView(generics.UpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(post__author=self.request.user)
    
=======
# # # User Dashboard APIs
# # class DashboardStats(generics.ListAPIView):
# #     serializer_class = api_serializer.UserSerializer
# #     permission_classes = [AllowAny]
# #
# #     def get_queryset(self):
# #         user_id = self.kwargs['user_id']
# #         user = api_models.User.objects.get(id=user_id)
# #         posts = api_models.Post.objects.filter(user=user).count()
# #
# #         return [{
# #             "posts": posts,
# #         }]
# #
# #     def list(self, request, *args, **kwargs):
# #         querset = self.get_queryset()
# #         serializer = self.get_serializer(querset, many=True)
# #         return Response(serializer.data)
# #
# # class DashboardPostCreateAPIView(generics.CreateAPIView):
# #     serializer_class = api_serializer.PostSerializer
# #     permission_classes = [AllowAny]
# #
# #     def create(self, request, *args, **kwargs):
# #         print(request.data)
# #         author = request.data.get('author')
# #         title = request.data.get('title')
# #         image = request.data.get('image')
# #         description = request.data.get('description')
# #         post_type = request.data.get('post_type')
# #         job_type = request.data.get('job_type')
# #         status = request.data.get('status')
# #         deadline = request.data.get('deadline')
# #         budget = request.data.get('budget')
# #         location = request.data.get('location')
# #         industry = request.data.get('industry')
# #
# #
# #         print(author)
# #         print(title)
# #         print(image)
# #         print(description)
# #         print(post_type)
# #         print(job_type)
# #         print(status)
# #         print(deadline)
# #         print(budget)
# #         print(location)
# #         print(industry)
# #
# #
# #         user = api_models.User.objects.get(id=author)
# #
# #         post = api_models.Post.objects.create(
# #             author=author,
# #             title=title,
# #             image=image,
# #             description=description,
# #             post_type=post_type,
# #             job_type=job_type,
# #             status=status,
# #             deadline= deadline,
# #             budget=budget,
# #             location=location,
# #             industry=industry,
# #
# #         )
# #
# #         return Response({"message": "Post Created Successfully"}, status=status.HTTP_201_CREATED)
# # class DashboardPostEditAPIView(generics.RetrieveUpdateDestroyAPIView):
# #     serializer_class = api_serializer.PostSerializer
# #     permission_classes = [AllowAny]
# #
# #     def get_object(self):
# #         user_id = self.kwargs['user_id']
# #         post_id = self.kwargs['post_id']
# #         user = api_models.User.objects.get(id=user_id)
# #         return api_models.Post.objects.get(user=user, id=post_id)
# #
# #     def update(self, request, *args, **kwargs):
# #         post_instance = self.get_object()
# #
# #         author = request.data.get('author')
# #         title = request.data.get('title')
# #         image = request.data.get('image')
# #         description = request.data.get('description')
# #         post_type = request.data.get('post_type')
# #         job_type = request.data.get('job_type')
# #         status = request.data.get('status')
# #         deadline = request.data.get('deadline')
# #         budget = request.data.get('budget')
# #         location = request.data.get('location')
# #         industry = request.data.get('industry')
# #
# #         post_instance.title = title
# #         if image != "undefined":
# #             post_instance.image = image
# #         post_instance.description = description
# #         post_instance.post_type = post_type
# #         post_instance.job_type = job_type
# #         post_instance.status = status
# #         post_instance.industry = industry
# #         post_instance.location = location
# #         post_instance.budget = budget
# #         post_instance.deadline = deadline
# #         post_instance.save()
# #
# #         return Response({"message": "Post Updated Successfully"}, status=status.HTTP_200_OK)
>>>>>>> 30cb4ef1 (debug)
