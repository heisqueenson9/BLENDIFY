const fs = require('fs');

const file1 = 'index.html';
const content1 = fs.readFileSync(file1, 'utf8');
const newContent1 = content1
  .replace(/public\/images\//g, '/images/')
  .replace(/fitness_icon\.jpg/g, 'fitness_icon.png')
  .replace(/step_charge\.jpg/g, 'step_charge.png')
  .replace(/battery_icon\.jpg/g, 'battery_icon.png')
  .replace(/clean_icon\.jpg/g, 'clean_icon.png');
fs.writeFileSync(file1, newContent1);

const file2 = 'js/products.js';
const content2 = fs.readFileSync(file2, 'utf8');
const newContent2 = content2.replace(/\/public\/images\//g, '/images/');
fs.writeFileSync(file2, newContent2);

console.log('Paths updated to /images/ perfectly');
