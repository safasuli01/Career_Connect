from rest_framework import serializers
from .models import User, IndividualProfile, CompanyProfile

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    # uncomment the validate method if you want to perform password checks or validations.
    # def validate(self, attrs):
    #     if attrs['password'] != attrs['password2']:
    #         raise serializers.ValidationError({"password": "Password fields didn't match."})
    #     return attrs

# IndividualProfile Serializer
class IndividualProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = IndividualProfile
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

# CompanyProfile Serializer
class CompanyProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CompanyProfile
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

# Password Reset Serializer
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
