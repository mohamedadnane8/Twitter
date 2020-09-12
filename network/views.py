from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json

from django.views.decorators.csrf import csrf_exempt

from .models import *


@login_required(login_url="/login")
def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(
                request,
                "network/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request, "network/register.html", {"message": "Passwords must match."}
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(
                request, "network/register.html", {"message": "Username already taken."}
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@csrf_exempt
def tweet(request):
    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    # Get the content of the tweet
    description = data.get("description", "")

    if description == "" or description.isspace():
        return JsonResponse({"message": "Email sent successfully."}, status=400)

    post = Post.objects.create(owner=request.user, description=description)
    post.save()
    return JsonResponse({"message": "tweet is posted."}, status=201)


def all_tweets(request):
    tweets = Post.objects.all()
    tweets = tweets.order_by("-date_created").all()
    return JsonResponse([tweets.serialize() for tweets in tweets], safe=False)


def profile(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        # TODO: User not found page
        return HttpResponse("<h1>Page was found</h1>")

    data = {
        "user_info": user.serialize(),
        "user_post": [post.serialize() for post in user.posts.all()],
    }
    if request.method == "GET":
        return render(request, "network/profile.html", context=data)
