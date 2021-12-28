from rest_framework import serializers
from .models import StockSustainabilityData, PriceData, Investment
class StockSustainabilityDataSerializer (serializers.ModelSerializer):
    class Meta:
        model = StockSustainabilityData
        fields=("symbol", "category", "palmOil", "controversialWeapons", "gambling", "socialScore", "nuclear", "furLeather", "alchoholic", "gmo", "catholic", "peerCount", "governanceScore", "animalTesting", "tobacco", "totalEsg", "highestControversy", "environmentScore")

class PriceDataSerializer (serializers.ModelSerializer):
    class Meta:
        model = PriceData
        fields=("symbol","category","priceDiff","totalEsg")

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields=("symbol","totalEsg")