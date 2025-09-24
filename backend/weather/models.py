from django.db import models

# Create your models here.


class WeatherPosition(models.Model):
    country = models.CharField(max_length=20)
    lat = models.FloatField()
    lon = models.FloatField()
    name = models.CharField(max_length=20)
    local_name = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
