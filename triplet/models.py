from django.db import models


class Image(models.Model):
    img_url = models.CharField(max_length=100)

    def __str__(self):
        return self.img_url

class Question(models.Model):
    img1 = models.ForeignKey(Image, related_name='img1', default='')
    img2 = models.ForeignKey(Image, related_name='img2', default='')
    img3 = models.ForeignKey(Image, related_name='img3', default='')
    pass

class Answer(models.Model):
    question = models.ForeignKey(Question)
    selection1 = models.ForeignKey(Image, related_name='selection1', default='')
    selection2 = models.ForeignKey(Image, related_name='selection2', default='')
