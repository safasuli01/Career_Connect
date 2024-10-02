from rest_framework.serializers import ModelSerializer
from users.models import User, IndividualProfile, CompanyProfile
from posts.models import Job, Project

# Serializer for User Model
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']

# Serializer for Individual Profile Model
class IndividualProfileSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = IndividualProfile
        fields = ['user', 'account_type', 'specialization', 'id_number', 'gender', 'phone_number']

# Serializer for Company Profile Model
class CompanyProfileSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CompanyProfile
        fields = ['user', 'industry', 'location', 'registration_number', 'logo', 'phone_number']

# Serializer for Job Model
class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'industry', 'job_type', 'location', 'created_at', 'post_status']

# Serializer for Project Model
class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'industry', 'budget', 'deadline', 'location', 'created_at', 'post_status']
