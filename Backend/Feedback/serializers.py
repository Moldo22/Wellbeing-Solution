from rest_framework import serializers
from .models import Feedback
from rest_framework import serializers
from .models import Feedback

class FeedbackCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ["reviewed_user", "event", "rating", "comment"]




#serializer for test purposes
class FeedbackReadSerializer(serializers.ModelSerializer):
    reviewer_email = serializers.EmailField(source="reviewer.email", read_only=True)
    reviewed_user_email = serializers.EmailField(source="reviewed_user.email", read_only=True)

    class Meta:
        model = Feedback
        fields = [
            "id",
            "reviewer",
            "reviewer_email",
            "reviewed_user",
            "reviewed_user_email",
            "event",
            "rating",
            "comment",
            "created_at",
        ]