from rest_framework import serializers
from .models import Category, Product

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    products_count = serializers.IntegerField(source='products.count', read_only=True)
    
    class Meta:
        model = Category
        fields = '__all__'
