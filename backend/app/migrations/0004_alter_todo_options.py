# Generated by Django 4.2.3 on 2024-01-11 20:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_rename_remainder_todo_reminder'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todo',
            options={'ordering': ['-updated_at']},
        ),
    ]
