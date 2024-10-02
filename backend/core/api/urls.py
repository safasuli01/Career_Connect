from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from dashboard.api.urls import dashboard_router
from django.urls import path, include


router = DefaultRouter()
# posts
router.registry.extend(post_router.registry)
# dashboard
router.registry.extend(dashboard_router.registry)

urlpatterns = [
    path('', include(router.urls))
]