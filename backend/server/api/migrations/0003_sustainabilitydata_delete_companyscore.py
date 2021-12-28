# Generated by Django 4.0 on 2021-12-27 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_companyscore_delete_companydata'),
    ]

    operations = [
        migrations.CreateModel(
            name='SustainabilityData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=500)),
                ('category', models.CharField(max_length=500)),
                ('palmOil', models.CharField(max_length=500)),
                ('controversialWeapons', models.CharField(max_length=500)),
                ('gambling', models.CharField(max_length=500)),
                ('socialScore', models.CharField(max_length=500)),
                ('nuclear', models.CharField(max_length=500)),
                ('furLeather', models.CharField(max_length=500)),
                ('alchoholic', models.CharField(max_length=500)),
                ('gmo', models.CharField(max_length=500)),
                ('catholic', models.CharField(max_length=500)),
                ('socialPercentile', models.CharField(max_length=500)),
                ('peerCount', models.CharField(max_length=500)),
                ('governanceScore', models.CharField(max_length=500)),
                ('environmentPercentile', models.CharField(max_length=500)),
                ('animalTesting', models.CharField(max_length=500)),
                ('tobacco', models.CharField(max_length=500)),
                ('totalEsg', models.CharField(max_length=500)),
                ('highestControversy', models.CharField(max_length=500)),
            ],
        ),
        migrations.DeleteModel(
            name='CompanyScore',
        ),
    ]
