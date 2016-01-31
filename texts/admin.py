from django.contrib import admin
from . import models

admin.site.register(models.TextSettings)
admin.site.register(models.Feedback)
admin.site.register(models.Text)
