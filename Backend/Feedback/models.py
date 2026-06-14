from django.db import models

# Create your models here.
from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Feedback(models.Model):

    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="given_feedback"
    )

    reviewed_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="received_feedback"
    )

    event = models.ForeignKey(
        "Events.Event",
        on_delete=models.CASCADE,
        related_name="feedbacks"
    )

    rating = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("reviewer", "reviewed_user", "event")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.reviewer.email} -> {self.reviewed_user.email} ({self.rating})"