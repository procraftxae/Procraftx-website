# Procraftx — project context

Read this before making any change. It records constraints that are **not obvious
from reading the code** and that have already caused one silent production bug.

---

## What this project is

A hand-written **static site**. There is no framework, no build step, no
dependencies.

```
index.html          homepage (10 service/specialty blocks)
faq.html            FAQ page (7 groups, ~43 questions)
styles.css          all styling (single file)
assets/js/main.js   homepage behaviour + EN/AR dictionary
assets/js/faq.js    FAQ behaviour + its own EN/AR dictionary
vercel.json         security headers (incl. CSP)
.well-known/security.txt
```

No `package.json`, no `node_modules`, no bundler. Edit files directly.

Host: **Vercel**, account `procraftxae-2417` (login: `procraftx.ae@gmail.com`),
project `procraftx-website`. Domain **procraftx.ae** (production domain is
actually `www.procraftx.ae` — apex 308-redirects to it). DNS at **Tasjeel**
(no API access — DNS changes must be done by the user).

**Git-connected deploys (since 2026-09-01):** this repo is pushed to
`https://github.com/procraftxae/Procraftx-website.git` (private, branch
`main`). Pushing to `main` triggers an automatic Vercel production deploy —
there is no more `vercel --prod` step. Local git identity for this repo is
set **locally** (`Procraftx` / `Procraftx.ae@gmail.com`), not globally — the
machine's global git identity belongs to an unrelated project (ShineX) and
must never be used here. Check with `git config user.email` (no `--global`)
if unsure.

There used to be a separate, older Vercel project (team `procraftx`, account
`abdullahalhashmi1`, CLI-only deploys, no Git). It has been fully retired —
domains were removed from it on 2026-09-01 and everything now lives under
`procraftxae-2417`. **Do not deploy there or try to relink `.vercel/` to
it** — if a stray `.vercel/project.json` in this folder still points to the
old `orgId`/`projectId`, delete it; it's stale.

---

## ⚠️ TRAP 1 — CSP script hashes

`vercel.json` whitelists inline scripts by **sha256 hash**, not `unsafe-inline`.
The only inline scripts are the `application/ld+json` structured-data blocks in
`index.html` and `faq.html`.

**Change one character inside a JSON-LD block and its hash changes.** If
`vercel.json` still lists the old hash, browsers block the structured data.
**Nothing looks broken** — the page renders fine — but Google stops receiving the
business schema. Silent failure.

This shipped-and-was-caught once (2026-08-01) when the JSON-LD `description` was
updated to add new specialties.

**After ANY JSON-LD edit, run this from the project root and update
`vercel.json` until both files report MATCH:**

```js
const fs=require('fs'), crypto=require('crypto');
const csp=require('./vercel.json').headers[0].headers
  .find(h=>h.key==='Content-Security-Policy').value;
const allowed=[...csp.matchAll(/'sha256-([^']+)'/g)].map(m=>m[1]);
for(const f of ['index.html','faq.html']){
  const re=/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g; let m;
  const h=fs.readFileSync(f,'utf8');
  while((m=re.exec(h))){
    const x=crypto.createHash('sha256').update(m[1],'utf8').digest('base64');
    console.log(f, allowed.includes(x) ? 'MATCH' : 'MISMATCH -> sha256-'+x);
  }
}
```

---

## ⚠️ TRAP 2 — Arabic translation matches whole text nodes

The EN/AR system walks text nodes and looks each one up **in full** against the
`AR` dictionary in `main.js` / `faq.js`.

Wrapping part of a translated sentence in a tag (`<a>`, `<strong>`, …) **splits
the text node into pieces**, none of which match the dictionary key — that string
then silently stays English in Arabic mode.

- ✅ Add links/emphasis as **separate elements before or after** a paragraph
- ❌ Never insert a tag mid-sentence inside translated copy
- Any new user-visible English string needs a matching `AR` entry, **in both**
  `main.js` and `faq.js` if it appears on both pages

