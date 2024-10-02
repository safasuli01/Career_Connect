from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.contrib.auth.decorators import  login_required
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from  ..users.models import User
from  ..posts.models import Job, Project
from  .forms import JobForm, ProjectForm
# Create your views here.

# Client Dashboard
class ClientProjectListView(ListView):
    model = Project
    template_name = 'dashboard/client_project_list.html'
    context_object_name = 'projects'

    def get_queryset(self):
        return Project.objects.filter(author=self.request.user)

class ClientProjectCreateView(CreateView):
    model = Project
    form_class = ProjectForm
    template_name = 'dashboard/client_project_form.htm'
    success_url = reverse_lazy('client_project_list')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

class ClientProjectUpdateView(UpdateView):
    model = Project
    form_class = ProjectForm
    template_name = 'dashboard/client_project_form.htm'
    success_url = reverse_lazy('client_project_list')

class ClientProjectDeleteView(DeleteView):
    model = Project
    template_name = 'dashboard/client_project_confirm_delete.html'
    success_url = reverse_lazy('client_project_list')

#Company Dashboard
class CompanyJobListView(ListView):
    model = Job
    template_name = 'dashboard/company_job_list.html'
    context_object_name = 'jobs'

    def get_queryset(self):
        return Job.objects.filter(author=self.request.user)


class CompanyJobCreateView(CreateView):
    model = Job
    form_class = JobForm
    template_name = 'dashboard/company_job_form.htm'
    success_url = reverse_lazy('company_job_list')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class CompanyJobUpdateView(UpdateView):
    model = Job
    form_class = JobForm
    template_name = 'dashboard/company_job_form.htm'
    success_url = reverse_lazy('company_job_list')


class CompanyJobDeleteView(DeleteView):
    model = Job
    template_name = 'dashboard/company_job_confirm_delete.html'
    success_url = reverse_lazy('company_job_list')

###Note:
# ClientProjectListView: Lists all projects for the logged-in client user.
# ClientProjectCreateView: Allows clients to create new projects.
# ClientProjectUpdateView: Allows clients to edit their projects.
# ClientProjectDeleteView: Allows clients to delete their projects.
# Similar views are created for CompanyJobListView, CompanyJobCreateView, CompanyJobUpdateView, and CompanyJobDeleteView for managing jobs.