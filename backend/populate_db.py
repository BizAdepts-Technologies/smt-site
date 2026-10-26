import os
import shutil
import sys
import django

# Setup django environment
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smt_backend.settings")
django.setup()

from products.models import Category, Product

# Ensure media directory exists
MEDIA_PRODUCTS_DIR = os.path.join(BASE_DIR, 'media', 'products')
os.makedirs(MEDIA_PRODUCTS_DIR, exist_ok=True)
PUBLIC_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'public'))

# Categories matching frontend src/data/products.ts - strictly company products
categories_data = [
    {
        "name": "Aluminium Profiles",
        "slug": "aluminium-profiles",
        "description": "Architectural aluminium frame profiles, handleless Gola systems, integrated handle profiles and glass shutter framing by Hettich."
    },
    {
        "name": "Applied Kitchen Systems HD",
        "slug": "applied-kitchens",
        "description": "High-definition applied kitchen suites, display flaps, island Gola channels, and wardrobe systems by Hettich."
    },
    {
        "name": "Hettich Door Handles",
        "slug": "door-handles",
        "description": "Premium luxury door handles from Hettich Pro Luxury collection."
    },
    {
        "name": "Furniture & Storage Accessories",
        "slug": "furniture-accessories",
        "description": "Premium kitchen pullouts, larder systems, corner units and luxury furniture accessories."
    },
    {
        "name": "Smart Digital Locks",
        "slug": "smart-access",
        "description": "Biometric fingerprint, touch keypad, RFID card and Bluetooth digital smart access locks by iBlue."
    },
    {
        "name": "Glass Hardware & Patch Fittings",
        "slug": "glass-systems",
        "description": "SUS304 architectural frameless glass patch fittings, hydraulic floor springs and shower hinges by iBlue."
    },
    {
        "name": "Door Ironmongery & Handles",
        "slug": "door-ironmongery",
        "description": "Architectural solid brass mortise lever handles, magnetic latches and concealed hardware by iBlue."
    },
    {
        "name": "Sliding & Pocket Door Systems",
        "slug": "sliding-systems",
        "description": "Whisper-quiet soft-close sliding systems, concealed rollers and pocket door hardware by iBlue."
    },
]

# Create or update categories
cat_map = {}
for c in categories_data:
    cat, _ = Category.objects.update_or_create(
        slug=c['slug'],
        defaults={
            "name": c['name'],
            "description": c['description']
        }
    )
    cat_map[c['slug']] = cat

# Clean up obsolete categories
allowed_slugs = [c['slug'] for c in categories_data]
Category.objects.exclude(slug__in=allowed_slugs).delete()

# Helper to copy image from public to media/products
def get_media_image_rel(src_subpath):
    src_path = os.path.join(PUBLIC_DIR, src_subpath)
    if not os.path.exists(src_path):
        print(f"Warning: Image not found: {src_path}")
        return None
    dest_filename = os.path.basename(src_path)
    dest_path = os.path.join(MEDIA_PRODUCTS_DIR, dest_filename)
    if not os.path.exists(dest_path):
        shutil.copy2(src_path, dest_path)
    return f"products/{dest_filename}"

