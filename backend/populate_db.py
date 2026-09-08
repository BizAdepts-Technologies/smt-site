import os
import django
import sys

# Setup django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smt_backend.settings")
django.setup()

from products.models import Category, Product

# Clear existing
Category.objects.all().delete()
Product.objects.all().delete()

# Create Categories
categories_data = [
    {"name": "Hinges & Fittings"},
    {"name": "Drawer Systems"},
    {"name": "Sliding Door Systems"},
    {"name": "ProLock Luxury Handles"},
    {"name": "Table & Desk Systems"},
    {"name": "Assembly Machinery"},
]

cat_objs = {}
for c in categories_data:
    cat, _ = Category.objects.get_or_create(name=c['name'])
    cat_objs[c['name']] = cat

# Create Products
products_data = [
    {
        "title": "SilentClose Hinge",
        "description": "Advanced soft-closing technology designed to make every movement smoother, quieter and more refined. Engineered for premium cabinetry.",
        "category": cat_objs["Hinges & Fittings"]
    },
    {
        "title": "Precision Drawer System",
        "description": "Premium drawer system with full-extension capability and integrated soft-close mechanism for modern kitchen and wardrobe applications.",
        "category": cat_objs["Drawer Systems"]
    },
    {
        "title": "SlimLine Runner",
        "description": "Ultra-slim undermount runner system that disappears beneath the drawer, providing invisible support and flawless movement.",
        "category": cat_objs["Drawer Systems"]
    },
    {
        "title": "SlideX Pro",
        "description": "Professional sliding door system for wardrobes, room dividers and pocket doors with precision track engineering.",
        "category": cat_objs["Sliding Door Systems"]
    },
    {
        "title": "ProLock Luxury Handles",
        "description": "Intelligent handle solutions that provide sleek aesthetics with integrated locking mechanics. Perfect for high-end furniture.",
        "category": cat_objs["ProLock Luxury Handles"]
    },
    {
        "title": "Practica Assembly Machinery",
        "description": "Precision processing and assembly machinery for efficient and flawless installation of advanced drawer systems.",
        "category": cat_objs["Assembly Machinery"]
    }
]

for p in products_data:
    Product.objects.create(
        title=p['title'],
        description=p['description'],
        category=p['category']
    )

print("Successfully seeded the database with initial products from your frontend!")
