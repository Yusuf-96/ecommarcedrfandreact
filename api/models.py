from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save, post_delete
from django.db import models
from accounts.models import CustomUser
import string
import random

# Create your models here.


def generate_code():
    while True:
        code = ''.join(random.choice(string.ascii_letters + string.digits) for x in range(30))
        if Product.objects.filter(code=code).count() == 0:
            break
    
    return code


def upload_to(instance, filename):
    return 'image/{filename}'.format(filename=filename)

class Category(models.Model):
    code =models.CharField(max_length=30, default=generate_code)
    category_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table = 'categories'
        ordering = ['-created_at']


    def __str__(self):
        return f'{self.category_name}'

class Shop(models.Model):
    code = models.CharField(max_length=30, default=generate_code)
    shop_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    class Meta:
        db_table = 'shop'
        ordering = ['-created_at']


    def __str__(self):
        return f'{self.shop_name}'

class Product(models.Model):
    code = models.CharField(max_length=30, default=generate_code)
    name = models.CharField(max_length=500)
    descriptions = models.TextField(blank=True, null=True)
    selling_price = models.IntegerField(null=True)
    buying_price = models.IntegerField(null=True)
    stock = models.IntegerField()
    remeaning = models.IntegerField( blank = True, null = True)
    is_active = models.BooleanField(default=True)
    image = models.ImageField(_('Image'),upload_to = upload_to,max_length=255, null=True, blank=True)
    shops = models.ForeignKey('Shop', related_name='products', on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    categories = models.ForeignKey('Category', related_name='products', on_delete = models.CASCADE)


    class Meta:
        db_table   = 'products'
        ordering =['-created_at']
        
        
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        
        if is_new:
            self.remeaning = self.stock
        super().save(*args, **kwargs)


    def __str__(self):
        return f'{self.name }'
    
class OrderItem(models.Model):
    code = models.CharField( max_length=30, default=generate_code)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item  = models.ForeignKey("Product", related_name='invoices',  on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return f'{self.quantity} of {self.item.name}'
    
    def get_total_item_price(self):
        return self.quantity * self.item.selling_price

    def get_final_price(self):
        return self.get_total_item_price()

class Order(models.Model):
    code = models.CharField(max_length=30, default=generate_code)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    order = models.ForeignKey('Sale',  related_name = 'sale',on_delete=models.SET_NULL, blank=True, null=True)
    items = models.ManyToManyField('OrderItem')
    ordered_date = models.DateTimeField(auto_now_add=True)
    ordered = models.BooleanField(default=False)

    
    class Meta:
        db_table = 'order'
        ordering =['-ordered_date']


    def __str__(self):
        return f'{self.ordered}'
    
    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        
        return total

class Sale(models.Model):
    user = models.ForeignKey(CustomUser,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.IntegerField()
    sales_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'sales'
        ordering =['-sales_date']

    def __str__(self):
        return f'{self.amount}'
    
    



    




