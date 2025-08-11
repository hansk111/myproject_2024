from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(_("Category name"), max_length=100)

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(_("Post title"), max_length=250)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="posts",
        null=True,
        on_delete=models.SET_NULL,
    )
    coverImg = models.ImageField(
        _("Post cover image"), upload_to="posts/", blank=True)
    categories = models.ManyToManyField(
        Category, related_name="posts_list", blank=True)
    content = models.TextField(_("Post body"))
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="post_likes", blank=True
    )
    view = models.PositiveIntegerField(_("Post views"), default=0, blank=True)
    featured = models.BooleanField(
        _("Featured post"), default=False, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-createdAt",)

    def __str__(self):
        return f"{self.title} by {self.author.email}"


class Comment(models.Model):
    post = models.ForeignKey(
        Post, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="post_comments",
        null=True,
        on_delete=models.SET_NULL,
    )
    body = models.TextField(_("Comment body"))
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-createdAt",)

    def __str__(self):
        return f"{self.body[:20]} by {self.author.email}"


class Reply(models.Model):
    comment = models.ForeignKey(
        Comment, related_name="replies", on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="comment_replies",
        null=True,
        on_delete=models.SET_NULL,
    )
    body = models.TextField(_("Reply body"))
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-createdAt",)

    def __str__(self):
        return f"{self.body[:20]} by {self.author.email}"


class Image(models.Model):
    image = models.ImageField(upload_to='posts/images/')
