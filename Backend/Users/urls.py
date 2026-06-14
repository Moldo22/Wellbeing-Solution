from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import EmailTokenObtainPairView, RegisterView, UserListView, UserMeView,UserProfileView

urlpatterns = [

    # LOGIN
    #   JSON expected for login in the following format:
    #   {
    #    "email": "test1@example.com",
    #    "password": "test12345"
    #   }
    path("login/", EmailTokenObtainPairView.as_view(), name="login"), 

    path("me/", UserMeView.as_view(), name="me"),

    path("profile/", UserProfileView.as_view(), name="profile"),
    
    # REFRESH TOKEN
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),

    # REGISTER
    # JSON expected for register in the following format:
    #     {
    #     "email": "testuser1@example.com",
    #     "password": "Test12345!",
    #     "first_name": "Raul",
    #     "last_name": "Lini",
    #     "city": "Cluj-Napoca",
    #     "country": "Romania",
    #     "bio": "Account bio description.",
    #     "date_of_birth": "1998-05-12",
    #     "phone_number": "+40712345678",
    #     "favorite_sports": ["football", "tennis", "basketball"]
    #     }
    path("register/", RegisterView.as_view(), name="register"),


    #url only for test purposes
    path("all/", UserListView.as_view(), name="user-list"),

]