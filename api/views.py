# api/views.py
from rest_framework import generics, viewsets # FIXED: Added viewsets
from .models import User, Stock
from .serializers import UserSerializer, StockSerializer # FIXED: Added StockSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
import requests

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

class StockViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Stock.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class StockPriceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Get the stocks for the currently logged-in user
        user_stocks = Stock.objects.filter(user=request.user)
        symbols = [stock.symbol for stock in user_stocks]
        
        price_data = []
        api_key = settings.FINNHUB_API_KEY

        for symbol in symbols:
            # Make a request to the Finnhub API for each stock symbol
            url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={api_key}"
            response = requests.get(url)
            
            if response.status_code == 200:
                data = response.json()
                # Finnhub returns 'c' for the current price
                price_data.append({
                    'symbol': symbol,
                    'price': data.get('c', 'N/A')
                })
        
        return Response(price_data)
