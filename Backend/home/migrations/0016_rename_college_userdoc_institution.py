# Generated by Django 4.2.7 on 2023-12-09 08:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_rename_institution_userdoc_company'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdoc',
            old_name='college',
            new_name='institution',
        ),
    ]