from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)



# Phone number validation
validate_phone_validator = RegexValidator(
    regex=r'^01[0-2,5]{1}[0-9]{8}$',
    message="This is not a valid Egyptian phone number."
)

# Shared BaseProfile Model
class Profile(models.Model):
    USER_TYPE_CHOICES = [
        ('company', 'Company'),
        ('individual', 'Individual'),
    ]

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]


    ACCOUNT_TYPE_CHOICES = [
        ('hiring', 'Hiring'),
        ('seeking', 'Seeking'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=11, validators=[validate_phone_validator], blank=True, null=True)
    profile_image = models.ImageField(upload_to="user_images", default="default.jpg")
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES , default='individual')

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}" if self.user.first_name and self.user.last_name else self.user.email


# IndividualProfile Model
class IndividualProfile(Profile):
    ACCOUNT_TYPE_CHOICES = [
        ('hiring', 'Hiring'),
        ('seeking', 'Seeking'),
    ]
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPE_CHOICES, default='seeking')
    specialization = models.CharField(max_length=300, blank=True, null=True)
    id_number = models.CharField(max_length=14, blank=True, null=True, unique=True)


# CompanyProfile Model
class CompanyProfile(Profile):
    location = models.CharField(max_length=500, blank=True, null=True)
    registration_number = models.CharField(max_length=100, blank=True, null=True)
    registration_document = models.FileField(upload_to='company_documents/', blank=True, null=True)
    logo = models.ImageField(upload_to="company_logos", blank=True, null=True)
    industry = models.CharField(max_length=255, blank=True, null=True)
    company_type = models.BooleanField(default=False, help_text="Select if the company is client based or not .")


# Signals to create profiles
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.profile.user_type == 'company':
            CompanyProfile.objects.create(user=instance)
        else:
            IndividualProfile.objects.create(user=instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
