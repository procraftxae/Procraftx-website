// Post-build step: hash every JSON-LD <script> block Eleventy just wrote and
// patch vercel.json's CSP script-src list to match. Replaces the manual
// "run a hash snippet, copy the value, paste it into vercel.json" step this
// project's CLAUDE.md documents as a recurring manual chore.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.join(__dirname, "..");

// recursively find every generated *.html page (project root + ar/), not a
// hardcoded list — the site now has 24 pages (10 specialty/service detail
// pages x 2 languages, plus index/faq), and that count will keep changing.
function findHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "src" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.name.endsWith(".html")) {
      results.push(path.relative(root, full));
    }
  }
  return results;
}

const pages = findHtmlFiles(root).sort();
if (pages.length === 0) {
  throw new Error("No .html files found to hash — did the Eleventy build run first?");
}

const hashes = [];
for (const file of pages) {
  const filePath = path.join(root, file);
  const html = fs.readFileSync(filePath, "utf8");
  const scriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let match;
  let found = false;
  while ((match = scriptRe.exec(html))) {
    const hash = crypto.createHash("sha256").update(match[1], "utf8").digest("base64");
    hashes.push(hash);
    found = true;
  }
  if (!found) {
    throw new Error(`No inline <script> block found in ${file} — expected a JSON-LD block.`);
  }
}

const vercelJsonPath = path.join(root, "vercel.json");
const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, "utf8"));
const cspHeader = vercelConfig.headers[0].headers.find((h) => h.key === "Content-Security-Policy");
if (!cspHeader) {
  throw new Error("Could not find Content-Security-Policy header in vercel.json");
}

const newHashList = hashes.map((h) => `'sha256-${h}'`).join(" ");
cspHeader.value = cspHeader.value.replace(
  /script-src 'self'(?: 'sha256-[^']+')*/,
  `script-src 'self' ${newHashList}`
);

fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2) + "\n");
console.log(`Patched vercel.json CSP with ${hashes.length} script-src hashes across ${pages.length} pages.`);
