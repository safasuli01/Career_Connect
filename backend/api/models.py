from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser

# User Model
class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username


# Profile Model
class Profile(models.Model):
    USER_TYPE_CHOICES = [
        ('company', 'Company'),
        ('individual', 'Individual'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=500)
    last_name = models.CharField(max_length=500)
    address = models.CharField(max_length=1000, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    approval_document = models.FileField(upload_to='company_documents/', blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='individual')

    # Company-specific fields
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_website = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}" if self.first_name and self.last_name else self.user.username

    # Signals for profile creation
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    post_save.connect(create_user_profile, sender=User)
