from django.db import models
import datetime
from django.utils import timezone

class Project(models.Model):
    title =  models.CharField(max_length=200)
    short_description = models.CharField(max_length=200)
    slug = models.SlugField(max_length=50)
    pub_date = models.DateTimeField('date published')
    category =  models.CharField(max_length=200)
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=7)
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'

    def __unicode__(self):
        return self.title
