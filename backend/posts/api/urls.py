from rest_framework.routers import DefaultRouter
from .views import JobViewSet, ProjectViewSet

post_router = DefaultRouter()
post_router.register(r'jobs', JobViewSet)
post_router.register(r'projects', ProjectViewSet)

urlpatterns = post_router.urls
