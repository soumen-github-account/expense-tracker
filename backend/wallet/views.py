# # wallet/views.py
# from rest_framework import viewsets
# from .models import Wallet
# from .serializers import WalletSerializer

# class WalletViewSet(viewsets.ModelViewSet):
#     queryset = Wallet.objects.all()
#     serializer_class = WalletSerializer

# wallet/views.py

from decimal import Decimal
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Wallet
from .serializers import WalletSerializer

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    @action(detail=False, methods=['post'])
    def transfer(self, request):
        from_wallet_id = request.data.get("from_wallet")
        to_wallet_id = request.data.get("to_wallet")
        amount = request.data.get("amount")
        note = request.data.get("note", "")

        try:
            from_wallet = Wallet.objects.get(id=from_wallet_id)
            to_wallet = Wallet.objects.get(id=to_wallet_id)
            amount = Decimal(amount)  # ✅ convert to Decimal

            if from_wallet.rupee < amount:
                return Response({"error": "Insufficient balance"}, status=status.HTTP_400_BAD_REQUEST)

            # Perform transfer
            from_wallet.rupee -= amount
            to_wallet.rupee += amount
            from_wallet.save()
            to_wallet.save()

            return Response({
                "message": f"Transferred {amount} from {from_wallet.name} to {to_wallet.name}",
                "from_wallet": WalletSerializer(from_wallet).data,
                "to_wallet": WalletSerializer(to_wallet).data,
                "note": note
            }, status=status.HTTP_200_OK)

        except Wallet.DoesNotExist:
            return Response({"error": "Invalid wallet ID"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
