from django.urls import path, re_path
from . import views

urlpatterns = [
    path("archesdataviewer/prefetch/", views.prefetch, name="prefetch"),
    re_path(r"^archesdataviewer/home/.*$", views.index, name="archesdataviewer"),
]
