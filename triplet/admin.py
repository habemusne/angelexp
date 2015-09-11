from django.contrib import admin

from .models import Question, Answer


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 2

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        ('img1',               {'fields': ['img1']}),
        ('img2',               {'fields': ['img2']}),
        ('img3',               {'fields': ['img3']}),
    ]
    inlines = [AnswerInline]

admin.site.register(Question, QuestionAdmin)
