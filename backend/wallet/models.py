from django.db import models

# Create your models here.
import uuid
from django.contrib.auth.models import User

class Wallet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="wallets",
    )
    name = models.CharField(max_length=100)
    rupee = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=50)  # e.g. Bank, Cash, Card
    transaction = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.type}) - ₹{self.rupee}"
