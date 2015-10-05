from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.exp, name='exp'),
    url(r'^first_trial$', views.first_trial, name='first_trial'),
    url(r'^next_trial$', views.next_trial, name='next_trial'),
]
