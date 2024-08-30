from django.urls import path

from . import views

urlpatterns = [
    path('archesdataviewer/', views.index, name='archesdataviewer'),
    path("archesdataviewer/prefetch" , views.prefetch, name="prefetch"),
]

