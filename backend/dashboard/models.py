from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class DashboardLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.action} at {self.timestamp}"

class DashboardSetting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    theme = models.CharField(max_length=50, default='light')
    notifications_enabled = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.email} settings"
