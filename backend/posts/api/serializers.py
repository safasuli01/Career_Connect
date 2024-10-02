from rest_framework import serializers
from ..models import Post, Job, Project


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        # fields= ['author', 'post_type', 'city', 'street', 'slug', 'industry']
        fields = '__all__'


class JobSerializer(PostSerializer):
    class Meta:
        model = Job
        # fields = PostSerializer.Meta.fields + ['job_type']  # Job-specific fields
        fields = '__all__'


class ProjectSerializer(PostSerializer):
    class Meta(PostSerializer.Meta):
        model = Project
        # fields = PostSerializer.Meta.fields + ['budget', 'deadline']  # Project-specific fields
        fields = '__all__'


