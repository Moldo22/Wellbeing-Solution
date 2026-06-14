from django.urls import path
from .views import FeedbackCreateView, FeedbackListView

urlpatterns = [
    path("", FeedbackCreateView.as_view()),

    path("all/", FeedbackListView.as_view(), name="feedback")

]