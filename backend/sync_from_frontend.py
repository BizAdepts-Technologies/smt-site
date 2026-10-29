import os
import sys
import re
import shutil
import django

BASE_DIR = os.path.abspath('backend')
sys.path.append(BASE_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smt_backend.settings')
django.setup()

from products.models import Category, Product

PUBLIC_DIR = os.path.abspath('public')
MEDIA_DIR = os.path.join(BASE_DIR, 'media', 'products')
os.makedirs(MEDIA_DIR, exist_ok=True)
MEDIA_CATS_DIR = os.path.join(BASE_DIR, 'media', 'categories')
os.makedirs(MEDIA_CATS_DIR, exist_ok=True)

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Categories
cat_block = text.split('export const categories: Category[] = [')[1].split('];')[0]
cat_pattern = re.compile(r"id:\s*'([^']+)',(?:\s*code:\s*'([^']*)',)?\s*name:\s*'([^']+)',\s*partner:\s*'([^']+)',\s*description:\s*'([^']+)',\s*image:\s*import\.meta\.env\.BASE_URL\s*\+\s*'([^']+)'")
cat_matches = cat_pattern.findall(cat_block)
print(f"Found {len(cat_matches)} categories in products.ts")

cat_map = {}
for cid, ccode, name, partner, desc, img_sub in cat_matches:
    cat_img_rel = None
    src_img = os.path.join(PUBLIC_DIR, img_sub)
    if os.path.exists(src_img):
        dest_filename = os.path.basename(src_img)
        dest_path = os.path.join(MEDIA_CATS_DIR, dest_filename)
        if not os.path.exists(dest_path):
            shutil.copy2(src_img, dest_path)
        cat_img_rel = f'categories/{dest_filename}'

    cat_defaults = {'name': name, 'partner': partner, 'description': desc, 'image': cat_img_rel}
    if ccode:
        cat_defaults['code'] = ccode

    cat, _ = Category.objects.update_or_create(
        slug=cid,
        defaults=cat_defaults
    )
    cat_map[cid] = cat

Category.objects.exclude(slug__in=[c[0] for c in cat_matches]).delete()

# 2. Extract products from products.ts
prod_blocks = text.split('export const products: Product[] = [')[1].split('export const categories')[0]
raw_prods = re.split(r'\n\s*\{\s*\n\s*id:', prod_blocks)
print(f"Found {len(raw_prods)-1} raw product blocks")

synced = 0
valid_slugs = []

for rp in raw_prods[1:]:
    slug_m = re.search(r"slug:\s*['\"]([^'\"]+)['\"]", rp)
    name_m = re.search(r"name:\s*['\"](.*?)['\"],?\r?\n", rp)
    cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", rp)
    code_m = re.search(r"product_code:\s*['\"]([^'\"]+)['\"]", rp)
    partner_m = re.search(r"partner:\s*['\"]([^'\"]+)['\"]", rp)
    desc_m = re.search(r"description:\s*['\"](.*?)['\"],?\r?\n", rp)
    img_m = re.search(r"image:\s*import\.meta\.env\.BASE_URL\s*\+\s*['\"]([^'\"]+)['\"]", rp)
    
    if not (slug_m and name_m and cat_m and desc_m and img_m):
        continue
    
    slug = slug_m.group(1)
    name = name_m.group(1)
    cat_slug = cat_m.group(1)
    prod_code = code_m.group(1) if code_m else None
    partner = partner_m.group(1) if partner_m else 'hettich'
    desc = desc_m.group(1)
    img_sub = img_m.group(1)
    valid_slugs.append(slug)
    
    specs = []
    specs_match = re.findall(r"\{\s*label:\s*['\"](.*?)['\"],\s*value:\s*['\"](.*?)['\"]\s*\}", rp)
    for l, v in specs_match:
        specs.append({'label': l, 'value': v})
    
    benefits = []
    b_match = re.search(r"benefits:\s*\[(.*?)\]", rp, re.DOTALL)
    if b_match:
        for b in b_match.group(1).split(','):
            clean_b = b.strip("' \r\n\t\"")
            if clean_b:
                benefits.append(clean_b)
    
    img_rel = None
    src_img = os.path.join(PUBLIC_DIR, img_sub)
    if os.path.exists(src_img):
        dest_filename = os.path.basename(src_img)
        dest_path = os.path.join(MEDIA_DIR, dest_filename)
        if not os.path.exists(dest_path):
            shutil.copy2(src_img, dest_path)
        img_rel = f'products/{dest_filename}'
    else:
        print(f"Warning: image not found for {slug}: {src_img}")
    
    cat_obj = cat_map.get(cat_slug)
    
    prod_defaults = {
        'title': name,
        'category': cat_obj,
        'partner': partner,
        'description': desc,
        'specs': specs,
        'benefits': benefits,
        'image': img_rel
    }
    if prod_code:
        prod_defaults['product_code'] = prod_code

    Product.objects.update_or_create(
        slug=slug,
        defaults=prod_defaults
    )
    synced += 1

Product.objects.exclude(slug__in=valid_slugs).delete()
print(f"Successfully synced {synced} products to Django database!")
print(f"Django DB now has {Product.objects.count()} products and {Category.objects.count()} categories.")
