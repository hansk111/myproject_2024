from django.db import models

# Create your models here.


class BusStop(models.Model):
    stationId = models.CharField(max_length=20, unique=True)
    stationName = models.CharField(max_length=50)
    x = models.FloatField()
    y = models.FloatField()
    mobileNo = models.CharField(max_length=50)
    regionName = models.CharField(max_length=20)
    centerYn = models.CharField(max_length=50)
    distance = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.stationName
