from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("following", views.following, name="following"),

    path("register", views.register, name="register"),
    path("tweet", views.tweet, name="tweet"),
    path("all_tweets", views.all_tweets, name="all_tweets"),
    path("profile/<int:id>", views.profile, name="profile"),
    path("follow/", views.follow, name="follow"),
    path("edit/", views.edit, name="edit"),
    path("editPost/", views.edit_post, name="editPost"),

]