# All authentic company products matching frontend src/data/products.ts
products_data = [
    {
        "title": "Hettich Pro Luxury Handle 03",
        "slug": "hettich-handle-03",
        "category_slug": "door-handles",
        "description": "Elegant Hettich Pro Luxury door handle with a sleek profile, offering a perfect blend of style and functionality for premium interiors.",
        "image_file": "hettich_handels/Hettich_Handle_03.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Collection", "value": "Pro Luxury"},
            {"label": "Material", "value": "Premium Alloy"},
            {"label": "Finish", "value": "Inox Brass"},
        ],
        "benefits": ["Ergonomic grip", "Luxury aesthetic", "Durable finish", "Easy installation"]
    },
    {
        "title": "Hettich Pro Luxury Handle 04",
        "slug": "hettich-handle-04",
        "category_slug": "door-handles",
        "description": "Sophisticated door handle from the Hettich Pro Luxury range, designed for a modern aesthetic with top-tier durability.",
        "image_file": "hettich_handels/Hettich_Handle_04.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Collection", "value": "Pro Luxury"},
            {"label": "Material", "value": "Premium Alloy"},
            {"label": "Finish", "value": "Polished Chrome"},
        ],
        "benefits": ["Modern design", "Smooth touch", "High wear resistance", "Secure mounting"]
    },
    {
        "title": "Hettich Pro Luxury Handle 05",
        "slug": "hettich-handle-05",
        "category_slug": "door-handles",
        "description": "Architectural grade door handle by Hettich. The Pro Luxury series ensures exceptional longevity and timeless design.",
        "image_file": "hettich_handels/Hettich_Handle_05.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Collection", "value": "Pro Luxury"},
            {"label": "Material", "value": "Premium Alloy"},
            {"label": "Finish", "value": "Red Copper Polished"},
        ],
        "benefits": ["Timeless design", "Robust build", "Corrosion resistant", "Comfortable feel"]
    },
    {
        "title": "Hettich Pro Luxury Handle 06",
        "slug": "hettich-handle-06",
        "category_slug": "door-handles",
        "description": "Striking Hettich Pro Luxury handle suitable for both classic and contemporary doors. Engineered for perfection.",
        "image_file": "hettich_handels/Hettich_Handle_06.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Collection", "value": "Pro Luxury"},
            {"label": "Material", "value": "Premium Alloy"},
            {"label": "Finish", "value": "Anthracite Polished"},
        ],
        "benefits": ["Striking appearance", "Precision engineering", "Solid core", "Premium appeal"]
    },
    {
        "title": "Hettich Pro Luxury Handle 07",
        "slug": "hettich-handle-07",
        "category_slug": "door-handles",
        "description": "The pinnacle of the Hettich Pro Luxury series, this door handle provides maximum elegance and superior performance.",
        "image_file": "hettich_handels/Hettich_Handle_07.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Collection", "value": "Pro Luxury"},
            {"label": "Material", "value": "Premium Alloy"},
            {"label": "Finish", "value": "Inox Brass Leaf Pattern"},
        ],
        "benefits": ["Maximum elegance", "Superior performance", "Heavy-duty construction", "Exclusive look"]
    },
    {
        "title": "Hettich Base Pull-Out Basket",
        "slug": "hettich-pullout-hme002",
        "category_slug": "furniture-accessories",
        "description": "Two-tier base cabinet pull-out storage system with melamine bases, chrome/anthracite railing, full-extension slides, and integrated soft-close damping.",
        "image_file": "hettich_accessories/hettich_pullout_hme002.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME002ME"},
            {"label": "Slide Type", "value": "Full Extension Soft-Close"},
            {"label": "Finish", "value": "Orion Grey / Natural Oak"},
        ],
        "benefits": ["Full extension access", "Silent soft closing", "Dual tier storage", "High weight capacity"]
    },
    {
        "title": "Hettich Flat-Wire Pull-Out Basket",
        "slug": "hettich-bottle-rack-hme003",
        "category_slug": "furniture-accessories",
        "description": "Compact and robust flat-wire pull-out basket with integrated bottle dividers and bottom-mounted soft-closing slides for kitchen base units.",
        "image_file": "hettich_accessories/hettich_bottle_rack_hme003.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME003+"},
            {"label": "Mounting", "value": "Bottom-mounted Slide"},
            {"label": "Finish", "value": "Polished Chrome"},
        ],
        "benefits": ["Smooth glide runners", "Bottle rack divider", "Compact base fit", "Easy clean surface"]
    },
    {
        "title": "Hettich Tandem Tall Larder System",
        "slug": "hettich-tandem-larder-hme230",
        "category_slug": "furniture-accessories",
        "description": "Intelligent tall pantry system where opening the door automatically draws inner shelves forward for total panoramic visibility and ergonomic access.",
        "image_file": "hettich_accessories/hettich_tandem_larder_hme230.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME230AME"},
            {"label": "Height Range", "value": "1700mm - 2150mm"},
            {"label": "Capacity", "value": "Up to 80 kg"},
        ],
        "benefits": ["Panoramic dual-rack access", "Damped opening & closing", "Adjustable shelf heights", "Heavy-duty capacity"]
    },
    {
        "title": "Hettich Slim Pantry Column Pull-Out",
        "slug": "hettich-pantry-column-hme258",
        "category_slug": "furniture-accessories",
        "description": "Sleek full-height pantry pull-out tower providing access from both sides with timber-inlay shelf bottoms and synchronised heavy-duty slides.",
        "image_file": "hettich_accessories/hettich_pantry_column_hme258.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME258ME"},
            {"label": "Mechanism", "value": "Synchronized Soft-Close"},
            {"label": "Tray Finish", "value": "Orion Grey with Wood Inlay"},
        ],
        "benefits": ["Dual-sided access", "Whisper-quiet movement", "Space-optimised footprint", "Solid stability"]
    },
    {
        "title": "Hettich Deluxe Oak Larder System",
        "slug": "hettich-timber-larder-hme295",
        "category_slug": "furniture-accessories",
        "description": "Architectural tall pantry unit featuring warm natural Halifax oak melamine shelving, premium dark Orion metal frames, and glass gallery inserts.",
        "image_file": "hettich_accessories/hettich_timber_larder_hme295.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME295ME"},
            {"label": "Shelf Finish", "value": "Natural Halifax Oak & Glass"},
            {"label": "Frame Finish", "value": "Matte Orion Dark"},
        ],
        "benefits": ["Luxury natural timber look", "Glass side inserts", "Smooth full pull-out", "Modular shelf adjustment"]
    },
    {
        "title": "Hettich Corner Pull-Out System Pro",
        "slug": "hettich-magic-corner-hme340",
        "category_slug": "furniture-accessories",
        "description": "Ingenious corner cabinet solution that brings rear cabinet contents completely out into the open with smooth articulated movement.",
        "image_file": "hettich_accessories/hettich_magic_corner_hme340.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME340PRO"},
            {"label": "Configuration", "value": "4 Heavy-duty Trays"},
            {"label": "Damping", "value": "Integrated Soft-Closing"},
        ],
        "benefits": ["Total corner space utilisation", "Effortless sliding motion", "Individual tray loading", "Heavy load resistance"]
    },
    {
        "title": "Hettich LeMans Corner Swing System",
        "slug": "hettich-lemans-corner-hme373i",
        "category_slug": "furniture-accessories",
        "description": "Ergonomic curved trays that swing out smoothly past the cabinet door, allowing effortless access to stored cookware in corner base cabinets.",
        "image_file": "hettich_accessories/hettich_lemans_corner_hme373i.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME373i"},
            {"label": "Tray Movement", "value": "Independent 85° Swing"},
            {"label": "Railing", "value": "Polished Chrome Gallery Rail"},
        ],
        "benefits": ["Independent tray extension", "Ergonomic swing trajectory", "Anti-slip base coating", "25 kg per shelf load"]
    },
    {
        "title": "Hettich In-Drawer Plate Organizer",
        "slug": "hettich-drawer-plate-rack-hme999",
        "category_slug": "furniture-accessories",
        "description": "Precision plate holding and organizer rack engineered for deep kitchen drawers, keeping porcelain securely upright and silent during drawer motion.",
        "image_file": "hettich_accessories/hettich_drawer_plate_rack_hme999.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Model", "value": "HME999PRO / HME098V"},
            {"label": "Drawer Fit", "value": "600mm - 900mm wide deep drawers"},
            {"label": "Finish", "value": "Anthracite / Anodized"},
        ],
        "benefits": ["Rattle-free dish storage", "Adjustable plate spacers", "Easy lift-out cleaning", "Universal drawer fit"]
    },
    {
        "title": "Hettich 19mm Straight Frame Glass Profile",
        "slug": "hettich-19mm-straight-frame-profile",
        "category_slug": "aluminium-profiles",
        "description": "Minimalist 19mm straight aluminium frame profile engineered for 4mm glass cabinetry doors. Ideal for contemporary overhead kitchen units and illuminated display cabinets.",
        "image_file": "hettich_aluminium_profile/hettich_19mm_straight_frame.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Width", "value": "19 mm"},
            {"label": "Glass Fit", "value": "4 mm Glass"},
            {"label": "Finish", "value": "Anodized Silver / Matte Black"},
        ],
        "benefits": ["Ultra-slim visual sightlines", "Rigid extruded aluminium", "Seamless corner angle jointing", "Integrated silicone gasket fit"]
    },
    {
        "title": "Hettich 45mm Straight Frame Shutter Profile",
        "slug": "hettich-45mm-straight-frame-profile",
        "category_slug": "aluminium-profiles",
        "description": "Robust 45mm straight aluminium frame profile engineered for small-to-medium cabinet shutters and contemporary kitchen doors with concealed hardware.",
        "image_file": "hettich_aluminium_profile/hettich_45mm_straight_frame.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Width", "value": "45 mm"},
            {"label": "Glass Fit", "value": "4mm - 6mm Glass"},
            {"label": "Finish", "value": "Brushed Aluminium / Satin Silver"},
        ],
        "benefits": ["High torsional rigidity", "Durable scratch-resistant surface", "Works with concealed cup hinges", "Clean architectural shadow line"]
    },
    {
        "title": "Hettich 45mm Glass Shutter Profile System",
        "slug": "hettich-45mm-glass-shutter-profile",
        "category_slug": "aluminium-profiles",
        "description": "Architectural grade 45mm aluminium shutter profile system designed for modern wall-mounted glass cabinets and showcase units.",
        "image_file": "hettich_aluminium_profile/hettich_45mm_glass_shutter_profile.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Dimension", "value": "45 mm x 20 mm"},
            {"label": "Application", "value": "Wall-mounted Glass Shutters"},
            {"label": "Finish", "value": "Matte Silver Anodized"},
        ],
        "benefits": ["Contemporary minimalist frame", "Concealed mounting accessories", "High load capacity", "Dust-proof perimeter seal"]
    },
    {
        "title": "Hettich 45mm Sliding Wardrobe Frame Profile",
        "slug": "hettich-45mm-wardrobe-frame-profile",
        "category_slug": "aluminium-profiles",
        "description": "Heavy-duty 45mm straight frame profile designed for large bedroom sliding wardrobe doors and premium interior partition systems.",
        "image_file": "hettich_aluminium_profile/hettich_45mm_wardrobe_frame.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Width", "value": "45 mm"},
            {"label": "Max Panel Height", "value": "Up to 2700 mm"},
            {"label": "Finish", "value": "Anodized Silver / Pure White"},
        ],
        "benefits": ["High load resistance", "Effortless sliding motion", "Modern bedroom aesthetic", "Stiff anti-warping structure"]
    },
    {
        "title": "Hettich 45mm Stick-On Glass Frame Profile",
        "slug": "hettich-45mm-stick-on-frame-profile",
        "category_slug": "aluminium-profiles",
        "description": "Specialized 45mm stick-on aluminium framing system providing an invisible perimeter bond for luxury glass flaps and overhead cabinet units.",
        "image_file": "hettich_aluminium_profile/hettich_45mm_stick_on_frame.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Width", "value": "45 mm"},
            {"label": "Glass Fit", "value": "4 mm Toughened Glass"},
            {"label": "Mounting", "value": "High-Strength Structural Bonding"},
        ],
        "benefits": ["Flawless front glass surface", "No visible front frame", "Compatible with flap lift fittings", "Effortless cleaning"]
    },
    {
        "title": "Hettich 45mm Lift-Up Flap Shutter Profile",
        "slug": "hettich-45mm-liftup-flap-profile",
        "category_slug": "aluminium-profiles",
        "description": "Engineered aluminium frame profile specifically optimized for horizontal lift-up stay flap fittings in contemporary kitchens.",
        "image_file": "hettich_aluminium_profile/hettich_45mm_liftup_flap_profile.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Width", "value": "45 mm"},
            {"label": "Compatibility", "value": "Stay Flap Fittings & Gas Springs"},
            {"label": "Finish", "value": "Brushed Aluminium / Satin Nickel"},
        ],
        "benefits": ["Balanced flap articulation", "Rigid horizontal spans", "Concealed fastener channels", "Smooth lift action"]
    },
    {
        "title": "Hettich 45mm Curved Frame Profile",
        "slug": "hettich-45mm-curved-frame-profile",
        "category_slug": "aluminium-profiles",
        "description": "Ergonomic 45mm curved aluminium frame profile designed for soft-line cabinet doors and corner pantry units with frosted glass infills.",
        "image_file": "hettich_aluminium_profile/hettich_45mm_curved_frame.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Width", "value": "45 mm"},
            {"label": "Profile Shape", "value": "Curved Soft-Edge"},
            {"label": "Glass Fit", "value": "4mm - 5mm Glass"},
        ],
        "benefits": ["Soft-touch curved outer edge", "Ideal for corner cabinets", "Seamless angle alignment", "High structural stability"]
    },
    {
        "title": "Hettich 45mm Corner Pantry Cabinet Frame Profile",
        "slug": "hettich-45mm-corner-pantry-profile",
        "category_slug": "aluminium-profiles",
        "description": "Full-height 45mm corner aluminium frame profile system designed for tall larder units, integrated corner pantries, and walk-in cabinets.",
        "image_file": "hettich_aluminium_profile/hettich_45mm_corner_pantry_profile.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Height Support", "value": "Up to 2400 mm"},
            {"label": "Door Type", "value": "Bi-fold & Corner Swing"},
            {"label": "Finish", "value": "Natural Anodized Silver"},
        ],
        "benefits": ["Optimal corner visibility", "Heavy-duty vertical alignment", "Supports frosted or tinted glass", "Precision corner hinge prep"]
    },
    {
        "title": "Hettich 55mm Luxury Sliding Wardrobe Profile",
        "slug": "hettich-55mm-curved-wardrobe",
        "category_slug": "aluminium-profiles",
        "description": "Heavy-duty 55mm architectural aluminium frame profile with integrated ergonomic grip for large sliding glass wardrobe doors and room dividers.",
        "image_file": "hettich_aluminium_profile/hettich_55mm_curved_wardrobe.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Width", "value": "55 mm"},
            {"label": "Load Capacity", "value": "Up to 80 kg per door"},
            {"label": "Glass Fit", "value": "4mm - 8mm Glass / Mirrored Panels"},
        ],
        "benefits": ["Heavy-duty load capacity", "Integrated vertical grip contour", "Whisper-quiet sliding operation", "Floor-to-ceiling dimension support"]
    },
    {
        "title": "Hettich Aluminium Edge Banding Profile",
        "slug": "hettich-aluminium-edge-profile",
        "category_slug": "aluminium-profiles",
        "description": "Extruded aluminium protective edge profile for solid wood, veneer, and composite cabinet panels. Protects edges while providing a striking metallic accent.",
        "image_file": "hettich_aluminium_profile/hettich_aluminium_edge_profile.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Panel Thickness", "value": "18 mm - 20 mm"},
            {"label": "Material", "value": "Architectural Aluminium Alloy"},
            {"label": "Mounting", "value": "Spline / Push-in Groove"},
        ],
        "benefits": ["Superior impact protection", "Prevents moisture ingress", "Sharp contemporary look", "Rapid push-fit installation"]
    },
    {
        "title": "Hettich Gola Profile System (C & L Types)",
        "slug": "hettich-gola-profile-system",
        "category_slug": "aluminium-profiles",
        "description": "Premium Gola handleless channel profile system enabling true minimalist handleless cabinetry with recessed finger-pull ergonomics for kitchen islands and base units.",
        "image_file": "hettich_aluminium_profile/hettich_gola_profile_system.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profiles", "value": "C-Shape (Mid) & L-Shape (Top)"},
            {"label": "Length", "value": "Up to 4.1 m continuous"},
            {"label": "Finish", "value": "Matte Black / Anodized Silver / Inox"},
        ],
        "benefits": ["Clean handleless aesthetic", "Ergonomic finger clearance", "Full-length continuous lines", "Complete connector ecosystem"]
    },
    {
        "title": "Hettich Gola Seamless Horizontal System",
        "slug": "hettich-gola-seamless-system",
        "category_slug": "aluminium-profiles",
        "description": "Continuous horizontal Gola profile system for modern kitchen base cabinets and stacked drawers, creating an unbroken handleless aesthetic.",
        "image_file": "hettich_aluminium_profile/hettich_gola_seamless_system.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "System Type", "value": "Horizontal Integrated Gola"},
            {"label": "Application", "value": "Kitchen Islands & Drawer Banks"},
            {"label": "Finish", "value": "Satin Anodized / Inox"},
        ],
        "benefits": ["Completely handleless operation", "Linear continuous shadow line", "Easy cleaning and maintenance", "Heavy-duty extruded rigidity"]
    },
    {
        "title": "Hettich Gola L-Type Horizontal Profile",
        "slug": "hettich-gola-l-type-profile",
        "category_slug": "aluminium-profiles",
        "description": "Continuous L-Type upper Gola profile mounted immediately beneath kitchen worktops to provide seamless finger-recess access to top drawers and cabinet doors.",
        "image_file": "hettich_aluminium_profile/hettich_gola_l_type_profile.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Type", "value": "L-Shape Top Channel"},
            {"label": "Worktop Recess", "value": "26 mm recess depth"},
            {"label": "Finish", "value": "Anodized Silver / Brushed Anthracite"},
        ],
        "benefits": ["Seamless under-counter recess", "Ergonomic grip angle", "Rigid counter support", "Corner miter capability"]
    },
    {
        "title": "Hettich Gola C-Type Intermediate Profile",
        "slug": "hettich-gola-c-type-profile",
        "category_slug": "aluminium-profiles",
        "description": "Mid-level C-Type dual-recess Gola profile installed between stacked drawers, offering symmetrical upper and lower finger pull accessibility.",
        "image_file": "hettich_aluminium_profile/hettich_gola_c_type_profile.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Type", "value": "C-Shape Mid Channel"},
            {"label": "Profile Height", "value": "65.7 mm"},
            {"label": "Finish", "value": "Natural Anodized / Matte Black"},
        ],
        "benefits": ["Dual-direction finger access", "Uniform horizontal drawer spacing", "Quick clip-on bracket fixing", "Heavy-duty structural stability"]
    },
    {
        "title": "Hettich Edge Profile Wall Cabinet System",
        "slug": "hettich-edge-profile-wall-cabinet",
        "category_slug": "aluminium-profiles",
        "description": "Complete architectural aluminium framing and edge integration system for handleless floating wall units and contemporary kitchen cabinetry.",
        "image_file": "hettich_aluminium_profile/hettich_edge_wall_cabinet.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "System", "value": "Integrated Cabinet Edge & Frame"},
            {"label": "Application", "value": "Luxury Residential & Commercial"},
            {"label": "Finish", "value": "Matte Inox / Satin Anodized"},
        ],
        "benefits": ["Architectural elegance", "Total handle-free operation", "Clean vertical and horizontal lines", "Hettich engineered longevity"]
    },
    {
        "title": "Hettich Contemporary Architectural Kitchen Island Edge System",
        "slug": "hettich-edge-kitchen-island",
        "category_slug": "aluminium-profiles",
        "description": "Architectural aluminium edge profiles engineered for custom luxury kitchen islands, dark stone countertops, and textured floating cabinetry.",
        "image_file": "hettich_aluminium_profile/hettich_edge_kitchen_island.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Application", "value": "Kitchen Islands & Floating Cabinetry"},
            {"label": "Worktop Fit", "value": "Slimline 12mm - 20mm Panels"},
            {"label": "Finish", "value": "Brushed Dark Pewter / Silver"},
        ],
        "benefits": ["Protects delicate panel edges", "Refined architectural metallic shadow line", "Integrated ergonomic finger recess", "Heat and moisture resistant"]
    },
    {
        "title": "Hettich 19mm Frosted Glass Kitchen Wall Cabinet System",
        "slug": "hettich-19mm-kitchen-wall-cabinets",
        "category_slug": "aluminium-profiles",
        "description": "Architectural 19mm slimline aluminium straight frame profiles with frosted glass insert doors, wall cabinet integrated bottom profiles, and under-cabinet accessory hanging rails.",
        "image_file": "hettich_kitchen_application_images/03_kitchen_aluminium_frame_profiles.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Frame Profile", "value": "19mm Slimline Aluminium"},
            {"label": "Glass Type", "value": "4mm Frosted Tempered Glass"},
            {"label": "Application", "value": "Contemporary Kitchen Wall Units"},
            {"label": "Finish", "value": "Satin Anodized Silver"},
        ],
        "benefits": ["Ultra-slim modern front profile", "Moisture and steam resistant", "Soft diffused interior glow", "Engineered for intensive kitchen use"]
    },
    {
        "title": "Hettich 45mm Flap Shutter & Gola Island System",
        "slug": "hettich-45mm-kitchen-flap-island-system",
        "category_slug": "aluminium-profiles",
        "description": "Modern kitchen cabinetry integration featuring 45mm horizontal lift-up flap shutter profiles with frosted glass, combined with continuous handleless Gola profiles on base units.",
        "image_file": "hettich_kitchen_application_images/05_yellow_kitchen_frame_profiles.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Frame Profile", "value": "45mm Horizontal Shutter"},
            {"label": "Mechanism", "value": "Lift-Up Flap Stay Compatible"},
            {"label": "Base System", "value": "Integrated Horizontal Gola"},
            {"label": "Finish", "value": "Natural Anodized Inox"},
        ],
        "benefits": ["Ergonomic upward opening access", "Unbroken horizontal architectural lines", "Rigid anti-torsion extrusion", "Seamless appliance integration"]
    },
    {
        "title": "Hettich 45mm Stick-On Architectural Glass Display System",
        "slug": "hettich-45mm-stick-on-glass-display-system",
        "category_slug": "aluminium-profiles",
        "description": "Contemporary stick-on 45mm aluminium profile system creating floating glass display cabinets with ambient LED shelf illumination and corner pantry integration.",
        "image_file": "hettich_kitchen_application_images/13_kitchen_cabinet_frame_profiles.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Type", "value": "45mm Stick-On Architectural Frame"},
            {"label": "Glass Support", "value": "4mm Clear & Frosted Glass"},
            {"label": "Lighting", "value": "Integrated LED Channel Support"},
            {"label": "Finish", "value": "Brushed Satin Silver"},
        ],
        "benefits": ["Concealed adhesive mounting technology", "Integrated accent lighting channel", "Corner space optimization", "Refined architectural elegance"]
    },
    {
        "title": "Hettich 45mm Curved Shutter Corner Kitchen Suite",
        "slug": "hettich-45mm-curved-shutter-kitchen-suite",
        "category_slug": "aluminium-profiles",
        "description": "L-shaped kitchen layout showcasing 45mm curved frame glass flap cabinets with integrated downlights and concealed finger-pull edge profiles on base drawers.",
        "image_file": "hettich_kitchen_application_images/15_modern_kitchen_edge_profiles.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Profile Contour", "value": "45mm Gentle Radius Curved Frame"},
            {"label": "Application", "value": "L-Shape Kitchens & Overhead Flaps"},
            {"label": "Finish", "value": "Anodized Matte Silver"},
            {"label": "Worktop Compatibility", "value": "Black Granite & Quartz"},
        ],
        "benefits": ["Smooth curved contour aesthetic", "Glare-reducing frosted glass", "Effortless handleless opening", "Durable scratch-proof coating"]
    },
    {
        "title": "Hettich 45mm Tall Pantry Full-Height Glass Shutter System",
        "slug": "hettich-45mm-tall-pantry-glass-shutter-system",
        "category_slug": "aluminium-profiles",
        "description": "Full-height floor-to-ceiling corner pantry column with 45mm aluminium framed frosted glass bi-fold shutters, offering complete visibility and effortless access to kitchen provisions.",
        "image_file": "hettich_kitchen_application_images/16_kitchen_glass_cabinet_profiles.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Max Height", "value": "Up to 2400 mm Floor-to-Ceiling"},
            {"label": "Frame Structure", "value": "45mm Heavy-Duty Extrusion"},
            {"label": "Glass Fit", "value": "4mm - 5mm Toughened Frosted"},
            {"label": "Finish", "value": "Inox Brushed Anodized"},
        ],
        "benefits": ["Maximized floor-to-ceiling storage", "Smooth bi-fold corner opening", "Rigid heavy-duty structural frame", "High-end architectural showcase look"]
    },
    {
        "title": "Hettich Gola Open-Plan Architectural Kitchen Island Suite",
        "slug": "hettich-gola-open-plan-kitchen-island",
        "category_slug": "aluminium-profiles",
        "description": "Complete open-concept kitchen island and breakfast counter integration utilizing continuous horizontal L and C Gola profiles with contrasting teal and light pine finishes.",
        "image_file": "hettich_kitchen_application_images/35_gola_profile_kitchen_application_1.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "System Type", "value": "Gola L-Type (Top) & C-Type (Mid)"},
            {"label": "Recess Depth", "value": "26 mm Ergonomic Finger Clearance"},
            {"label": "Application", "value": "Freestanding Islands & Peninsula Runs"},
            {"label": "Finish", "value": "Satin Anodized Silver / Anthracite"},
        ],
        "benefits": ["Showcase kitchen center-piece", "Natural handle-free ergonomics", "Continuous unbroken channel perimeter", "Zero protruding hardware"]
    },
    {
        "title": "Hettich Linear Gola Continuous Drawer System",
        "slug": "hettich-linear-gola-continuous-drawer-system",
        "category_slug": "aluminium-profiles",
        "description": "Linear kitchen configuration with continuous dual-recess Gola channels across stacked drawers and base cabinetry, paired with overhead floating lift-up units.",
        "image_file": "hettich_kitchen_application_images/36_gola_profile_kitchen_application_2.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Application", "value": "Base Cabinets & Stacked Drawers"},
            {"label": "Mid Channel Height", "value": "65.7 mm"},
            {"label": "Top Channel Height", "value": "53.0 mm"},
            {"label": "Finish", "value": "Brushed Matte Inox"},
        ],
        "benefits": ["Clean horizontal visual harmony", "Comfortable upper and lower finger pull", "Streamlined minimalist facade", "German precision engineering"]
    },
    {
        "title": "Hettich Minimalist Architectural White Kitchen Suite",
        "slug": "hettich-minimalist-architectural-kitchen-suite",
        "category_slug": "aluminium-profiles",
        "description": "Pure white high-gloss architectural kitchen run featuring integrated aluminium edge profiles, handleless wall units, and extended island dining bar.",
        "image_file": "hettich_kitchen_application_images/37_wall_cabinet_edge_profile_application.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "System", "value": "Integrated Aluminium Edge & Framing"},
            {"label": "Worktop Support", "value": "Slimline 12mm - 20mm Panels"},
            {"label": "Application", "value": "Monochrome High-Gloss Cabinetry"},
            {"label": "Finish", "value": "Anodized Silver / White Inox"},
        ],
        "benefits": ["Shields fragile lacquer panel edges", "Resistant to kitchen moisture & heat", "Seamless monochrome aesthetic", "Integrated discreet finger recess"]
    },
    {
        "title": "Hettich Luxury Dark Stone Kitchen Island & Gola Suite",
        "slug": "hettich-luxury-dark-stone-gola-suite",
        "category_slug": "aluminium-profiles",
        "description": "Luxury executive kitchen showcasing continuous Gola channels beneath textured dark stone countertops, textured vertical larder cabinets, and open display framing.",
        "image_file": "hettich_kitchen_application_images/38_kitchen_gola_profile_application.webp",
        "specs": [
            {"label": "Brand", "value": "Hettich"},
            {"label": "Worktop Pairing", "value": "Natural Stone, Dekton & Quartz"},
            {"label": "Channel Type", "value": "Heavy-Duty Horizontal Gola"},
            {"label": "Corner Method", "value": "Precision 45° Miter Connectors"},
            {"label": "Finish", "value": "Matte Dark Pewter / Silver"},
        ],
        "benefits": ["Rigid support for heavy stone slabs", "Striking contrast with stone textures", "Continuous clean perimeter channels", "Long-life corrosion resistance"]
    },
]

# Populate / Update products
seeded_slugs = []
for p in products_data:
    cat = cat_map[p['category_slug']]
    img_rel = get_media_image_rel(p['image_file'])
    
    prod, created = Product.objects.update_or_create(
        slug=p['slug'],
        defaults={
            "title": p['title'],
            "category": cat,
            "description": p['description'],
            "specs": p['specs'],
            "benefits": p['benefits'],
            "image": img_rel if img_rel else None
        }
    )
    seeded_slugs.append(p['slug'])

# Remove any obsolete/deleted products from the database
deleted_count, _ = Product.objects.exclude(slug__in=seeded_slugs).delete()
if deleted_count > 0:
    print(f"Removed {deleted_count} obsolete/single equipment products from database.")

print(f"Successfully seeded {len(seeded_slugs)} products and {len(cat_map)} categories with showable 4K images!")

