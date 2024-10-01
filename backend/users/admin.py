from django.contrib import admin
from .models import User, IndividualProfile, CompanyProfile

# Admin for IndividualProfile
class IndividualProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'specialization')  # Add relevant fields for IndividualProfile
    search_fields = ('user__first_name', 'user__last_name', 'specialization')
    list_filter = ('account_type', 'gender')  # Filter options for account type and gender

# Admin for CompanyProfile
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'industry', 'company_type')  # Add relevant fields for CompanyProfile
    search_fields = ('user__first_name', 'user__last_name', 'location', 'industry')
    list_filter = ('location', 'industry', 'company_type')  # Filter options for industry and company type

# Register the models with their respective admin classes
admin.site.register(IndividualProfile, IndividualProfileAdmin)
admin.site.register(CompanyProfile, CompanyProfileAdmin)
