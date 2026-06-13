from django.shortcuts import render
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Event
from .serializers import EventReadSerializer, EventCreateSerializer
from .filters import EventFilter


class EventListView(generics.ListAPIView):
    #queryset = Event.objects.all().order_by("-start_time")
    queryset = Event.objects.all()
    serializer_class = EventReadSerializer

    # filtering system
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = EventFilter

    # search (text search)
    search_fields = ["title", "sport", "city"]

    # sorting
    ordering_fields = ["start_time"]

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