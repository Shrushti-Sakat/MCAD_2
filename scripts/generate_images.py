from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory if it doesn't exist
output_dir = r"C:\Users\Priyanka\Downloads\MCAD_2-main\MCAD_2-main\public\addons"
os.makedirs(output_dir, exist_ok=True)

# Image dimensions
width, height = 800, 600

# Define color palette
colors = {
    'bus-servo': {'bg': (210, 180, 140), 'icon': (139, 69, 19)},  # tan/brown
    'motor': {'bg': (64, 64, 64), 'icon': (192, 192, 192)},  # dark gray/light gray
    'wires': {'bg': (220, 20, 60), 'icon': (255, 215, 0)},  # red/gold
    'mobile-app': {'bg': (0, 206, 209), 'icon': (70, 130, 180)},  # teal/steel blue
    'ui-laptop': {'bg': (30, 144, 255), 'icon': (240, 248, 255)}  # blue/alice blue
}

# Product definitions
products = [
    ('bus-servo.jpg', 'Bus Servo', 'bus-servo'),
    ('motor.jpg', 'Motor', 'motor'),
    ('wires.jpg', 'Wires', 'wires'),
    ('mobile-app.jpg', 'Mobile App', 'mobile-app'),
    ('ui-laptop.jpg', 'UI Laptop', 'ui-laptop')
]

# Function to draw servo icon
def draw_servo(draw, cx, cy, color):
    # Draw a simple servo icon
    draw.ellipse([cx-40, cy-40, cx+40, cy+40], fill=color, outline=(0,0,0), width=3)
    draw.line([cx-30, cy, cx+30, cy], fill=(0,0,0), width=4)
    draw.ellipse([cx-10, cy-10, cx+10, cy+10], fill=(255,255,255), outline=(0,0,0), width=2)

# Function to draw motor icon
def draw_motor(draw, cx, cy, color):
    # Draw a simple motor icon
    draw.rectangle([cx-50, cy-40, cx+50, cy+40], fill=color, outline=(0,0,0), width=3)
    draw.line([cx-40, cy-30, cx-40, cy+30], fill=(0,0,0), width=3)
    draw.line([cx+40, cy-30, cx+40, cy+30], fill=(0,0,0), width=3)
    draw.ellipse([cx-15, cy-15, cx+15, cy+15], fill=(255,255,255), outline=(0,0,0), width=2)

# Function to draw electrical/wires icon
def draw_wires(draw, cx, cy, color):
    # Draw a simple electrical icon (lightning bolt)
    points = [cx, cy-50, cx+20, cy-10, cx+10, cy-10, cx+30, cy+50, cx, cy+20, cx+10, cy+20, cx, cy-50]
    draw.polygon(points, fill=color, outline=(0,0,0))

# Function to draw mobile phone icon
def draw_mobile(draw, cx, cy, color):
    # Draw a simple mobile phone icon
    draw.rectangle([cx-30, cy-50, cx+30, cy+50], fill=color, outline=(0,0,0), width=3)
    draw.rectangle([cx-25, cy-40, cx+25, cy+40], fill=(200,200,200), outline=(0,0,0), width=2)
    draw.ellipse([cx-4, cy+41, cx+4, cy+49], fill=(0,0,0))  # speaker

# Function to draw laptop icon
def draw_laptop(draw, cx, cy, color):
    # Draw a simple laptop icon
    draw.rectangle([cx-50, cy-35, cx+50, cy+5], fill=color, outline=(0,0,0), width=3)
    draw.rectangle([cx-55, cy+5, cx+55, cy+10], fill=(100,100,100), outline=(0,0,0), width=2)

# Create images
for filename, product_name, product_key in products:
    # Create image with background color
    bg_color = colors[product_key]['bg']
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw border
    draw.rectangle([0, 0, width-1, height-1], outline=(0,0,0), width=5)
    
    # Draw appropriate icon
    icon_color = colors[product_key]['icon']
    center_x, center_y = width // 2, height // 2 - 50
    
    if product_key == 'bus-servo':
        draw_servo(draw, center_x, center_y, icon_color)
    elif product_key == 'motor':
        draw_motor(draw, center_x, center_y, icon_color)
    elif product_key == 'wires':
        draw_wires(draw, center_x, center_y, icon_color)
    elif product_key == 'mobile-app':
        draw_mobile(draw, center_x, center_y, icon_color)
    elif product_key == 'ui-laptop':
        draw_laptop(draw, center_x, center_y, icon_color)
    
    # Draw product name text
    try:
        font = ImageFont.truetype("arial.ttf", 60)
    except:
        font = ImageFont.load_default()
    
    # Get text bounding box to center it
    bbox = draw.textbbox((0, 0), product_name, font=font)
    text_width = bbox[2] - bbox[0]
    text_x = (width - text_width) // 2
    text_y = height - 100
    
    draw.text((text_x, text_y), product_name, fill=(0, 0, 0), font=font)
    
    # Save image
    output_path = os.path.join(output_dir, filename)
    img.save(output_path)
    print(f"Created: {filename}")

print("\nAll images created successfully!")
print(f"Saved to: {output_dir}")
