from django.db import models

class Worker(models.Model):
    pass

class Experiment(models.Model):
    start_time = models.DateTimeField('Start time')
    end_time = models.DateTimeField('End time')
