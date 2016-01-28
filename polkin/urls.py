from django.conf.urls import url
from django.contrib import admin
from django.views import generic

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', generic.TemplateView.as_view(template_name='polkin/main.html'), name='main'),
]
