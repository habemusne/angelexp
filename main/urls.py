from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^consent/$', views.consent, name='consent'),
    url(r'^thanks/$', views.thanks, name='thanks'),
]
