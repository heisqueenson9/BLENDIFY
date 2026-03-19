const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\images';
const destDir = 'c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\client\\public\\images';

const files = {
  '1.jpg': 'image1.jpg',
  '2.jpg': 'image2.jpg',
  '3.jpg': 'image3.jpg'
};

for (const [src, dest] of Object.entries(files)) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.error(`Error copying ${src}:`, err);
  }
}
