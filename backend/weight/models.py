from django.db import models
from django.conf import settings


class Mybodydata(models.Model):

    weight = models.FloatField(default=71.0)
    height = models.FloatField(default=172.0)
    smi = models.FloatField(default=28.0)
    bodyfat = models.FloatField(default=18.0)
    bodywater = models.FloatField(default=40.0)
    bmr = models.FloatField()
    bmi = models.FloatField(default=25)
    createdAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="bodydata",
        null=True,
        on_delete=models.SET_NULL,
    )

    class Meta:
        ordering = ("createdAt",)
