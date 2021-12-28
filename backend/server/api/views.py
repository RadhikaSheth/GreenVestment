import re
from django.db import reset_queries
from django.http import response
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
import yfinance as yf;
import pandas as pd
from .serializer import StockSustainabilityDataSerializer, PriceDataSerializer, InvestmentSerializer
from yfinance import ticker
import finnhub
import datetime
import math
from .models import StockSustainabilityData, PriceData, Investment
finnhub_client = finnhub.Client(api_key="sandbox_c6v9maaad3i9k7i771jg")
class getData(APIView):
    def get(self,request):

        # finnhub_client = finnhub.Client(api_key="sandbox_c6v9maaad3i9k7i771jg")
        # tickerData = finnhub_client.stock_symbols('NS')
        tickerList = ["TITAN.NS","EICHERMOT.NS","KOTAKBANK.NS","HDFCBANK.NS","ITC.NS","GAIL.NS","ICICIBANK.NS","IDEA.NS","BPCL.NS","RELIANCE.NS","TATASTEEL.NS","ULTRACEMCO.NS","GRASIM.NS","UPL.NS","BAJAJ-AUTO.NS","BAJAJFINSV.NS","CADILAHC.NS","LUPIN.NS","AUROPHARMA.NS","TCS.NS","HEROMOTOCO.NS","TECHM.NS","DRREDDY.NS","AXISBANK.NS","SUNPHARMA.NS","NESTLEIND.NS",
        "IBULHSGFIN.NS","JSWSTEEL.NS","HINDALCO.NS","HINDPETRO.NS","M&M.NS","HCLTECH.NS","MCDOWELL-N.NS",
        "YESBANK.NS","LT.NS","ONGC.NS","ADANIPORTS.NS","HINDUNILVR.NS","WIPRO.NS","AMBUJACEM.NS","HDFC.NS","MOTHERSUMI.NS","MARUTI.NS","VEDL.NS","DABUR.NS","COALINDIA.NS","TATAMOTORS.NS",
        "MARICO.NS","INFY.NS"]
        # for x in tickerData:
        #     tickerList.append(x["displaySymbol"])
        # tickerList = pd.read_html('https://ournifty.com/stock-list-in-nse-fo-futures-and-options.html#:~:text=NSE%20F%26O%20Stock%20List%3A%20%20%20%20SL,%20%201000%20%2052%20more%20rows%20')[0]
        # tickerList = tickerList.SYMBOL.to_list()
        # tickerList= ["RELIANCE.NS","TCS.NS","AARTIIND"]
        # for count in range(len(tickerList)):
        #     tickerList[count] = tickerList[count] + ".NS"
        tickers = yf.Tickers(tickerList)
        arr =[]
        for x in tickerList:
            if tickers.tickers[x].sustainability is not None:
                data = tickers.tickers[x].sustainability
                data = data["Value"]
                companyData = {
                    "symbol" : x, "category": data[22], "palmOil": str(data[0]), "controversialWeapons":str(data[1]), "gambling":str(data[2]), "socialScore":data[3], "nuclear":str(data[4]), "furLeather":str(data[5]), "alchoholic":str(data[6]), "gmo":str(data[7]), "catholic":str(data[8]), "peerCount":data[10], "governanceScore":data[11], "animalTesting":str(data[13]), "tobacco":str(data[14]), "totalEsg":data[15], "highestControversy":data[16], "environmentScore":data[24]
                }
                serializer = StockSustainabilityDataSerializer(data=companyData)
                if serializer.is_valid():
                    serializer.save()
                    arr.append(serializer.data)
                else:
                    arr.append(serializer.errors)
        return Response(arr)



class ViewData(APIView):
    def get(self,request):
        snippets = StockSustainabilityData.objects.all()
        serializer = StockSustainabilityDataSerializer(snippets, many=True)
        return Response(serializer.data)

class getPriceData(APIView):
    def get(self, request):
        snippets = StockSustainabilityData.objects.all()
        serializer = StockSustainabilityDataSerializer(snippets, many=True).data
        arr = []
        for s in serializer:
            data = finnhub_client.stock_candles(s, 'W', math.trunc(datetime.datetime(2020,12,27,0,0).timestamp()) ,math.trunc(datetime.datetime(2021,12,27,0,0).timestamp()))
            data = data['c']
            diff = data[len(data) -1] - data[0]
            dict={
                "symbol": s['symbol'],
                "category": s['category'],
                "priceDiff" : diff,
                "totalEsg": s['totalEsg']
            }
            serializer = PriceDataSerializer(data=dict)
            if serializer.is_valid():
                serializer.save()
                arr.append(serializer.data)
            else:
                arr.append(serializer.errors)
        return Response(arr)

class viewPriceData(APIView):
    def get(self,request):
        snippets = PriceData.objects.all()
        serializer = PriceDataSerializer(snippets, many=True)
        return Response(serializer.data)

class addInvestment(APIView):
    def post(self, request):
        data = {
            "symbol": request.data.get('symbol'),
            "totalEsg": request.data.get('esg')
        }
        serializer = InvestmentSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class getInvestment(APIView):
    def get(self, request):
        snippets = Investment.objects.all()
        serializer = InvestmentSerializer(snippets, many=True)
        return Response(serializer.data)

class delInvestment(APIView):
    def get(self, request):
        PriceData.objects.all().delete()
