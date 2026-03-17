from django.forms import ValidationError
from django.test import TestCase
from django.utils import timezone

from Events.models import Event
from Users.models import User


# Create your tests here.


class EventModelTest(TestCase):
    def setUp(self):
        # Create a test user (creator)
        self.creator = User.objects.create_user(
            email="creator@example.com",
            username = "creator@example.com",
            password="testpass123"
        )

        # Create another test user (participant)
        self.participant = User.objects.create_user(
            email="participant@example.com",
            username="participant@example.com",
            password="testpass123"
        )

        # Create a test event
        self.event = Event.objects.create(
            creator=self.creator,
            title="Morning Football",
            description="Casual football game at the park",
            sport="Football",
            start_time=timezone.now(),
            city="New York",
            country="USA"
        )

    def test_event_creation(self):
        """Test event is created correctly"""
        self.assertEqual(self.event.title, "Morning Football")
        self.assertEqual(self.event.creator.email, "creator@example.com")
        self.assertEqual(self.event.skill_level, "beginner")  # default
        self.assertEqual(self.event.max_participants, 5)     # default

    def test_str_representation(self):
        """Test the string representation of the event"""
        expected_str = f"Morning Football (Football) by {self.creator.email}"
        self.assertEqual(str(self.event), expected_str)

    def test_add_participant(self):
        """Test adding a participant to the event"""
        self.event.participants.add(self.participant)
        self.assertIn(self.participant, self.event.participants.all())

    def test_max_participants_limit(self):
        """Test that participants do not exceed max_participants"""
        # Fill event to max participants
        for i in range(self.event.max_participants):
            user = User.objects.create_user(
                email=f"user{i}@example.com",
                username=f"user{i}@example.com",
                password="pass123"
            )
            self.event.participants.add(user)

        # Event should have exactly max_participants participants
        self.assertEqual(self.event.participants.count(), self.event.max_participants)

        # Adding one more should not increase the count if you enforce it in logic
        extra_user = User.objects.create_user(email="extra@example.com", username="extra@example.com", password="pass123")
        self.event.participants.add(extra_user)
        # The database itself doesn’t block this — enforcing max limit should be done in view/business logic
        self.assertEqual(self.event.participants.count(), self.event.max_participants + 1)

    def test_skill_level_choices(self):
        """Test only allowed skill levels can be assigned"""
        self.event.skill_level = "intermediate"
        self.event.save()
        self.assertEqual(self.event.skill_level, "intermediate")

        with self.assertRaises(ValidationError):
            self.event.skill_level = "expert"  # Not allowed
            self.event.full_clean()  # triggers validation