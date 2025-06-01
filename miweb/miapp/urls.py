from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.inicio), 
    path('api/tasa-cambio/', views.tasa_cambio, name='tasa_cambio'),
    path('', include('miapp.urls')),
]
