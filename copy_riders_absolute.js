const fs = require('fs');
const path = require('path');

const src1 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\images\\1.jpg";
const src2 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\images\\2.jpg";
const src3 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\images\\3.jpg";

const dest1 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\client\\public\\images\\image1.jpg";
const dest2 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\client\\public\\images\\image2.jpg";
const dest3 = "c:\\Users\\USER\\Downloads\\Telegram Desktop\\blendify\\blendify\\client\\public\\images\\image3.jpg";

try {
  fs.copyFileSync(src1, dest1);
  console.log('Copied 1');
  fs.copyFileSync(src2, dest2);
  console.log('Copied 2');
  fs.copyFileSync(src3, dest3);
  console.log('Copied 3');
} catch (e) {
  console.error(e);
}
