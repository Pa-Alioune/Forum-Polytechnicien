# Generated by Django 4.1.3 on 2022-12-14 22:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forum_polytechnicien', '0016_categoryhobbie_created_at_categoryhobbie_updated_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categoryhobbie',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='categoryhobbie',
            name='updated_at',
        ),
    ]
