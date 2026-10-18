const fs = require('fs');

const files = ['home.mjs', 'menu.mjs', 'private.mjs'];
const allFound = new Set();

files.forEach(file => {
  const text = fs.readFileSync(file, 'utf8');
  const matches = [...text.matchAll(/(https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.]+\.(?:jpg|png|webp|avif))/g)];
  matches.forEach(m => {
    const url = m[1];
    if (!allFound.has(url)) {
      allFound.add(url);
      const start = Math.max(0, m.index - 120);
      const end = Math.min(text.length, m.index + 120);
      console.log(`\nURL: ${url}`);
      console.log(`File: ${file}`);
      console.log(text.slice(start, end).replace(/\s+/g, ' '));
    }
  });
});
