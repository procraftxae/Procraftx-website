// Post-build step: hash every JSON-LD <script> block Eleventy just wrote and
// patch vercel.json's CSP script-src list to match. Replaces the manual
// "run a hash snippet, copy the value, paste it into vercel.json" step this
// project's CLAUDE.md documents as a recurring manual chore.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.join(__dirname, "..");
const pages = ["index.html", "faq.html", path.join("ar", "index.html"), path.join("ar", "faq.html")];

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
console.log(`Patched vercel.json CSP with ${hashes.length} script-src hashes (${pages.join(", ")}).`);
