from django.contrib import admin
from .models import User, Profile


# Admin for User Model
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'get_user_type', 'get_verified']
    list_filter = ['profile__user_type', 'profile__verified']
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
    list_display = ['user', 'get_email', 'user_type']


    def get_email(self, obj):
        return obj.user.email

    get_email.short_description = 'Email'


admin.site.register(Profile, ProfileAdmin)
