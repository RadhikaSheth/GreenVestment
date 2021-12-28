from django.db import models

# Create your models here.
class StockSustainabilityData(models.Model):
    symbol = models.name = models.CharField(max_length=500)
    category = models.name = models.CharField(max_length=500)
    palmOil = models.name = models.CharField(max_length=500)
    controversialWeapons = models.name = models.CharField(max_length=500)
    gambling = models.name = models.CharField(max_length=500)
    socialScore = models.name = models.CharField(max_length=500)
    nuclear = models.name = models.CharField(max_length=500)
    furLeather = models.name = models.CharField(max_length=500)
    alchoholic = models.name = models.CharField(max_length=500)
    gmo = models.name = models.CharField(max_length=500)
    catholic = models.name = models.CharField(max_length=500)
    socialPercentile = models.name = models.CharField(max_length=500)
    peerCount = models.name = models.CharField(max_length=500)
    governanceScore = models.name = models.CharField(max_length=500)
    environmentPercentile = models.name = models.CharField(max_length=500)
    animalTesting = models.name = models.CharField(max_length=500)
    tobacco = models.name = models.CharField(max_length=500)
    totalEsg = models.name = models.CharField(max_length=500)
    highestControversy = models.name = models.CharField(max_length=500)
    environmentScore = models.name = models.CharField(max_length=500)
    

    def __str__(self):
        return self.symbol

class PriceData(models.Model):
    symbol = models.name = models.CharField(max_length=500)
    category = models.name = models.CharField(max_length=500)
    totalEsg = models.name = models.CharField(max_length=500)
    priceDiff = models.name = models.CharField(max_length=500)

    def __str__(self):
        return self.symbol

class Investment(models.Model):
    symbol = models.name = models.CharField(max_length=500)
    totalEsg = models.name = models.CharField(max_length=500)