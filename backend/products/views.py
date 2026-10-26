from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all().select_related('category').order_by('category__name', 'title')
        cat = self.request.query_params.get('category')
        if cat and cat != 'all':
            if cat.isdigit():
                qs = qs.filter(category_id=int(cat))
            else:
                qs = qs.filter(category__slug=cat)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(title__icontains=search) | qs.filter(description__icontains=search)
        return qs

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

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
