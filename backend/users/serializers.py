from rest_framework import serializers, viewsets, routers
from .models import Profile, UserAccount

# class UserAccountSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = UserAccount
#         fields = [ 'url', 'first_name', 'last_name', 'email', 'password', 'profile']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'image',]
        extra_kwargs = {
            'useraccount': {'read_only': True},
        }


class ProfileImageSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize the avatar
    """

    # image = serializers.ImageField(use_url=False)

    class Meta:
        model = Profile
        fields = ("image",)


class UserAccountSerializer(serializers.ModelSerializer):

    userprofile = ProfileSerializer(read_only=True)

    class Meta:
        model = UserAccount
        fields = ['id', 'first_name', 'last_name', 'email', 'userprofile',]
        extra_kwargs = {
            'userprofile': {'read_only': True},
        }
