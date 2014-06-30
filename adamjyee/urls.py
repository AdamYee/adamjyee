from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'homepage.views.index', name='home'),
    url(r'^contact/$', 'homepage.views.contact', name='contact'),
    url(r'^contact_modal/$', 'homepage.views.contact_modal', name='contact_modal'),
    url(r'^messages/$', 'homepage.views.message', name='messages'),
    url(r'^messages/(?P<pk>[0-9]+)/$', 'homepage.views.message', name='one_message'),
    url(r'^messages/angular/$', 'homepage.views.messages_angular'),
    url(r'^canvas/$', 'homepage.views.canvas'),
    url(r'^yelp/$', 'homepage.views.yelp'),
    url(r'^jasmine/$', 'homepage.views.specrunner', name='specrunner'),
    # Examples:
    # url(r'^adamjyee/', include('adamjyee.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
