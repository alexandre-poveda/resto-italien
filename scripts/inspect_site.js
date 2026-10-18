const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function run() {
  const mainScriptUrl = 'https://framerusercontent.com/sites/3IOiIvPSb5fMeNpTtGQRHc/script_main.BNYceeuB.mjs';
  const mainScript = await fetchUrl(mainScriptUrl);
  fs.writeFileSync('script_main.mjs', mainScript);
  console.log('Saved script_main.mjs, length:', mainScript.length);

  // Find all imported chunk urls
  const chunks = [...mainScript.matchAll(/https:\/\/framerusercontent\.com\/modules\/[^"']+/g)].map(m => m[0]);
  console.log('Imported chunks:', chunks.length);
  
  // Also look for routes definition in main script
  console.log('Main script sample:');
  const routeMatches = [...mainScript.matchAll(/"\/[^"]*"/g)].map(m => m[0]);
  console.log('Route-like strings:', [...new Set(routeMatches)]);

  // Let's also look for all images in searchIndex and main script
  const searchIndex = JSON.parse(fs.readFileSync('searchIndex.json', 'utf8'));
  console.log('\n--- PAGES in searchIndex ---');
  for (const [route, page] of Object.entries(searchIndex)) {
    console.log(`\nRoute: ${route}`);
    console.log(`Title: ${page.title}`);
    console.log(`Description: ${page.description}`);
    console.log(`H1:`, page.h1);
    console.log(`H2:`, page.h2);
    console.log(`H3:`, page.h3);
    console.log(`Paragraphs (${page.p?.length || 0}):`, page.p?.slice(0, 30));
  }
}

run().catch(console.error);
