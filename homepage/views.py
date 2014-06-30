# Create your views here.

from django.http.response import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from homepage.forms import ContactForm
from homepage.models import Message
from homepage.serializers import MessageSerializer, ContactSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

def index(request):
    form = ContactForm()
    return render_to_response('index.html',
                          {'form': form},
                          context_instance=RequestContext(request))
    
def specrunner(request):
    return render_to_response('SpecRunner.html', context_instance=RequestContext(request))

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders it's content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@api_view(['GET','POST'])
def contact(request):
    if request.method == 'POST':
        s = ContactSerializer(data=request.DATA)
        if s.is_valid():
            name = s.data['name']
            sender = s.data['email']
            message = s.data['message']
              
            from django.core.mail import send_mail
            send_mail(name+' has contacted you', message, sender, ['adamjyee@gmail.com'], fail_silently=False)
            return Response({}, status=status.HTTP_201_CREATED)
        else:
            errors = {}
            for k,v in s.errors.items():
                errors[k] = v[0]
            
            valid = []
            for field in s.get_fields().keys():
                if not errors.has_key(field):
                    valid.append(field)
            return Response({'errors':errors, 'valid':valid}, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        return HttpResponseRedirect('/')

def contact_modal(request):
    return render_to_response('contact_modal.html', {'form':ContactForm()}, context_instance=RequestContext(request))

@api_view(['GET','POST','DELETE','PUT'])
def message(request, pk=None):
    if request.method == 'POST':
        #print(request.DATA)
        serializer = MessageSerializer(data=request.DATA)
        if serializer.is_valid():
            #print(serializer.data)
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if not pk == None:
        try:
            message = Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            return Response({'error':'message '+pk+' does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        if request.method == 'GET':
            serializer = MessageSerializer(message)
            return Response(serializer.data)
            
        elif request.method == 'DELETE':
            message.delete()
            return Response({},status=status.HTTP_204_NO_CONTENT)
        
        elif request.method == 'PUT':
            serializer = MessageSerializer(message, data=request.DATA)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        messages = Message.objects.all()
        if request.is_ajax():
            s = MessageSerializer(messages, many=True)
            return Response(s.data)
        else:
            return render_to_response('message.html', context_instance=RequestContext(request))   

def messages_angular(request):
    return render_to_response('messages_angular.html', context_instance=RequestContext(request))

def canvas(request):
    return render_to_response('canvas.html', context_instance=RequestContext(request))

def yelp(request):
    return render_to_response('yelp.html', context_instance=RequestContext(request))