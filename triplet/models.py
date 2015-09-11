from django.db import models

# Create your models here.
class Image:
    img_url = models.CharField(max_length=200)

    def __str__(self):
        return self.img_url

class Question:
    img1 = models.ForeignKey(Image)
    img2 = models.ForeignKey(Image)
    img3 = models.ForeignKey(Image)
