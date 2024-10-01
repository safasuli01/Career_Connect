from django.db import models
from django.utils.text import slugify

# Create your models here.
class Post(models.Model):
    POST_TYPE_CHOICES = [
        ('job', 'Job'),
        ('project', 'Project'),
    ]
    STATUS = (
        ("active", "Active"),
        ("expired", "Expired"),
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    industry = models.CharField(max_length=100, blank=True, null=True)
    # author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_posts')
    post_status = models.CharField(max_length=100, choices=STATUS, default="Active")
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.slug

    class Meta:
        abstract = True  # This makes the model an abstract class, no DB table will be created


class Job(Post):
    JOB_TYPE_CHOICES = [
        ('part_time', 'Part Time'),
        ('full_time', 'Full Time'),
        ('remote', 'Remote'),
    ]
    def save(self, *args, **kwargs):
        self.post_type = 'job'  # Ensures post_type is always 'job' for this model
        super().save(*args, **kwargs)

    job_type = models.CharField(max_length=10, choices=JOB_TYPE_CHOICES, blank=True, null=True)


class Project(Post):
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.post_type = 'project'  # Ensures post_type is always 'project' for this model
        super().save(*args, **kwargs)