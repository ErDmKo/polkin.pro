# -*- coding:utf-8 -*-
import datetime

from . import models as text_models

def extra_var(request):
    c = {
        'settings': dict([(var.name, var) for var in text_models.TextSettings.objects.all()]),
        'now_date': datetime.datetime.now(),
        'path': request.path,
    }
    try:
        page = text_models.Text.objects.get(slug=request.path) 
    except text_models.Text.DoesNotExist:
        page = {
            'title': 'Пустая страница',
            'desc': 'заполни меня указав в слаге "{}"'.format(request.path)
        }
    c['page'] = page
    return c
