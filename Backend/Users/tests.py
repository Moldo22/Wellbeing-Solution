# Users/tests.py
from django.test import TestCase
from .models import User
from phonenumber_field.phonenumber import PhoneNumber

class UserModelTest(TestCase):

    def setUp(self):
        # Create a basic user for testing
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser@example.com",
            password="test12345",
            city="Cluj",
            country="Romania"
        )

    def test_user_creation(self):
        """Test basic user creation"""
        user = User.objects.get(email="testuser@example.com")
        self.assertEqual(user.city, "Cluj")
        self.assertEqual(user.country, "Romania")
        self.assertTrue(user.check_password("test12345"))

    def test_str_method(self):
        """__str__ should return the email"""
        self.assertEqual(str(self.user), "testuser@example.com")

    def test_date_of_birth_optional(self):
        """User can be created without date_of_birth"""
        self.assertIsNone(self.user.date_of_birth)
        # set a date and check
        from datetime import date
        self.user.date_of_birth = date(1990, 5, 1)
        self.user.save()
        self.assertEqual(self.user.date_of_birth.year, 1990)

    def test_phone_number_field(self):
        """Phone number can be empty or valid"""
        # Initially empty
        self.assertIsNone(self.user.phone_number)

        # Assign a valid phone number
        self.user.phone_number = "+40712345678"
        self.user.save()
        # Should be recognized as a PhoneNumber object
        self.assertIsInstance(self.user.phone_number, PhoneNumber)
        self.assertEqual(str(self.user.phone_number), "+40712345678")

    def test_skill_level_default(self):
        """Default skill level should be 'beginner'"""
        self.assertEqual(self.user.skill_level, "beginner")

    def test_skill_level_choices(self):
        """User skill_level must be one of the allowed choices"""
        valid_levels = [choice[0] for choice in User.SKILL_LEVELS]
        self.assertIn(self.user.skill_level, valid_levels)

    def test_favorite_sports_default(self):
        """favorite_sports should default to an empty list"""
        self.assertEqual(self.user.favorite_sports, [])

    def test_email_unique(self):
        """Creating another user with the same email should fail"""
        from django.db.utils import IntegrityError
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                email="testuser@example.com",
                username="testuser@example.com",
                password="abc123",
                city="Bucharest",
                country="Romania"
            )