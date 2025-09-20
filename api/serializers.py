# api/serializers.py
from rest_framework import serializers
from .models import User, Stock # FIXED: Added Stock to the import

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["id", "symbol", "user"]
        extra_kwargs = {"user": {"read_only": True}}