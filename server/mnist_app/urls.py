from django.urls import path
from . import views

urlpatterns = [
  path('fit/', views.create_ann, name = 'create_and_fit'), 
  path('classify/<int:id>/', views.classify_image, name = 'classify_image'), 
  path('test/<int:id>/', views.test_image, name = 'test_image')
]