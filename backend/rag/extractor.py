"""
Knowledge Extractor for SMT Furniture Solutions.
Extracts structured knowledge chunks from Django models and static company data.
"""
from products.models import Product, Category
from core.models import CompanyInfo
from about.models import AboutParagraph


def extract_all_documents():
    """
    Extracts all platform knowledge into standardized documents for vector indexing.
    Each document contains:
      - id: unique string identifier
      - text: text representation optimized for semantic embedding
      - metadata: structured data used for citations and frontend cards
    """
    documents = []

    # 1. Company Information
    company = CompanyInfo.objects.first()
    if company:
        company_text = (
            f"[COMPANY INFORMATION]\n"
            f"Official Name: {company.full_name} ({company.name})\n"
            f"Tagline: {company.tagline}\n"
            f"Head Office: {company.location}\n"
            f"Address: {company.address}\n"
            f"Contact Email: {company.email}\n"
            f"Contact Phone / WhatsApp: {company.phone}\n"
            f"Founded Year: {company.founded_year}\n"
            f"Founder: {company.founder}\n"
            f"Team Size: ~{company.employees_count} dedicated employees\n"
            f"Branch Network: {company.branches_count} branches across Oman\n"
            f"Core Business: Premium furniture fittings, architectural aluminium profiles, luxury door handles, "
            f"and smart access systems for the furniture, interior design, and construction industries."
        )
        documents.append({
            "id": "company_info",
            "type": "company",
            "text": company_text,
            "metadata": {
                "title": company.full_name,
                "phone": company.phone,
                "email": company.email,
                "address": company.address,
                "type": "company"
            }
        })

    # 2. About & Branches
    about_paras = list(AboutParagraph.objects.order_by('order').values_list('text', flat=True))
    if about_paras:
        about_text = (
            "[COMPANY HISTORY, WAREHOUSE & BRANCHES IN OMAN]\n"
            "Company Background: Sahab Al Mabelah Trading LLC was founded in 2007 by Mr. Shameem Shah.\n"
            "Central Logistics Hub: Supported by a 1,000 sqm central warehouse located in Ghala, Muscat, Oman.\n"
            "Nationwide Branches in Oman:\n"
            "- Muscat / Ghala (Central Warehouse & Operations)\n"
            "- Salalah\n"
            "- Nizwa\n"
            "- Sohar\n"
            "- Barka\n"
            "- Al Mabelah No. 4\n"
            "- Al Mabelah No. 5\n"
            "Official Dealership: Proud Authorized Dealer of Hettich (German Engineering) across the Sultanate of Oman, "
            "providing 100% genuine Hettich furniture fittings, handleless Gola profiles, luxury door handles, and kitchen hardware."
        )
        documents.append({
            "id": "company_about_branches",
            "type": "about",
            "text": about_text,
            "metadata": {
                "title": "About Sahab Al Mabelah & Oman Branches",
                "warehouse": "1,000 sqm in Ghala, Muscat",
                "branches": ["Muscat (Ghala)", "Salalah", "Nizwa", "Sohar", "Barka", "Al Mabelah No. 4", "Al Mabelah No. 5"],
                "authorized_dealer": "Hettich (German Engineering)",
                "type": "about"
            }
        })

    # 3. Product Categories
    for cat in Category.objects.all():
        cat_text = (
            f"[PRODUCT CATEGORY]\n"
            f"Category Name: {cat.name}\n"
            f"Slug: {cat.slug}\n"
            f"Description: {cat.description or 'Architectural hardware and fittings by SMT.'}\n"
            f"Browse Link: /products?category={cat.slug or ''}"
        )
        documents.append({
            "id": f"category_{cat.id}",
            "type": "category",
            "text": cat_text,
            "metadata": {
                "title": cat.name,
                "slug": cat.slug,
                "url": f"/products?category={cat.slug or ''}",
                "type": "category"
            }
        })

    # 4. Products with Specifications & Benefits
    for prod in Product.objects.select_related('category').all():
        specs_lines = []
        if isinstance(prod.specs, list):
            for s in prod.specs:
                if isinstance(s, dict) and 'label' in s and 'value' in s:
                    specs_lines.append(f"- {s['label']}: {s['value']}")
        specs_str = "\n".join(specs_lines) if specs_lines else "Standard architectural specifications."

        benefits_lines = []
        if isinstance(prod.benefits, list):
            for b in prod.benefits:
                benefits_lines.append(f"- {b}")
        benefits_str = "\n".join(benefits_lines) if benefits_lines else "Reliable performance, premium finish."

        image_url = prod.image.url if prod.image else ""
        if image_url and not image_url.startswith('http'):
            image_url = f"http://localhost:8000{image_url}"

        prod_text = (
            f"[PRODUCT]\n"
            f"Name: {prod.title}\n"
            f"Category: {prod.category.name if prod.category else 'Fittings'}\n"
            f"Overview: {prod.description or ''}\n"
            f"Specifications:\n{specs_str}\n"
            f"Key Benefits:\n{benefits_str}\n"
            f"Product Page URL: /products/{prod.slug}\n"
        )

        documents.append({
            "id": f"product_{prod.id}",
            "type": "product",
            "text": prod_text,
            "metadata": {
                "id": prod.id,
                "title": prod.title,
                "slug": prod.slug,
                "category": prod.category.name if prod.category else "",
                "category_slug": prod.category.slug if prod.category else "",
                "image": image_url,
                "url": f"/products/{prod.slug}",
                "description": prod.description or "",
                "type": "product"
            }
        })

    # 5. Core Partner Brands (Hettich & iBlue)
    hettich_doc = (
        "[PARTNER BRAND: HETTICH]\n"
        "Brand: Hettich (German Engineering)\n"
        "Tagline: Precision Furniture Fittings & Architectural Extrusions\n"
        "Authorized Dealer: Sahab Al Mabelah Trading LLC across the Sultanate of Oman.\n"
        "Product Lines:\n"
        "- Aluminium Profiles & Gola: Handleless island channels, 19mm/45mm/55mm glass frames, edge banding.\n"
        "- Pro Luxury Door Handles: Ergonomic architectural levers, matte black, satin brass, brushed anthracite.\n"
        "- Kitchen Storage & Accessories: LeMans corner solutions, tandem larder columns, bottle pullouts, drawer plate racks.\n"
        "- Applied Kitchens HD: Glass flap systems, modern white and dark stone island suites."
    )
    documents.append({
        "id": "brand_hettich",
        "type": "brand",
        "text": hettich_doc,
        "metadata": {
            "title": "Hettich German Engineering",
            "brand": "Hettich",
            "type": "brand"
        }
    })

    iblue_doc = (
        "[PARTNER BRAND: iBlue]\n"
        "Brand: iBlue Architectural Systems\n"
        "Tagline: Smart Access, Frameless Glass & Door Hardware\n"
        "Product Lines:\n"
        "- Smart Digital Locks: Biometric fingerprint, backlit touch keypad, RFID card, Bluetooth app control.\n"
        "- Glass Hardware & Patch Fittings: SUS304 architectural frameless patch fittings, concealed hydraulic floor springs, shower hinges.\n"
        "- Door Ironmongery: Solid brass mortise handles, magnetic silent latches, concealed escutcheons.\n"
        "- Sliding Systems: Whisper-glide soft-close glass sliding systems and pocket door tracks."
    )
    documents.append({
        "id": "brand_iblue",
        "type": "brand",
        "text": iblue_doc,
        "metadata": {
            "title": "iBlue Architectural Systems",
            "brand": "iBlue",
            "type": "brand"
        }
    })

    return documents
