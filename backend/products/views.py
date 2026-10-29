import re
from django.db import models
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product, generate_next_product_code
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=True, methods=['get'])
    def next_code(self, request, pk=None):
        category = self.get_object()
        next_code = generate_next_product_code(category)
        return Response({
            'category_id': category.id,
            'category_slug': category.slug,
            'category_name': category.name,
            'category_code': category.get_code(),
            'next_code': next_code,
        })

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all().select_related('category').order_by('category__name', 'product_code', 'title')
        cat = self.request.query_params.get('category')
        if cat and cat != 'all':
            if str(cat).isdigit():
                qs = qs.filter(category_id=int(cat))
            else:
                qs = qs.filter(category__slug=cat)
        search = self.request.query_params.get('search')
        if search:
            search_clean = search.strip()
            search_filter = (
                models.Q(title__icontains=search_clean) |
                models.Q(description__icontains=search_clean) |
                models.Q(product_code__icontains=search_clean)
            )
            # Support fuzzy/flexible formats like "alu001", "alu 001", "alu-1" -> "ALU-001"
            alphanumeric = re.sub(r'[^A-Za-z0-9]', '', search_clean)
            code_match = re.match(r'^([A-Za-z]{2,5})(\d{1,4})$', alphanumeric)
            if code_match:
                prefix = code_match.group(1).upper()
                number = int(code_match.group(2))
                search_filter |= models.Q(product_code__iexact=f"{prefix}-{number:03d}")
                search_filter |= models.Q(product_code__iexact=f"{prefix}-{code_match.group(2)}")
            qs = qs.filter(search_filter)
        ordering = self.request.query_params.get('ordering')
        if ordering:
            order_fields = [f.strip() for f in ordering.split(',') if f.strip()]
            qs = qs.order_by(*order_fields)
        limit = self.request.query_params.get('limit')
        if limit and str(limit).isdigit():
            qs = qs[:int(limit)]
        return qs

    @action(detail=False, methods=['get'])
    def latest(self, request):
        limit = int(request.query_params.get('limit', 6))
        latest_products = Product.objects.all().select_related('category').order_by('-created_at', '-id')[:limit]
        serializer = ProductSerializer(latest_products, many=True, context={'request': request})
        return Response(serializer.data)


    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def next_code(self, request):
        cat_param = request.query_params.get('category')
        if not cat_param:
            return Response({'error': 'category query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        category = None
        if str(cat_param).isdigit():
            category = Category.objects.filter(id=int(cat_param)).first()
        if not category:
            category = Category.objects.filter(slug=cat_param).first()
        
        if not category:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        next_code = generate_next_product_code(category)
        return Response({
            'category_id': category.id,
            'category_slug': category.slug,
            'category_name': category.name,
            'category_code': category.get_code(),
            'next_code': next_code,
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Handle explicit delete_image flag in FormData / JSON
        if request.data.get('delete_image') in ['true', 'True', True, '1', 1]:
            if instance.image:
                instance.image.delete(save=False)
                instance.image = None
                instance.save()

        return super().update(request, *args, partial=partial, **kwargs)

    @action(detail=True, methods=['post', 'delete'])
    def remove_image(self, request, pk=None):
        product = self.get_object()
        if product.image:
            product.image.delete(save=False)
            product.image = None
            product.save()
        return Response(ProductSerializer(product, context={'request': request}).data, status=status.HTTP_200_OK)

