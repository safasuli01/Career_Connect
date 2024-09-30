import re
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.utils.html import mark_safe
from django.utils.text import slugify
from shortuuid.django_fields import ShortUUIDField
import shortuuid

# User Model
class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=100)
    name = models.CharField(max_length=500)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # Split the email to get the part before the @ symbol
        email_username, rest_of_email = self.email.split("@")

        # Set full_name if it's empty
        if not self.name:
            self.name = email_username

        # Set username if it's empty
        if not self.username:
            self.username = email_username

        # Call the parent class's save() method to handle the actual saving
        super(User, self).save(*args, **kwargs)



# Phone number validation
validate_phone_validator = RegexValidator(
    regex=r'^01[0-2,5]{1}[0-9]{8}$',
    message="This is not a valid Egyptian phone number."
)

# Profile Model
class Profile(models.Model):
    USER_TYPE_CHOICES = [
        ('company', 'Company'),
        ('individual', 'Individual'),
    ]

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    COMPANY_TYPE_CHOICES = [
        ('hiring', 'Hiring'),
        ('seeking', 'Seeking'),
    ]

    ACCOUNT_TYPE_CHOICES = [
        ('hiring', 'Hiring'),
        ('seeking', 'Seeking'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    specialization = models.CharField(max_length=300, blank=True, null=True)
    phone_number = models.CharField(max_length=11, validators=[validate_phone_validator], blank=True, null=True)
    id_number = models.CharField(max_length=14, blank=True, null=True, unique=True)
    profile_image = models.ImageField(upload_to="user_images", default="default.jpg")
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPE_CHOICES, default='seeking')

    # Company-specific fields
    street = models.CharField(max_length=500, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    registration_number = models.CharField(max_length=100, blank=True, null=True)
    registration_document = models.FileField(upload_to='company_documents/', blank=True, null=True)
    logo = models.ImageField(upload_to="company_logos", blank=True, null=True)
    industry = models.CharField(max_length=255, blank=True, null=True)
    company_type = models.CharField(max_length=12, choices=COMPANY_TYPE_CHOICES, default='hiring')
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='individual')


    def __str__(self):
        if self.name:
            return str(self.name)
        else:
            return str(self.user.name)

    def save(self, *args, **kwargs):
        if self.name == "" or self.name is None:
            self.name = self.user.name
        super(Profile, self).save(*args, **kwargs)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

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
    STATUS = (
        ("active", "Active"),
        ("draft", "Draft"),
        ("disabled", "Disabled"),
    )

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_posts')
    post_type = models.CharField(max_length=10, choices=POST_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    city = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    industry = models.CharField(max_length=100, blank=True, null=True)
    job_type = models.CharField(max_length=10, choices=JOB_TYPE_CHOICES, blank=True, null=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, blank=True)
    status = models.CharField(max_length=100, choices=STATUS, default="Active")

    def __str__(self):
        return self.title

    # class Meta:
    #     verbose_name_plural = "Post"
    #     ordering =['date']

    def save(self, *args, **kwargs):
        # Generate slug if it doesn't exist
        if not self.slug:
            self.slug = slugify(self.title)

        # Conditional logic based on post type
        if self.post_type == 'job':
            self.budget = None
            self.deadline = None
        elif self.post_type == 'project':
            self.job_type = None
            self.industry = None

        # Call the parent class's save() method
        super().save(*args, **kwargs)

<<<<<<< HEAD
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
    
=======
>>>>>>> 30cb4ef1 (debug)
