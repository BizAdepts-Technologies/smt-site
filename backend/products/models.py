from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=100, blank=True, null=True, unique=True)
    description = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, null=True, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    specs = models.JSONField(default=list, blank=True)
    benefits = models.JSONField(default=list, blank=True)
    
    def __str__(self):
        return self.title
