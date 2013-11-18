'''
Created on Jul 17, 2013

@author: adam
'''
from django import forms

class ContactForm(forms.Form):
    #subject = forms.CharField(max_length=100)
    name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Name'}))
    email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'you@somewhere.com'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'class':'span5', 'rows':5, 'placeholder':'What\'s up?'}))