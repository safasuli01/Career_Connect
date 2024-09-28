from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Custom token view
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh view
    path('register/', views.RegisterView.as_view(), name='auth_register'),  # User registration
    path('dashboard/', views.dashboard, name='dashboard'),  # Authenticated user dashboard
    ###
    path('apply/<int:post_id>/', views.ApplicationCreateView.as_view(), name='apply_to_post'),
    path('my-applications/', views.ApplicationListView.as_view(), name='my_applications'),
    path('post/<int:post_id>/applications/', views.PostApplicationListView.as_view(), name='post_applications'),
    path('application/<int:pk>/update/', views.ApplicationStatusUpdateView.as_view(), name='update_application_status'),
]
