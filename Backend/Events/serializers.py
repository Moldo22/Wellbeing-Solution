from rest_framework import serializers
from .models import Event


class EventReadSerializer(serializers.ModelSerializer):
    creator_email = serializers.EmailField(source="creator.email", read_only=True)
    creator_name = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"

    def get_creator_name(self, obj):
        return obj.creator.get_full_name()


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "title",
            "description",
            "sport",
            "start_time",
            "street_address",
            "city",
            "country",
            "max_participants",
            "skill_level",
        ]