# ProCraftX.ae — Backlinks & Rank Tracking

---

## PART 1 — BACKLINK ANALYSIS

### What I can and cannot tell you

**I do not have a backlink index.** Ahrefs, Majestic, Moz and Semrush each run their own
web-wide crawler; there is no free API for that data. So I cannot give you competitor
referring-domain counts or Domain Rating, and I will not estimate them — a made-up DR
number is worse than no number.

**What I can give you, and did:** the link *surfaces* competitors are using, identified from
their live site structure and from which pages actually rank in google.ae for your terms.
That is the actionable half.

**To get the real numbers:** Ahrefs Webmaster Tools is free for domains you verify — it
gives you your own full backlink profile. For competitor profiles you need a paid seat
(Ahrefs ~$129/mo, or one month of Semrush to pull a one-time competitor export).

---

### Finding 1 — Listicles outrank the actual companies

This is the most important link insight from the SERP research. For your highest-value
queries, **page one is dominated by "Top 10" articles, not service providers**:

| Query | What actually ranks |
|---|---|
| best handyman services dubai | dubaisbest.com, bayut.com/mybayut, handymanreviewed.com, everlist.ae, lushloom.ae |
| top ac repair companies dubai | propertyfinder.ae blog, bayut.com/mybayut, rmconnection.com, sethnco.com |
| home maintenance companies dubai | lushloom.ae, everlist.ae, acmaintenanceuae.com blog |

Octopus Home Maintenance ranks #1 in several of these listicles and it is not even in your
competitor set — that placement is doing more for them than most link building.

**Action — this is your highest-ROI link activity:**
Pitch for inclusion in each. They all accept submissions; several are explicitly
pay-to-list, which is a legitimate directory spend, not a link scheme.

1. bayut.com/mybayut — highest authority UAE property portal
2. propertyfinder.ae/blog — second highest
3. dubaisbest.com
4. everlist.ae
5. lushloom.ae
6. handymanreviewed.com
7. acmaintenanceuae.com/blog

Pitch angle: lead with what makes you *listable*, not with a link request —
**Dubai + Sharjah coverage, 17 services under one crew, flat quote before work starts.**
The Sharjah coverage is genuinely differentiating; most listicles are Dubai-only and
would welcome a Sharjah entry.

### Finding 2 — Citation/NAP foundation (do this first, it is free)

Consistent Name, Address, Phone across UAE directories is the base layer of local ranking.
Use **byte-identical** NAP everywhere — same phone format, same address string.

| Priority | Directory |
|---|---|
| 1 | **Google Business Profile** — separate listings for Dubai and Sharjah |
| 1 | Bing Places |
| 1 | Apple Business Connect |
| 2 | connect.ae |
| 2 | yellowpagesae.com |
| 2 | uaeyellowpages.com |
| 2 | uae-yellowpages.ae |
| 2 | yallapages.ae |
| 3 | getlistedae.com |
| 3 | Dubai Chamber directory (if you hold a licence) |
| 3 | Justdial UAE, Hotfrog UAE, Cylex UAE |

Google Business Profile is the single highest-impact item on this page. The map pack sits
**above** organic results for every `near me` query, and `near me` variants were the highest-
frequency transactional terms in your keyword data (`ac repair dubai near me` at 21 hits).

### Finding 3 — Competitor link surfaces you can replicate

From their live sites:

- **wewillfixit.com** — active blog, `/testimonials`, `/how-we-compare`, newsletter signup,
  Instagram feed embed. The blog is where their 394 keywords come from, and blog posts are
  what earn links. **Their "how we compare" page is a smart link magnet — copy the idea.**
- **breathemaintenance.com** — blog, "Meet the Team", careers page. Team pages earn
  local-news and directory links.
- **mplus.ae** — mobile app listings on the App Store and Google Play. Both are high-authority
  links and neither requires outreach.
- **fixperts.ae** — portfolio/gallery of completed projects. Project galleries attract
  interior-design and property-blog links.

### Finding 4 — Link opportunities specific to your services

Your differentiated services open doors the generic maintenance companies cannot use:

- **Furniture restoration** — UAE interior design blogs, antique dealers, Dubai furniture
  retailers. Before/after restoration photos are highly linkable content.
- **Car parking shades** — villa community forums and Facebook groups (Arabian Ranches,
  Springs/Meadows, Damac Hills, Al Furjan), property management companies.
- **Majlis construction** — this is where the majlis page earns its keep. It won't bring
  search traffic (see the keyword research), but it will earn links from UAE lifestyle and
  Emirati-culture publications, which then lift your *other* pages.
- **Sharjah coverage** — pitch Sharjah-specific directories and community groups. Almost
  no maintenance company competes there.

