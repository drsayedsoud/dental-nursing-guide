import fitz
import os

pdf_path = r"C:\Users\dell\Desktop\مدرسة التمريض\كتاب الطب والجراحة.pdf"
output_dir = r"C:\Users\dell\Desktop\مدرسة التمريض\dental-nursing-guide\public\images"

os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Pages 106 to 111 (0-indexed: 105 to 110)
img_count = 1
for page_num in range(105, 111):
    page = doc[page_num]
    images = page.get_images(full=True)
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        image_path = os.path.join(output_dir, f"image_{img_count}.{image_ext}")
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        print(f"Saved {image_path}")
        img_count += 1
