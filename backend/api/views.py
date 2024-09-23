from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from  .serializers import UserSerializers, PostSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post

# Create your views here.
class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # Get the current logged-in user
        return Post.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]