### What NOT to do

Do not buy bulk links, PBN placements, or "500 backlinks for $50" gigs. The UAE home-services
niche is heavily spammed and Google's link spam detection handles it algorithmically now —
you get no benefit and risk a manual action. Directories, listicles and genuine local
relationships only.

---

## PART 2 — RANK TRACKING & COMPETITOR MONITORING

### Why I could not just check your rankings

Google blocks automated queries to `google.com/search` — it serves CAPTCHAs and eventually
blocks the IP, and it breaches their terms. There is no legitimate way for me to pull live
google.ae positions here. So I built you a tracker instead.

### `rank_tracker.py` — tested and working

Tracks procraftx.ae plus all 5 competitors across google.ae (Dubai location), stores every
run, and reports movement.

**Setup:**
```powershell
pip install requests
python rank_tracker.py                      # creates keywords.txt (21 priority keywords)
$env:SERPER_API_KEY="your_key_here"         # free key: https://serper.dev (2,500 queries)
python rank_tracker.py                      # first tracking run
```

**Weekly:**
```powershell
python rank_tracker.py            # new run + movement report
python rank_tracker.py --report   # re-read history, no API calls, no cost
```

**Sample output** (verified against test data):
```
RANK REPORT   2026-08-01   (vs 2026-07-25)
KEYWORD                                YOU     mplus   wewill  fixper  breath  handym
ac repair sharjah                      15 +3   27      19      4       8       21
ac service cost in dubai               39 +3   8       3       18      14      2
furniture restoration dubai            -       21      19      2       19      19

IMPROVED (3):
   ac repair sharjah                    18 -> 15
NOT IN TOP 100 (1): furniture restoration dubai

SHARE OF TOP 10 ACROSS 4 TRACKED KEYWORDS
   procraftx.ae                0    <-- YOU
   wewillfixit.com             2  ##
```

**Cost:** 21 keywords × 6 domains, weekly = 21 API queries/week ≈ 1,100/year.
Serper's free 2,500 covers roughly two years. Effectively free.

The "share of top 10" table is the number to watch. It is the honest scoreboard —
individual keyword wins can be noise, but share trend is real.

### Free tools to set up alongside (do these regardless)

| Tool | Why | Cost |
|---|---|---|
| **Google Search Console** | Real impressions, clicks and average position for *every* keyword you rank for. More accurate than any third-party tracker because it is Google's own data. **Set this up today.** | Free |
| **Bing Webmaster Tools** | Free bulk keyword research with actual volume — a partial substitute for the volume data I couldn't get | Free |
| **Google Keyword Planner** | Real AED-market volume. Paste in `procraftx-keywords.csv` | Free w/ Ads account |
| **Ahrefs Webmaster Tools** | Your own backlink profile, verified domains only | Free |
| **Google Analytics 4** | ⚠️ Your CSP will block it — see note below | Free |
| **PageSpeed Insights** | Verify the LCP/CLS fixes landed | Free |

### ⚠️ Your CSP will block Google Analytics

`vercel.json` sets `script-src 'self'` plus two script hashes. GA4 and GTM will be
**silently blocked** — no error, just no data. Before installing analytics, update the CSP:

```json
"script-src 'self' 'sha256-...' 'sha256-...' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://fonts.googleapis.com https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
```

### Competitor monitoring — beyond rankings

1. **Content velocity.** wewillfixit and breathe both blog. Check their blogs monthly; the
   topics they publish reveal what is converting for them.
2. **New service pages.** Diff their sitemaps monthly:
   ```powershell
   curl -s https://wewillfixit.com/sitemap.xml -o wwfi-$(Get-Date -f yyyyMM).xml
   ```
   A new service page is an early signal of a market they've validated.
3. **Pricing.** mplus publishes package prices (AED 104/188/272 per month). Track changes —
   it tells you where the market is moving.
4. **Google review velocity.** wewillfixit shows 4.7★ from 2,000+ reviews. Track your gap
   monthly; reviews drive both map-pack rank and CTR.

---

## DEPLOYMENT DRIFT — worth checking

Your local `vercel.json` sets:
```json
"Access-Control-Allow-Origin": "https://procraftx.ae"
```
But the live site returns:
```
Access-Control-Allow-Origin: *
```

**Local config is ahead of what is deployed.** Either the last deploy didn't pick it up, or
there are undeployed local changes. Worth confirming before you make further edits, so you
don't build on top of a stale deployment.

Also missing from `vercel.json`:
```json
"cleanUrls": true,
"trailingSlash": true
```
Needed for `/faq/` instead of `/faq.html`, and for the service-page URL scheme.

And `sitemap.xml` has no `<lastmod>` dates — add them; Google uses them to prioritise recrawls.
