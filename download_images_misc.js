const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'battery_icon.jpg': 'https://images.unsplash.com/photo-1596774640321-fac8ee6dc3d2?auto=format&fit=crop&w=64&q=80', // Battery / Power symbol generic
  'clean_icon.jpg': 'https://images.unsplash.com/photo-1584820927498-cafe2c1dc79f?auto=format&fit=crop&w=64&q=80' // Soap / Clean generic
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
