# -*- coding:utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone

from django.db import models
from django.core.urlresolvers import reverse
from ckeditor_uploader.fields import RichTextUploadingField

class SmallFeedback(models.Model):
    pub = models.BooleanField(
        default=False,
        verbose_name='Публикация'
    )
    first_name = models.CharField(
        max_length=250,
        verbose_name='Имя'
    )
    comment = models.TextField(
        blank=True,
        verbose_name='Сообщение'
    )
    def __str__(self):
        return '{} - {}'.format(self.pk, self.first_name)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
    
class Feedback(models.Model):
    first_name = models.CharField(
        max_length=250,
        verbose_name='Имя'
    )
    phone = models.BigIntegerField(
        verbose_name='Телефoн'
    )
    email = models.EmailField(
        max_length=250,
        blank=True,
        verbose_name='E-mail'
    )
    comment = models.TextField(
        blank=True,
        verbose_name='Сообщение'
    )
    def get_absolute_url(self):
        from django.core.urlresolvers import reverse
        return reverse('thanks')
    
    def __str__(self):
        return '{} - {}'.format(self.pk, self.first_name)

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'

class SeoFieldsModel(models.Model):
    seo_title = models.CharField(
        max_length=255, default='', null=True,
        verbose_name='Заголовок страницы', blank=True)
    seo_keyw = models.CharField(
        max_length=255, null=True, default='', verbose_name='Ключевые слова',
        blank=True)
    seo_desc = models.TextField(
        verbose_name='Описание', null=True, default='', blank=True)

    class Meta:
        abstract = True

class Text(SeoFieldsModel):
    slug = models.CharField(max_length=200,
        unique=True, default='0', verbose_name='название в url')
    title = models.CharField(max_length=250, verbose_name='Заголовок')
    desc = RichTextUploadingField(verbose_name='Описание')
    date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации',
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-pk']
        verbose_name = 'Текст'
        verbose_name_plural = 'Тексты'

class TextSettings(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название')
    name = models.SlugField(max_length=16, verbose_name='Код', unique=True)
    val = models.TextField(max_length=1000, verbose_name='Значение')
    file = models.FileField(upload_to='settings', null=True, verbose_name='Файл', blank=True)

    def __str__(self):
        return self.val

    class Meta:
        verbose_name = 'текстовая переменная'
        verbose_name_plural = 'текстовые переменные'
