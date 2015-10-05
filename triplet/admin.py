from django.contrib import admin

from .models import Image, Question, Answer

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    pass
