@echo off
cd public\images
curl.exe -L "https://images.unsplash.com/photo-1596644089330-8456de903e67?w=1920&q=80" -o hero.jpg
curl.exe -L "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=256&q=80" -o recipe_avocado.jpg
curl.exe -L "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=256&q=80" -o fitness_icon.jpg
curl.exe -L "https://images.unsplash.com/photo-1533038590840-1c7987cb5b5e?w=256&q=80" -o wellness_leaf.jpg
curl.exe -L "https://images.unsplash.com/photo-1629824683515-08103c8b4172?w=512&q=80" -o kiwi_macro.jpg
curl.exe -L "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=512&q=80" -o lemon_macro.jpg
curl.exe -L "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=512&q=80" -o blueberry_macro.jpg
curl.exe -L "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=128&q=80" -o step_add.jpg
curl.exe -L "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=128&q=80" -o step_charge.jpg
curl.exe -L "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=128&q=80" -o step_drink.jpg
echo Done downloading all replacement images accurately.
