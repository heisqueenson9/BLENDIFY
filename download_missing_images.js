const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'kiwi_macro.jpg': 'https://loremflickr.com/512/512/kiwifruit',
  'wellness_leaf.jpg': 'https://loremflickr.com/128/128/planch',
  'battery_icon.jpg': 'https://loremflickr.com/64/64/battery',
  'clean_icon.jpg': 'https://loremflickr.com/64/64/soap'
};

const dir = path.join(__dirname, 'public', 'images');

for (const [filename, url] of Object.entries(images)) {
  const filepath = path.join(dir, filename);
  const file = fs.createWriteStream(filepath);
  
  // Follow redirects manually if needed, but loremflickr redirects via 301/302.
  // We can just use curl to bypass Node.js's redirect limits in a child_process.
  const { execSync } = require('child_process');
  execSync(`curl.exe -L "${url}" -o "${filepath}"`);
  console.log(`Downloaded ${filename}`);
}
