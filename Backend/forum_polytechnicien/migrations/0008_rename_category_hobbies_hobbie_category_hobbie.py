# Generated by Django 4.1.3 on 2022-12-08 02:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forum_polytechnicien', '0007_categoryhobbie_hobbie_user_hobbies'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hobbie',
            old_name='category_hobbies',
            new_name='category_hobbie',
        ),
    ]
