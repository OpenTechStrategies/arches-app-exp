from django.urls import path

from . import views

urlpatterns = [
    path('archesdataviewer/', views.index, name='archesdataviewer'),
    path('archesdataviewer/artworks', views.artworksmap, name='artworksmap'),
    path('archesdataviewer/graphs', views.graphs, name='graphs'),
]

