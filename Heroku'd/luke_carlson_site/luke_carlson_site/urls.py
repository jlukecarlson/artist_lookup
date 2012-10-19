from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'luke_carlson_site.views.home', name='home'),
    url(r'^home', 'luke_carlson_site.views.home',),
    url(r'^projects/$', 'luke_carlson_site.views.projects'),
 #   url(r'^detailed/(?P<project_id>\d+)/$', 'luke_carlson_site.views.project_detail'),
    
    url(r'^projects/(?P<slug>[-\w]+)/$','luke_carlson_site.views.project_slug'),
    #url(r'^(?P<project_id>\d+)/(?P<slug>[-\w]+)/$','luke_carlson_site.views.project_slug'), This is for urls like ww.site.com/1/crunchbase-searcher
    # url(r'^luke_carlson_site/', include('luke_carlson_site.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^admin/', include(admin.site.urls)), #admin
    (r'^comments/', include('django.contrib.comments.urls')), #comments

)
