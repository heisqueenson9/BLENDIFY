@echo off
cd public\images
curl.exe -L "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1920&q=80" -o hero.jpg
curl.exe -L "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=128&q=80" -o recipe_avocado.jpg
curl.exe -L "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=128&q=80" -o fitness_icon.jpg
curl.exe -L "https://images.unsplash.com/photo-1533038590840-1c7987cb5b5e?auto=format&fit=crop&w=128&q=80" -o wellness_leaf.jpg
curl.exe -L "https://images.unsplash.com/photo-1585059895524-72359e06138a?auto=format&fit=crop&w=512&q=80" -o kiwi_macro.jpg
curl.exe -L "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=512&q=80" -o lemon_macro.jpg
curl.exe -L "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=512&q=80" -o blueberry_macro.jpg
curl.exe -L "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=64&q=80" -o step_add.jpg
curl.exe -L "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=64&q=80" -o step_charge.jpg
curl.exe -L "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=64&q=80" -o step_drink.jpg
curl.exe -L "https://images.unsplash.com/photo-1596774640321-fac8ee6dc3d2?auto=format&fit=crop&w=64&q=80" -o battery_icon.jpg
curl.exe -L "https://images.unsplash.com/photo-1584820927498-cafe2c1dc79f?auto=format&fit=crop&w=64&q=80" -o clean_icon.jpg
echo Done!
