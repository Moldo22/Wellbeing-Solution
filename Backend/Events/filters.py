import django_filters
from django.utils import timezone
from .models import Event


class EventFilter(django_filters.FilterSet):
    city = django_filters.CharFilter(field_name="city", lookup_expr="icontains")
    country = django_filters.CharFilter(field_name="country", lookup_expr="icontains")
    sport = django_filters.CharFilter(field_name="sport", lookup_expr="icontains")
    skill_level = django_filters.CharFilter(field_name="skill_level", lookup_expr="iexact")

    upcoming = django_filters.BooleanFilter(method="filter_upcoming")

    class Meta:
        model = Event
        fields = ["city", "country", "sport", "skill_level", "upcoming"] #defining which filters are exposed to the API

    #posibility to filter only for the upcoming events, used mainly when displaying home page with events
    def filter_upcoming(self, queryset, name, value):
        if value:
            return queryset.filter(start_time__gte=timezone.now())
        return queryset