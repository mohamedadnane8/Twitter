from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    image = models.URLField(default="https://image.ibb.co/jw55Ex/def_face.jpg")
    about = models.CharField(max_length=300, blank=True)
    followings = models.ManyToManyField("User",blank=True, related_name="follower")
    followers = models.ManyToManyField("User",blank=True, related_name="following")

    def __str__(self):
        return self.username
    def followers_count(self):
        return len(self.followers.all())
    def followings_count(self):
        return  len(self.followings.all())
    def serialize(self):
        return {
            "id": self.id,
            "name": self.username,
            "image": self.image,
            "about": self.about,
            "followers_count": self.followers_count(),
            "followings_count": self.followings_count(),
        }


class Post(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="posts"
    )

    description = models.TextField(max_length=600)
    date_created = models.DateTimeField(auto_now_add=True)

    def number_likes(self):
        return self.post_like.all().count()

    def __str__(self):
        return f"Post id: {self.id} owner: {self.owner.username}"

    def serialize(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "owner": self.owner.username,
            "owner_image": self.owner.image,
            "description": self.description,
            "comments": [comment.serialize() for comment in self.comment.all()],
            "date_created": self.date_created.strftime("%b %-d %Y, %-I:%M %p"),
            "likes": self.number_likes(),
        }


class Like(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="user_likes"
    )
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, null=True, related_name="post_like"
    )

    # User should not be able to like the same post multiple times
    class Meta:
        unique_together = ["post", "owner"]


class Comment(models.Model):
    the_comment = models.CharField(max_length=200)
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_comment", null=True
    )
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, default=None, related_name="comment"
    )
    date_created = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "owner": self.owner.username,
            "the_comment": self.the_comment,
            "date_created": self.date_created.strftime("%b %-d %Y, %-I:%M %p"),
        }
