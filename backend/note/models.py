from pyexpat import model
from django.db import models
from django.conf import settings

# Create your models here.


class Note(models.Model):
    INFO = "info"
    SUCCESS = "success"
    WARNING = "warning"
    DANGER = "danger"
    ERROR = "error"

    COLOR_CHOICES = (
        (INFO, "info"),
        (SUCCESS, "success"),
        (WARNING, "warning"),
        (DANGER, "danger"),
        (ERROR, "error"),
    )

    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)
    color = models.CharField(max_length=10, choices=COLOR_CHOICES,
                             default=SUCCESS)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True,
                             on_delete=models.SET_NULL, related_name='notes')

    def __str__(self):
        return self.title


class Image(models.Model):
    image = models.ImageField(upload_to='note/images/')
    # note = models.ForeignKey(
    #     Note, related_name="note_images", on_delete=models.CASCADE)
