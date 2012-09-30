from luke_carlson_site.models import Project
from django.contrib import admin

class ProjectAdmin(admin.ModelAdmin):
#    fields = ['title', 'pub_date', 'short_description', 'slug']
    list_display = ("title", "pub_date", "was_published_recently")
    list_filter = ['pub_date']
    search_fields = ['title']
    date_hierarchy = 'pub_date'
    fieldsets = [
        (None,               {'fields': ['title']}),
        ('Date information', {'fields': ['pub_date']}),
        ('Description', {'fields': ['short_description']}),
        ('Category', {'fields': ['category']}),
        ('Slug', {'fields': ['slug']}),
        
    ]


admin.site.register(Project, ProjectAdmin)
