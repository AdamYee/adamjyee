'''
Created on Jul 30, 2013

@author: adam
'''

from homepage.models import Message
from rest_framework import serializers
from django.forms import widgets

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id','message',)

class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField(widget=widgets.Textarea)