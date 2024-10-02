from rest_framework.viewsets import ModelViewSet
from posts.models import Job, Project  # Absolute import for Job and Project
from .serializers import JobSerializer, ProjectSerializer

class JobViewSet(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
