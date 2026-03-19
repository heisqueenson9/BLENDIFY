const fs = require('fs');
const https = require('https');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', reject);
  });
}

const assets = {
  'kiwi_macro.jpg': 'https://images.unsplash.com/photo-1585059895524-72359e06138a?w=512&q=80',
  'lemon_macro.jpg': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=512&q=80',
  'blueberry_macro.jpg': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=512&q=80',
  'recipe_avocado.jpg': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=256&q=80',
  'wellness_leaf.jpg': 'https://images.unsplash.com/photo-1533038590840-1c7987cb5b5e?w=256&q=80',
  'step_add.jpg': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=128&q=80', // strawberries
  'step_drink.jpg': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=128&q=80', // drink
};

// 1. Download stock images
async function downloadStocks() {
  for (const [filename, url] of Object.entries(assets)) {
    try {
      await downloadFile(url, path.join(dir, filename));
      console.log(`Successfully acquired ${filename}`);
    } catch (e) {
      console.error(`Failed ${filename}: ${e.message}`);
    }
  }
}

// 2. Build Labeled Hero Image
async function buildHero() {
  console.log('Building Labeled Hero Image...');
  const heroPath = path.join(dir, 'hero.jpg');
  const tempHero = path.join(dir, 'hero_base.jpg');
  
  await downloadFile('https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=1920&q=80', tempHero);
  console.log('Base hero downloaded. Applying labels...');
  
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext('2d');
  
  const img = await loadImage(tempHero);
  
  // Crop or fit image to 1920x1080 nicely
  const scale = Math.max(1920 / img.width, 1080 / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  const x = (1920 - w) / 2;
  const y = (1080 - h) / 2;
  
  ctx.drawImage(img, x, y, w, h);
  
  // Apply a subtle dark overlay to make labels pop
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, 1920, 1080);
  
  // The blender in that photo is roughly right of center. Let's draw some tasteful pointer labels.
  function drawLabel(nx, ny, tx, ty, title, desc) {
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(tx, ty);
    ctx.lineTo(tx + (tx > nx ? 100 : -100), ty);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Dot at origin
    ctx.beginPath();
    ctx.arc(nx, ny, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#C5E710';
    ctx.fill();
    ctx.stroke();
    
    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = tx > nx ? 'left' : 'right';
    const textX = tx + (tx > nx ? 10 : -10);
    ctx.fillText(title, textX, ty - 10);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '18px Arial';
    ctx.fillText(desc, textX, ty + 16);
  }
  
  // Draw labels mapping to typical blender parts (assuming blender is roughly taking up right middle)
  drawLabel(1200, 300, 1400, 250, 'Leak-Proof Lid', 'Twist & Sip Mechanism');
  drawLabel(1200, 500, 900, 450, 'BPA-Free Bottle', '450ml Durable Tritan');
  drawLabel(1200, 750, 1400, 800, '6-Blade System', 'Stainless Steel Blades');
  drawLabel(1200, 850, 900, 900, 'USB-C Port', 'Fast Magnetic Charging');
  
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(heroPath, buffer);
  fs.unlinkSync(tempHero);
  console.log('Hero image completed!');
}

// 3. Draw accurate clean Vector/Icon replacements
function drawIcon(filename, drawFn) {
  const filepath = path.join(dir, filename);
  const canvas = createCanvas(128, 128);
  const ctx = canvas.getContext('2d');
  
  // Transparent/Clean BG
  ctx.fillStyle = 'rgba(197, 231, 16, 0.1)';
  ctx.beginPath();
  ctx.arc(64, 64, 64, 0, Math.PI * 2);
  ctx.fill();
  
  drawFn(ctx);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filepath, buffer);
  console.log(`Generated icon ${filename}`);
}

