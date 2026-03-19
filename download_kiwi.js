const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg/1024px-Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  const file = fs.createWriteStream('public/images/kiwi_macro.jpg');
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded kiwi');
  });
});
