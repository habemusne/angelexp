# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('img_url', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('img1', models.ForeignKey(related_name='img1', default=b'', to='triplet.Image')),
                ('img2', models.ForeignKey(related_name='img2', default=b'', to='triplet.Image')),
                ('img3', models.ForeignKey(related_name='img3', default=b'', to='triplet.Image')),
            ],
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(to='triplet.Question'),
        ),
        migrations.AddField(
            model_name='answer',
            name='selection1',
            field=models.ForeignKey(related_name='selection1', default=b'', to='triplet.Image'),
        ),
        migrations.AddField(
            model_name='answer',
            name='selection2',
            field=models.ForeignKey(related_name='selection2', default=b'', to='triplet.Image'),
        ),
    ]
