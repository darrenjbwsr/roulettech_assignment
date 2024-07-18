from django.urls import path
from .views import RecipeList, RecipeDetail, UserCreate

urlpatterns = [
    path('recipes/', RecipeList.as_view(), name='recipe-list'),
    path('recipes/<int:pk>/', RecipeDetail.as_view(), name='recipe-detail'),
    path('register/', UserCreate.as_view(), name='user-register')
]
