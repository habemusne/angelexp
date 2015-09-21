
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from models import Question, Answer
from api import calculate_for_next_stimulus
import ujson


def exp(request):
    return render(request, 'triplet/exp.html')

def next_trial(request, question_id):
    img1_id = request.POST['img1_id']
    img2_id = request.POST['img2_id']
    Answer.objects.create(
        question=question_id, selection1=img1_id, selection2=img2_id)
    stimulus = calculate_for_next_stimulus()
    try:
        next_question = Question.objects.get(
            img1=stimulus['img1'],
            img2=stimulus['img2'],
            img3=stimulus['img3'],
        )
    except Question.DoesNotExist:
        next_question = Question.objects.create(
            img1=stimulus['img1'],
            img2=stimulus['img2'],
            img3=stimulus['img3'],
        )
    response_text = ujson.dumps({
        'question_id': next_question.pk,
        'img1': next_question.img1,
        'img2': next_question.img2,
        'img3': next_question.img3,
    })
    return HttpResponse(response_text)
