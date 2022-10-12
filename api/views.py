from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse
from rest_framework.generics import RetrieveAPIView
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from django.utils import timezone
from rest_framework import status
from .pagination import CustomPagination
from .serializers import (ItemSerializer, CategorySerializer, OrderItemSerializer, OrderSerializer, ShopSerializer, SaleSerializer, InventoryWithSumSerializer)
from .models import (Product, Category, OrderItem, Order, Shop, Sale)
from django.db.models import Count, Sum, F
from django.db.models.functions import Coalesce, TruncMonth, ExtractDay
import csv
import codecs

# Create your views here.

class ItemsAPI(APIView):
    # parser_classes = [MultiPartParser, FormParser]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    # pagination_class = CustomPagination
    # page_size = 5
    
    def get(self, request, format=None):
        items = Product.objects.all()
        serializer = ItemSerializer(items, many=True)

        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemAPI(APIView):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    def get(self, request, code, format=None):
        if request.method == 'GET':
            item = Product.objects.get(code=code)

            serializer = ItemSerializer(item)

            return Response(serializer.data)
        return Response({'message':'No item with the code'})


    def put(self, request, code, format=None):
        if request.method == 'PUT':
            item = Product.objects.filter(code=code)

            serializer = ItemSerializer(instance=item, data=request.data)

            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response({'message':'Unable to update'})

    def delete(self, request,  code, format=None):
        if request.method == 'DELETE':
            item = Product.objects.get(code=code)

            item.delete()

            return Response({'message':'success'})

class CategoriesAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request, fromat=None):
        if request.method == 'GET':
            categories = Category.objects.all()
            
            serializer = CategorySerializer(categories, many=True)
            
            return Response(serializer.data)
        return Response(serializer.errors, stauts= stauts.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        if request.method =='POST':
            serializer = CategorySerializer(data=request.data)
            
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CategoryAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request, code, format=None):
        if request.method == 'GET':
            category = Category.objects.get(code=code)
            serializer = CategorySerializer(category)
            
            return Response(serializer.data)
        return Response(serailizer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, code, format=None):
        if request.method == 'PUT':
            category = Category.objects.filter(code=code)
            
            serializer = CategorySerializer(instance = category, data=request.data)
            serializer.is_valid(raise_exception=True)
            
            serializer.save()
            return Response(serializer.data)
        return Response({'message':'updated successfull'})
    
    def delete(self, request, code, format=None):
        if request.method == 'DELETE':
            category = Category.objects.get(code=code)
            
            category.delete()
            
            return Response({'message':'success'})
        
        return Response({'message':'updated successfull'})

class ShopAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request, format=None):
        if request.method =="GET":
            shops = Shop.objects.all()
            
            serializer = ShopSerializer(shops, many=True) 
            
            return Response(serializer.data)
        
        return Response({'message':'No page'})     
            

class OrderAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request, format=None):
        if request.method == 'GET':
            order = Order.objects.filter(user=request.user, ordered=False).first()
           
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(status = status.HTTP_400_BAD_REQUEST)
                
        
    def post(self, request, format=None):
        code = request.data.get('code', None)
        if code is None:
            return Response({'error':'Invalid data'})
        item = get_object_or_404(Product, code=code)
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        
        if order_qs.exists():
            order = order_qs[0]
            
            #check if order item is in th order
            if order.items.filter(item__code=item.code).exists():
                order_item = OrderItem.objects.filter(item=item,user=request.user, ordered=False)[0]
                if order_item.quantity > 1:
                    order_item.quantity-=1
                   
                    new_stock = order_item.item.remeaning
                    new_stock += 1   
                    Product.objects.filter(code=code).update(remeaning=new_stock)
                    order_item.save()
                                        
                else:
                    new_stock = order_item.item.remeaning
                    new_stock += 1   
                    Product.objects.filter(code=code).update(remeaning=new_stock, is_active=True)
                    order.items.remove(order_item)
                return Response(status=status.HTTP_200_OK)
            return Response({'massage':'the item is not on your cart'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'You do not have any active order'}, status=status.HTTP_400_BAD_REQUEST)
                
    def delete(self, request, code, format=None):
        if request.method=='DELETE':
            order_item_qs = OrderItem.objects.filter(code=code)
            item_id = order_item_qs[0].item.code
            item_rm = order_item_qs[0].item.remeaning
            old_stock = order_item_qs[0].quantity + item_rm
            Product.objects.filter(code=item_id).update(remeaning= old_stock, is_active=True)
            order_item_qs.delete()
            return Response({'message':'order item deleted'}, status=status.HTTP_200_OK)
            
        return Response({'message':'You cant delete this item'}, status=status.HTTP_400_BAD_REQUEST)
        


class AddToCartAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self, request, fomart=None):
        code = request.data.get('code', None)
        
        if code is None:
            return Response({'message':'Invalid data'}, status = status.HTTP_400_BAD_REQUEST)
        
        item = get_object_or_404(Product, code=code)
        
        order_item_qs = OrderItem.objects.filter(item=item, user=request.user, ordered =False)
        if order_item_qs.exists():
            order_item = order_item_qs[0]
            if order_item.item.remeaning > 0:
                order_item.quantity +=1
                new_stock = order_item.item.remeaning
                new_stock -= 1
                Product.objects.filter(code=code).update(remeaning=new_stock)
                order_item.save()
            else:
                Product.objects.filter(code=code).update(is_active=False)
                print('Out of Stock')
        elif item.remeaning > 0:
            new_stock = item.remeaning
            new_stock -= 1
            Product.objects.filter(code=code).update(remeaning=new_stock)
            order_item = OrderItem.objects.create(item=item, user=request.user, ordered=False)
            order_item.save()
        else:
           Product.objects.filter(code=code).update(is_active=False)
           print('Out of Stock') 
            
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if not order.items.filter(item__id = order_item.id).exists():
                order.items.add(order_item)
                return Response(status = status.HTTP_200_OK)
        
        ordered_date = timezone.now()
        order = Order.objects.create(user=request.user, ordered_date=ordered_date)
        order.items.add(order_item)
        return Response(status = status.HTTP_200_OK)
    

class SaleItemAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    
    def get(slef, request, format=None):
        if request.method=='GET':
            user = request.user
            
            if user.is_superuser:
                sale = Sale.objects.all()
                serializer = SaleSerializer(sale, many=True)
                return Response(serializer.data)
            
            sales = user.sale_set.all()
            serializer = SaleSerializer(sales, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK) 
        return Response({'message':'no sales yet'})
      
       
    def post(self, request, foramt=None):
        order = Order.objects.get(user=request.user, ordered=False)
        try:
            amount = order.get_total()

            # create sales
            sales = Sale()
            sales.user = self.request.user
            sales.amount = amount
            sales.save()

            # asseign sale to order

            order_items = order.items.all()
            order_items.update(ordered=True)
            for item in order_items:
                item.save()

            order.ordered = True
            order.order = sales
            order.save()

            return Response({'message':'saled'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'message':'Unable to sale'})
        
        
class AllSalesItemView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    
    def get(self, request, format= None):
        if request.method == 'GET':
            user = request.user
            if user.is_superuser:
                order = Sale.objects.all()
                serializer = SaleSerializer(order, many=True)
                return Response(serializer.data)
            elif user.role == 'saler':
                sale = user.sale_set.all()
                serializer = SaleSerializer(instance=sale, many=True)
                return Response(serializer.data)
        return Response(status = status.HTTP_400_BAD_REQUEST)

class MostSoldItemView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        queryset = Product.objects.select_related('categories')
        items=queryset.annotate(sum_of_item= Coalesce(Sum('invoices__quantity'), 0)).order_by('-sum_of_item')[0:4]
        serializer = InventoryWithSumSerializer(items, many=True)
        return Response(serializer.data)

        
class ReportApiView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    def get(self, request, foramt=None):
        # query = Sale.objects.annotate(month= TruncDay('sales_date')).values('month').order_by('-sales_date')
        query = OrderItem.objects.filter(ordered=True).dates('order__order__sales_date', 'day').annotate(day = TruncMonth('order__order__sales_date')).values('day').annotate(total=Sum('order__order__amount')).annotate(quantity = Sum('quantity')).order_by('day')
        
        return Response({'day_items':query})
    

class IcomeSummary(APIView):
    permission_classes = [ IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    def get(self, request, format=None):
        products = Product.objects.all()
        sale_qs = Sale.objects.all()
        purchase = products.aggregate(total_expense = Sum('buying_price'))
        sales = sale_qs.aggregate(total_sale = Sum('amount'))
        
        sales_item = sales.get('total_sale')
        purchase_item = purchase.get('total_expense')

        revenue = sales.get('total_sale') - purchase.get('total_expense')
        
        return Response({'revenue': revenue, 'sales_item':sales_item, 'purchase_item':purchase_item})

class InventoryCSVView(APIView):
    permissions_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self, request, foramt=None):
        if request.method == 'POST':
            try:
                data = request.FILES['file_to_import']
            except Exception as e:
                raise Exception("You need to provide csv file")
        
        
            inventory_items = []
            
            try:
                csv_reader = csv.reader(codecs.iterdecode(data, 'utf-8'))
                for row in csv_reader:
                    if not row[0]:
                        continue
                    inventory_items.append({
                        'name': row[0],
                        'descriptions': row[1],
                        'selling_price': row[2],
                        'buying_price': row[3],
                        'stock': row[4],
                        'shops': row[5],
                        'categories': row[6],
                    })
            except csv.Error as e:
                raise Exception(e)
            
            if not inventory_items:
                raise Exception('CVS file cannot be empty')
            serializer = ItemSerializer(data = inventory_items, many=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        
        return Response({'success': 'items added '})
        
class ExportCSVView(APIView):
    permissions_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(slef, request, format = None):
        sale_qs = Sale.objects.all()
        
        response = HttpResponse(content_type = 'text/csv')
        response['Content-Disposition'] = 'attachement; filename = "file_to_import.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['user', 'amount', 'sales_data'])
        
        
        for sale in sale_qs:
            writer.writerow([sale.user, sale.amount, sale.sales_date])
        return response