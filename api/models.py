from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Stock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stocks")
    symbol = models.CharField(max_length=10)

    class Meta:
        # This ensures a user cannot add the same stock symbol twice
        unique_together = ('user', 'symbol')

    def __str__(self):
        return f"{self.user.username} - {self.symbol}"