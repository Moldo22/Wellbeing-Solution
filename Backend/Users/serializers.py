from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from rest_framework import serializers

# extend TokenObtainPairSerializer so it uses email instead of username as the login identifier
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) #password is accepted in requests but never returned in responses

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "first_name",
            "last_name",
            "city",
            "country",
            "bio",
            "date_of_birth",
            "phone_number",
            "favorite_sports",
            "skill_level",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)  # IMPORTANT (hashing)
        user.save()

        return user


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "city",
            "country",
            "bio",
            "date_of_birth",
            "phone_number",
            "favorite_sports",
            "skill_level",
        ]