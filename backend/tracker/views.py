
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from decimal import Decimal
from rest_framework.exceptions import ValidationError
from .models import TrackData
from .serializers import TrackDataSerializer
from wallet.models import Wallet


class TrackDataViewSet(viewsets.ModelViewSet):
    serializer_class = TrackDataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TrackData.objects.filter(user=self.request.user)

    # ✅ CREATE
    @transaction.atomic
    def perform_create(self, serializer):
        wallet = serializer.validated_data['wallet']
        amount = serializer.validated_data['rupee']
        tx_type = serializer.validated_data['type']

        if tx_type == 'expanse':
            if wallet.rupee < amount:
                raise ValidationError({
                    "wallet": "Insufficient balance in wallet"
                })
            wallet.rupee -= amount

        elif tx_type == 'income':
            wallet.rupee += amount

        wallet.save()
        serializer.save(user=self.request.user)

    # ✅ UPDATE
    @transaction.atomic
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_amount = instance.rupee
        old_type = instance.type
        old_wallet = instance.wallet

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)

        new_wallet = serializer.validated_data['wallet']
        new_amount = serializer.validated_data['rupee']
        new_type = serializer.validated_data['type']

        # 🔄 Revert old transaction
        if old_type == 'expanse':
            old_wallet.rupee += old_amount
        else:
            old_wallet.rupee -= old_amount

        old_wallet.save()

        # ➕ Apply new transaction
        if new_type == 'expanse':
            if new_wallet.rupee < new_amount:
                raise ValidationError({
                    "wallet": "Insufficient balance in wallet"
                })
            new_wallet.rupee -= new_amount
        else:
            new_wallet.rupee += new_amount

        new_wallet.save()
        serializer.save()

        return Response(serializer.data)

    # ✅ DELETE
    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        wallet = instance.wallet

        if instance.type == 'expanse':
            wallet.rupee += instance.rupee
        else:
            wallet.rupee -= instance.rupee

        wallet.save()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
