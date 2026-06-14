from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework import generics
from .models import Feedback
from .serializers import FeedbackReadSerializer

from django.shortcuts import get_object_or_404

from .models import Feedback
from .serializers import FeedbackCreateSerializer


class FeedbackCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        serializer = FeedbackCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        reviewed_user = serializer.validated_data["reviewed_user"]
        event = serializer.validated_data["event"]

        # 🔥 prevent duplicate (backup for Meta unique_together)
        if Feedback.objects.filter(
            reviewer=user,
            reviewed_user=reviewed_user,
            event=event
        ).exists():
            return Response(
                {"detail": "You already reviewed this user for this event."},
                status=status.HTTP_400_BAD_REQUEST
            )

        feedback = Feedback.objects.create(
            reviewer=user,
            reviewed_user=reviewed_user,
            event=event,
            rating=serializer.validated_data["rating"],
            comment=serializer.validated_data.get("comment", "")
        )

        return Response({
            "id": feedback.id,
            "message": "Feedback created successfully"
        }, status=status.HTTP_201_CREATED)
    




class FeedbackListView(generics.ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackReadSerializer
