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
        token['user_type'] = user.profile.user_type
        token['date_of_birth'] = user.profile.user.date_of_birth
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    user_type = serializers.ChoiceField(choices=Profile.USER_TYPE_CHOICES, required=True)
    approval_document = serializers.FileField(required=False)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2', 'user_type', 'approval_document')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        if attrs['user_type'] == 'company' and 'approval_document' not in attrs:
            raise serializers.ValidationError(
                {"approval_document": "Company users must upload a document for approval."})

        return attrs

    def create(self, validated_data):
        approval_document = validated_data.pop('approval_document', None)
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        # Create the associated profile
        profile = Profile.objects.create(
            user=user,
            user_type=validated_data['user_type'],
            approval_document=approval_document,
            full_name=validated_data['username']
        )

        return user
