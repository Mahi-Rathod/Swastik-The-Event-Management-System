# Generated by Django 5.0.3 on 2024-04-02 09:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0002_rename_products_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='owner',
        ),
    ]
