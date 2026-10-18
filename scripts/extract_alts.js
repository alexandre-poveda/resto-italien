const fs = require('fs');

const files = ['home.mjs', 'menu.mjs', 'private.mjs'];
const results = {};

files.forEach(file => {
  const text = fs.readFileSync(file, 'utf8');
  const regex = /alt:\s*`([^`]+)`[^}]+src:\s*`([^`]+)`/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const [_, alt, src] = match;
    const cleanSrc = src.split('?')[0];
    results[cleanSrc] = alt;
  }
});

console.log(JSON.stringify(results, null, 2));
