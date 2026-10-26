from django.contrib import admin, messages
from django.utils.html import format_html
from django.urls import path, reverse
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'products_count')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

    def products_count(self, obj):
        count = obj.products.count()
        return format_html('<span style="font-weight: 600; color: #237a51;">{} products</span>', count)
    products_count.short_description = "Total Products"

from django.db import models

class HasImageFilter(admin.SimpleListFilter):
    title = 'Image'
    parameter_name = 'has_image'

    def lookups(self, request, model_admin):
        return (
            ('yes', 'Has Image'),
            ('no', 'No Image'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'yes':
            return queryset.filter(image__isnull=False).exclude(image='')
        if self.value() == 'no':
            return queryset.filter(models.Q(image__isnull=True) | models.Q(image=''))
        return queryset

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('image_thumbnail', 'title', 'category', 'has_image_badge', 'image_action_buttons')
    list_display_links = ('image_thumbnail', 'title')
    list_filter = ('category', HasImageFilter)
    search_fields = ('title', 'description', 'slug', 'category__name')
    list_per_page = 25
    ordering = ('category__name', 'title')
    readonly_fields = ('image_preview_large',)
    fields = ('title', 'slug', 'category', 'description', 'image', 'image_preview_large', 'specs', 'benefits')
    actions = ['delete_selected_images']

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 52px; height: 52px; object-fit: cover; border-radius: 8px; border: 1.5px solid #e4e7ec; box-shadow: 0 1px 3px rgba(0,0,0,0.08);" />',
                obj.image.url
            )
        return format_html(
            '<div style="width: 52px; height: 52px; border-radius: 8px; background: #f0f2f5; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #888; font-weight: 500; border: 1px dashed #ccc;">No image</div>'
        )
    image_thumbnail.short_description = "Image"

    def has_image_badge(self, obj):
        if obj.image:
            return format_html(
                '<span style="background: #e8faf2; color: #1e5c3e; padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 11px; display: inline-flex; align-items: center; gap: 4px;">✓ Has Image</span>'
            )
        return format_html(
            '<span style="background: #fef2f2; color: #991b1b; padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 11px;">✗ No Image</span>'
        )
    has_image_badge.short_description = "Image Status"

    def image_action_buttons(self, obj):
        if obj.image:
            delete_url = reverse('admin:product_delete_image', args=[obj.pk])
            return format_html(
                '<a href="{}" class="button" style="background: #fee2e2 !important; color: #b91c1c !important; border: 1px solid #fca5a5 !important; padding: 4px 10px !important; font-size: 11px !important; font-weight: 600; border-radius: 6px; box-shadow: none !important; text-decoration: none;">🗑️ Delete Image</a>',
                delete_url
            )
        return format_html('<span style="color: #98a2b3; font-size: 12px;">—</span>')
    image_action_buttons.short_description = "Image Actions"

    def image_preview_large(self, obj):
        if obj.pk and obj.image:
            delete_url = reverse('admin:product_delete_image', args=[obj.pk])
            return format_html(
                '''<div style="background: #f8f9fa; border: 1.5px solid #e4e7ec; border-radius: 10px; padding: 16px; max-width: 360px;">
                    <div style="margin-bottom: 8px; font-size: 12px; color: #667085;">Current Image: <strong>{}</strong></div>
                    <img src="{}" style="max-width: 100%; max-height: 240px; border-radius: 8px; object-fit: contain; border: 1px solid #d0d5dd;" />
                    <div style="margin-top: 12px;">
                        <a href="{}" class="button" style="background: #fee2e2 !important; color: #b91c1c !important; border: 1px solid #f87171 !important; padding: 7px 14px !important; font-size: 12px !important; font-weight: 600; border-radius: 6px; text-decoration: none; box-shadow: none !important;">
                            🗑️ Delete / Remove Image with Confirmation
                        </a>
                    </div>
                </div>''',
                obj.image.name,
                obj.image.url,
                delete_url
            )
        return format_html('<span style="color: #667085; font-size: 13px;">No image uploaded yet.</span>')
    image_preview_large.short_description = "Image Preview & Controls"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<int:product_id>/delete-image/', self.admin_site.admin_view(self.delete_image_view), name='product_delete_image'),
        ]
        return custom_urls + urls

    def delete_image_view(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        if request.method == 'POST':
            if product.image:
                product.image.delete(save=False)
                product.image = None
                product.save()
                messages.success(request, f'Image for product "{product.title}" was successfully deleted.')
            else:
                messages.info(request, f'Product "{product.title}" had no image to delete.')
            return HttpResponseRedirect(reverse('admin:products_product_change', args=[product.pk]))

        context = {
            **self.admin_site.each_context(request),
            'product': product,
            'title': f'Confirm Delete Image: {product.title}',
        }
        return render(request, 'admin/products/delete_image_confirmation.html', context)

    @admin.action(description="Delete images from selected products")
    def delete_selected_images(self, request, queryset):
        count = 0
        for product in queryset:
            if product.image:
                product.image.delete(save=False)
                product.image = None
                product.save()
                count += 1
        messages.success(request, f'Deleted images from {count} product(s).')
