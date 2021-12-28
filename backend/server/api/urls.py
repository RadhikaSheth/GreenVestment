
from django.urls import path

from . import views

urlpatterns = [
    path('data/', views.getData.as_view()),
    path('getData/',views.ViewData.as_view()),
    path('price/',views.getPriceData.as_view()),
    path('getPrice/',views.viewPriceData.as_view()),
    path('addInv/',views.addInvestment.as_view()),
    path('getInv/',views.getInvestment.as_view()),
    path('delInv/',views.delInvestment.as_view())
]