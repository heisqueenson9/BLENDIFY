const https = require('https');
const fs = require('fs');

function download(url, dest) {
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      return download(res.headers.location, dest);
    }
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => file.close());
  });
}

download("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg/1024px-Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg", "public/images/kiwi_macro.jpg");
download("https://upload.wikimedia.org/wikipedia/commons/e/e0/Water_drops_on_a_leaf.jpg", "public/images/wellness_leaf.jpg");
