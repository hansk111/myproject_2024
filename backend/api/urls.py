from django.urls import path, re_path

from . import views

urlpatterns = [
    #     re_path(r'^$', views.index, name='index'),
    #     path('upload_image/', views.upload_image, name='upload_image'),
    re_path(r'^upload_file$', views.upload_file, name='upload_file'),
    re_path(r'^upload_file_validation', views.upload_file_validation,
            name='upload_file_validation'),
    re_path(r'^upload_image$', views.upload_image, name='upload_image'),
    re_path(r'^upload_image_validation', views.upload_image_validation,
            name='upload_image_validation'),
    re_path(r'^upload_video$', views.upload_video, name='upload_video'),
    re_path(r'^upload_video_validation', views.upload_video_validation,
            name='upload_video_validation'),
    re_path(r'^upload_image_resize', views.upload_image_resize,
            name='upload_image_resize'),
    re_path(r'^delete_file', views.delete_file, name='delete_file'),
    re_path(r'^delete_image', views.delete_image, name='delete_image'),
    re_path(r'^delete_video', views.delete_video, name='delete_video'),
    re_path(r'^load_images', views.load_images, name='load_images'),
    re_path(r'^amazon_hash', views.amazon_hash, name='amazon_hash'),
]
