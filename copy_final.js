const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'images');
const destFolder = path.join(__dirname, 'client', 'public', 'images');

console.log(`__dirname: ${__dirname}`);
console.log(`srcFolder: ${srcFolder}`);
console.log(`destFolder: ${destFolder}`);

const copyWork = [
  { s: '1.jpg', d: 'image1.jpg' },
  { s: '2.jpg', d: 'image2.jpg' },
  { s: '3.jpg', d: 'image3.jpg' }
];

async function main() {
  for (const f of copyWork) {
    const s = path.join(srcFolder, f.s);
    const d = path.join(destFolder, f.d);
    try {
      if (fs.existsSync(s)) {
        fs.copyFileSync(s, d);
        console.log(`SUCCESS: ${f.s} -> ${f.d}`);
      } else {
        console.error(`FAIL: Source not found ${s}`);
      }
    } catch (err) {
      console.error(`ERROR: ${f.s} -> ${f.d}: ${err.message}`);
    }
  }
}

main();
