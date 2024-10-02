from django.urls import path
from .views import *

urlpatterns = [
    # Client URLs for Projects
    path('client/projects/', ClientProjectListView.as_view(), name='client_project_list'),
    path('client/projects/add/', ClientProjectCreateView.as_view(), name='client_project_create'),
    path('client/projects/edit/<int:pk>/', ClientProjectUpdateView.as_view(), name='client_project_edit'),
    path('client/projects/delete/<int:pk>/', ClientProjectDeleteView.as_view(), name='client_project_delete'),
    # Company URLs for Jobs
    path('company/jobs/', CompanyJobListView.as_view(), name='company_job_list'),
    path('company/jobs/add/', CompanyJobCreateView.as_view(), name='company_job_create'),
    path('company/jobs/edit/<int:pk>/', CompanyJobUpdateView.as_view(), name='company_job_edit'),
    path('company/jobs/delete/<int:pk>/', CompanyJobDeleteView.as_view(), name='company_job_delete'),
]