const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'images');
const destDir = path.join(__dirname, 'client', 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  { src: '1.jpg', dest: 'image1.jpg' },
  { src: '2.jpg', dest: 'image2.jpg' },
  { src: '3.jpg', dest: 'image3.jpg' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