async function buildIcons() {
  console.log('Building Clean Illustrations...');
  
  drawIcon('fitness_icon.png', (ctx) => {
    // Dumbbell
    ctx.fillStyle = '#607423';
    ctx.fillRect(34, 56, 60, 16); // handle
    ctx.fillRect(24, 44, 20, 40); // left plate
    ctx.fillRect(14, 34, 10, 60); // left big plate
    ctx.fillRect(84, 44, 20, 40); // right plate
    ctx.fillRect(104, 34, 10, 60); // right big plate
  });
  
  drawIcon('step_charge.png', (ctx) => {
    // Plug/Charge icon
    ctx.strokeStyle = '#607423';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(64, 24); ctx.lineTo(64, 54);
    ctx.stroke();
    ctx.fillStyle = '#8E9630';
    ctx.beginPath(); ctx.roundRect(44, 54, 40, 50, 8); ctx.fill();
    ctx.beginPath(); ctx.moveTo(52, 104); ctx.lineTo(52, 114); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(76, 104); ctx.lineTo(76, 114); ctx.stroke();
  });
  
  drawIcon('battery_icon.png', (ctx) => {
    // Battery
    ctx.strokeStyle = '#607423';
    ctx.lineWidth = 6;
    ctx.strokeRect(34, 40, 60, 48);
    ctx.fillRect(94, 56, 10, 16);
    ctx.fillStyle = '#C5E710';
    ctx.fillRect(40, 46, 40, 36); 
  });
  
  drawIcon('clean_icon.png', (ctx) => {
    // Soap/Clean sparkles
    ctx.fillStyle = '#607423';
    ctx.beginPath(); ctx.arc(64, 64, 20, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#C5E710';
    ctx.beginPath(); ctx.arc(44, 44, 10, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(84, 84, 12, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(84, 34, 8, 0, Math.PI*2); ctx.fill();
  });

  drawIcon('icon_party.png', (ctx) => {
    // Party graphic
    ctx.fillStyle = '#C5E710';
    ctx.beginPath(); ctx.moveTo(34, 94); ctx.lineTo(24, 64); ctx.lineTo(54, 84); ctx.fill();
    ctx.fillStyle = '#607423';
    ctx.fillRect(64, 34, 10, 10);
    ctx.fillRect(84, 54, 10, 10);
    ctx.fillRect(54, 24, 10, 10);
  });
  
  drawIcon('icon_leaf.png', (ctx) => {
    ctx.fillStyle = '#607423';
    ctx.beginPath();
    ctx.moveTo(64, 104);
    ctx.quadraticCurveTo(24, 64, 64, 24);
    ctx.quadraticCurveTo(104, 64, 64, 104);
    ctx.fill();
  });
  
  drawIcon('icon_zap.png', (ctx) => {
    ctx.fillStyle = '#C5E710';
    ctx.beginPath();
    ctx.moveTo(74, 24); ctx.lineTo(44, 74); ctx.lineTo(64, 74);
    ctx.lineTo(54, 114); ctx.lineTo(84, 64); ctx.lineTo(64, 64);
    ctx.fill();
  });
  
  drawIcon('icon_spin.png', (ctx) => {
    ctx.strokeStyle = '#607423';
    ctx.lineWidth = 10;
    ctx.beginPath(); ctx.arc(64, 64, 30, 0.5, 4.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(64, 64, 15, 3.5, 7.5); ctx.stroke();
  });

  drawIcon('icon_drop.png', (ctx) => {
    ctx.fillStyle = '#8E9630';
    ctx.beginPath();
    ctx.moveTo(64, 24);
    ctx.quadraticCurveTo(34, 84, 34, 94);
    ctx.arc(64, 94, 30, Math.PI, 0, true);
    ctx.quadraticCurveTo(94, 84, 64, 24);
    ctx.fill();
  });

  drawIcon('icon_cookie.png', (ctx) => {
    ctx.fillStyle = '#8E9630';
    ctx.beginPath(); ctx.arc(64, 64, 36, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#607423';
    [[50, 50], [70, 46], [80, 70], [54, 80], [64, 60]].forEach(([cx,cy]) => {
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI*2); ctx.fill();
    });
  });
}

(async () => {
  await downloadStocks();
  await buildHero();
  await buildIcons();
  console.log('Complete asset regeneration successful!');
})();
