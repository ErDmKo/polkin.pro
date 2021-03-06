from django.conf.urls import include, url
from django.contrib import admin
from django.views import generic
from api import urls as api_urls
from texts import models as texts_models
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', 
        generic.list.ListView.as_view(
            template_name='polkin/main.html',
            queryset=texts_models.SmallFeedback.objects.filter(pub=True),
        ), name='main'),
    url(r'^contacts/$', generic.TemplateView.as_view(template_name='polkin/contacts.html'), name='contacts'),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^api/', include(api_urls, namespace='api')),
    url(
        r'^(?P<slug>[\w\-]+)/$',
        generic.detail.DetailView.as_view(
            model = texts_models.Text,
        ),
    name='detail')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
