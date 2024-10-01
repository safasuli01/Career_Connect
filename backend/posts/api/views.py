from rest_framework import viewsets
from ..models import Job, Project
from .serializers import JobSerializer, ProjectSerializer

# class PostViewSet(viewsets.ModelViewSet):
#     def get_queryset(self):
#         # Return the queryset depending on the request or other criteria.
#         post_type = self.request.query_params.get('post_type')
#
#         if post_type == 'job':
#             return Job.objects.all()
#         elif post_type == 'project':
#             return Project.objects.all()
#         else:
#             # You could return both types or raise an error
#             return Job.objects.none()  # Or some custom handling
#
#     def get_serializer_class(self):
#         """
#         Return the serializer class depending on the post_type.
#         """
#         post_type = self.request.query_params.get('post_type')
#
#         if post_type == 'job':
#             return JobSerializer
#         elif post_type == 'project':
#             return ProjectSerializer
#         return super().get_serializer_class()  # Default behavior

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
