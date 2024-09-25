from .models import User, Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        if attrs['user_type'] == 'company' and 'approval_document' not in attrs:
            raise serializers.ValidationError(
                {"approval_document": "Company users must upload a document for approval."})

        return attrs


#create token only if a valid username & password is provided
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # These are claims, you can add custom claims
        token['first_name'] = user.profile.first_name
        token['last_name'] = user.profile.last_name
        token['username'] = user.username
        token['email'] = user.email
        token['address'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['phone_number'] = user.profile.verified
        token['user_type'] = user.profile.user_type  # Add user type to token
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    user_type = serializers.ChoiceField(choices=Profile.USER_TYPE_CHOICES, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2', 'user_type')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            approval_document=validated_data.get('approval_document'),
        )

        user.set_password(validated_data['password'])
        user.save()

        # Create the associated profile and assign the user type
        Profile.objects.create(
            user=user,
            user_type=validated_data['user_type'],
            full_name=validated_data['username']  # You can adjust this if needed
        )

        return user
