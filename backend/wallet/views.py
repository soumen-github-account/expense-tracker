
from decimal import Decimal

from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Wallet
from .serializers import WalletSerializer


class WalletViewSet(viewsets.ModelViewSet):
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    # Only return wallets of logged-in user
    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)

    # Auto-assign wallet to logged-in user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # Transfer money between user's own wallets
    @action(detail=False, methods=["post"])
    def transfer(self, request):
        from_wallet_id = request.data.get("from_wallet")
        to_wallet_id = request.data.get("to_wallet")
        amount = request.data.get("amount")
        note = request.data.get("note", "")

        if not from_wallet_id or not to_wallet_id or not amount:
            return Response(
                {"error": "from_wallet, to_wallet and amount are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            amount = Decimal(amount)
            if amount <= 0:
                raise ValueError("Amount must be positive")

            with transaction.atomic():
                # 🔐 Ensure wallets belong to same user
                from_wallet = Wallet.objects.select_for_update().get(
                    id=from_wallet_id,
                    user=request.user
                )
                to_wallet = Wallet.objects.select_for_update().get(
                    id=to_wallet_id,
                    user=request.user
                )

                if from_wallet.rupee < amount:
                    return Response(
                        {"error": "Insufficient balance"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # 💰 Perform transfer
                from_wallet.rupee -= amount
                to_wallet.rupee += amount

                from_wallet.transaction += 1
                to_wallet.transaction += 1

                from_wallet.save()
                to_wallet.save()

            return Response(
                {
                    "message": "Transfer successful",
                    "from_wallet": WalletSerializer(from_wallet).data,
                    "to_wallet": WalletSerializer(to_wallet).data,
                    "note": note
                },
                status=status.HTTP_200_OK
            )

        except Wallet.DoesNotExist:
            return Response(
                {"error": "Wallet not found or access denied"},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
