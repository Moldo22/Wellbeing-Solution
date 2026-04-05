import re
from django.utils.timezone import datetime
from django.http import HttpResponse
from django.shortcuts import render

from Users.models import User


# Create your views here.
def home(request):
    return HttpResponse("Hello world!")


def hello_there(request, name):
    # function just for test, may be removed

    now = datetime.now()
    formatted_now = now.strftime("%A, %d %B, %Y at %X")

    # Filter the name argument to letters only using regular expressions. URL arguments
    # can contain arbitrary text, so we restrict to safe characters only.
    match_object = re.match("[a-zA-Z]+", name)

    if match_object:
        clean_name = match_object.group(0)
    else:
        clean_name = "Friend"

    content = "Hello there, " + clean_name + "! It's " + formatted_now
    return HttpResponse(content)
