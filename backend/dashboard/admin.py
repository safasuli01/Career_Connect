from django.contrib import admin
from .models import DashboardLog, DashboardSetting
# Register your models here.

class DashboardLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'timestamp')  # Display these fields in the admin list view
    search_fields = ('user__email', 'action')  # Search by user email and action
    list_filter = ('timestamp',)  # Filter by the timestamp

class DashboardSettingAdmin(admin.ModelAdmin):
    list_display = ('user', 'theme', 'notifications_enabled')  # Display user, theme, and notification status
    search_fields = ('user__email',)  # Search by user email
    list_filter = ('theme', 'notifications_enabled')  # Filter by theme and notification status

# Register the models with their admin classes
admin.site.register(DashboardLog, DashboardLogAdmin)
admin.site.register(DashboardSetting, DashboardSettingAdmin)
