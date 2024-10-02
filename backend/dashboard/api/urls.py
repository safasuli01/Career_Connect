from rest_framework.routers import DefaultRouter
from .views import JobViewSet, ProjectViewSet

dashboard_router = DefaultRouter()
dashboard_router.register(r'jobs', JobViewSet)
dashboard_router.register(r'projects', ProjectViewSet)

urlpatterns = dashboard_router.urls
