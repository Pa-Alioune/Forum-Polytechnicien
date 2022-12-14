# Generated by Django 4.1.3 on 2022-12-08 03:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forum_polytechnicien', '0008_rename_category_hobbies_hobbie_category_hobbie'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoryhobbie',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='hobbie',
            name='category_hobbie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hobbies', to='forum_polytechnicien.categoryhobbie', verbose_name='categorie'),
        ),
        migrations.AlterField(
            model_name='hobbie',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='hobbies',
            field=models.ManyToManyField(to='forum_polytechnicien.hobbie', verbose_name="Centre d'intêret"),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_photo',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Photo de profil'),
        ),
    ]
