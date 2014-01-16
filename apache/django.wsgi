import os, sys, site

site.addsitedir('/usr/local/lib/python2.6/dist-packages')
p1 = '/home/adam/code/git/adamjyee'
if p1 not in sys.path:
    sys.path.append(p1)
os.environ['DJANGO_SETTINGS_MODULE'] = 'adamjyee.settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()

import adamjyee.monitor
adamjyee.monitor.start(interval=1.0)
