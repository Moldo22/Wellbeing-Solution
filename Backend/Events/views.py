from django.shortcuts import render
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
import pytz


from .models import Event
from .serializers import EventReadSerializer, EventCreateSerializer
from .filters import EventFilter


class EventListView(generics.ListAPIView):
    #queryset = Event.objects.all().order_by("-start_time")
    #queryset = Event.objects.all()
    serializer_class = EventReadSerializer

    # filtering system
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = EventFilter

    # search (text search)
    search_fields = ["title", "sport", "city"]

    # sorting
    ordering_fields = ["start_time"]

    def get_queryset(self):
        user = self.request.user

        #queryset = Event.objects.all()
        #queryset = Event.objects.all().order_by("-start_time")
        queryset = Event.objects.filter(start_time__gte=timezone.now()).order_by("start_time")

        # 🔥 EXCLUDE events where user already joined
        if user.is_authenticated:
            queryset = queryset.exclude(participants=user)

        return queryset

class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateSerializer

    #only logged-in users can access
    permission_classes = [permissions.IsAuthenticated]

    #automatically assign creator
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class EventDetailAPIView(generics.RetrieveAPIView):
    """
    Afișează detaliile unui singur eveniment selectat.
    """
    queryset = Event.objects.all()
    serializer_class = EventReadSerializer
    
    # Opțional: Implicit, Django caută în URL parametrul numit 'pk'. 
    # Dacă vrei ca în URL să scrii 'id', adaugi linia de mai jos:
    #lookup_field = 'id'


class EventJoinUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)
        user = request.user

        # verificare dacă userul este deja participant
        if event.participants.filter(id=user.id).exists():
            return Response(
                {"detail": "You are already a participant in this event."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # verificare dacă mai sunt locuri
        if event.participants.count() >= event.max_participants:
            return Response(
                {"detail": "Event is full."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # adaugă userul la event
        event.participants.add(user)

        return Response(
            {"detail": "Successfully joined the event."},
            status=status.HTTP_200_OK
        )


class UserEventsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        tz = pytz.timezone('Europe/Bucharest')
        now = timezone.now().astimezone(tz)
        #now = timezone.now()
        print(now)
        created = Event.objects.filter(creator=user)
        joined = Event.objects.filter(participants=user)
        
        upcoming = joined.filter(start_time__gte=now)
        past = joined.filter(start_time__lt=now)

        return Response({
            "events_created": created.count(),
            "events_joined": joined.count(),

            "upcoming_events": [
                {
                    "id": e.id,
                    "title": e.title,
                    "sport": e.sport,
                    "start_time": e.start_time,
                    "city": e.city,
                    "country": e.country,
                    "description": e.description,
                    "max_participants": e.max_participants,
                    "participants_count": e.participants.count(),
                }
                for e in upcoming
            ],

            "past_events": [
                {
                    "id": e.id,
                    "title": e.title,
                    "sport": e.sport,
                    "start_time": e.start_time,
                    "city": e.city,
                    "country": e.country,
                    "description": e.description,
                    "max_participants": e.max_participants,
                    "participants_count": e.participants.count(),
                }
                for e in past
            ],
        })
    
class EventParticipantsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)

        participants = event.participants.exclude(id=request.user.id)

        return Response([
            {
                "id": u.id,
                "name": u.get_full_name() or u.email
            }
            for u in participants
        ])