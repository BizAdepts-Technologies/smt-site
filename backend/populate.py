import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smt_backend.settings")
django.setup()

from core.models import CompanyInfo
from about.models import AboutParagraph
from products.models import Category

# Populate CompanyInfo
CompanyInfo.objects.get_or_create(
    name="Sahab Al Mabelah",
    full_name="Sahab Al Mabelah Trading LLC",
    tagline="Premium products and reliable service to the furniture, interior, and construction industries",
    location="Muscat, Sultanate of Oman",
    email="info@sahabalmabelah.com",
    phone="+968 2412 3456",
    address="Office no:3-C, Vitality logistics, opposite of asian paints warehouse, Muscat, Oman",
    founded_year="2007",
    founder="Mr. Shameem Shah",
    employees_count=25,
    branches_count=6
)

# Populate About paragraphs
paragraphs = [
    "Sahab Al Mabelah Trading LLC was established in 2007 by Mr. Shameem Shah, starting from a small branch with a vision to provide quality products and reliable service to the furniture, interior, and construction industries in Oman.",
    "Over the years, the company has grown steadily and is now supported by a 1,000 sqm warehouse in Ghala, Muscat, along with branches across Oman in Salah, Nizwa, Sohar, Barka, Al Mabelah No. 4, and Al Mabelah No. 5.",
    "We are proud to be the Authorized Dealer of Hettich across the Sultanate of Oman, offering genuine Hettich furniture fittings and solutions to our customers.",
    "With a dedicated team of approximately 25 employees, we are committed to delivering quality products, dependable service, and timely solutions to our customers.",
    "From our humble beginnings in 2007 to our growing presence across Oman, Sahab Al Mabelah continues to build its reputation through quality, reliability, and customer satisfaction."
]

for i, p in enumerate(paragraphs):
    AboutParagraph.objects.get_or_create(text=p, order=i)

# Populate Product Categories
categories = [
    'Natural Veneer',
    'Glass Patch Fittings',
    'Stainless Steel Handrails',
    'Furniture Fittings',
    'Aluminium Profiles',
    'Door Ironmongery',
    'Hettich Furniture Fittings & Solutions',
]

for cat in categories:
    Category.objects.get_or_create(name=cat)

print("Database populated successfully.")