---

## Deploying

**Always ask the user for explicit confirmation before pushing to `main`.**
A push to `main` IS a production deploy now (auto-triggered by Vercel's
GitHub integration) — never push unprompted, even when it's the obvious next
step.

```
git push origin main        # this is the deploy — no separate vercel command
```

`git push` has been observed to get silently blocked by this environment's
own permission layer regardless of retries — if that happens, hand the exact
command to the user to run from their own terminal rather than looping on it.

Changes are local (uncommitted/unpushed) until pushed. `styles.css` and
`main.js` cache hard in browsers — use a cache-busting query string when
verifying, or the old file will appear to "not work".

### Pre-deploy (pre-push) checklist

1. CSP hashes MATCH (script above)
2. `node --check assets/js/main.js && node --check assets/js/faq.js`
3. `node -e "require('./vercel.json')"` — valid JSON
4. No duplicate `id`s, no dead `#anchors`
5. New English strings have `AR` entries
6. Internal/SEO working files still excluded (see below)
7. `git status` — confirm nothing unintended is staged (check `.env.local`,
   `.vercel`, `.claude` are NOT in the diff; they're gitignored but verify)

### After pushing, verify against the live site

Local files being right does not prove the deploy is right. **Note: `procraftx.ae`
(apex) always 308-redirects to `www.procraftx.ae` — test paths against `www`,
not the apex, or you'll just see the redirect.**

```
curl -sSI https://www.procraftx.ae/                       # 200 + headers
curl -sS -o /dev/null -w "%{http_code}" https://www.procraftx.ae/procraftx-keywords.csv   # must be 404
```

---

## Must never become public

`.vercelignore` excludes these. Verify after deploys — they contain keyword
strategy and competitor analysis:

```
*.md  (all SEO research docs, and this file)
keywords.txt, procraftx-keywords.csv, rank_tracker.py
.env*, .vercel, .claude
```

---

## Deliberate decisions (do not "fix" these)

| Decision | Why |
|---|---|
| **DNSSEC left off** | Misconfiguration takes the whole domain offline; HTTPS + HSTS + CAA already cover the DNS-spoofing threat. Only enable via a fully managed Tasjeel toggle. |
| **No separate pages per service** | Client declined the 2 → 9 URL split. Internal linking was done within the existing two pages instead. |
| **No testimonials / no ratings** | The original template testimonials were fabricated and were removed. Do not re-add social proof until real Google reviews exist. No `aggregateRating` schema — self-serving review markup violates Google policy. |
| **Stats wording** | "2 hrs — Typical arrival window" replaced a precise "92 min average", which was an internal scheduling target, not a measured figure. Keep claims defensible. |
| **Third-party review widgets** | Would be blocked by the CSP. Do not add without a deliberate CSP change. |

---

## Security setup (all live and verified)

CAA (Let's Encrypt only) · SPF `v=spf1 -all` · DMARC `p=reject` · HSTS preload
· CSP with hashes · `www` redirects 308 → apex · security.txt

DNS lives at Tasjeel and **must be changed by the user** — give exact
Type/Host/Target/TTL values. Their panel labels the value field **"Target"**, and
the root host is **`@`** (using the domain name creates a subdomain — this has
bitten us before).

Two `_vercel` TXT records exist (added 2026-09-01) for Vercel domain-ownership
verification during the account migration. They can stay indefinitely — no
need to remove them. Note: Tasjeel's panel had a bug where two TXT records
sharing the exact same host name (`_vercel`) both showed in the UI but only
one was actually served by their nameservers; if a future TXT record needs a
name already in use, verify with `nslookup -type=TXT <name> ns3.tasjeel.ae`
that it's actually being served, don't trust the panel alone.

---

## Watch dates

- **~mid-Sept 2026** — first TLS renewal since CAA was added; confirm the padlock
- **Aug 2027** — `security.txt` `Expires` needs refreshing
