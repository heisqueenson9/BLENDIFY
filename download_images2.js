const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'hero.jpg': 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1920&q=80',
  'recipe_avocado.jpg': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=128&q=80',
  'fitness_icon.jpg': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=128&q=80',
  'wellness_leaf.jpg': 'https://images.unsplash.com/photo-1533038590840-1c7987cb5b5e?auto=format&fit=crop&w=128&q=80',
  'kiwi_macro.jpg': 'https://images.unsplash.com/photo-1585059895524-72359e06138a?auto=format&fit=crop&w=512&q=80',
  'lemon_macro.jpg': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=512&q=80',
  'blueberry_macro.jpg': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=512&q=80',
  'step_add.jpg': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=64&q=80',
  'step_charge.jpg': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=64&q=80',
  'step_drink.jpg': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=64&q=80'
};

const dir = path.join(__dirname, 'public', 'images');

for (const [filename, url] of Object.entries(images)) {
  const filepath = path.join(dir, filename);
  const file = fs.createWriteStream(filepath);
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filepath);
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
}
