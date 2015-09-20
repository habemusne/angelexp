from django.shortcuts import render

# Create your views here.

def exp(request):
    return render(request, 'triplet/exp.html')
