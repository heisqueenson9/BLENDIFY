import shutil
import os

src_folder = r'c:\Users\USER\Downloads\Telegram Desktop\blendify\blendify\images'
dest_folder = r'c:\Users\USER\Downloads\Telegram Desktop\blendify\blendify\client\public\images'

files = [('1.jpg', 'image1.jpg'), ('2.jpg', 'image2.jpg'), ('3.jpg', 'image3.jpg')]

for src_name, dest_name in files:
    src_path = os.path.join(src_folder, src_name)
    dest_path = os.path.join(dest_folder, dest_name)
    print(f"Copying {src_path} to {dest_path}")
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print("Success")
    else:
        print("Source not found")
