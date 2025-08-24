from rest_framework import serializers
from decimal import Decimal
from .models import TrackData
from wallet.models import Wallet

class TrackDataSerializer(serializers.ModelSerializer):
    time = serializers.TimeField(format="%H:%M:%S", input_formats=["%H:%M:%S"])
    wallet_name = serializers.CharField(source="wallet.name", read_only=True)

    class Meta:
        model = TrackData
        fields = "__all__"

    def create(self, validated_data):
        wallet = validated_data.pop("wallet")
        amount = validated_data.get("rupee")

        if amount is None:
            raise serializers.ValidationError({"amount": "This field is required."})

        wallet = Wallet.objects.get(id=wallet.id if hasattr(wallet, "id") else wallet)

        if validated_data.get("type") == "expanse":
            wallet.rupee -= Decimal(amount)
        else:
            wallet.rupee += Decimal(amount)

        wallet.save()

        return TrackData.objects.create(wallet=wallet, **validated_data)