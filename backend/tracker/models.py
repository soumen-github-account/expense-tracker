from django.db import models
import uuid
from django.contrib.auth.models import User
from wallet.models import Wallet

class TrackData(models.Model):
    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expanse', 'Expanse'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tracks"
    )
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    wallet = models.ForeignKey(
        Wallet,
        on_delete=models.CASCADE,
        related_name="transactions"
    )
    category = models.CharField(max_length=100)
    rupee = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.TextField(blank=True, null=True)
    reference_number = models.CharField(max_length=50, blank=True, null=True)  # optional
    time = models.TimeField()
    created_at = models.DateField()

    def __str__(self):
        return f"{self.type} - {self.rupee}"
