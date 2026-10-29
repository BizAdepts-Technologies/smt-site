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
        "name": "Hettich Das Ideenbuch Interior Systems",
        "slug": "das-ideenbuch",
        "description": "Visionary German furniture architecture, integrated living concepts, multi-functional room dividers, and innovative storage suites from Hettich Das Ideenbuch."
    },
    {
        "name": "Hepo Hardware & Distribution Fittings",
        "slug": "hepo-hardware",
        "description": "Versatile furniture hardware, wire pullouts, drawer runners, gas lifts, and architectural accessories by Hepo (Hettich Group)."
    },
    {
        "name": "Hettich Cabinet & Drawer Handles",
        "slug": "cabinet-handles",
        "description": "Designer cabinet handles, drawer pulls, profile handles, and furniture knobs by Hettich ProDecor."
    },
    {
        "name": "Aluminium Profiles",
        "slug": "aluminium-profiles",
        "description": "Architectural aluminium frame profiles, handleless Gola systems, integrated handle profiles and glass shutter framing by Hettich."
    },
    {
        "name": "Applied Kitchen Systems",
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
        "name": "Wardrobe & Closet Systems",
        "slug": "wardrobe-systems",
        "description": "Premium master walk-in wardrobe sliding systems, architectural glass frames, and drawer suites by Hettich."
    },
    {
        "name": "Living & Media Systems",
        "slug": "living-media",
        "description": "Architectural living room wall displays, glass vitrines, floating decorative shelves, and illuminated media units by Hettich."
    },
    {
        "name": "Bathroom & Vanity Solutions",
        "slug": "bathroom-vanity",
        "description": "Moisture-resistant handleless vanity drawers, siphon cut-out pullouts, and architectural floating bathroom shelving by Hettich."
    },
    {
        "name": "Office & Commercial Systems",
        "slug": "office-commercial",
        "description": "Commercial workstation storage, central locking pedestals, executive credenzas, and contract fittings by Hettich."
    },
    {
        "name": "Furniture Lighting & Ambience",
        "slug": "furniture-lighting",
        "description": "Integrated furniture LED systems, automatic proximity sensor lights, edge-lit shelf profiles, and ambient drawer lighting by Hettich."
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
    {
        "title": "Hettich ProDecor Modern Square Cabinet Pull",
        "slug": "hettich-prodecor-modern-square-pull",
        "category_slug": "cabinet-handles",
        "description": "Elegant geometric square-profile cabinet pull with polished chrome accents, designed for modern vitrines and display cabinets.",
        "image_file": "hettich_cabinet_handles/01_white_display_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Modern"}, {"label": "Material", "value": "Die-Cast Zinc Alloy"}, {"label": "Finish", "value": "Polished Chrome & White"}, {"label": "Hole Distance", "value": "128mm / 160mm"}],
        "benefits": ["Ergonomic pull contour", "Scratch-resistant finish", "Clean architectural design", "Universal cabinet mounting"]
    },
    {
        "title": "Hettich ProDecor Inlaid Wood & Metal Bar Pull",
        "slug": "hettich-prodecor-inlaid-wood-bar-pull",
        "category_slug": "cabinet-handles",
        "description": "Premium architectural handle featuring a dual-tone design combining warm natural timber inserts with a satin chrome metal border.",
        "image_file": "hettich_cabinet_handles/02_wood_drawer_handles.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Organic & Modern"}, {"label": "Material", "value": "Solid Walnut Inlay & Zinc"}, {"label": "Finish", "value": "Brushed Chrome & Walnut"}, {"label": "Hole Distance", "value": "160mm"}],
        "benefits": ["Luxurious tactile sensation", "Harmonious pairing with wood veneers", "Heavy-duty solid construction", "Premium aesthetic"]
    },
    {
        "title": "Hettich ProDecor Continuous Edge Profile Pull",
        "slug": "hettich-prodecor-continuous-edge-profile-pull",
        "category_slug": "cabinet-handles",
        "description": "Sleek full-width anodized aluminium lip-pull handle mounted seamlessly along drawer front edges for handleless styling.",
        "image_file": "hettich_cabinet_handles/03_kitchen_drawer_handle_in_use.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Profile"}, {"label": "Material", "value": "Extruded Aluminium"}, {"label": "Finish", "value": "Matte Inox / Brushed Nickel"}, {"label": "Mounting", "value": "Top-Edge Flush Mount"}],
        "benefits": ["Continuous horizontal line aesthetic", "Ergonomic finger grip from top", "Protects drawer edges from wear", "Perfect for contemporary kitchen suites"]
    },
    {
        "title": "Hettich ProDecor Integrated Base Drawer Edge Handle",
        "slug": "hettich-prodecor-integrated-base-drawer-handle",
        "category_slug": "cabinet-handles",
        "description": "Low-profile edge-mounted handle engineered for heavy kitchen pullouts and internal drawer organizer systems.",
        "image_file": "hettich_cabinet_handles/04_kitchen_drawer_organizer.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Kitchen"}, {"label": "Material", "value": "Architectural Aluminium"}, {"label": "Finish", "value": "Satin Stainless Steel"}, {"label": "Mounting", "value": "Rear Edge Screw Fix"}],
        "benefits": ["Seamless drawer facade", "Unobstructed pull operation", "Fingerprint resistant", "Heavy load tolerance"]
    },
    {
        "title": "Hettich ProDecor Minimalist Slimline Profile Handle",
        "slug": "hettich-prodecor-minimalist-slimline-handle",
        "category_slug": "cabinet-handles",
        "description": "Ultra-slim architectural profile handle offering a clean linear silhouette for modern white lacquered kitchen cabinets.",
        "image_file": "hettich_cabinet_handles/05_white_kitchen_handle_detail.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Profile"}, {"label": "Material", "value": "Anodized Aluminium"}, {"label": "Finish", "value": "Silver Brushed Anodized"}, {"label": "Mounting", "value": "Edge Recessed"}],
        "benefits": ["Minimal projection", "Streamlined handleless aesthetic", "Durable anodized surface", "Easy wipe-clean maintenance"]
    },
    {
        "title": "Hettich ProDecor Concealed Finger-Grip Edge Pull",
        "slug": "hettich-prodecor-concealed-finger-grip-pull",
        "category_slug": "cabinet-handles",
        "description": "Ergonomically curved rear-mounted finger-grip handle providing smooth drawer extension and minimalist exterior appearance.",
        "image_file": "hettich_cabinet_handles/06_open_kitchen_drawer_handle.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Modern"}, {"label": "Material", "value": "Extruded Aluminium Alloy"}, {"label": "Finish", "value": "Matte Slate Metallic"}, {"label": "Mounting", "value": "Rear Cabinet Screw-On"}],
        "benefits": ["Smooth curved underside", "Concealed front profile", "High pull strength", "Complements AvanTech YOU drawers"]
    },
    {
        "title": "Hettich ProDecor Floating Lip Pull for Wood Cabinets",
        "slug": "hettich-prodecor-floating-lip-pull-wood",
        "category_slug": "cabinet-handles",
        "description": "Precision-milled aluminium lip-pull engineered for rich timber cabinetry, providing a subtle metallic contrast and secure grip.",
        "image_file": "hettich_cabinet_handles/07_wood_cabinet_storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Profile"}, {"label": "Material", "value": "Architectural Aluminium"}, {"label": "Finish", "value": "Natural Brushed Aluminium"}, {"label": "Mounting", "value": "Cabinet Front Edge"}],
        "benefits": ["Accentuate natural wood grains", "Robust metal durability", "Minimal dust catch", "Modern loft feel"]
    },
    {
        "title": "Hettich ProDecor Architectural Linear Cabinet Edge Bar",
        "slug": "hettich-prodecor-architectural-linear-edge-bar",
        "category_slug": "cabinet-handles",
        "description": "Contemporary full-width cabinet edge bar pull ensuring effortless access across multi-tier storage modules and kitchen islands.",
        "image_file": "hettich_cabinet_handles/08_wood_cabinet_open_storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Profile"}, {"label": "Material", "value": "Extruded Aluminium"}, {"label": "Finish", "value": "Inox Look Matte"}, {"label": "Mounting", "value": "Hidden Edge Fasteners"}],
        "benefits": ["Full drawer width actuation", "Elegant horizontal shadow line", "Fade-proof anodization", "Soft edge radius"]
    },
    {
        "title": "Hettich ProDecor Full-Height Sliding Wardrobe Profile Handle",
        "slug": "hettich-prodecor-sliding-wardrobe-profile-handle",
        "category_slug": "cabinet-handles",
        "description": "Vertical structural profile handle running the entire height of sliding wardrobe doors, serving both as door stiffener and sleek continuous grip.",
        "image_file": "hettich_cabinet_handles/09_sliding_wardrobe_handle.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Wardrobe"}, {"label": "Material", "value": "Heavy-Duty Structural Aluminium"}, {"label": "Finish", "value": "Matte Silver Anodized"}, {"label": "Length", "value": "2400mm / 2600mm"}],
        "benefits": ["Prevents tall wardrobe door warping", "Full-height access at any posture", "Ultra-slim vertical visual", "Integrates with TopLine XL"]
    },
    {
        "title": "Hettich ProDecor Recessed Wardrobe Door & Drawer Pull",
        "slug": "hettich-prodecor-recessed-wardrobe-pull",
        "category_slug": "cabinet-handles",
        "description": "Flush-mounted minimalist pull profile designed for walk-in closet sliding doors and integrated interior drawer suites.",
        "image_file": "hettich_cabinet_handles/10_wardrobe_with_drawers.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Wardrobe"}, {"label": "Material", "value": "Solid Aluminium"}, {"label": "Finish", "value": "Brushed Champagne Titanium"}, {"label": "Mounting", "value": "Flush Route-In"}],
        "benefits": ["Zero projection for bypass sliding doors", "Luxury closet appeal", "Smooth rounded edges", "Premium tactile feel"]
    },
    {
        "title": "Hettich ProDecor Vertical Edge Grip for Sliding Systems",
        "slug": "hettich-prodecor-vertical-edge-grip-sliding",
        "category_slug": "cabinet-handles",
        "description": "Architectural vertical edge grip specifically proportioned for wood-grain sliding doors, room dividers, and credenzas.",
        "image_file": "hettich_cabinet_handles/11_wood_sliding_cabinet_handle.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Sliding"}, {"label": "Material", "value": "Precision Extruded Aluminium"}, {"label": "Finish", "value": "Satin Nickel"}, {"label": "Mounting", "value": "Door Side Profile"}],
        "benefits": ["Ergonomic natural hand hold", "Flush edge fit", "High torsional rigidity", "Smooth slide interaction"]
    },
    {
        "title": "Hettich ProDecor Sculptural Vanity Bow Handle",
        "slug": "hettich-prodecor-sculptural-vanity-bow-handle",
        "category_slug": "cabinet-handles",
        "description": "Designer vanity drawer handle with tapered sculptural wings and polished standoffs, creating a focal point for luxury bathroom furniture.",
        "image_file": "hettich_cabinet_handles/12_dark_bathroom_vanity_handles.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Deluxe"}, {"label": "Material", "value": "Solid Cast Zinc Alloy"}, {"label": "Finish", "value": "Polished Inox Brass / Platinum"}, {"label": "Hole Distance", "value": "160mm"}],
        "benefits": ["Moisture and humidity resistant", "Architectural statement design", "Deep clearance for easy grip", "Durable multi-layer electroplating"]
    },
    {
        "title": "Hettich ProDecor Classic Linear Bar Handle",
        "slug": "hettich-prodecor-classic-linear-bar-handle",
        "category_slug": "cabinet-handles",
        "description": "Refined square-post linear bar handle offering timeless elegance and balanced proportions for living room sideboards and credenzas.",
        "image_file": "hettich_cabinet_handles/13_white_sideboard_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Modern"}, {"label": "Material", "value": "Solid Zinc Alloy"}, {"label": "Finish", "value": "Bright Polished Chrome"}, {"label": "Hole Distance", "value": "128mm / 192mm"}],
        "benefits": ["Timeless versatile styling", "Superior corrosion resistance", "Solid metal weight", "Harmonious with classic and modern millwork"]
    },
    {
        "title": "Hettich ProDecor Compact Accent Cabinet Pull",
        "slug": "hettich-prodecor-compact-accent-cabinet-pull",
        "category_slug": "cabinet-handles",
        "description": "Compact, refined accent pull engineered for playful multicolor drawer chests, studio furniture, and children's room cabinetry.",
        "image_file": "hettich_cabinet_handles/14_colored_drawer_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor New Modern"}, {"label": "Material", "value": "Die-Cast Zinc"}, {"label": "Finish", "value": "Brushed Matt Chrome"}, {"label": "Hole Distance", "value": "96mm / 128mm"}],
        "benefits": ["Compact footprint", "Rounded safety corners", "Easy grip for all ages", "Stain-resistant coating"]
    },
    {
        "title": "Hettich ProDecor Contemporary Bathroom Vanity Pull",
        "slug": "hettich-prodecor-contemporary-vanity-pull",
        "category_slug": "cabinet-handles",
        "description": "Sleek ergonomic drawer handle engineered specifically for humid bathroom environments with sealed anti-tarnish plating.",
        "image_file": "hettich_cabinet_handles/15_bathroom_vanity_cabinet_handles.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Bathroom"}, {"label": "Material", "value": "High-Grade Zinc & Brass Alloy"}, {"label": "Finish", "value": "Brushed Nickel PVD"}, {"label": "Hole Distance", "value": "160mm / 224mm"}],
        "benefits": ["Tested for wet-room moisture resistance", "Comfortable wide clearance", "Corrosion proof", "Resists soap scum and fingerprints"]
    },
    {
        "title": "Hettich ProDecor Curved Wave Drawer Edge Handle",
        "slug": "hettich-prodecor-curved-wave-drawer-handle",
        "category_slug": "cabinet-handles",
        "description": "Sensual organic wave-profile edge handle that integrates into dark wood and matte slate drawer fronts with flowing lines.",
        "image_file": "hettich_cabinet_handles/16_dark_drawer_handle_in_use.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Organic Wave"}, {"label": "Material", "value": "Extruded Aluminium"}, {"label": "Finish", "value": "Matte Satin Silver"}, {"label": "Mounting", "value": "Top Edge Screwed"}],
        "benefits": ["Sculptural organic curve", "Intuitive under-pull ergonomics", "Striking visual contrast on dark furniture", "Seamless horizontal continuity"]
    },
    {
        "title": "Hettich ProDecor Wave Profile Architectural Detail",
        "slug": "hettich-prodecor-wave-profile-architectural-detail",
        "category_slug": "cabinet-handles",
        "description": "Close-up engineered wave lip handle highlighting the millimeter-precise German machining and ergonomic finger-rest groove.",
        "image_file": "hettich_cabinet_handles/17_dark_drawer_handle_closeup.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Organic Wave"}, {"label": "Material", "value": "Solid Architectural Aluminium"}, {"label": "Finish", "value": "Brushed Natural Anodized"}, {"label": "Mounting", "value": "Edge Screw-On"}],
        "benefits": ["German precision engineering", "Flawless chamfered edges", "Comfort grip radius", "Zero sharp angles"]
    },
    {
        "title": "Hettich ProDecor Long Vertical Wardrobe Bar Handle",
        "slug": "hettich-prodecor-long-vertical-wardrobe-bar",
        "category_slug": "cabinet-handles",
        "description": "Grand-scale vertical wardrobe bar handle delivering a majestic presence and commanding ergonomics on tall floor-to-ceiling wardrobe doors.",
        "image_file": "hettich_cabinet_handles/18_wood_wardrobe_handles.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Deluxe"}, {"label": "Material", "value": "Solid Extruded Brass & Zinc"}, {"label": "Finish", "value": "Brushed Satin Champagne"}, {"label": "Length", "value": "600mm / 800mm"}],
        "benefits": ["Bold architectural height", "Easy operation across any grip height", "Solid weighty feel", "Suitable for heavy closet doors"]
    },
    {
        "title": "Hettich ProDecor Minimalist Square Standoff Handle",
        "slug": "hettich-prodecor-minimalist-square-standoff-handle",
        "category_slug": "cabinet-handles",
        "description": "Clean modern cabinet handle with square standoffs and polished horizontal bar, enhancing living room consoles and media walls.",
        "image_file": "hettich_cabinet_handles/19_living_room_storage_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor Modern"}, {"label": "Material", "value": "Die-Cast Zinc Alloy"}, {"label": "Finish", "value": "Polished Chrome Plated"}, {"label": "Hole Distance", "value": "128mm / 160mm"}],
        "benefits": ["Crisp modernist geometry", "High reflective luxury luster", "Robust mounting with M4 bolts", "Versatile horizontal or vertical mount"]
    },
    {
        "title": "Hettich ProDecor Modular Ergonomic Chest Pull",
        "slug": "hettich-prodecor-modular-ergonomic-chest-pull",
        "category_slug": "cabinet-handles",
        "description": "Universal furniture handle combining slim profile aesthetics with effortless accessibility for modern credenzas and modular drawer stacks.",
        "image_file": "hettich_cabinet_handles/20_modern_multicolor_drawer_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Collection", "value": "ProDecor New Modern"}, {"label": "Material", "value": "Cast Zinc Alloy"}, {"label": "Finish", "value": "Matte Velour Silver"}, {"label": "Hole Distance", "value": "128mm"}],
        "benefits": ["Universal styling across all room designs", "Warm velvety tactile touch", "High impact durability", "Quick front alignment"]
    },

    {
        "title": "Hettich InLine XL Flush-Fitted White Sliding Wardrobe",
        "slug": "hettich-in-line-xl-flush-fitted-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Premium flush-fitting sliding wardrobe system where door panels sit completely coplanar when closed, gliding effortlessly with silent soft-close actuation.",
        "image_file": "hettich_sliding_wardrobe/006_flush_fitted_white_sliding_wardrobe.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "InLine XL Coplanar"}, {"label": "Door Weight Capacity", "value": "Up to 60 kg per door"}, {"label": "Door Thickness", "value": "18 - 25 mm"}, {"label": "Finish", "value": "Alpine White Lacquer with Silver Track"}],
        "benefits": ["Completely flush front aesthetic", "Ultra-silent whisper movement", "Integrated soft-opening & soft-closing", "Full wardrobe accessibility"]
    },
    {
        "title": "Hettich TopLine L Sliding Wardrobe with Integrated Drawers",
        "slug": "hettich-topline-l-sliding-wardrobe-integrated-drawers",
        "category_slug": "wardrobe-systems",
        "description": "Combined floor-to-ceiling wardrobe system integrating TopLine L top-running sliding doors over smooth AvanTech YOU soft-close external drawers.",
        "image_file": "hettich_sliding_wardrobe/010_sliding_wardrobe_with_drawers.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine L & AvanTech YOU"}, {"label": "Runner Type", "value": "Top Running with Bottom Guide"}, {"label": "Drawer Runners", "value": "Actro 5D Soft-Close"}, {"label": "Finish", "value": "Satin White & Brushed Aluminium"}],
        "benefits": ["Convenient external drawer access", "Featherlight sliding action", "Heavy-duty 50 kg runner rating", "Minimal bottom threshold profile"]
    },
    {
        "title": "Hettich Push to Move Handleless Bedroom Sliding Wardrobe",
        "slug": "hettich-push-to-move-handleless-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Sleek handleless sliding wardrobe solution featuring Push to Move mechanical opening\u2014a gentle tap moves the heavy door into open position.",
        "image_file": "hettich_sliding_wardrobe/011_handleless_sliding_door_bedroom.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL with Push to Move"}, {"label": "Opening Mechanism", "value": "Mechanical Push-to-Open"}, {"label": "Door Size", "value": "Up to 3000 mm height x 2000 mm width"}, {"label": "Finish", "value": "Warm Grey Velvet Matte"}],
        "benefits": ["Completely handleless clean facade", "Effortless touch opening without electricity", "Silent soft closing damping", "Ideal for contemporary master suites"]
    },
    {
        "title": "Hettich SlideLine M Multi-Application Sliding Panel System",
        "slug": "hettich-slideline-m-sliding-panel-cabinet-system",
        "category_slug": "wardrobe-systems",
        "description": "Versatile single-track sliding fitting designed for sliding screens and storage panels, bridging dressing rooms, kitchen pantries, and living suites.",
        "image_file": "hettich_sliding_wardrobe/026_modern_kitchen_sliding_panels.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "SlideLine M Single Track"}, {"label": "Panel Thickness", "value": "15 - 25 mm"}, {"label": "Weight Capacity", "value": "Up to 30 kg per panel"}, {"label": "Finish", "value": "Anodized Natural Silver"}],
        "benefits": ["Single or multi-panel versatility", "Smooth glide with zero floor track", "Compact track height of only 8mm", "Gentle soft-close deceleration"]
    },
    {
        "title": "Hettich TopLine M Mid-Weight Sliding Storage Door System",
        "slug": "hettich-topline-m-sliding-doors-living-storage",
        "category_slug": "wardrobe-systems",
        "description": "Architectural top-running sliding door system engineered for mid-size wardrobes, linen closets, and full-wall living room storage cabinets.",
        "image_file": "hettich_sliding_wardrobe/028_living_room_storage_sliding_doors.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine M"}, {"label": "Door Weight", "value": "Up to 35 kg"}, {"label": "Guiding Method", "value": "Concealed STB Bottom Guide"}, {"label": "Finish", "value": "Matte Titanium Silver"}],
        "benefits": ["Smooth quiet rolling action", "Concealed bottom guides", "Effortless door alignment", "Long-lasting maintenance-free runners"]
    },
    {
        "title": "Hettich TopLine XL Full-Height Bedroom Sliding Door Suite",
        "slug": "hettich-topline-xl-full-height-bedroom-sliding-doors",
        "category_slug": "wardrobe-systems",
        "description": "Grand master bedroom wardrobe solution utilizing heavy-duty TopLine XL running gear for smooth ceiling-high panels weighing up to 100 kg.",
        "image_file": "hettich_sliding_wardrobe/058_bedroom_wardrobe_sliding_doors.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL Heavy-Duty"}, {"label": "Door Weight", "value": "Up to 100 kg per door"}, {"label": "Panel Height", "value": "Up to 3000 mm"}, {"label": "Finish", "value": "Champagne Metallic & Oak"}],
        "benefits": ["Effortless motion even with 100kg doors", "Silent System 3-way cushioning", "Invisible top running track design", "Floor-to-ceiling panoramic view"]
    },
    {
        "title": "Hettich SlideLine 55 Plus Duo-Tone Storage Sliding Cabinet",
        "slug": "hettich-slideline-55-plus-duo-tone-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Bottom-running sliding door hardware system designed for duo-tone wardrobe modules and compact linen storage cabinets with quiet nylon rollers.",
        "image_file": "hettich_sliding_wardrobe/064_sliding_door_white_dark_storage_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "SlideLine 55 Plus"}, {"label": "Running Style", "value": "Bottom Running with Top Guide"}, {"label": "Capacity", "value": "15 - 30 kg per door"}, {"label": "Finish", "value": "White & Dark Contrast Styling"}],
        "benefits": ["Economic space-saving sliding action", "Quick clip-on installation", "Height adjustment without tools", "Durable steel running components"]
    },
    {
        "title": "Hettich AvanTech YOU Open Wardrobe Clothes Storage Suite",
        "slug": "hettich-avantech-you-wardrobe-open-clothes-suite",
        "category_slug": "wardrobe-systems",
        "description": "Complete modular walk-in wardrobe interior equipped with illuminated hanging rails, AvanTech YOU thin-walled drawer stacks, and accessory organizers.",
        "image_file": "hettich_sliding_wardrobe/067_bedroom_wardrobe_open_clothes_storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "AvanTech YOU Modular Internal"}, {"label": "Drawer Profile", "value": "13mm Ultra-Slim Drawer Sides"}, {"label": "Lighting", "value": "Integrated LED Inlay Profiles"}, {"label": "Finish", "value": "Pure Matte Anthracite"}],
        "benefits": ["13mm ultra-thin drawer side walls", "Integrated drawer lighting", "Customizable inlay designer profiles", "Maximum internal storage volume"]
    },
    {
        "title": "Hettich TopLine XL Natural Wood Grain Sliding Wardrobe",
        "slug": "hettich-topline-xl-natural-wood-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Luxury bedroom wardrobe featuring rich natural timber veneer doors hung on TopLine XL running gear, eliminating visible floor tracks for seamless carpets.",
        "image_file": "hettich_sliding_wardrobe/072_wood_grain_sliding_wardrobe_bedroom.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL"}, {"label": "Track", "value": "Concealed Overhead Mounting"}, {"label": "Door Weight", "value": "Up to 80 kg"}, {"label": "Finish", "value": "Natural Oak Veneer / Silver"}],
        "benefits": ["No floor tracks to disrupt flooring", "Ultra-smooth dual soft-close", "Door adjustment accessible from front", "Timeless organic warmth"]
    },
    {
        "title": "Hettich Modular Sliding Wardrobe with Accent Shelving",
        "slug": "hettich-modular-sliding-wardrobe-open-accent-shelving",
        "category_slug": "wardrobe-systems",
        "description": "Vibrant contemporary wardrobe suite combining full-length sliding doors with integrated open cubbies for bags, display items, and daily-use accessories.",
        "image_file": "hettich_sliding_wardrobe/075_orange_open_shelf_sliding_wardrobe.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine L 2-Door System"}, {"label": "Door Action", "value": "Overlapping 2-Track Glide"}, {"label": "Shelving Integration", "value": "Open Corner Module"}, {"label": "Finish", "value": "Terracotta Orange Accent & White"}],
        "benefits": ["Quick access open shelving zone", "Smooth overlapping door action", "Anti-collision soft buffers", "Modern boutique hotel aesthetic"]
    },
    {
        "title": "Hettich TopLine L Monochrome Bedroom Sliding Wardrobe",
        "slug": "hettich-topline-l-monochrome-bedroom-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Minimalist monochrome wardrobe system combining crisp white sliding panels with discreet aluminium finger pulls and soft-closing deceleration.",
        "image_file": "hettich_sliding_wardrobe/114_modern_bedroom_sliding_wardrobe.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine L"}, {"label": "Door Overlap", "value": "Minimal 30 mm"}, {"label": "Closing Type", "value": "Silent System Soft Close"}, {"label": "Finish", "value": "Matte White with Chrome Accents"}],
        "benefits": ["Featherweight push to slide", "Whisper-quiet deceleration", "Finger safety damping", "Clean architectural alignment"]
    },
    {
        "title": "Hettich Multi-Tier Sliding Wardrobe & Dressing Suite",
        "slug": "hettich-multi-tier-sliding-wardrobe-open-display",
        "category_slug": "wardrobe-systems",
        "description": "Full-suite master dressing wardrobe blending sliding acoustic door panels with central vanity pullouts, shoe towers, and open display tiers.",
        "image_file": "hettich_sliding_wardrobe/140_sliding_wardrobe_open_storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL & Actro 5D"}, {"label": "Interior System", "value": "Modular Dressing Organizer"}, {"label": "Runners", "value": "Synchronized 5-Way Adjustable"}, {"label": "Finish", "value": "Soft Cashmere Grey & Light Elm"}],
        "benefits": ["Integrated dressing dressing zone", "Synchronized runner stability", "Effortless sliding panels", "Customizable compartments"]
    },
    {
        "title": "Hettich Panoramic Master Wardrobe Sliding Wall Suite",
        "slug": "hettich-panoramic-bedroom-living-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Panoramic floor-to-ceiling sliding wardrobe wall designed to harmonize seamlessly with open-concept master bedroom and living lounge architecture.",
        "image_file": "hettich_sliding_wardrobe/194_bedroom_wardrobe_living_space.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL Multi-Door"}, {"label": "Track System", "value": "3-Track Overlapping"}, {"label": "Door Width", "value": "Up to 1500 mm per leaf"}, {"label": "Finish", "value": "Architectural Grey / Smoked Mirror"}],
        "benefits": ["Panoramic opening width", "3-door continuous glide", "Acoustic vibration dampeners", "Seamless room integration"]
    },
    {
        "title": "Hettich SlideLine M Executive Sliding Credenza System",
        "slug": "hettich-slideline-m-executive-office-sliding-cabinet",
        "category_slug": "wardrobe-systems",
        "description": "Precision sliding credenza and wardrobe cabinet hardware designed for executive offices and suites requiring silent, smooth-gliding storage panels.",
        "image_file": "hettich_sliding_wardrobe/228_office_storage_sliding_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "SlideLine M Heavy-Duty"}, {"label": "Lock Compatibility", "value": "Central Cylinder Lockable"}, {"label": "Runner Track", "value": "Anodized Black / Silver"}, {"label": "Finish", "value": "Executive Walnut & Charcoal"}],
        "benefits": ["Lockable sliding panels for security", "Smooth single-finger glide", "Minimalist exposed track profile", "Commercial grade durability"]
    },
    {
        "title": "Hettich Walk-In Wardrobe Luxury Storage Organizer Suite",
        "slug": "hettich-sensys-avantech-walk-in-wardrobe-interior",
        "category_slug": "wardrobe-systems",
        "description": "High-end walk-in wardrobe interior showcasing integrated LED garment rails, glass-fronted AvanTech YOU jewelry drawers, and adjustable shoe shelving.",
        "image_file": "hettich_sliding_wardrobe/250_walk_in_wardrobe_interior.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "AvanTech YOU & Sensys Hardware"}, {"label": "Drawer Inlays", "value": "Crystal Clear Glass Fronts"}, {"label": "Shelf Supports", "value": "Titan 4 Concealed Brackets"}, {"label": "Finish", "value": "Warm Grey & Smoked Glass"}],
        "benefits": ["Crystal clear drawer inventory view", "Concealed heavy-load brackets", "Integrated LED lighting channels", "Modular shelf reconfigurability"]
    },
    {
        "title": "Hettich TopLine M Minimalist Sliding Wardrobe",
        "slug": "hettich-topline-m-minimalist-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Clean-lined contemporary sliding wardrobe optimized for space-efficient urban apartments, delivering smooth gliding doors with minimal frame footprint.",
        "image_file": "hettich_sliding_wardrobe/268_minimalist_sliding_wardrobe.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine M 2-Track"}, {"label": "Door Thickness", "value": "16 - 22 mm"}, {"label": "Closing", "value": "Silent System Integrated Soft Close"}, {"label": "Finish", "value": "Ultra-Matte White & Anodized Trim"}],
        "benefits": ["Zero room encroachment when opening", "Soft-close on both opening & closing", "Quick height and gap adjustment", "Sleek modern proportion"]
    },
    {
        "title": "Hettich Architectural Sliding Wall Storage System",
        "slug": "hettich-topline-xl-architectural-sliding-wall-unit",
        "category_slug": "wardrobe-systems",
        "description": "Full-span architectural sliding wall cabinet designed to conceal wardrobe modules, entertainment equipment, and modular shelving behind broad gliding panels.",
        "image_file": "hettich_sliding_wardrobe/292_living_room_sliding_storage_wall.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL Full Span"}, {"label": "Panel Span", "value": "Up to 4000 mm overall width"}, {"label": "Guide System", "value": "Flush Concealed Floor Guides"}, {"label": "Finish", "value": "Satin Greige & Anthracite"}],
        "benefits": ["Conceals full storage wall effortlessly", "Continuous horizontal alignment", "Acoustic dampening rollers", "Premium German engineered longevity"]
    },
    {
        "title": "Hettich Illuminated Wardrobe Drawer & Shelving Interior",
        "slug": "hettich-quadro-v6-illuminated-wardrobe-interior",
        "category_slug": "wardrobe-systems",
        "description": "Precision interior fittings suite featuring Quadro V6 concealed runners with push-to-open actuation, felt accessory inserts, and illuminated garment bays.",
        "image_file": "hettich_sliding_wardrobe/314_modern_wardrobe_interior.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "Quadro V6 4D & Push to open Silent"}, {"label": "Weight Rating", "value": "30 kg per internal drawer"}, {"label": "Alignment", "value": "4-Way Tool-less Front Adjustment"}, {"label": "Finish", "value": "Natural Linen Texture & Silver"}],
        "benefits": ["Concealed runners for clean woodwork", "Push-to-open with soft-close combined", "Tool-less fine gap alignment", "Integrated LED illumination compatibility"]
    },
    {
        "title": "Hettich TopLine XL Slatted Wood Panel Sliding Wardrobe",
        "slug": "hettich-topline-xl-slatted-wood-panel-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Bespoke master suite wardrobe hung on TopLine XL running gear, supporting heavy timber slatted acoustic doors with whisper-quiet, frictionless glide.",
        "image_file": "hettich_sliding_wardrobe/340_wood_panel_sliding_wardrobe.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL Heavy-Duty"}, {"label": "Panel Weight", "value": "Up to 80 kg per slatted leaf"}, {"label": "Damping", "value": "4-Point Silent System Cushioning"}, {"label": "Finish", "value": "Fluted Natural Oak & Matte Bronze"}],
        "benefits": ["Supports heavy solid wood and slatted panels", "Vibration-free silent gliding", "Effortless door start force", "Striking architectural presence"]
    },
    {
        "title": "Hettich Dual-Door Sliding Wardrobe & Dressing Suite",
        "slug": "hettich-topline-xl-dual-door-wardrobe-open-suite",
        "category_slug": "wardrobe-systems",
        "description": "Full interior and exterior wardrobe installation demonstrating TopLine XL dual-door opening geometry, providing broad access to double hanging tiers.",
        "image_file": "hettich_sliding_wardrobe/352_wardrobe_interior_open_sliding_doors.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL 2-Door"}, {"label": "Opening Clearance", "value": "Over 50% cabinet front open at once"}, {"label": "Bottom Guide", "value": "Concealed STB 11 Track"}, {"label": "Finish", "value": "Warm White Lacquer & Textured Timber"}],
        "benefits": ["Generous double-tier hanging clearance", "Smooth door deceleration into final position", "No floor track to catch dirt", "Ergonomic internal organizer placement"]
    },
    {
        "title": "Hettich Master Closet Internal Organizer System",
        "slug": "hettich-avantech-you-master-closet-organizer-interior",
        "category_slug": "wardrobe-systems",
        "description": "Comprehensive walk-in closet interior featuring AvanTech YOU drawer boxes with custom glass inlays, trouser pullouts, and tie rack slides.",
        "image_file": "hettich_sliding_wardrobe/362_wardrobe_system_interior.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "AvanTech YOU & Actro 5D"}, {"label": "Specialty Fittings", "value": "Trouser Pull-Out & Velvet Trays"}, {"label": "Side Wall", "value": "13 mm Straight Steel Drawer Sides"}, {"label": "Finish", "value": "Silk White with Glass Inlays"}],
        "benefits": ["Dedicated storage for trousers and jewelry", "Featherlight drawer slide feel", "Scratch-resistant powder coating", "Maximized internal wardrobe volume"]
    },
    {
        "title": "Hettich InLine S Flush Sliding White Wardrobe System",
        "slug": "hettich-in-line-s-white-wardrobe-storage-system",
        "category_slug": "wardrobe-systems",
        "description": "Coplanar flush sliding wardrobe system for mid-size wardrobes, ensuring completely aligned front panels that pop forward slightly and slide aside silently.",
        "image_file": "hettich_sliding_wardrobe/372_white_wardrobe_storage_system.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "InLine S Coplanar Flush"}, {"label": "Door Movement", "value": "Pop-out and parallel slide"}, {"label": "Weight Rating", "value": "Up to 20 kg per door"}, {"label": "Finish", "value": "High-Gloss Alpine White"}],
        "benefits": ["Coplanar completely flat closed doors", "Smooth pop-out sliding kinematics", "Integrated soft-opening and closing", "High-end European showroom appearance"]
    },
    {
        "title": "Hettich Built-In Wardrobe Adjustable Shelving Suite",
        "slug": "hettich-built-in-wardrobe-adjustable-shelf-suite",
        "category_slug": "wardrobe-systems",
        "description": "Heavy-duty internal shelving hardware including Secura locking shelf supports, pull-out storage trays, and integrated LED accent profiles.",
        "image_file": "hettich_sliding_wardrobe/384_built_in_wardrobe_shelves.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "Secura Shelf Supports & Quadro Runners"}, {"label": "Support Rating", "value": "50 kg per shelf tier"}, {"label": "Adjustment Pitch", "value": "Standard 32 mm System"}, {"label": "Finish", "value": "Clean Alpine White"}],
        "benefits": ["Secura anti-tilt locking supports", "Flexible shelf height reconfiguration", "Heavy winter clothing capacity", "Concealed clean hardware lines"]
    },
    {
        "title": "Hettich Sliding Wardrobe with Integrated Media Suite",
        "slug": "hettich-topline-xl-sliding-wardrobe-media-integration",
        "category_slug": "wardrobe-systems",
        "description": "Innovative dual-purpose bedroom wardrobe featuring TopLine XL sliding doors that slide back to reveal or conceal a central television and media console.",
        "image_file": "hettich_sliding_wardrobe/396_wardrobe_tv_storage_unit.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL Media Concealment"}, {"label": "Center Bay", "value": "TV & Entertainment Niche"}, {"label": "Gliding Action", "value": "Bi-directional Silent Glide"}, {"label": "Finish", "value": "White Lacquer & Warm Timber Trim"}],
        "benefits": ["Hides television when not in use", "Smooth bi-directional door glide", "Multi-functional bedroom space usage", "Soft-cushioned stopping points"]
    },
    {
        "title": "Hettich TopLine XL Contemporary White Sliding Wardrobe",
        "slug": "hettich-topline-xl-contemporary-white-sliding-wardrobe",
        "category_slug": "wardrobe-systems",
        "description": "Top-of-the-line contemporary sliding wardrobe suite equipped with full-width TopLine XL overhead track, integrated vertical stiffeners, and triple soft-close.",
        "image_file": "hettich_sliding_wardrobe/404_modern_white_sliding_wardrobe.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "System", "value": "TopLine XL"}, {"label": "Track Mounting", "value": "Concealed Ceiling Track"}, {"label": "Door Capacity", "value": "Up to 80 kg"}, {"label": "Finish", "value": "Matte Pure White"}],
        "benefits": ["Pure floating door appearance", "Triple soft-close (open, close, collision)", "Integrated anti-warping door stiffeners", "German engineering excellence"]
    },

    {
        "title": "Hepo Designer Wall-Mount Bathroom Tissue Holder",
        "slug": "hepo-designer-bathroom-tissue-holder",
        "category_slug": "hepo-hardware",
        "description": "Sleek stainless steel wall-mounted paper tissue dispenser with moisture-resistant chrome finish and concealed screw fixation.",
        "image_file": "hepo_distribution_catalogue/bathroom_tissue_holder.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Stainless Steel SUS304"}, {"label": "Finish", "value": "Polished Chrome"}, {"label": "Mounting", "value": "Wall Concealed Fix"}, {"label": "Application", "value": "Master & Guest Bathrooms"}],
        "benefits": ["Corrosion resistant in high humidity", "Concealed screws for clean wall facade", "Quick roll change mechanism", "Durable solid alloy construction"]
    },
    {
        "title": "Hepo Tempered Glass Bathroom Toiletry Shelf",
        "slug": "hepo-tempered-glass-bathroom-toiletry-shelf",
        "category_slug": "hepo-hardware",
        "description": "Contemporary floating bathroom vanity shelf featuring 8mm shatter-resistant tempered safety glass with heavy-duty chrome guard rails.",
        "image_file": "hepo_distribution_catalogue/bathroom_toiletry_shelf.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Tempered Glass & Zinc Alloy"}, {"label": "Finish", "value": "Polished Chrome & Clear Glass"}, {"label": "Shelf Width", "value": "500 mm"}, {"label": "Load Capacity", "value": "15 kg"}],
        "benefits": ["Protective guard rail prevents item drops", "Shatterproof 8mm tempered glass", "Easy to wipe and clean", "Sleek modern hotel styling"]
    },
    {
        "title": "Hepo Modern Round Bathroom Towel Ring Holder",
        "slug": "hepo-round-towel-ring-holder",
        "category_slug": "hepo-hardware",
        "description": "Ergonomic round hand-towel ring with smooth swivel joint, engineered for vanity and sink mounting with anti-wear nylon dampeners.",
        "image_file": "hepo_distribution_catalogue/bathroom_towel_holder.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Solid Brass & Zinc Alloy"}, {"label": "Finish", "value": "Mirror Polished Chrome"}, {"label": "Joint", "value": "Silent Nylon Swivel Bushing"}, {"label": "Application", "value": "Vanity Hand Towels"}],
        "benefits": ["Silent swivel action with zero squeaks", "Triple-layer chrome anti-rust plating", "Compact vanity footprint", "Firm wall anchoring"]
    },
    {
        "title": "Hepo Heavy-Duty Wall-Mount Single Towel Rail",
        "slug": "hepo-heavy-duty-single-towel-rail",
        "category_slug": "hepo-hardware",
        "description": "Sturdy 600mm horizontal bathroom towel bar manufactured from thickened brass tubes, supporting large bath sheets with zero flex.",
        "image_file": "hepo_distribution_catalogue/bathroom_towel_rail_installed.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Heavy Gauge Brass"}, {"label": "Length", "value": "600 mm"}, {"label": "Finish", "value": "Bright Chrome Plating"}, {"label": "Installation", "value": "Dual Flange Anchors"}],
        "benefits": ["Zero deflection under heavy wet towels", "Generous wall clearance for fast air drying", "Fade and scratch resistant", "Standard architectural spacing"]
    },
    {
        "title": "Hepo Modular Bathroom Vanity Storage Organizer Unit",
        "slug": "hepo-modular-bathroom-vanity-organizer-unit",
        "category_slug": "hepo-hardware",
        "description": "Integrated bathroom vanity drawer hardware including siphon cut-out organizers, moisture-resistant dividers, and soft-close runners.",
        "image_file": "hepo_distribution_catalogue/bathroom_vanity_storage.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "High-Impact Polypropylene & Steel"}, {"label": "Runner", "value": "Soft-Close Telescopic"}, {"label": "Finish", "value": "Matte Grey & Chrome"}, {"label": "Feature", "value": "Siphon Clearance"}],
        "benefits": ["Maximizes awkward under-sink pipe space", "Moisture and cosmetic spill resistant", "Smooth cushioned closing", "Removable trays for easy washing"]
    },
    {
        "title": "Hepo Drainage Shower Caddy & Wall Accessory Shelf",
        "slug": "hepo-shower-caddy-wall-accessory-shelf",
        "category_slug": "hepo-hardware",
        "description": "Precision perforated wall basket designed for shower enclosures and vanity walls, ensuring rapid water drainage and hygiene.",
        "image_file": "hepo_distribution_catalogue/bathroom_wall_accessory_shelf.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Grade 304 Stainless Steel"}, {"label": "Finish", "value": "Satin Brushed Nickel"}, {"label": "Drainage", "value": "Laser-Cut Slotted Base"}, {"label": "Mounting", "value": "Wall Anchored"}],
        "benefits": ["100% rustproof in wet shower zones", "Fast drainage prevents soap residue", "Deep rim prevents bottles tipping", "Heavy load support up to 20 kg"]
    },
    {
        "title": "Hepo 2-Tier Narrow Bottle & Condiment Pull-Out Basket",
        "slug": "hepo-two-tier-bottle-storage-pullout-basket",
        "category_slug": "hepo-hardware",
        "description": "Slimline 150mm base cabinet pullout basket with integrated bottle dividers, providing organized storage for cooking oils and condiments.",
        "image_file": "hepo_distribution_catalogue/bottle_storage_pullout_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Cabinet Width", "value": "150 mm / 200 mm"}, {"label": "Material", "value": "Chrome-Plated Steel Wire"}, {"label": "Runners", "value": "Undermount Soft-Close"}, {"label": "Capacity", "value": "25 kg"}],
        "benefits": ["Transforms narrow kitchen gaps into prime storage", "Stops glass bottles rattling with dividers", "Full-extension visibility", "Effortless soft closing"]
    },
    {
        "title": "Hepo Contemporary Brushed Cabinet Bar Pull",
        "slug": "hepo-contemporary-brushed-cabinet-bar-pull",
        "category_slug": "hepo-hardware",
        "description": "Architectural linear bar pull designed for modern dark laminate drawer fronts and cabinetry, offering a firm ergonomic grip.",
        "image_file": "hepo_distribution_catalogue/cabinet_handles_on_dark_drawers.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Solid Aluminium Alloy"}, {"label": "Finish", "value": "Brushed Satin Silver"}, {"label": "Hole Centers", "value": "160 mm / 224 mm"}, {"label": "Application", "value": "Kitchen & Living Drawers"}],
        "benefits": ["Striking visual contrast on dark cabinetry", "Smooth rounded rear gripping edge", "Stain and fingerprint resistant", "Rigid one-piece metal casting"]
    },
    {
        "title": "Hepo Minimalist Slim Profile Wood Cabinet Handle",
        "slug": "hepo-minimalist-slim-profile-wood-cabinet-handle",
        "category_slug": "hepo-hardware",
        "description": "Subtle low-profile drawer pull engineered to complement rich natural wood grain cabinetry and Scandinavian interior schemes.",
        "image_file": "hepo_distribution_catalogue/cabinet_handles_on_wood_grain_doors.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Cast Zinc Alloy"}, {"label": "Finish", "value": "Matte Pewter"}, {"label": "Hole Distance", "value": "128 mm"}, {"label": "Profile", "value": "Low-Projection Slimline"}],
        "benefits": ["Low projection avoids catches in tight walkways", "Silky tactile touch", "High tensile screw threads", "Timeless organic pairing with wood"]
    },
    {
        "title": "Hepo Classic Architectural Cabinet Bow Handle",
        "slug": "hepo-classic-architectural-cabinet-bow-handle",
        "category_slug": "hepo-hardware",
        "description": "Gracefully curved bow pull handle suitable for wardrobe doors, tall pantry cabinets, and traditional timber joinery.",
        "image_file": "hepo_distribution_catalogue/cabinet_handles_on_wooden_doors.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Heavy Alloy"}, {"label": "Finish", "value": "Brushed Satin Nickel"}, {"label": "Length", "value": "192 mm"}, {"label": "Ergonomics", "value": "Generous Knuckle Clearance"}],
        "benefits": ["Generous hand clearance for comfortable grip", "Harmonizes with classic & modern doors", "High structural strength", "Universal 2-screw installation"]
    },
    {
        "title": "Hepo Modular Adjustable Cutlery Organizer Tray",
        "slug": "hepo-modular-cutlery-organizer-tray",
        "category_slug": "hepo-hardware",
        "description": "Heavy-duty molded cutlery tray with customizable compartment dividers, tailored to fit standard 450mm to 900mm kitchen drawer depths.",
        "image_file": "hepo_distribution_catalogue/cutlery_organizer_kitchen_drawer.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Material", "value": "Food-Grade ABS Polymer"}, {"label": "Color", "value": "Slate Anthracite"}, {"label": "Adjustability", "value": "Modular Snap Dividers"}, {"label": "Fit", "value": "450 mm - 900 mm Drawers"}],
        "benefits": ["Food-grade non-toxic material", "Noise-dampening cutlery compartments", "Removable for easy sink cleaning", "Fits all standard drawer boxes"]
    },
    {
        "title": "Hepo Glass Shutter Sliding Wardrobe Hardware System",
        "slug": "hepo-glass-sliding-wardrobe-track-hardware",
        "category_slug": "hepo-hardware",
        "description": "Smooth sliding runner fitting engineered specifically for aluminium-framed glass wardrobe doors, incorporating integrated anti-jump rollers.",
        "image_file": "hepo_distribution_catalogue/glass_sliding_wardrobe_panels.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Door Weight", "value": "Up to 50 kg per leaf"}, {"label": "Glass Compatibility", "value": "4mm - 6mm Toughened Glass"}, {"label": "Runner", "value": "Ball Bearing Nylon Wheels"}, {"label": "Closing", "value": "Soft Damped"}],
        "benefits": ["Ultra-smooth glide on glass frame shutters", "Anti-derailment jump locks", "Minimal visible hardware footprint", "Smooth quiet operation"]
    },
    {
        "title": "Hepo Heavy-Duty Pull-Out Dish & Saucer Wire Basket",
        "slug": "hepo-pullout-dish-storage-wire-basket",
        "category_slug": "hepo-hardware",
        "description": "Under-counter wire drawer basket equipped with integrated plate slots, removable drip tray, and full-extension telescopic runners.",
        "image_file": "hepo_distribution_catalogue/kitchen_dish_storage_basket.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Cabinet Width", "value": "600 mm / 800 mm"}, {"label": "Material", "value": "Stainless Steel SUS304 Wire"}, {"label": "Runner", "value": "Heavy-Duty Soft Close"}, {"label": "Capacity", "value": "30 kg"}],
        "benefits": ["Upright plate slots prevent chipping", "Integrated bottom drip collector", "Full pullout extension for quick reach", "Durable electroplated coating"]
    },
    {
        "title": "Hepo Multi-Tier Deep Pot & Pan Drawer Storage System",
        "slug": "hepo-multi-tier-deep-pot-drawer-storage-system",
        "category_slug": "hepo-hardware",
        "description": "High-capacity base cabinet drawer system with raised wire gallery rails to hold bulky cookware, pots, and kitchen appliances securely.",
        "image_file": "hepo_distribution_catalogue/kitchen_drawer_storage_system.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Drawer Depth", "value": "500 mm"}, {"label": "Side Height", "value": "High Gallery Rail 204 mm"}, {"label": "Runner", "value": "Synchronized Soft Close"}, {"label": "Load Rating", "value": "45 kg"}],
        "benefits": ["Accommodates tall pressure cookers and stockpots", "Gallery rail prevents items falling off", "Dynamic 45kg load stability", "Smooth silent glide under heavy load"]
    },
    {
        "title": "Hepo Pneumatic Gas Pump Overhead Flap Fitting",
        "slug": "hepo-pneumatic-gas-pump-cabinet-lift-fitting",
        "category_slug": "hepo-hardware",
        "description": "Nitrogen gas lift stay engineered for upward-opening kitchen wall cabinets, providing steady assisted lifting and stay-in-place positioning.",
        "image_file": "hepo_distribution_catalogue/kitchen_gas_pump_lift_up_door.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Force Rating", "value": "80N / 100N / 120N"}, {"label": "Angle", "value": "90\u00b0 - 110\u00b0 Opening Angle"}, {"label": "Gas Medium", "value": "Nitrogen"}, {"label": "Finish", "value": "Metallic Silver & Zinc"}],
        "benefits": ["Effortless one-touch flap opening", "Holds cabinet door securely open during cooking", "Silent cushioned stop at apex", "Tested for over 50,000 cycles"]
    },
    {
        "title": "Hepo Tandem Tall Pantry Pull-Out Wire Basket Suite",
        "slug": "hepo-tandem-tall-pantry-pullout-basket-suite",
        "category_slug": "hepo-hardware",
        "description": "Full-height pantry tower system featuring dual-action wire shelving that pulls internal shelves forward as the cabinet door opens.",
        "image_file": "hepo_distribution_catalogue/kitchen_pantry_wire_basket.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Cabinet Height", "value": "1700 mm - 2000 mm"}, {"label": "Shelf Tiers", "value": "5 or 6 Heavy-Duty Baskets"}, {"label": "Mechanism", "value": "Tandem Door-Linked Pullout"}, {"label": "Capacity", "value": "75 kg Total"}],
        "benefits": ["Simultaneous door and interior basket glide", "Complete panoramic view of pantry goods", "Adjustable basket heights", "Heavy-duty 75kg pantry load rating"]
    },
    {
        "title": "Hepo Universal Base Cabinet Wire Pull-Out Basket",
        "slug": "hepo-universal-kitchen-base-pullout-wire-basket",
        "category_slug": "hepo-hardware",
        "description": "Versatile multipurpose wire basket pullout designed for kitchen base cabinets, ideal for dry grocery storage, packaged goods, and linen.",
        "image_file": "hepo_distribution_catalogue/kitchen_pullout_wire_basket.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Cabinet Width", "value": "450 mm / 600 mm"}, {"label": "Wire Gauge", "value": "6mm Solid Border / 3mm Grid"}, {"label": "Runners", "value": "Side-Mounted Soft-Close"}, {"label": "Capacity", "value": "30 kg"}],
        "benefits": ["Maximizes base cabinet ventilation and light", "Prevents dust accumulation compared to wood shelves", "Featherlight pull action", "Quick clip-on runner release"]
    },
    {
        "title": "Hepo Low-Profile Media Console Drawer Runner System",
        "slug": "hepo-low-profile-media-console-drawer-runner",
        "category_slug": "hepo-hardware",
        "description": "Precision concealed undermount drawer slide with push-to-open and soft-closing damping, designed for sleek floating living room TV units.",
        "image_file": "hepo_distribution_catalogue/living_room_tv_storage_drawer.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "System", "value": "Concealed Undermount Slide"}, {"label": "Actuation", "value": "Push-to-Open + Soft-Close"}, {"label": "Load Rating", "value": "30 kg"}, {"label": "Application", "value": "Entertainment Credenzas"}],
        "benefits": ["Completely hidden beneath the drawer box", "Clean handleless living room media facade", "Smooth progressive extension", "Integrated tool-free height adjustment"]
    },
    {
        "title": "Hepo Parallel Overhead Cabinet Flap Lift Mechanism",
        "slug": "hepo-parallel-overhead-cabinet-lift-mechanism",
        "category_slug": "hepo-hardware",
        "description": "Parallel lift fitting that elevates the cabinet shutter upward parallel to the cabinet front, maintaining clear head space in compact kitchens.",
        "image_file": "hepo_distribution_catalogue/modern_kitchen_lift_up_cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Door Weight", "value": "3.5 - 9.0 kg"}, {"label": "Door Height", "value": "350 - 600 mm"}, {"label": "Motion", "value": "Parallel Vertical Lift"}, {"label": "Finish", "value": "Graphite Grey & Chrome"}],
        "benefits": ["Keeps door out of the chef's workspace", "Stays open in any desired position", "Soft closing dampener integrated", "Ideal for overhead microwave niches"]
    },
    {
        "title": "Hepo Slim Double-Wall Metal Drawer Box System",
        "slug": "hepo-slim-metal-drawer-box-system",
        "category_slug": "hepo-hardware",
        "description": "Modern thin-wall double-sided metal drawer system engineered for seamless kitchen aesthetics, superior load capacity, and effortless glide.",
        "image_file": "hepo_distribution_catalogue/modern_kitchen_open_drawer.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Wall Thickness", "value": "14 mm Slimline"}, {"label": "Runner", "value": "Synchronized Full Extension"}, {"label": "Finish", "value": "Silk Matte White & Anthracite"}, {"label": "Capacity", "value": "40 kg"}],
        "benefits": ["Contemporary 14mm slim side profile", "Synchronized runner stability", "Effortless 3D front adjustment", "High dynamic weight capacity"]
    },
    {
        "title": "Hepo Panoramic Glass Sliding Wardrobe Roller Kit",
        "slug": "hepo-panoramic-glass-sliding-wardrobe-roller-kit",
        "category_slug": "hepo-hardware",
        "description": "Top-hung sliding hardware system designed for floor-to-ceiling glass wardrobe doors, ensuring ultra-quiet motion and minimal visual intrusion.",
        "image_file": "hepo_distribution_catalogue/modern_wardrobe_glass_sliding_doors.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "System", "value": "Top-Hung Sliding Roller"}, {"label": "Door Weight", "value": "Up to 60 kg"}, {"label": "Wheels", "value": "High-Density Polyoxymethylene (POM)"}, {"label": "Track", "value": "Extruded Aluminium"}],
        "benefits": ["Whisper-quiet gliding on precision bearings", "Zero bottom track required on flooring", "Integrated bi-directional soft close", "Anti-derailment safety catches"]
    },
    {
        "title": "Hepo 3-Tier Narrow Kitchen Spice Rack Pull-Out",
        "slug": "hepo-compact-three-tier-spice-pullout",
        "category_slug": "hepo-hardware",
        "description": "Ultra-compact 3-tier wire spice rack pullout designed to fit narrow 100mm to 150mm cabinets next to cooking hobs.",
        "image_file": "hepo_distribution_catalogue/narrow_kitchen_spice_pullout.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Cabinet Width", "value": "100 mm - 150 mm"}, {"label": "Tiers", "value": "3 Fixed Wire Trays"}, {"label": "Mounting", "value": "Side-Mounted Telescopic"}, {"label": "Finish", "value": "Mirror Chrome Plated"}],
        "benefits": ["Keeps all spices immediately accessible by the hob", "Compact space-saving design", "Stoppers prevent small spice jars from falling", "Smooth ball-bearing glide"]
    },
    {
        "title": "Hepo Bi-Fold Overhead Cabinet Lift-Up Mechanism",
        "slug": "hepo-bi-fold-overhead-cabinet-lift-system",
        "category_slug": "hepo-hardware",
        "description": "Two-piece bi-fold lift fitting that folds dual doors upward smoothly, allowing generous interior access for large multi-tier overhead cabinets.",
        "image_file": "hepo_distribution_catalogue/overhead_cabinet_bifold_lift_up.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Cabinet Height", "value": "600 mm - 1040 mm"}, {"label": "Door Weight", "value": "Up to 15 kg"}, {"label": "Mechanism", "value": "Bi-Fold Articulated Arm"}, {"label": "Closing", "value": "Integrated Soft Damping"}],
        "benefits": ["Full access to upper and lower cabinet shelves", "Finger-pinch safety hinge geometry", "Effortless opening with progressive power assist", "Adjustable stopping angle"]
    },
    {
        "title": "Hepo Up-and-Over Overhead Cabinet Lift Stay",
        "slug": "hepo-up-and-over-overhead-cabinet-stay",
        "category_slug": "hepo-hardware",
        "description": "Specialized up-and-over flap fitting that tilts the door upward and over the cabinet top, ideal for overhead kitchen storage with cornices.",
        "image_file": "hepo_distribution_catalogue/overhead_kitchen_cabinet_lift_up.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Door Weight", "value": "4 - 12 kg"}, {"label": "Door Width", "value": "Up to 1200 mm"}, {"label": "Arm Material", "value": "Cold-Rolled Steel"}, {"label": "Finish", "value": "Titanium Grey"}],
        "benefits": ["Swings door clear of head height", "Smooth frictionless motion", "Tool-less clip-on front bracket", "Reliable multi-year spring tension"]
    },
    {
        "title": "Hepo Heavy-Duty Dinnerware Pull-Out Drawer Organizer",
        "slug": "hepo-heavy-duty-dinnerware-pullout-drawer-organizer",
        "category_slug": "hepo-hardware",
        "description": "Deep drawer wire organizer with adjustable peg system and wire separators, engineered to keep ceramic dinnerware safe from sliding.",
        "image_file": "hepo_distribution_catalogue/plate_storage_pullout_drawer.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Cabinet Width", "value": "600 mm / 900 mm"}, {"label": "Material", "value": "Heavy Chrome Wire & Solid Base"}, {"label": "Runner", "value": "Heavy-Duty Soft-Close"}, {"label": "Capacity", "value": "35 kg"}],
        "benefits": ["Prevents dinnerware sliding and chipping", "Flexible partition layout for plates & bowls", "Full-extension runners for effortless unloading", "High load capacity"]
    },
    {
        "title": "Hepo Concealed Soft-Close Undermount Drawer Runners (Pair)",
        "slug": "hepo-concealed-soft-close-drawer-runners-pair",
        "category_slug": "hepo-hardware",
        "description": "Pair of concealed undermount drawer slides with hydraulic damping pistons, delivering silent, whisper-soft self-closing performance.",
        "image_file": "hepo_distribution_catalogue/soft_close_drawer_runner_installed.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Length", "value": "350 mm - 550 mm"}, {"label": "Type", "value": "Concealed Undermount Full Extension"}, {"label": "Damping", "value": "Fluid Hydraulic Piston"}, {"label": "Capacity", "value": "35 kg"}],
        "benefits": ["Completely invisible when drawer is open", "Fluid hydraulic damper eliminates slams", "Quick clip-on front locking devices", "Smooth steel ball track"]
    },
    {
        "title": "Hepo Heavy-Duty Hydraulic Storage Bed Lift Fitting",
        "slug": "hepo-heavy-duty-hydraulic-bed-storage-lift-fitting",
        "category_slug": "hepo-hardware",
        "description": "Gas-hydraulic bed lift mechanism engineered to elevate heavy mattresses effortlessly, revealing expansive concealed under-bed storage.",
        "image_file": "hepo_distribution_catalogue/storage_bed_lift_up_compartment.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Piston Force", "value": "1200N / 1500N Heavy-Duty"}, {"label": "Bed Compatibility", "value": "King & Queen Size Frames"}, {"label": "Angle", "value": "45\u00b0 Elevation"}, {"label": "Finish", "value": "Powder Coated Black Steel"}],
        "benefits": ["Effortless lifting of heavy king mattresses", "Reveals entire under-bed space for luggage & linen", "Safety locking lockouts prevent accidental closure", "Heavy-gauge steel bracket construction"]
    },
    {
        "title": "Hepo 3-Fold Heavy-Duty Telescopic Drawer Slides (Pair)",
        "slug": "hepo-three-fold-telescopic-ball-bearing-drawer-slides",
        "category_slug": "hepo-hardware",
        "description": "Precision 45mm side-mounted 3-fold ball bearing telescopic slides built from high-strength zinc-plated steel for workshop and kitchen cabinetry.",
        "image_file": "hepo_distribution_catalogue/telescopic_drawer_runner_installed.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Width", "value": "45 mm Profile"}, {"label": "Extension", "value": "100% Full Extension 3-Fold"}, {"label": "Steel Thickness", "value": "1.2 x 1.2 x 1.5 mm"}, {"label": "Load Capacity", "value": "45 kg"}],
        "benefits": ["100% full extension reaches rear corners", "Heavy 45kg dynamic load rating", "Precision solid steel ball bearings", "Quick disconnect release lever"]
    },
    {
        "title": "Hepo Wardrobe Internal Deep Storage Drawer System",
        "slug": "hepo-wardrobe-internal-deep-drawer-organizer",
        "category_slug": "hepo-hardware",
        "description": "Internal wardrobe drawer module featuring soft-close runners and fabric accessory dividers, custom-engineered for folded knitwear and bed linens.",
        "image_file": "hepo_distribution_catalogue/wardrobe_drawer_storage.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "System", "value": "Internal Wardrobe Drawer Module"}, {"label": "Height", "value": "200 mm Deep"}, {"label": "Runners", "value": "Undermount Soft Close"}, {"label": "Finish", "value": "Cashmere Grey Powder Coat"}],
        "benefits": ["Optimized for bulky clothing & linens", "Concealed slides prevent snagging delicate fabrics", "Cushioned soft stop", "Modular stacking compatibility"]
    },
    {
        "title": "Hepo Modular Wardrobe Open-Front Tray Drawer Suite",
        "slug": "hepo-modular-wardrobe-open-tray-drawer-suite",
        "category_slug": "hepo-hardware",
        "description": "Ergonomic low-front internal wardrobe pull-out trays providing immediate visibility of watches, belts, folded shirts, and daily essentials.",
        "image_file": "hepo_distribution_catalogue/wardrobe_open_storage_drawers.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "Profile", "value": "Low-Front Visibility Cutout"}, {"label": "Runner", "value": "Full-Extension Soft Close"}, {"label": "Load", "value": "30 kg"}, {"label": "Material", "value": "Premium Coated Steel"}],
        "benefits": ["Instant visual overview without opening fully", "Low front lip for ergonomic reach-in", "Smooth silent gliding action", "Customizable partition compartments"]
    },
    {
        "title": "Hepo Top-Running Bedroom Sliding Wardrobe Fitting Set",
        "slug": "hepo-topline-bedroom-sliding-wardrobe-fitting-set",
        "category_slug": "hepo-hardware",
        "description": "Complete hardware fitting set for 2-door or 3-door sliding bedroom wardrobes, featuring heavy-duty top trolleys, bottom guides, and soft closing.",
        "image_file": "hepo_distribution_catalogue/wardrobe_sliding_doors_bedroom.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "System", "value": "Top-Running Sliding Fitting"}, {"label": "Door Weight", "value": "Up to 60 kg per door"}, {"label": "Door Thickness", "value": "18 - 28 mm"}, {"label": "Guides", "value": "Spring-Loaded Bottom Rollers"}],
        "benefits": ["Complete hardware kit for full wardrobe build", "Silent nylon rollers on aluminium track", "Anti-collision soft buffers included", "Effortless door alignment screws"]
    },
    {
        "title": "Hepo Compact Wood Door Sliding Wardrobe Runner System",
        "slug": "hepo-compact-wood-door-sliding-wardrobe-runners",
        "category_slug": "hepo-hardware",
        "description": "Space-saving bottom-running sliding fitting set designed for built-in wooden wardrobes and residential linen closets with smooth nylon guide wheels.",
        "image_file": "hepo_distribution_catalogue/wood_sliding_wardrobe_interior.jpg",
        "specs": [{"label": "Brand", "value": "Hepo (Hettich Group)"}, {"label": "System", "value": "Bottom-Running Sliding Hardware"}, {"label": "Wheel Type", "value": "High-Wear Ball-Bearing Nylon"}, {"label": "Door Weight", "value": "Up to 40 kg"}, {"label": "Track", "value": "Low-Profile Floor Track"}],
        "benefits": ["Minimal track height prevents tripping", "Durable sealed bearings", "Quick height adjustment with screwdriver", "Budget-friendly German engineered quality"]
    },

    {
        "title": "Hettich Ideenbuch Tailored Bathroom Vanity Organizer Suite",
        "slug": "hettich-ideenbuch-bathroom-drawer-organizer",
        "category_slug": "das-ideenbuch",
        "description": "Architectural under-vanity drawer organizer system from Das Ideenbuch with customized dividers for cosmetics and grooming essentials.",
        "image_file": "das_ideenbuch_2018/bathroom-drawer-organizer.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "AvanTech YOU Internal"}, {"label": "Finish", "value": "Pure Matte Anthracite"}, {"label": "Application", "value": "Bathroom Vanity Stacks"}],
        "benefits": ["Custom compartment layouts for cosmetics", "Moisture-resistant composite structure", "Concealed Actro 5D smooth glide", "Bespoke European bathroom aesthetic"]
    },
    {
        "title": "Hettich Ideenbuch Floating Vertical Bathroom Vitrine",
        "slug": "hettich-ideenbuch-floating-bathroom-storage-cabinet",
        "category_slug": "das-ideenbuch",
        "description": "Slimline floating bathroom wall cabinet featuring push-to-open Sensys concealed hinges, illuminated glass shelving, and moisture-sealed edges.",
        "image_file": "das_ideenbuch_2018/bathroom-storage-cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Hinge System", "value": "Sensys Push to open"}, {"label": "Shelving", "value": "Tempered Glass with LED Channels"}, {"label": "Finish", "value": "Satin Greige & Oak"}],
        "benefits": ["Push-to-open handleless vanity elevation", "Shadow-free integrated shelf lighting", "110\u00b0 wide-angle opening clearance", "Zero floor contact for easy cleaning"]
    },
    {
        "title": "Hettich Ideenbuch Integrated Double Basin Vanity Suite",
        "slug": "hettich-ideenbuch-integrated-double-vanity-storage",
        "category_slug": "das-ideenbuch",
        "description": "Expansive luxury master bathroom double vanity suite combining tiered soft-close pullouts, siphon clearance cutaways, and ambient accent lighting.",
        "image_file": "das_ideenbuch_2018/bathroom-vanity-and-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Drawer System", "value": "AvanTech YOU Double Stacks"}, {"label": "Runner", "value": "Actro 5D Full Extension"}, {"label": "Load Capacity", "value": "40 kg per tier"}],
        "benefits": ["Siphon cutaways preserve maximum drawer volume", "Dual basin symmetrical layout", "Featherlight glide under full load", "Soft-closing hydraulic dampening"]
    },
    {
        "title": "Hettich Ideenbuch Monolithic Architectural Vanity Suite",
        "slug": "hettich-ideenbuch-monolithic-vanity-drawer-system",
        "category_slug": "das-ideenbuch",
        "description": "Floor-mounted and wall-cantilevered monolithic bathroom vanity featuring wide-span deep pullouts with felt organizing liners and integrated dividers.",
        "image_file": "das_ideenbuch_2018/bathroom-vanity-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Drawer Width", "value": "1200 mm Wide-Span"}, {"label": "Inlay", "value": "Dark Wood & Felt Insets"}, {"label": "Runners", "value": "Heavy-Duty Synchronized Slides"}],
        "benefits": ["Extra-wide 1200mm single drawer pullout", "Felt insets prevent cosmetic sliding", "Seamless monolithic stone facade pairing", "Synchronized runner stability"]
    },
    {
        "title": "Hettich Ideenbuch Floor-to-Ceiling Master Sliding Wardrobe",
        "slug": "hettich-ideenbuch-floor-to-ceiling-sliding-wardrobe",
        "category_slug": "das-ideenbuch",
        "description": "Grand bedroom wardrobe concept utilizing TopLine XL top-running gear to glide colossal floor-to-ceiling timber panels with fingertip effort.",
        "image_file": "das_ideenbuch_2018/bedroom-sliding-wardrobe.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "TopLine XL Overhead Runner"}, {"label": "Door Height", "value": "Up to 3000 mm"}, {"label": "Door Weight", "value": "Up to 100 kg"}],
        "benefits": ["Panels glide effortlessly with one finger", "Concealed ceiling-mounted runner track", "Silent System 3-way cushioning", "Grand floor-to-ceiling room proportion"]
    },
    {
        "title": "Hettich Ideenbuch Open Master Walk-In Wardrobe Suite",
        "slug": "hettich-ideenbuch-walk-in-wardrobe-open-suite",
        "category_slug": "das-ideenbuch",
        "description": "Sophisticated walk-in dressing suite with illuminated hanging gallerias, AvanTech YOU glass-fronted drawers, and open accessory cubbies.",
        "image_file": "das_ideenbuch_2018/bedroom-wardrobe-open-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Internal Fitting", "value": "AvanTech YOU & Quadro Runners"}, {"label": "Illumination", "value": "Channel-Embedded Warm LEDs"}, {"label": "Material", "value": "Smoked Oak & Glass"}],
        "benefits": ["Full panoramic view of wardrobe inventory", "Glass front drawers showcase jewelry and watches", "Integrated warm ambient garment lighting", "Customizable shelf heights"]
    },
    {
        "title": "Hettich Ideenbuch Modular Youth Room Storage Wall",
        "slug": "hettich-ideenbuch-modular-childrens-room-wall-storage",
        "category_slug": "das-ideenbuch",
        "description": "Safe, durable modular youth room storage wall combining colorful cabinet modules, push-to-open doors, and soft-cushioned drawer runners.",
        "image_file": "das_ideenbuch_2018/childrens-room-storage-cabinets.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Safety Features", "value": "Anti-Pinch Dampeners & Rounded Profiles"}, {"label": "Hinges", "value": "Sensys with Soft-Close"}, {"label": "Finish", "value": "Pastel Accents & White"}],
        "benefits": ["Finger-pinch safety geometry", "Gentle deceleration prevents slamming", "Modular growth adaptable over time", "Heavy toy load capacity"]
    },
    {
        "title": "Hettich Ideenbuch Low-Profile Toy Storage Bench & Drawers",
        "slug": "hettich-ideenbuch-low-profile-toy-storage-bench",
        "category_slug": "das-ideenbuch",
        "description": "Multi-functional seating bench with deep heavy-duty pull-out toy drawers, featuring heavy load Quadro runners and safety soft-closing.",
        "image_file": "das_ideenbuch_2018/childrens-room-toy-storage-bench.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Runner", "value": "Quadro 4D Soft-Close"}, {"label": "Load Rating", "value": "50 kg per drawer"}, {"label": "Application", "value": "Playroom Seating & Storage"}],
        "benefits": ["Dual purpose seating bench and deep storage", "50kg load capacity holds heavy books & toys", "Concealed runners prevent small fingers snagging", "Effortless push-to-close action"]
    },
    {
        "title": "Hettich Ideenbuch Nursery Wardrobe & Care Storage Suite",
        "slug": "hettich-ideenbuch-nursery-wardrobe-integrated-storage",
        "category_slug": "das-ideenbuch",
        "description": "Harmonious nursery storage arrangement with whisper-quiet sliding wardrobe doors and soft-closing linen drawers designed for silent nighttime operation.",
        "image_file": "das_ideenbuch_2018/childrens-room-wardrobe-and-crib.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Mechanism", "value": "Silent System Sliding & Soft-Close Runners"}, {"label": "Acoustic Level", "value": "Sub-30dB Whisper Motion"}, {"label": "Finish", "value": "Non-Toxic Soft White"}],
        "benefits": ["Ultra-silent movement prevents waking baby", "Concealed mechanical components for safety", "Soft-touch closing on all drawers and doors", "Ergonomic baby linen compartments"]
    },
    {
        "title": "Hettich Ideenbuch Adaptable Youth Wardrobe Storage System",
        "slug": "hettich-ideenbuch-growing-youth-wardrobe-system",
        "category_slug": "das-ideenbuch",
        "description": "Cleverly partitioned youth wardrobe featuring adjustable hanging rails, stackable internal drawers, and lower compartments accessible to growing children.",
        "image_file": "das_ideenbuch_2018/childrens-room-wardrobe-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "TopLine L & Quadro Runners"}, {"label": "Partition", "value": "Dual Height Hanging & Stacked Trays"}, {"label": "Finish", "value": "Scandinavian Pine & White"}],
        "benefits": ["Adjustable heights grow with child", "Low pullout drawers encourage independence", "Whisper-quiet sliding doors save bedroom space", "Heavy-duty wear resistant runners"]
    },
    {
        "title": "Hettich Ideenbuch Compact Foldaway Home Office Cabinet",
        "slug": "hettich-ideenbuch-compact-foldaway-home-office-cabinet",
        "category_slug": "das-ideenbuch",
        "description": "Space-saving architectural home office concealed inside a sleek cabinet, with bi-fold pocket doors, pull-out keyboard desk, and cable management.",
        "image_file": "das_ideenbuch_2018/compact-home-office-cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Hardware", "value": "WingLine L Bi-Fold & Heavy Desk Slide"}, {"label": "Working Desk Rating", "value": "60 kg Capacity"}, {"label": "Finish", "value": "Matte Graphite & Natural Elm"}],
        "benefits": ["Hides entire home workstation behind doors", "Bi-fold doors push aside without blocking room", "Heavy load desk shelf holds monitors safely", "Integrated wire passages"]
    },
    {
        "title": "Hettich Ideenbuch Concealed Larder Pull-Out System",
        "slug": "hettich-ideenbuch-concealed-larder-pull-out-unit",
        "category_slug": "das-ideenbuch",
        "description": "Architectural concealed pull-out cabinet revealing multi-tier internal organization with transparent side panels and smooth full-extension action.",
        "image_file": "das_ideenbuch_2018/concealed-cabinet-pull-out.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Runner", "value": "Actro 5D Undermount"}, {"label": "Visibility", "value": "Glass Side Panels"}, {"label": "Capacity", "value": "70 kg Full Load"}],
        "benefits": ["Full 100% extension reveals all stored goods", "Glass side walls for total side visibility", "70kg heavy load capacity", "Continuous fluid soft deceleration"]
    },
    {
        "title": "Hettich Ideenbuch Ergonomic Elevated Appliance Pull-Out",
        "slug": "hettich-ideenbuch-ergonomic-elevated-dishwasher-system",
        "category_slug": "das-ideenbuch",
        "description": "Comfort-oriented kitchen concept elevating dishwashers and heavy appliances to waist height with heavy-load runners and anti-vibration framing.",
        "image_file": "das_ideenbuch_2018/dishwasher-pull-out-drawer.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Quadro Heavy Duty Appliance Framing"}, {"label": "Working Elevation", "value": "450 mm Above Floor"}, {"label": "Finish", "value": "Brushed Stainless & Anthracite"}],
        "benefits": ["Eliminates bending down to unload dishes", "Heavy-duty steel support holds full water weight", "Vibration absorbing silent mounting", "Seamless integrated kitchen facade"]
    },
    {
        "title": "Hettich Ideenbuch Architectural Glass Display Vitrine",
        "slug": "hettich-ideenbuch-architectural-glass-display-vitrine",
        "category_slug": "das-ideenbuch",
        "description": "Floor-to-ceiling glass vitrine system with ultra-slim anodized aluminium framing, concealed pivot hinges, and shadowless perimeter LED illumination.",
        "image_file": "das_ideenbuch_2018/display-cabinet-with-glass-doors.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Profile", "value": "19mm Slimline Aluminium Framing"}, {"label": "Hinges", "value": "Sensys Integrated Glass Hinges"}, {"label": "Illumination", "value": "Edge-Embedded Warm LEDs"}],
        "benefits": ["Minimalist 19mm frame maximizes glass area", "Concealed hinges mount directly to metal profile", "Illuminates luxury glassware and collectibles", "Dust-sealed perimeter gasket"]
    },
    {
        "title": "Hettich Ideenbuch Modular Stacked Drawer Storage Unit",
        "slug": "hettich-ideenbuch-modular-chest-drawer-storage-unit",
        "category_slug": "das-ideenbuch",
        "description": "Contemporary lowboard drawer suite showcasing pure geometric drawer alignments, push-to-open silent mechanisms, and customizable drawer profiles.",
        "image_file": "das_ideenbuch_2018/drawer-storage-unit.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "AvanTech YOU & Push to open Silent"}, {"label": "Front Gap", "value": "Minimal 1.5 mm Reveal"}, {"label": "Finish", "value": "Matte Pearl White"}],
        "benefits": ["Push to open and soft close combined seamlessly", "Razor-sharp 1.5mm minimal panel reveal gaps", "Tool-free 4D front alignment", "Silky tactile drawer touch"]
    },
    {
        "title": "Hettich Ideenbuch Motorized Height-Adjustable Executive Desk",
        "slug": "hettich-ideenbuch-ergonomic-motorized-height-adjustable-desk",
        "category_slug": "das-ideenbuch",
        "description": "Modern ergonomic executive desk system equipped with motorized lifting columns, memory positioning, collision detection, and cable raceways.",
        "image_file": "das_ideenbuch_2018/height-adjustable-home-office.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Steelforce Motorized Desk Frame"}, {"label": "Height Range", "value": "620 mm - 1280 mm"}, {"label": "Capacity", "value": "100 kg"}],
        "benefits": ["Switch between sitting and standing effortlessly", "Anti-collision safety sensors", "Whisper-quiet dual motor synchronization", "Integrated under-desk power and cable trough"]
    },
    {
        "title": "Hettich Ideenbuch Hybrid Living & Home Office Suite",
        "slug": "hettich-ideenbuch-hybrid-living-home-office-suite",
        "category_slug": "das-ideenbuch",
        "description": "Harmonious open-concept interior concept bridging executive home working and luxury living lounge spaces with matching sliding partitions.",
        "image_file": "das_ideenbuch_2018/home-office-and-living-space.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Systems", "value": "TopLine XL Sliding & AvanTech YOU Storage"}, {"label": "Finish", "value": "Walnut Veneer & Anthracite Steel"}],
        "benefits": ["Cohesive design language across living & work zones", "Slide doors to instantly conceal workspace after hours", "Superior acoustic dampening panels", "Integrated ambient media lighting"]
    },
    {
        "title": "Hettich Ideenbuch Compact Linear Kitchen Cabinetry Suite",
        "slug": "hettich-ideenbuch-compact-linear-kitchen-cabinetry",
        "category_slug": "das-ideenbuch",
        "description": "Precision urban kitchen arrangement incorporating slimline pullouts, overhead flap fittings, and deep drawer stacks for optimized culinary workflow.",
        "image_file": "das_ideenbuch_2018/kitchen-cabinet-and-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Hardware", "value": "AvanTech YOU & Free Flap Stays"}, {"label": "Runner", "value": "Actro 5D with Silent System"}, {"label": "Finish", "value": "Cashmere Grey & Natural Oak"}],
        "benefits": ["Maximum kitchen utility in compact floor plan", "Overhead doors stay open without blocking cooking", "Full-extension heavy drawer runners", "Clean architectural panel lines"]
    },
    {
        "title": "Hettich Ideenbuch Open Accent Kitchen Cabinet System",
        "slug": "hettich-ideenbuch-open-accent-kitchen-cabinet-system",
        "category_slug": "das-ideenbuch",
        "description": "Contemporary kitchen wall system pairing closed handleless lacquer cabinets with warm timber open display cubbies for spices and dinnerware.",
        "image_file": "das_ideenbuch_2018/kitchen-open-storage-cabinets.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Sensys Push-to-Open & Titan Brackets"}, {"label": "Finish", "value": "Forest Green & Natural Oak"}, {"label": "Capacity", "value": "30 kg per shelf"}],
        "benefits": ["Dynamic contrast between open wood & closed lacquer", "Invisible heavy-load floating shelf brackets", "Handleless clean cabinet fronts", "Ergonomic immediate spice grab zone"]
    },
    {
        "title": "Hettich Ideenbuch Laundry & Utility Pull-Out Sorter Suite",
        "slug": "hettich-ideenbuch-laundry-utility-pull-out-sorter",
        "category_slug": "das-ideenbuch",
        "description": "High-utility laundry cabinet featuring integrated pull-out laundry hampers, detergent pull-out baskets, and moisture-resistant hardware.",
        "image_file": "das_ideenbuch_2018/laundry-room-pull-out-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Heavy-Duty Undermount Sorter Slides"}, {"label": "Capacity", "value": "50 kg Dynamic Load"}, {"label": "Finish", "value": "Moisture-Resistant Inox & Grey"}],
        "benefits": ["Built-in multi-compartment laundry sorting", "Smooth gliding under full 50kg wet linen load", "Detergent drip protection base", "Keeps laundry room clutter completely hidden"]
    },
    {
        "title": "Hettich Ideenbuch Illuminated Vertical Living Room Vitrine",
        "slug": "hettich-ideenbuch-illuminated-vertical-living-vitrine",
        "category_slug": "das-ideenbuch",
        "description": "Tall slender living room showcase cabinet with dark architectural glass, push-to-open Sensys concealed hinges, and warm vertical LED strip lighting.",
        "image_file": "das_ideenbuch_2018/living-room-display-cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Height", "value": "2200 mm Tall Column"}, {"label": "Hinges", "value": "Sensys Black Obsidian Hinges"}, {"label": "Glass", "value": "Smoked Grey Tempered Glass"}],
        "benefits": ["Sensys Black Obsidian hinges blend into dark interiors", "Warm vertical light ribbons illuminate art pieces", "Push-to-open handleless glass door", "Slim column optimizes living room corners"]
    },
    {
        "title": "Hettich Ideenbuch Floating Glass-Front Media Display Unit",
        "slug": "hettich-ideenbuch-floating-glass-front-media-cabinet",
        "category_slug": "das-ideenbuch",
        "description": "Wall-hung floating living room credenza combining smoked glass flap doors with soft-lift gas stays and integrated AvanTech YOU media drawers.",
        "image_file": "das_ideenbuch_2018/living-room-glass-display-cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Suspension", "value": "SAH 216 Heavy-Duty Wall Hangers"}, {"label": "Flap Stay", "value": "Lift Advanced HF with Soft-Close"}, {"label": "Finish", "value": "Dark Peat Oak & Smoked Glass"}],
        "benefits": ["SAH 216 concealed brackets support up to 150kg", "Remote-control friendly smoked glass front", "Featherlight soft-lifting glass flaps", "Floating appearance enlarges room visual"]
    },
    {
        "title": "Hettich Ideenbuch Architectural Living Room Sideboard",
        "slug": "hettich-ideenbuch-architectural-living-room-sideboard",
        "category_slug": "das-ideenbuch",
        "description": "Modern low-profile living room sideboard featuring sliding doors on SlideLine M hardware, allowing artful shifting of open and closed cabinet zones.",
        "image_file": "das_ideenbuch_2018/living-room-sideboard.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Hardware", "value": "SlideLine M Single-Track Sliding"}, {"label": "Panel Thickness", "value": "18 - 25 mm"}, {"label": "Damping", "value": "Silent System Bi-Directional"}],
        "benefits": ["Sliding panel shifts position to alter storage look", "Ultra-quiet single-track sliding action", "Zero floor track maintains clean woodwork", "Combines book display with closed storage"]
    },
    {
        "title": "Hettich Ideenbuch Geometric Modular Display Cube System",
        "slug": "hettich-ideenbuch-geometric-modular-display-cube",
        "category_slug": "das-ideenbuch",
        "description": "Playful modular display cubes mounted with concealed floating hardware, allowing limitless architectural wall compositions in modern living areas.",
        "image_file": "das_ideenbuch_2018/modern-display-cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Suspension", "value": "Titan 4 Concealed Shelf Support"}, {"label": "Material", "value": "Lacquered MDF & Natural Ash"}, {"label": "Finish", "value": "Matte Monochrome"}],
        "benefits": ["Completely hidden mounting with zero visible screws", "Freely reconfigurable grid composition", "Rigid anti-sag steel core rods", "Modern minimalist museum styling"]
    },
    {
        "title": "Hettich Ideenbuch Luxury Monochrome Kitchen Cabinetry Suite",
        "slug": "hettich-ideenbuch-luxury-monochrome-kitchen-cabinetry",
        "category_slug": "das-ideenbuch",
        "description": "Flagship modern kitchen concept featuring uninterrupted handleless Gola channels, AvanTech YOU drawer internal organizers, and sleek dark stone surfaces.",
        "image_file": "das_ideenbuch_2018/modern-kitchen-cabinetry.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Horizontal & Vertical Gola Profiles"}, {"label": "Finish", "value": "Matte Basalt & Brushed Pewter"}, {"label": "Load", "value": "40 - 70 kg"}],
        "benefits": ["Unbroken horizontal and vertical shadow channels", "AvanTech YOU drawers with custom profile inlays", "Heavy-duty stone worktop support", "Masterwork of contemporary German kitchen design"]
    },
    {
        "title": "Hettich Ideenbuch Bi-Fold Kitchen Wall Cabinet Suite",
        "slug": "hettich-ideenbuch-bi-fold-kitchen-wall-cabinet-suite",
        "category_slug": "das-ideenbuch",
        "description": "High-capacity overhead kitchen wall cabinets fitted with Free fold bi-folding flap mechanisms, granting panoramic access across the preparation counter.",
        "image_file": "das_ideenbuch_2018/modern-kitchen-wall-cabinets.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Mechanism", "value": "Free fold Bi-Fold Flap Fitting"}, {"label": "Shutter Height", "value": "480 mm - 1040 mm"}, {"label": "Closing", "value": "Integrated Soft Close"}],
        "benefits": ["Folds dual shutters upward completely out of head space", "Stay-in-place multi-position stop", "Finger safety anti-pinch hinge design", "Effortless opening power assist"]
    },
    {
        "title": "Hettich Ideenbuch Panoramic Culinary Island Storage Suite",
        "slug": "hettich-ideenbuch-panoramic-culinary-island-storage-suite",
        "category_slug": "das-ideenbuch",
        "description": "Sprawling chef's kitchen island featuring multi-tier deep drawers, integrated cutlery dividers, spice towers, and continuous perimeter Gola profiles.",
        "image_file": "das_ideenbuch_2018/modern-kitchen-with-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Runners", "value": "Actro 5D with 5-Way Front Adjustment"}, {"label": "Finish", "value": "Natural Walnut & High-Gloss Ceramic"}, {"label": "Capacity", "value": "70 kg"}],
        "benefits": ["Immense storage volume for gourmet cookware", "Synchronized runner stability prevents drawer racking", "Tool-free 5D precision alignment", "Unmatched culinary ergonomics"]
    },
    {
        "title": "Hettich Ideenbuch Multi-Compartment Executive Sideboard",
        "slug": "hettich-ideenbuch-multi-compartment-executive-sideboard",
        "category_slug": "das-ideenbuch",
        "description": "Sophisticated executive credenza uniting push-to-open drawer stacks, internal felt document dividers, and concealed Sensys soft-close cabinet doors.",
        "image_file": "das_ideenbuch_2018/modern-sideboard-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Sensys Integrated Hinges & Quadro 4D"}, {"label": "Finish", "value": "Satin Cashmere Lacquer & Fluted Oak"}],
        "benefits": ["Cohesive blend of drawers and cupboard doors", "All fittings feature silent soft-closing damping", "Precision 1.5mm uniform reveal gaps", "Executive office and living room versatility"]
    },
    {
        "title": "Hettich Ideenbuch Asymmetrical Modular Wall Cabinet Unit",
        "slug": "hettich-ideenbuch-asymmetrical-modular-wall-cabinet-unit",
        "category_slug": "das-ideenbuch",
        "description": "Artistic asymmetrical wall cabinet arrangement featuring push-to-open doors with varying door sizes, creating a dynamic architectural living wall.",
        "image_file": "das_ideenbuch_2018/modular-wall-cabinet-design.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Hinges", "value": "Sensys with Push to open"}, {"label": "Mounting", "value": "SAH Concealed Suspension Rails"}, {"label": "Finish", "value": "Matte Clay & Natural Oak"}],
        "benefits": ["Dynamic artistic wall composition", "Push-to-open elimination of handles", "Millimeter-accurate wall leveling adjustment", "Strong anchor supports high load"]
    },
    {
        "title": "Hettich Ideenbuch Executive Office Storage Credenza",
        "slug": "hettich-ideenbuch-executive-office-storage-credenza",
        "category_slug": "das-ideenbuch",
        "description": "Commercial and executive office storage unit featuring central locking mechanisms, suspension file pullouts, and heavy-duty smooth steel drawer runners.",
        "image_file": "das_ideenbuch_2018/office-storage-cabinet.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Systema Top 2000 Office Credenza"}, {"label": "Locking", "value": "Central Cylinder Lock with Stop-Control"}, {"label": "Capacity", "value": "50 kg"}],
        "benefits": ["Central multi-drawer locking with anti-tilt safety", "Suspension filing runners hold heavy documents", "Smooth commercial-grade roller bearings", "Sleek corporate executive styling"]
    },
    {
        "title": "Hettich Ideenbuch Foldaway Nursery Changing & Care Station",
        "slug": "hettich-ideenbuch-foldaway-nursery-changing-station",
        "category_slug": "das-ideenbuch",
        "description": "Ingenious fold-out nursery changing table integrated seamlessly into wardrobe cabinetry, featuring locking heavy-load stays and infant-care pullouts.",
        "image_file": "das_ideenbuch_2018/pull-out-changing-table-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Hardware", "value": "Heavy-Duty Flap Stays & Locking Brackets"}, {"label": "Safety", "value": "50 kg Static Test Rating"}, {"label": "Finish", "value": "Soft White Matte"}],
        "benefits": ["Folds completely away when not in use", "Locking brackets prevent accidental folding", "Ergonomic care-supply drawer right beside baby", "Converts into standard wardrobe as child grows"]
    },
    {
        "title": "Hettich Ideenbuch Monolithic Flush Sliding Wardrobe Facade",
        "slug": "hettich-ideenbuch-monolithic-sliding-wardrobe-facade",
        "category_slug": "das-ideenbuch",
        "description": "Sleek flush coplanar sliding wardrobe system from Das Ideenbuch, presenting an unbroken architectural wall when closed with effortless gliding action.",
        "image_file": "das_ideenbuch_2018/sliding-wardrobe-closed.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "InLine XL Flush Coplanar System"}, {"label": "Door Overlap", "value": "Zero Overlap (Flush Closed)"}, {"label": "Finish", "value": "Satin Silk Lacquer"}],
        "benefits": ["Completely planar flush front facade", "Doors pop forward and glide aside silently", "Integrated soft-opening and soft-closing", "High-end European architectural minimalism"]
    },
    {
        "title": "Hettich Ideenbuch Master Sliding Wardrobe Interior Layout",
        "slug": "hettich-ideenbuch-master-sliding-wardrobe-interior-layout",
        "category_slug": "das-ideenbuch",
        "description": "Comprehensive interior layout for sliding wardrobes showcasing multi-tier hanging bays, AvanTech YOU drawer towers, trouser pullouts, and shoe racks.",
        "image_file": "das_ideenbuch_2018/sliding-wardrobe-interior.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Interior System", "value": "Modular Wardrobe Suite"}, {"label": "Runners", "value": "Actro 5D Soft-Close"}, {"label": "Lighting", "value": "Shelf Edge Inlay LEDs"}],
        "benefits": ["Optimized compartmentalization for full wardrobe", "Trouser pullout prevents wrinkling", "Internal drawers glide effortlessly", "LED light strips automatically illuminate on slide"]
    },
    {
        "title": "Hettich Ideenbuch Heavy-Duty Playroom Toy Drawer Unit",
        "slug": "hettich-ideenbuch-heavy-duty-playroom-toy-drawer-unit",
        "category_slug": "das-ideenbuch",
        "description": "Low-height accessible toy storage drawers featuring rounded safety edges, push-to-open runners, and high-impact melamine finishes for active playrooms.",
        "image_file": "das_ideenbuch_2018/toy-storage-drawers.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Runners", "value": "Quadro V6 Full-Extension Soft-Close"}, {"label": "Load Rating", "value": "40 kg per drawer"}, {"label": "Safety", "value": "Rounded Edges & Anti-Pinch"}],
        "benefits": ["Low height allows young children to tidy independently", "Full-extension reveals all toys at back", "Anti-slam safety cushioning", "Scratch and crayon resistant surfaces"]
    },
    {
        "title": "Hettich Ideenbuch Modular Utility Room Open Shelving",
        "slug": "hettich-ideenbuch-modular-utility-room-open-shelving",
        "category_slug": "das-ideenbuch",
        "description": "Heavy-duty wall-mounted open shelving system designed for pantries, utility rooms, and household storage with adjustable steel supports.",
        "image_file": "das_ideenbuch_2018/utility-room-open-storage-system.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "Secura Heavy-Duty Shelf Railing"}, {"label": "Material", "value": "Powder-Coated Steel & Melamine"}, {"label": "Load", "value": "50 kg per linear meter"}],
        "benefits": ["Flexible shelf re-spacing on 32mm hole pitch", "Secura anti-tilt locking clips", "Ventilated open access for household supplies", "High load capacity holds bulk goods and equipment"]
    },
    {
        "title": "Hettich Ideenbuch Appliance-Integrated Utility Cabinet Suite",
        "slug": "hettich-ideenbuch-appliance-integrated-utility-cabinet-suite",
        "category_slug": "das-ideenbuch",
        "description": "Full-height utility room storage surrounding washing machine and dryer towers, integrating ironing board pullouts and laundry basket cabinets.",
        "image_file": "das_ideenbuch_2018/utility-room-storage-cabinets.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Hardware", "value": "Sensys Moisture-Resistant Hinges"}, {"label": "Features", "value": "Pull-Out Ironing Slide"}, {"label": "Finish", "value": "Moisture-Sealed White & Anthracite"}],
        "benefits": ["Surrounds laundry appliances with streamlined storage", "Pull-out foldaway ironing board saves space", "Dedicated broom, vacuum, and detergent niches", "Moisture-resistant hardware protection"]
    },
    {
        "title": "Hettich Ideenbuch Floating Living Wall Display Shelves",
        "slug": "hettich-ideenbuch-floating-living-wall-display-shelves",
        "category_slug": "das-ideenbuch",
        "description": "Minimalist floating wall shelves with fully concealed structural brackets, creating light, hovering ledges for books and decorative objects.",
        "image_file": "das_ideenbuch_2018/wall-mounted-display-storage.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Support", "value": "Titan 4 Concealed Shelf Brackets"}, {"label": "Shelf Thickness", "value": "25 mm - 40 mm"}, {"label": "Load Rating", "value": "25 kg per shelf"}],
        "benefits": ["Hovering aesthetic with zero visible brackets", "In-wall eccentric adjustment for perfect leveling", "Anti-sag steel core rods", "Refined architectural living room touch"]
    },
    {
        "title": "Hettich Ideenbuch Glass-Front Internal Wardrobe Drawers",
        "slug": "hettich-ideenbuch-glass-front-wardrobe-pull-out-drawers",
        "category_slug": "das-ideenbuch",
        "description": "Internal wardrobe drawer stacks with clear crystal glass front cutaways, allowing immediate visual recognition of clothing while keeping items dust-free.",
        "image_file": "das_ideenbuch_2018/wardrobe-interior-pull-out-drawers.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "System", "value": "AvanTech YOU with Clear Glass Inlays"}, {"label": "Side Profile", "value": "13 mm Ultra-Slim"}, {"label": "Damping", "value": "Silent System Hydraulic"}],
        "benefits": ["Crystal glass fronts provide instant contents view", "13mm slim walls maximize usable internal room", "Whisper-quiet closure prevents disturbance", "Luxury custom dressing room feel"]
    },
    {
        "title": "Hettich Ideenbuch Velvet Luxury Accessory Pull-Out Tray",
        "slug": "hettich-ideenbuch-velvet-accessory-pull-out-tray",
        "category_slug": "das-ideenbuch",
        "description": "Shallow internal wardrobe drawer tray outfitted with velvet-lined compartments for jewelry, cuff links, luxury watches, and belts.",
        "image_file": "das_ideenbuch_2018/wardrobe-pull-out-tray.jpg",
        "specs": [{"label": "Brand", "value": "Hettich"}, {"label": "Publication", "value": "Das Ideenbuch"}, {"label": "Tray Height", "value": "60 mm Shallow Profile"}, {"label": "Lining", "value": "Hand-Finished Velvet Insert"}, {"label": "Runners", "value": "Full-Extension Push-to-Open"}],
        "benefits": ["Protects delicate watches, sunglasses, and jewelry", "Full extension pullout for panoramic view", "Silky touch luxury velvet lining", "Stackable multi-tier configuration"]
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

