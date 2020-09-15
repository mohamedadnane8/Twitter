from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator
import json

from django.views.decorators.csrf import csrf_exempt

from .models import *


@login_required(login_url="/login")
def index(request):
    tweets = Post.objects.all()
    tweets = tweets.order_by("-date_created").all()
    paginator = Paginator(tweets, 10)
    page_number = request.GET.get('page')
    tweets_page = paginator.get_page(page_number)
    return render(request, "network/index.html", context={"tweets": tweets_page})


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
        return JsonResponse({"message": "Empty!"}, status=400)

    post = Post.objects.create(owner=request.user, description=description)
    post.save()
    return JsonResponse({"message": "tweet is posted.", "tweet": post.serialize()}, status=201)


def all_tweets(request):
    tweets = Post.objects.all()
    tweets = tweets.order_by("-date_created").all()
    paginator = Paginator(tweets, 10)
    page_number = request.GET.get('page')
    tweets_page = paginator.get_page(page_number)
    return render(request, "network/following.html", context={"tweets": tweets_page})


@login_required(login_url="/login")
def following(request):
    tweets = []
    for user in request.user.following.all():
        tweets += user.posts.order_by("-date_created").all()
    # tweets = tweets.order_by("-date_created").all()
    paginator = Paginator(tweets, 10)
    page_number = request.GET.get('page')
    tweets_page = paginator.get_page(page_number)
    return render(request, "network/following.html", context={"tweets": tweets_page})


def profile(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        # TODO: User not found page
        return HttpResponse("<h1>Page was found</h1>")
    try:
        is_followed = request.user in user.followers.all()
    except:
        is_followed = False
    data = {
        "user_info": user,
        "user_post": user.posts.order_by("-date_created").all(),
        "is_followed": is_followed,
    }
    if request.method == "GET":
        return render(request, "network/profile.html", context=data)


@login_required(login_url="/login")
@csrf_exempt
def follow(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    data = json.loads(request.body)
    id = data.get("user")
    print(f"\n\n\n\n{id}{type(id)}")
    user_target = User.objects.get(pk=data.get("user"))

    # True if the user is already following
    # False if the user is unfollowing

    if user_target in request.user.following.all():
        # Unfollow
        # TODO have to further modify this function so that it throws error if
        #  the user turned to be already in the list
        request.user.following.remove(user_target)
        request.user.save()

        user_target.followers.remove(request.user)
        user_target.save()

        return JsonResponse({"message": "Unfollowed successfully"}, safe=False)
    else:
        # follow
        request.user.following.add(user_target)
        request.user.save()

        user_target.followers.add(request.user)
        user_target.save()

        return JsonResponse({"message": "followed successfully"}, safe=False)


@csrf_exempt
def edit(request):
    if request.method != "PUT":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    username = data.get("username")
    image = data.get("image")
    about = data.get("about")

    if (username != ""):
        request.user.username = username

    if (image != ""):
        request.user.image = image

    if (about != ""):
        request.user.about = about.strip()
    request.user.save()

    print(f"username: {request.user.username}\nimage: {request.user.image}\n\n\n\n")
    return JsonResponse({"message": "You edited your profile successfully"}, safe=False)


@csrf_exempt
def edit_post(request):
    if request.method != "PUT":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Loading data from JSON
    data = json.loads(request.body)
    post = Post.objects.get(pk=data.get("post_id"))
    description = data.get("description")

    # checking if the current user is the owner of the post
    if post.owner != request.user:
        return JsonResponse({"error": "You can only edit your posts!"}, status=400)

    # TODO: have to move this checking the Post class and throw an error
    # as setter
    if (description == "" or description.isspace()):
        return JsonResponse({"message": "Description cannot be empty", "description": post.description}, status=200)
    post.description = description
    post.save()
    return JsonResponse({"message": "You edited your profile successfully", "description": post.description},
                        safe=False)
