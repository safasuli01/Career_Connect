from rest_framework import viewsets
from ..models import User, IndividualProfile, CompanyProfile
from .serializers import UserSerializer, IndividualProfileSerializer, CompanyProfileSerializer

# User ViewSet
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# IndividualProfile ViewSet
class IndividualProfileViewSet(viewsets.ModelViewSet):
    queryset = IndividualProfile.objects.all()
    serializer_class = IndividualProfileSerializer

# CompanyProfile ViewSet
class CompanyProfileViewSet(viewsets.ModelViewSet):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
