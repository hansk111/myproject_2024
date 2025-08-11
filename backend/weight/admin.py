from django.contrib import admin
from .models import Mybodydata


class MybodydataAdmin(admin.ModelAdmin):
    field = ('id', 'height', 'weight', 'smi', 'bodyfat',
             'bodywater', 'bmr', 'bmi', 'createdAt', 'user')
    list_display = ('id', 'height', 'weight', 'smi', 'bodyfat',
                    'bodywater', 'bmr', 'bmi', 'createdAt', 'user')


admin.site.register(Mybodydata, MybodydataAdmin)
