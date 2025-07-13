import os
import shutil
from PIL import Image

# === CONFIGURATION ===
ORIGINALS_DIR = "images/originals"     # Source folder with original images
OUTPUT_DIR = "images/web"               # Folder for generated resized images
TARGET_WIDTHS = [600, 800, 1200, 1600] # Widths to generate
QUALITY = 85                           # JPEG quality (1-100)
LOGO_FILENAME = "logotip-negre.png"    # Logo to skip by name

# === SCRIPT FUNCTIONS ===

def clear_output_folder():
    if os.path.exists(OUTPUT_DIR):
        print(f"🧹 Clearing output folder: {OUTPUT_DIR}")
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_image(src_path, rel_path):
    # Skip the logo file by name (case insensitive)
    if os.path.basename(src_path).lower() == LOGO_FILENAME.lower():
        print(f"⚠️ Skipped logo file: {src_path}")
        return

    try:
        with Image.open(src_path) as im:
            im_rgb = im.convert("RGB")
            orig_width, orig_height = im.size

            for width in TARGET_WIDTHS:
                # If original smaller than target width, only generate at original size once
                if orig_width <= width and width != TARGET_WIDTHS[0]:
                    continue

                # Calculate new height to maintain aspect ratio
                new_height = int(orig_height * width / orig_width)
                resized_im = im_rgb.resize((width, new_height), Image.LANCZOS) if orig_width > width else im_rgb

                # Build output path: output folder + relative path, with -WIDTH suffix and .jpg extension
                base_name = os.path.splitext(rel_path)[0]
                output_rel_path = f"{base_name}-{width}.jpg"
                output_path = os.path.join(OUTPUT_DIR, output_rel_path)

                # Ensure output directory exists
                os.makedirs(os.path.dirname(output_path), exist_ok=True)

                # Save resized image as JPEG
                resized_im.save(output_path, "JPEG", quality=QUALITY, optimize=True)
                print(f"✔ Created {output_path}")

    except Exception as e:
        print(f"❌ Failed processing {src_path}: {e}")

def main():
    clear_output_folder()

    # Walk originals folder
    for root, _, files in os.walk(ORIGINALS_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in [".png", ".webp", ".jpeg", ".jpg"]:
                abs_path = os.path.join(root, file)
                # Relative path from originals root (used for mirroring folder structure)
                rel_path = os.path.relpath(abs_path, ORIGINALS_DIR)
                process_image(abs_path, rel_path)

if __name__ == "__main__":
    main()
