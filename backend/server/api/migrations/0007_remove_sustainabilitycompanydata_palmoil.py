# Generated by Django 4.0 on 2021-12-27 04:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_sustainabilitycompanydata_averagecontroversy'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sustainabilitycompanydata',
            name='palmOil',
        ),
    ]