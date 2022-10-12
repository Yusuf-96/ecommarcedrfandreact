from django.contrib import admin
from .models import Product, Shop, Category, OrderItem, Order,Sale

# Register your models here.

class ItemAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'descriptions', 'is_active', 'selling_price', 'buying_price', 'stock', 'remeaning' ]
class ShopAdmin(admin.ModelAdmin):
    list_display = ['code', 'shop_name']
class OrderAdmin(admin.ModelAdmin):
    list_display = ['code', 'ordered_date', 'ordered']
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['code', 'created_at', 'item', 'quantity', 'ordered']
class SaleAdmin(admin.ModelAdmin):
    list_display = ['id',  'amount',  'sales_date']

admin.site.register(Product, ItemAdmin)
admin.site.register(Shop,ShopAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Sale, SaleAdmin)
admin.site.register(Category,)



