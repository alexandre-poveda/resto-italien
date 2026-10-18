const fs = require('fs');

const files = ['home.mjs', 'menu.mjs', 'private.mjs'];
files.forEach(file => {
  const text = fs.readFileSync(file, 'utf8');
  console.log(`\n================= ${file} =================`);
  const matches = [...text.matchAll(/(https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.]+\.(?:jpg|png|webp|avif))/g)];
  for (const m of matches) {
    const url = m[1];
    const index = m.index;
    const snippet = text.slice(Math.max(0, index - 200), Math.min(text.length, index + 250))
      .replace(/[\n\r\t]/g, ' ')
      .replace(/\s+/g, ' ');
    console.log(`\nURL: ${url}`);
    console.log(`Context: ...${snippet}...`);
  }
});
