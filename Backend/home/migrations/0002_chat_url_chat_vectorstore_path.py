# Generated by Django 4.2.7 on 2023-11-24 12:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="chat",
            name="url",
            field=models.CharField(default="", max_length=255),
        ),
        migrations.AddField(
            model_name="chat",
            name="vectorstore_path",
            field=models.CharField(default="", max_length=255),
        ),
    ]
