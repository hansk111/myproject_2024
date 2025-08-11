from django.contrib import admin
from .models import UserAccount, Profile

# Register your models here.


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = "Profile"


class UserAccountAdmin(admin.ModelAdmin):
    field = ('email', 'last_name', 'first_name', 'is_staff', 'is_active')
    list_display = ('email', 'last_name', 'first_name',
                    'is_staff', 'is_active')


class ProfileAdmin(admin.ModelAdmin):
    field = ('id', 'user', 'image')
    list_display = ('id', 'user', 'image')


admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(Profile, ProfileAdmin)
