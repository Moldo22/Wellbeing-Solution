from django.urls import path
from .views import EventListView, EventCreateView, EventDetailAPIView, EventJoinUserView, UserEventsView, EventParticipantsView

urlpatterns = [

    #     # BASIC
    # GET /api/events/
    # GET /api/events/?page=1
    # GET /api/events/?city=cluj
    # GET /api/events/?sport=basketball
    # GET /api/events/?skill_level=beginner
    # GET /api/events/?upcoming=true

    # # SEARCH
    # GET /api/events/?search=football
    # GET /api/events/?search=cluj
    # GET /api/events/?search=match

    # GET /api/events/?ordering=start_time
    # GET /api/events/?ordering=-start_time

    # GET /api/events/?city=Cluj&sport=football&upcoming=true&page=2


    path("", EventListView.as_view(), name="event-list"),

    path('<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
    

    # CREATE
    #   JSON + Token expected for event creation:
    #    {
    #     "title": "Weekend Tennis Match",
    #     "description": "Friendly 1v1 game, all levels welcome",
    #     "sport": "tennis",
    #     "start_time": "2026-05-12T18:00:00Z",
    #     "street_address": "Central Park",
    #     "city": "Bucuresti",
    #     "country": "Romania",
    #     "max_participants": 2,
    #     "skill_level": "intermediate"
    #     }
    path("create/", EventCreateView.as_view(), name="event-create"),

    path("<int:event_id>/join/", EventJoinUserView.as_view(), name="event-join"),

    path("profile/", UserEventsView.as_view()),

    path("<int:event_id>/participants/", EventParticipantsView.as_view(), name = "event-participants")

]