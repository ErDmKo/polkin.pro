# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-02-03 22:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('texts', '0003_auto_20160131_2324'),
    ]

    operations = [
        migrations.AddField(
            model_name='smallfeedback',
            name='url',
            field=models.URLField(default='https://www.google.ru', verbose_name='Cсылка в сети'),
        ),
    ]