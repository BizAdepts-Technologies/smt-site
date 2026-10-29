import re
from django.db import models
from django.utils import timezone

DEFAULT_CATEGORY_CODES = {
    'furniture-accessories': 'ACC',
    'door-handles': 'HND',
    'cabinet-handles': 'CBH',
    'aluminium-profiles': 'ALU',
    'applied-kitchens': 'KIT',
    'wardrobe-systems': 'WAR',
    'living-media': 'LIV',
    'bathroom-vanity': 'BTH',
    'office-commercial': 'OFF',
    'furniture-lighting': 'LGT',
    'smart-access': 'SMT',
    'glass-systems': 'GLS',
    'door-ironmongery': 'IRN',
    'sliding-systems': 'SLD',
    'hepo-hardware': 'HPO',
    'das-ideenbuch': 'IDB',
}

def derive_category_code(slug=None, name=None):
    if slug and slug in DEFAULT_CATEGORY_CODES:
        return DEFAULT_CATEGORY_CODES[slug]
    text = slug or name or 'PRD'
    words = [w for w in re.split(r'[^A-Za-z0-9]+', text) if w]
    if len(words) >= 3:
        code = "".join(w[0] for w in words[:4]).upper()
    elif len(words) == 2:
        code = (words[0][:2] + words[1][:2]).upper()
    elif len(words) == 1:
        code = words[0][:4].upper()
    else:
        code = 'PRD'
    return code[:4]

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=100, blank=True, null=True, unique=True)
    code = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Category code prefix for product codes (e.g. ALU, KIT, HND)"
    )
    partner = models.CharField(max_length=50, default='all', choices=[('all', 'All Partners'), ('hettich', 'Hettich'), ('iblue', 'iBlue')])
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    
    class Meta:
        verbose_name_plural = "Categories"

    def get_code(self):
        if self.code and self.code.strip():
            return self.code.strip().upper()
        return derive_category_code(self.slug, self.name)

    def save(self, *args, **kwargs):
        if not self.code or not self.code.strip():
            self.code = self.get_code()
        else:
            self.code = self.code.strip().upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} [{self.get_code()}] ({self.get_partner_display()})"


def generate_next_product_code(category):
    if not category:
        return None
    prefix = category.get_code() if hasattr(category, 'get_code') else str(category)
    
    # Query all product codes in this category or with this prefix
    existing_codes = Product.objects.filter(
        models.Q(category=category) | models.Q(product_code__istartswith=f"{prefix}-")
    ).values_list('product_code', flat=True)
    
    max_num = 0
    pattern = re.compile(rf'^{re.escape(prefix)}-(\d+)$', re.IGNORECASE)
    for c in existing_codes:
        if c:
            m = pattern.match(c.strip())
            if m:
                num = int(m.group(1))
                if num > max_num:
                    max_num = num
    
    next_num = max_num + 1
    return f"{prefix}-{next_num:03d}"


class Product(models.Model):
    title = models.CharField(max_length=255)
    product_code = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        unique=True,
        db_index=True,
        help_text="Unique auto-incremented product code based on category (e.g. ALU-001)"
    )
    slug = models.SlugField(max_length=255, blank=True, null=True, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    partner = models.CharField(max_length=50, default='hettich', choices=[('hettich', 'Hettich'), ('iblue', 'iBlue')])
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    specs = models.JSONField(default=list, blank=True)
    benefits = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at', '-id']

    def save(self, *args, **kwargs):
        # Product code is unchangeable once assigned
        if self.pk:
            orig = Product.objects.filter(pk=self.pk).values('product_code').first()
            if orig and orig['product_code']:
                self.product_code = orig['product_code']
        
        # If product_code is still not set, generate auto-incremented code based on category
        if not self.product_code and self.category:
            self.product_code = generate_next_product_code(self.category)
            
        super().save(*args, **kwargs)

    def __str__(self):
        code_str = f" [{self.product_code}]" if self.product_code else ""
        return f"{self.title}{code_str} [{self.partner.upper()}]"

