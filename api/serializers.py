from rest_framework import serializers
from .models import Product, OrderItem, Category,Order, Shop, Sale
from accounts.serializers import UserSerializer

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name','code','created_at']


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'shop_name', 'code',  'created_at']

class ItemSerializer(serializers.ModelSerializer):
    shops = serializers.CharField(required=False)
    categories =  serializers.CharField(required=False)
    class Meta:
        model = Product
        fields = ['id', 'code', 'name', 'selling_price', 'buying_price', 'descriptions', 'stock', 'is_active', 'created_at', 'image', 'shops', 'categories', 'remeaning']
        
    def create(self, validated_data):
        shop_data = validated_data.pop('shops')
        category_data = validated_data.pop('categories')
        
        shop_instance, created = Shop.objects.get_or_create(shop_name=shop_data)
        cat_instance, created = Category.objects.get_or_create(category_name=category_data)
        
        product = Product.objects.create(**validated_data, shops=shop_instance, categories=cat_instance)
        # for category in category_data:
        #     catg = Category.objects.create(**category)
        #     product.categories.add(catg)
        
        return product

class OrderItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    final_price = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem 
        fields = ['id', 'code', 'item', 'quantity', 'final_price', 'ordered', 'created_at', ]
        
    # def get_item(self, obj):
    #     return ItemSerializer(obj.item).data
    
    def get_final_price(self, obj):
        return obj.get_final_price()
    
class InventoryWithSumSerializer(ItemSerializer):
    sum_of_item = serializers.IntegerField()
    
    class Meta:
        model = Product
        fields = "__all__"
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total= serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ['id', 'total', 'code', 'ordered_date', 'items']
        
        
    # def get_order_items(self, obj):
    #     return OrderItemSerializer(obj.items.all(), many=True).data
    
    def get_total(self, obj):
        return obj.get_total()

class SaleSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    sale = OrderSerializer(many=True)
    class Meta:
        model = Sale
        fields = ['id', 'user', 'sale', 'amount', 'sales_date'] 
    
    
 
        


