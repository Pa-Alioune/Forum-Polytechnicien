# Generated by Django 4.1.3 on 2022-12-30 23:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forum_polytechnicien', '0021_answer_slug_comment_slug_requestmodification_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publication',
            name='question',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='forum_polytechnicien.question'),
        ),
    ]