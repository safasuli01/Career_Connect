from .models import User, Profile, Post
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
###
from .models import Post, Application




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Custom claims
        token['name'] = user.profile.name
        token['username'] = user.username
        token['email'] = user.email
        # token['street'] = user.profile.street
        # token['city'] = user.profile.city
        # token['image'] = str(user.profile.image)
        # token['phone_number'] = user.profile.phone_number
        # token['user_type'] = user.profile.user_type
        # token['date_of_birth'] = user.profile.date_of_birth
        # token['company_name'] = user.profile.company_name if user.profile.user_type == 'company' else None
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # user_type = serializers.ChoiceField(choices=Profile.USER_TYPE_CHOICES, required=True)
    # approval_document = serializers.FileField(required=False)

    # Additional fields from Profile
    # name = serializers.CharField(required=True)
    # date_of_birth = serializers.DateField(required=False)
    # street = serializers.CharField(required=False)
    # city = serializers.CharField(required=False)
    # phone_number = serializers.CharField(required=False)
    # image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('email', 'name', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        # if attrs['user_type'] == 'company' and 'approval_document' not in attrs:
        #     raise serializers.ValidationError(
        #         {"approval_document": "Company users must upload a document for approval."})
        #
        return attrs

    def create(self, validated_data):
        # approval_document = validated_data.pop('approval_document', None)
        # user_type = validated_data.pop('user_type')

        # User creation
        user = User.objects.create(
            name=validated_data['name'],
            email=validated_data['email'],
        )
        email_username, rest_of_email = user.email.split('@')
        user.username = email_username

        user.set_password(validated_data['password'])
        user.save()
        #
        # # Check if profile already exists
        # profile, created = Profile.objects.get_or_create(
        #     user=user,
        #     defaults={
        #         'user_type': user_type,
        #         'date_of_birth': validated_data.get('date_of_birth'),
        #         'city': validated_data.get('city'),
        #         'street': validated_data.get('street'),
        #         'phone_number': validated_data.get('phone_number'),
        #         'name': validated_data.get('name'),
        #         'profile_image': validated_data.get('profile_image'),  # Adjust field name
        #     }
        # )
        #
        # if user_type == 'company' and created:
        #     profile.name = validated_data.get('name')
        #     profile.save()

        return user

<<<<<<< HEAD
#ApplicationSerializer
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'applicant', 'post', 'status', 'resume', 'cover_letter', 'applied_at']
        read_only_fields = ['applicant', 'applied_at']

    def create(self, validated_data):
        user = self.context['request'].user
        application = Application.objects.create(applicant=user, **validated_data)
        return application
=======
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'
#
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})
#         #
#         # if attrs['user_type'] == 'company' and 'approval_document' not in attrs:
#         #     raise serializers.ValidationError(
#         #         {"approval_document": "Company users must upload a document for approval."})
#
#         return attrs

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = [
#             'id',
#             'author',
#             'post_type',
#             'title',
#             'description',
#             'location',
#             'industry',
#             'job_type',
#             'budget',
#             'deadline',
#             'created_at',
#             'slug',
#             'status',
#         ]
#         read_only_fields = ['slug', 'created_at']
#
#     # Optionally, you can override the validate method for custom validations
#     def validate(self, data):
#         if data['post_type'] == 'job' and (data.get('budget') or data.get('deadline')):
#             raise serializers.ValidationError("Job posts cannot have a budget or deadline.")
#         if data['post_type'] == 'project' and (data.get('job_type') or data.get('industry')):
#             raise serializers.ValidationError("Project posts cannot have a job type or industry.")
#         return data
>>>>>>> 30cb4ef1 (debug)
