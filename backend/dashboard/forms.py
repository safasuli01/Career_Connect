from django import forms
from ..users.models import User
from ..posts.models import Job, Project

class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'description', 'industry', 'job_type', 'location', 'post_status']

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'industry', 'budget', 'deadline', 'location', 'post_status']

