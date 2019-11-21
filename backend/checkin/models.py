from django.db import models

# Create your models here.

class Checkin(models.Model):
    name = models.CharField(max_length=30)
    PID = models.CharField(max_length=9)
    date = models.DateField(blank=True)           # YYYY-MM-DD format
    timeIn = models.TimeField()         # HH:MM[:ss[.uuuuuu]] format
    timeOut = models.TimeField(blank=True)        # HH:MM[:ss[.uuuuuu]] format
    reason = models.TextField()
    checkedIn = models.BooleanField(default=False)
    staff = models.CharField(max_length=150, blank=True)
    comments = models.TextField(blank=True)

    def _str_(self):
        return self.name
