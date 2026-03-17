from django.test import TestCase
from Users.models import User

# Create your tests here.

class UserModelTest(TestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser@example.com",
            password="strongpassword",
            bio="I love sports",
            age=25,
            city="Barcelona",
            country="Spain",
            favorite_sports=["soccer", "tennis"],
            skill_level="intermediate"
        )

    def test_user_creation(self):
        """Test that a user is created correctly"""
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertTrue(self.user.check_password("strongpassword"))
        self.assertEqual(self.user.bio, "I love sports")
        self.assertEqual(self.user.age, 25)
        self.assertEqual(self.user.city, "Barcelona")
        self.assertEqual(self.user.country, "Spain")
        self.assertEqual(self.user.favorite_sports, ["soccer", "tennis"])
        self.assertEqual(self.user.skill_level, "intermediate")

    def test_user_str_method(self):
        """Test the __str__ method returns the email"""
        self.assertEqual(str(self.user), "testuser@example.com")

    def test_default_values(self):
        """Test default values for a new user"""
        u2 = User.objects.create_user(
            email="default@example.com",
            username="default@example.com",
            password="defaultpassword",
            city="Madrid",
            country="Spain"
        )
        self.assertEqual(u2.skill_level, "beginner")
        self.assertEqual(u2.favorite_sports, [])
        self.assertEqual(u2.bio, "")
        self.assertIsNone(u2.age)
