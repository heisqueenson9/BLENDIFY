const fs = require('fs');
const path = require('path');
const targetDir = path.join(__dirname, 'gemini_assets');
if (!fs.existsSync(targetDir)) { fs.mkdirSync(targetDir); }

const sourceDir = "C:\\Users\\USER\\.gemini\\antigravity\\brain\\a3232342-46cb-40d0-b67c-48c0c319e31a";
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));

files.forEach(f => {
    fs.copyFileSync(path.join(sourceDir, f), path.join(targetDir, f));
    console.log("Copied: " + f);
});
