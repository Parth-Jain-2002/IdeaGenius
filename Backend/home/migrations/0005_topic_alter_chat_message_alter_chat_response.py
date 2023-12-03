# Generated by Django 4.2.7 on 2023-12-02 12:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0004_userdoc_delete_user"),
    ]

    operations = [
        migrations.CreateModel(
            name="Topic",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("userid", models.CharField(max_length=50)),
                ("topicid", models.CharField(default="", max_length=50, unique=True)),
                ("description", models.CharField(default="", max_length=255)),
                ("time_constraint_value", models.IntegerField(default=0)),
                ("budget_constraint_value", models.IntegerField(default=0)),
                ("subtask", models.TextField(default="")),
                ("keywords", models.JSONField(default=dict)),
            ],
        ),
        migrations.AlterField(
            model_name="chat",
            name="message",
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="chat",
            name="response",
            field=models.TextField(),
        ),
    ]
