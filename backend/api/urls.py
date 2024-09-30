from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Custom token view
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh view
<<<<<<< HEAD
    path('register/', views.RegisterView.as_view(), name='auth_register'),  # User registration
    path('dashboard/', views.dashboard, name='dashboard'),  # Authenticated user dashboard
    ###
    path('apply/<int:post_id>/', views.ApplicationCreateView.as_view(), name='apply_to_post'),
    path('my-applications/', views.ApplicationListView.as_view(), name='my_applications'),
    path('post/<int:post_id>/applications/', views.PostApplicationListView.as_view(), name='post_applications'),
    path('application/<int:pk>/update/', views.ApplicationStatusUpdateView.as_view(), name='update_application_status'),
=======
    path('user/register/', views.RegisterView.as_view(), name='user_register'),  # User registration
    path('user/profile/<user_id>/', views.ProfileView.as_view(), name='user_register'),  # User profile

    # path('dashboard/', views.dashboard, name='dashboard'),  # Authenticated user dashboard
    # path('company/dashboard/', views.company_dashboard, name='company_dashboard'),  # Company-specific dashboard
    # path('user/dashboard/post-create/', views.DashboardPostCreateAPIView.as_view()),
    # path('user/dashboard/post-edit/<user_id>/<post_id/', views.DashboardPostEditAPIView.as_view()),
>>>>>>> 30cb4ef1 (debug)
]
