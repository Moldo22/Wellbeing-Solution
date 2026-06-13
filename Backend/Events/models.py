from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class Event(models.Model):
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE, #if creator deleted => delete events too
        related_name="created_events"
    )
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500, blank=True)
    sport = models.CharField(max_length=100)
    start_time = models.DateTimeField()

    street_address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    max_participants = models.PositiveIntegerField(
        default=5,
        validators=[MinValueValidator(1)],
        help_text="Maximum number of participants allowed"
    )

    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="joined_events",
        blank=True
    )

    SKILL_LEVELS = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    ]
    skill_level = models.CharField(
        max_length=20,
        choices=SKILL_LEVELS,
        default="beginner"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.sport}) by {self.creator.email}"