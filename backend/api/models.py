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
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=1000, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    approval_document = models.FileField(upload_to='company_documents/', blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='individual')


    # Company-specific fields
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_website = models.URLField(blank=True, null=True)
    client_based = models.BooleanField(default=False, help_text="Is this company client-based?")


    def __str__(self):
        return f"{self.first_name} {self.last_name}" if self.first_name and self.last_name else self.user.username

    # Signals for profile creation
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    post_save.connect(create_user_profile, sender=User)


# Post Model
class Post(models.Model):
    POST_TYPE_CHOICES = [
        ('job', 'Job'),
        ('project', 'Project'),
    ]

    JOB_TYPE_CHOICES = [
        ('part_time', 'Part Time'),
        ('full_time', 'Full Time'),
        ('remote', 'Remote'),
    ]

    # Post general fields
    post_type = models.CharField(max_length=10, choices=POST_TYPE_CHOICES)  # New field to distinguish between job and project
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    industry = models.CharField(max_length=100, blank=True, null=True)  # Industry might be relevant for jobs
    job_type = models.CharField(max_length=10, choices=JOB_TYPE_CHOICES, blank=True, null=True)  # Only for job postings
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Only for project postings
    deadline = models.DateField(blank=True, null=True)  # Only for project postings
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_post_type_display()})"

    # Customizing save method to make sure  that only relevant fields are set
    def save(self, *args, **kwargs):
        if self.post_type == 'job':
            self.budget = None  # Budget should be cleared if it's a job post
            self.deadline = None  # Deadline should be cleared if it's a job post
        elif self.post_type == 'project':
            self.job_type = None  # Job type should be cleared if it's a project post
            self.industry = None  # Industry should be cleared if it's a project post
        super().save(*args, **kwargs)

#Application Model:
class Application(models.Model):    
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('under_review','Under Review'),
        ('accepted','Accepted'),
        ('rejected', 'Rejected'),
    ]
    
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    cover_letter = models.TextField(blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"{self.applicant.username} - {self.post.title} ({self.status}) "
    