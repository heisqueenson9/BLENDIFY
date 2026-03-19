const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Fix the broken Unsplash images manually
const imagesToFetch = {
  'kiwi_macro.jpg': 'https://images.unsplash.com/photo-1582960682701-a20c329df0da?w=512&q=80',
  'wellness_leaf.jpg': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=256&q=80',
};

// 2. Download missing images using curl
for (const [name, url] of Object.entries(imagesToFetch)) {
  const dest = path.join(__dirname, 'public', 'images', name);
  console.log(`Downloading ${name}...`);
  try {
    execSync(`curl.exe -L -A "Mozilla/5.0" "${url}" -o "${dest}"`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to download ${name}`);
  }
}

// 3. Update paths across the whole project so they properly link to /public/images/
function replaceInFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Aggressively match /images/ and images/ without /public/
  let updated = content.replace(/src="\/images\//g, 'src="/public/images/');
  updated = updated.replace(/href="\/images\//g, 'href="/public/images/');
  updated = updated.replace(/image:\s*["']\/images\//g, 'image: "/public/images/');
  
  updated = updated.replace(/src="images\//g, 'src="/public/images/');
  updated = updated.replace(/href="images\//g, 'href="/public/images/');
  updated = updated.replace(/image:\s*["']images\//g, 'image: "/public/images/');
  
  // Edge case: if it was changed to /public/images but without initial slash
  updated = updated.replace(/src="public\/images\//g, 'src="/public/images/');
  updated = updated.replace(/href="public\/images\//g, 'href="/public/images/');

  if (content !== updated) {
    fs.writeFileSync(filepath, updated);
    console.log(`Updated file links in: ${path.basename(filepath)}`);
  }
}

// Root files
replaceInFile(path.join(__dirname, 'index.html'));

// Pages
const pagesDir = path.join(__dirname, 'pages');
if (fs.existsSync(pagesDir)) {
  fs.readdirSync(pagesDir).forEach(file => {
    if (file.endsWith('.html')) replaceInFile(path.join(pagesDir, file));
  });
}

// Javascript logic
const jsDir = path.join(__dirname, 'js');
if (fs.existsSync(jsDir)) {
  fs.readdirSync(jsDir).forEach(file => {
    if (file.endsWith('.js')) replaceInFile(path.join(jsDir, file));
  });
}

console.log('✅ Visual bugfixes and robust path routing applied successfully.');
