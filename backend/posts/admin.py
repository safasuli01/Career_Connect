from django.contrib import admin
from .models import Job, Project

class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'location')  # Add relevant fields for Job
    search_fields = ('title',  'location')
    list_filter = ( 'location', 'job_type', 'industry')  # Filter options for job type and industry

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'budget', 'deadline')  # Add relevant fields for Project
    search_fields = ('title', 'location')
    list_filter = ( 'location', 'industry',)  # Filter options for industry

# Register the concrete models with their respective admin classes
admin.site.register(Job, JobAdmin)
admin.site.register(Project, ProjectAdmin)
