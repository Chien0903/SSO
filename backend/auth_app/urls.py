"""
URL patterns for the authentication app
"""
from django.urls import path
from . import views
from . import protected

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('redirect/', views.redirect_view, name='redirect'),
    path('user-info/', views.user_info, name='user_info'),
    path('check-auth/', views.check_auth, name='check_auth'),
    path('protected/', protected.protected_resource, name='protected_resource'),
]
