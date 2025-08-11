from django.contrib import admin

from .models import Category, Comment, Post


class PostAdmin(admin.ModelAdmin):
    field = ('id', 'title', 'author', 'coverImg', 'featured')
    list_display = ('id', 'title', 'author', 'coverImg', 'featured')


class CategoryAdmin(admin.ModelAdmin):
    field = ('id', 'name')
    list_display = ('id', 'name')


admin.site.register(Category, CategoryAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
