# Generated by Django 4.2.7 on 2023-12-18 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0022_topic_skills'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='learning_path',
            field=models.JSONField(blank=True, default=dict, null=True),
        ),
        migrations.AddField(
            model_name='topic',
            name='learning_path_generated',
            field=models.BooleanField(default=False),
        ),
    ]
