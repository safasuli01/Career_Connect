from rest_framework.routers import DefaultRouter
from .views import UserViewSet, IndividualProfileViewSet, CompanyProfileViewSet

#Router for the user and profile
user_router = DefaultRouter()

user_router.register(r'users', UserViewSet)
user_router.register(r'individual-profiles', IndividualProfileViewSet)
user_router.register(r'company-profiles', CompanyProfileViewSet)

urlpatterns = user_router.urls
