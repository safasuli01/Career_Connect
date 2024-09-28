from django.contrib import admin
from .models import User, Profile, Post
####
from .models import Application

# Admin for User Model
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'get_user_type', 'get_verified']
    # list_filter = ['profile__user_type', 'profile__verified']
    search_fields = ['username', 'email']

    def get_user_type(self, obj):
        return obj.profile.user_type

    get_user_type.short_description = 'User Type'

    def get_verified(self, obj):
        return obj.profile.verified

    get_verified.short_description = 'Verified'

    # Action to approve user
    def approve_user(self, request, queryset):
        for user in queryset:
            user.profile.verified = True
            user.profile.save()

    approve_user.short_description = 'Mark selected users as verified'
    actions = [approve_user]


admin.site.register(User, UserAdmin)


# Admin for Profile Model
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'get_email', 'user_type', 'client_based']


    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

    # Override get_form to conditionally display client_based field
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if obj and obj.user_type != 'company':
            form.base_fields.pop('client_based', None)
        return form


admin.site.register(Profile, ProfileAdmin)

# Admin for Post Model
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'post_type', 'author', 'location', 'job_type', 'industry', 'created_at']
    list_filter = ['post_type', 'job_type', 'industry', 'created_at']
    search_fields = ['title', 'description', 'location', 'author__username']

    # Optionally add actions or custom methods for post management

admin.site.register(Post, PostAdmin)

# Application Admin:
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['applicant', 'post', 'status', 'applied_at']
    list_filter = ['status', 'applied_at']
    search_fields = ['applicant__username', 'post__title']

admin.site.register(Application, ApplicationAdmin)