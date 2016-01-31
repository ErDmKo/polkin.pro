from django.contrib import admin
from . import models

class TextSettingsAdmin(admin.ModelAdmin):
    list_display = 'title', 'name'

class FeedbackAdmin(admin.ModelAdmin):
    list_display = 'first_name', 'email'

class SmallFeedbackAdmin(admin.ModelAdmin):
    list_display = 'first_name', 'pub'
    list_editable = 'pub',

class TextAdmin(admin.ModelAdmin):
    list_display = 'title', 'slug'

admin.site.register(models.TextSettings, TextSettingsAdmin)
admin.site.register(models.Feedback, FeedbackAdmin)
admin.site.register(models.SmallFeedback, SmallFeedbackAdmin)
admin.site.register(models.Text, TextAdmin)
