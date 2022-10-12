from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_size = 5 
    page_size_query_param = 'page_size'
    max_page_size = 100
    
    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response = response.data
        response['num_pages'] = self.page.paginator.num_pages
        
        return Response(response)