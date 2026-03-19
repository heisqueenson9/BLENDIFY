const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\6e0db55c-9519-4dd6-9e55-8590b230eef8';
const destDir = 'c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\public\\images';

const files = fs.readdirSync(srcDir);
for (const file of files) {
  if (file.endsWith('.png')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`Copied ${file}`);
  }
}
