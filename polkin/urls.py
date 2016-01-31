from django.conf.urls import include, url
from django.contrib import admin
from django.views import generic
from api import urls as api_urls
from texts import models as texts_models

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', generic.TemplateView.as_view(template_name='polkin/main.html'), name='main'),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^api/', include(api_urls, namespace='api')),
    url(
        r'^(?P<slug>[\w\-]+)/$',
        generic.detail.DetailView.as_view(
            model = texts_models.Text,
        ),
    name='detail')
]
