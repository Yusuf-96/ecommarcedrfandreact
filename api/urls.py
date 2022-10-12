from django.urls import path, include
from .import views



urlpatterns = [
    path('product/', views.ItemsAPI.as_view()),
    path('product/detail/<str:code>/', views.ItemAPI.as_view()),
    path('category/', views.CategoriesAPI.as_view()),
    path('category/<str:code>/', views.CategoryAPI.as_view()),
    path('shop/', views.ShopAPI.as_view()),
    path('order/', views.OrderAPI.as_view()),
    path('order/<str:code>/delete/', views.OrderAPI.as_view()),
    path('cart/', views.AddToCartAPI.as_view()),
    path('sale-items/', views.SaleItemAPI.as_view()),
    path('report/', views.ReportApiView.as_view()),
    path('expenses/', views.IcomeSummary.as_view()),
    path('all-sales/', views.AllSalesItemView.as_view()),
    path('top-selling/', views.MostSoldItemView.as_view()),
    path('csv-import/', views.InventoryCSVView.as_view()),
    path('downloadcsv/', views.ExportCSVView.as_view())
]