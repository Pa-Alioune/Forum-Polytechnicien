# Generated by Django 4.1.3 on 2022-12-07 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum_polytechnicien', '0005_remove_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
    ]
