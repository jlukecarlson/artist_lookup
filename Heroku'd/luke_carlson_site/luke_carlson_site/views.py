from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import render_to_response
from shortcuts import render_response #you can pass in information with render_response
from models import Project
#from django.views.decorators.csrf import csrf_protect


def home(request):
    return render_response('home.html')
def projects(request):
    projects_list = Project.objects.all()
    args = {
        'projects_list': projects_list,
    }
    return render_response('projects.html', args)
#def project_detail(request, project_id):
#    return HttpResponse("You're looking at project %s." % project_id)
   
#@csrf_protect
def project_slug(request, slug):
    projects_list = Project.objects.all()
    p = Project.objects.get(slug=slug)
    slugsite = slug + ".html"
    args = {
        'slug': slug,
        'projects_list': projects_list,
        'project': p,
        'slugsite': slugsite,
        }
    return render_response('detailed_project_template.html', args)
