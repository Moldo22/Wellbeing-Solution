from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    bio = models.TextField(blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)

    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    favorite_sports = models.JSONField(default=list, blank=True)

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

    def __str__(self):
        return self.email
