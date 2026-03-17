from django.urls import path
from . import views

urlpatterns = [
    path("users/<name>", views.hello_there, name="hello_there"),
    path("", views.home, name="home")

]