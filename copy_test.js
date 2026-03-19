const fs = require('fs');
const path = require('path');

const s1 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\images\\1.jpg";
const d1 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\client\\public\\images\\image1.jpg";

try {
  let b = fs.readFileSync(s1);
  fs.writeFileSync(d1, b);
  console.log('Written 1');
} catch (e) {
  console.error(e);
}
