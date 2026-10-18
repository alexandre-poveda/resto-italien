const fs = require('fs');

function extractStrings(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  // Match string literals
  const matches = [...content.matchAll(/["'`]([^"'`\n\r]{4,150})["'`]/g)]
    .map(m => m[1].trim())
    .filter(s => !s.startsWith('http') && !s.includes('{') && !s.includes(';') && !s.includes('/') && !s.includes('\\') && /[a-zA-ZÀ-ÿ]{3,}/.test(s));
  
  const unique = [...new Set(matches)];
  console.log(`=== ${filename} (unique readable strings: ${unique.length}) ===`);
  console.log(unique.filter(s => s.length > 10).slice(0, 50));
}

extractStrings('home.mjs');
extractStrings('menu.mjs');
extractStrings('private.mjs');
extractStrings('book.mjs');
