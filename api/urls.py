# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreateUserView, StockViewSet # Import StockViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CreateUserView, StockViewSet, StockPriceView

router = DefaultRouter()
router.register(r'stocks', StockViewSet, basename='stock')

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("stock-prices/", StockPriceView.as_view(), name="stock_prices"), 
    path("", include(router.urls)),
]