# Generated by Django 4.0 on 2021-12-27 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_stockpricedata'),
    ]

    operations = [
        migrations.CreateModel(
            name='PriceData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=500)),
                ('category', models.CharField(max_length=500)),
                ('totalEsg', models.CharField(max_length=500)),
                ('priceDiff', models.CharField(max_length=500)),
            ],
        ),
        migrations.DeleteModel(
            name='StockPriceData',
        ),
    ]
