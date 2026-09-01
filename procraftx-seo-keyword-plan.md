> ## ⚠️ PARTIALLY SUPERSEDED — read the corrections before acting
>
> This report was written from page-summaries. I have since run a real keyword harvest
> and a raw-HTML crawl, and **two of its recommendations were wrong**:
>
> 1. **"No meta descriptions"** — false. You have them, plus Open Graph, canonical and
>    JSON-LD. See `procraftx-technical-seo-audit.md`.
> 2. **Majlis and carport keywords ranked #1/#2/#4/#5 below** — the live data does not
>    support them. "Majlis" in the UAE is restaurant/lounge intent; "carport" is the wrong
>    word for this market. See `procraftx-keyword-research.md`.
>
> The competitor structural analysis in this file is still accurate and useful.
> The keyword priorities at the bottom are not — use the revised list in
> `procraftx-keyword-research.md` instead.

# ProCraftX.ae — Competitor Keyword Gap Analysis & Ranking Plan
**Target market:** google.ae (UAE) | **Service area:** Dubai + Sharjah
**Date:** August 2026

---

## 0. THE HEADLINE PROBLEM

Your sitemap contains **2 URLs**:

```
https://procraftx.ae/
https://procraftx.ae/faq.html
```

That is the entire reason you are not ranking. Google ranks *pages*, not businesses.
You have 17 services described as **anchor sections on one page** — so all 17 compete
against each other for the same single URL, and Google picks one topic for it.

Compare page inventory vs. keyword counts you supplied:

| Site | Indexable service pages | SEO Keywords |
|---|---|---|
| wewillfixit.com | ~12 services + blog + 2 contract pages | **394** |
| mplus.ae | 8 service pages + packages + offers | **203** |
| fixperts.ae | ~30 services across 4 categories | **134** |
| breathemaintenance.com | 9 service pages + blog | **126** |
| handyman-dubai.com | ~41 sub-service pages + blog | (highest long-tail count) |
| **procraftx.ae** | **0** | **~0–5** |

The correlation is almost linear. **One page = one keyword cluster.** Until you split
your 17 services into 17 URLs, no amount of keyword research will move you.

> Note on data: I analysed live page content, titles, H1s, nav structures and sitemaps
> for all six domains. Search-volume figures below are **estimates based on SERP
> competitiveness and UAE market patterns**, not pulled from Ahrefs/Semrush — verify
> the priority ones in Keyword Planner before committing budget.

---

## 1. WHAT EACH COMPETITOR IS ACTUALLY RANKING FOR

### wewillfixit.com — 394 keywords (the leader)
**Title:** `Home Maintenance Services Dubai | AC, Plumbing, Electrical | We Will Fix It`
**H1:** "THE LARGEST & MOST TRUSTED INDEPENDENT MAINTENANCE COMPANY IN DUBAI"

Ranking structure — clean `/services/{keyword}/` silo:
```
/services/air-conditioning/          → ac maintenance dubai, ac servicing dubai
/services/air-conditioning-replacement/ → ac replacement dubai, ac installation dubai
/services/duct-cleaning-3/           → duct cleaning dubai, ac duct cleaning
/services/coil-cleaning-2/           → ac coil cleaning dubai
/services/electrical/                → electrician dubai, electrical services dubai
/services/emergency-services/        → emergency plumber dubai, 24/7 handyman
/services/plumbing/                  → plumber dubai, plumbing services dubai
/services/painting-4/                → painting services dubai
/services/handyman/                  → handyman dubai, handyman services dubai
/services/water-tank-cleaning/       → water tank cleaning dubai
/annual-contract/residential/        → annual maintenance contract dubai
/annual-contract/commercial/         → commercial maintenance contract dubai
```
**Why they win:** since 2008, 4.7★ from 2,000+ reviews, an active **blog**, and
trust-signal pages (`/how-we-compare`, `/testimonials`, `/faq`). The blog is where
most of that 394 comes from — informational long-tail.

### mplus.ae — 203 keywords
**Title:** `Home Maintenance, AC, Electrical, Plumbing Services Dubai, UAE mplus`
Silo: `/services/{water-tank-cleaning | air-conditioning | plumbing | handyman | pest-control | electrical | cleaning | painting}`

**Their strongest angle = subscription keywords.** Bronze/Silver/Gold packages
(AED 104 / 188 / 272 per month) let them own:
`home maintenance packages dubai`, `annual maintenance contract dubai`,
`monthly maintenance package dubai`, `amc dubai`.
They also rank in **Abu Dhabi**, and push app-download keywords.

### fixperts.ae — 134 keywords (widest service spread, weakest execution)
**Title:** `Fixperts - Best Maintenance Company Dubai, UAE`
~30 services: renovation (kitchen, bathroom, tiling, decking, marble polishing,
wallpaper, landscaping, artificial grass, garage doors, CCTV), pool services
(maintenance, construction, fence/cover), cleaning (deep, upholstery, BBQ grill,
window, water tank), plus appliance repair and smart home.

**The tell:** 30 services but only 134 keywords — their pages are thin. They are
*declaring* services without *ranking* for them. This is the gap you attack.

### breathemaintenance.com — 126 keywords (best URL hygiene)
**Title:** `Home Maintenance Services Dubai - Maintenance Company | Breathe`
Their URLs are literally the keywords — copy this pattern exactly:
```
/services/ac-maintenance-dubai/
/services/plumbing-services-dubai/
/services/handyman-dubai/
/services/painting-services-dubai/
/services/ac-duct-cleaning/
/services/ac-coil-cleaning/
/annual-maintenance-packages/
```

### handyman-dubai.com — the long-tail machine
**Title:** `Handyman Dubai Expert Services in UAE | Book 045864032`
41+ micro-pages: `tv-wall-bracket-fixing`, `drilling-hanging`, `furniture-assembly-dubai`,
`christmas-decoration-dubai`, `carpenter-dubai`, `electrician-dubai`...

Plus explicit **neighbourhood targeting**: Dubai Marina, JLT, Downtown Dubai,
Business Bay, JVC, Deira, Al Barsha, Palm Jumeirah.
Angle: `Near Me` + `Same-day` + `24/7 Emergency` + published starting prices.

---

## 2. SIMILAR BUSINESSES YOU SHOULD ALSO TRACK

You gave me 5 — these are the ones actually holding page 1 in google.ae that you missed:

| Competitor | Why they matter |
|---|---|
| **Octopus Home Maintenance** (octopus.ae) | A Betterhomes company. Ranks #1 in most "best of" listicles. 60-min response USP. |
| **Urban Company** (urbancompany.com/dubai-*) | Marketplace. Owns `/dubai-handyman`, `/dubai-ac-service-repair`, `/dubai-packers-and-movers`. Massive domain authority. |
| **ServiceMarket** (servicemarket.com) | Aggregator, owns comparison/quote intent. |
| **HomeGenie / Repair Plus / Vfix / HOMD** | Mid-tier direct competitors, all listicle-mentioned. |
| **Smiling Handyy** (smilehandyy.com) | Overlaps your movers + handyman combo. |
| **The Healthy Home** (thehealthyhome.me) | Overlaps your disinfection + sanitization services. |
| **acmaintenanceuae.com** | Pure-play AC SEO site, outranks bigger brands on AC terms. |

**Also critical:** MyBayut, Property Finder blog, dubaisbest.com, everlist.ae,
lushloom.ae, handymanreviewed.com run the "Top 10 X in Dubai" listicles that dominate
page 1. **Getting listed on those is a ranking channel in itself** — pitch them.

---

## 3. THE KEYWORD MAP — WHAT TO TAKE FROM THEM

### TIER A — Core money keywords (all 5 competitors rank; you must have these)
One dedicated page each. Non-negotiable.

| Keyword | Difficulty | Who ranks now | Your page |
|---|---|---|---|
| ac maintenance dubai | High | wewillfixit, breathe, mplus | `/ac-maintenance-dubai` |
| ac repair dubai | High | acmaintenanceuae, urbancompany | `/ac-repair-dubai` |
| ac servicing dubai | High | wewillfixit | (same page, secondary) |
| ac duct cleaning dubai | Medium | wewillfixit, breathe | `/ac-duct-cleaning-dubai` |
| ac coil cleaning dubai | **Low** | wewillfixit, breathe | `/ac-coil-cleaning-dubai` |
| plumbing services dubai | High | all 5 | `/plumbing-services-dubai` |
| plumber dubai / plumber near me | High | handyman-dubai | (same page, secondary) |
| electrical services dubai | High | all 5 | `/electrical-services-dubai` |
| electrician dubai | High | handyman-dubai | (same page, secondary) |
| handyman services dubai | **Very High** | handyman-dubai, urbancompany | `/handyman-services-dubai` |
| handyman dubai near me | High | handyman-dubai | (same page, secondary) |
| painting services dubai | High | all 5 | `/painting-services-dubai` |
| wall painting dubai | Medium | breathe, fixperts | (same page, secondary) |
| home maintenance dubai | **Very High** | wewillfixit, breathe | Homepage |
| maintenance company dubai | Very High | fixperts, breathe | Homepage |

### TIER B — Package / contract keywords (mplus + fixperts own these; high commercial value)
You currently have **zero** recurring-revenue keywords.

```
annual maintenance contract dubai      ← mplus, fixperts, wewillfixit, breathe
home maintenance packages dubai        ← mplus (Bronze/Silver/Gold), fixperts (Classic/Executive/Elite)
amc dubai / amc contract dubai
monthly maintenance package dubai
villa maintenance contract dubai
apartment maintenance package dubai
commercial maintenance contract dubai  ← wewillfixit only — weak competition
```
**Action:** build `/annual-maintenance-packages-dubai` with 3 named tiers and visible
AED pricing. mplus shows AED 104/188/272 per month — price against that.

### TIER C — YOUR UNFAIR ADVANTAGE (services competitors do NOT offer)
This is where you can rank in **weeks, not months.** Nobody in your competitor set
covers these properly. Build these pages FIRST — they are fast wins that also feed
authority to your Tier A pages.

**Furniture specialisation — almost nobody owns this:**
```
furniture restoration dubai              ← ZERO strong competitor
furniture painting dubai                 ← ZERO
sofa reupholstery dubai                  ← only fixperts (thin page)
upholstery services dubai
mattress cleaning dubai
sofa cleaning dubai
furniture cleaning dubai
furniture disassembly and reassembly dubai   ← handyman-dubai only
furniture assembly dubai                 ← handyman-dubai, urbancompany
bed assembly dubai / wardrobe assembly dubai
```

**Majlis — genuinely uncontested, high-intent, high-ticket:**
```
majlis design dubai
outdoor majlis construction dubai
majlis renovation dubai
arabic majlis design dubai
majlis contractor dubai / sharjah
```
Nobody in your list offers this. Cultural high-value keyword in the UAE. **Build this page.**

**Car garage / carport — uncontested:**
```
car garage construction dubai
carport installation dubai
custom carport dubai
car shade installation dubai / sharjah
garage construction villa dubai
```
Only fixperts touches "garage door works" — not construction. Open field.

**Glass & shower installation:**
```
shower glass installation dubai
shower partition dubai
glass shower door installation dubai
window glass installation dubai
glass replacement dubai
```
Zero competitor coverage in your set.

**Move-in/move-out + clearing (bundle nobody else bundles):**
```
move in move out cleaning dubai          ← mplus H1 targets this — contest it
deep cleaning dubai
property clearing dubai                  ← almost ZERO competition
decluttering services dubai              ← almost ZERO
junk removal dubai / house clearance dubai
packers and movers dubai                 ← Urban Company / ServiceMarket own it — hard
movers and packers dubai
```

**Disinfection / pest:**
```
disinfection services dubai              ← fixperts, thehealthyhome
sanitization services dubai
pest control dubai                       ← mplus, fixperts (high competition)
home disinfection sharjah                ← easy
```

### TIER D — SHARJAH: your single biggest untapped market
**Every competitor is Dubai-only.** mplus adds Abu Dhabi. **Nobody targets Sharjah.**
Competition here is a fraction of Dubai and you already service it.

Build a full `/sharjah/` silo mirroring your Dubai pages:
```
handyman services sharjah          ac maintenance sharjah
ac repair sharjah                  plumber sharjah
plumbing services sharjah          electrician sharjah
electrical services sharjah        painting services sharjah
home maintenance sharjah           maintenance company sharjah
deep cleaning sharjah              movers and packers sharjah
furniture assembly sharjah         majlis design sharjah
```
Also: Al Nahda, Al Majaz, Al Qasimia, Muwaileh, Al Khan, Al Taawun.

### TIER E — Neighbourhood pages (handyman-dubai's whole strategy)
Copy this. Location pages are the cheapest keyword volume in this market.
```
handyman dubai marina          handyman jlt
handyman downtown dubai        handyman business bay
handyman jvc                   handyman deira
handyman al barsha             handyman palm jumeirah
ac repair dubai marina         plumber jvc
ac maintenance palm jumeirah   electrician business bay
```
Add: Arabian Ranches, Dubai Hills, Springs/Meadows, Mirdif, Silicon Oasis,
Discovery Gardens, Damac Hills, Town Square, JBR, Al Furjan.

### TIER F — Emergency / urgency modifiers (fast-converting, moderate competition)
```
emergency plumber dubai            24/7 handyman dubai
emergency ac repair dubai          same day handyman dubai
emergency electrician dubai        water leak repair dubai
ac not cooling repair dubai        ac gas refilling dubai
blocked drain cleaning dubai       water heater repair dubai
```
wewillfixit has one `/services/emergency-services/` page. handyman-dubai claims 24/7.
Everyone else ignores this. Each of these deserves its own page.

### TIER G — Micro-task long-tail (handyman-dubai's 41-page playbook)
Low volume individually, enormous in aggregate, near-zero difficulty:
```
tv wall mounting dubai             curtain installation dubai
tv bracket installation dubai      blinds fixing dubai
picture hanging dubai              mirror installation dubai
drilling and hanging dubai         door lock repair dubai
chandelier installation dubai      socket installation dubai
kitchen cabinet repair dubai       drywall partition dubai
shelf installation dubai           wallpaper installation dubai
```

### TIER H — Blog / informational (this is where wewillfixit's 394 comes from)
Service pages alone cap out around 120–150 keywords. The blog is the difference.
```
how often should you service ac in dubai
ac maintenance cost in dubai
handyman charges in dubai per hour
average plumber cost dubai
best time to service ac in uae
how to reduce dewa bill
what is included in annual maintenance contract
move out cleaning checklist dubai
how much does painting a villa cost in dubai
ac gas refilling price dubai
signs your ac needs servicing
water tank cleaning frequency dubai
```

---

## 4. GAPS TO CLOSE IMMEDIATELY (non-keyword)

1. **No meta descriptions** — none of your pages have one. Neither do competitors, so
   this is a cheap CTR win.
2. **`faq.html` file extension** — move to `/faq/`. Flat `.html` URLs signal a static
   template, not a content site.
3. **Water tank cleaning** — 4 of 5 competitors offer it, you don't. It's a mandated
   service in UAE and a reliable keyword. **Add the service.**
4. **Pest control** — mplus + fixperts have it; you have "Disinfection & Pest
   Management" buried in a section. Give it a page.
5. **No blog** — wewillfixit and breathe both have one. This is your 200-keyword gap.
6. **No published pricing** — handyman-dubai and mplus both show starting prices.
   Google's "no hidden charges" intent cluster is real. Publish a rate card.
7. **No review schema** — wewillfixit shows 4.7★/2,000+ reviews. Add
   `LocalBusiness` + `AggregateRating` + `Service` JSON-LD schema.
8. **Google Business Profile** — for Dubai *and* a separate Sharjah listing. The map
   pack sits above organic results for every "near me" term above.
9. **Get on the listicles** — MyBayut, Property Finder blog, dubaisbest.com,
   everlist.ae, lushloom.ae, handymanreviewed.com. These outrank the actual companies.

---

## 5. EXECUTION ORDER

**Phase 1 — Weeks 1–4 (foundation)**
Split the single page into 17 service URLs using breathe's naming pattern
(`/ac-maintenance-dubai`, `/plumbing-services-dubai`, ...). 700–1,200 words each,
unique title + meta, LocalBusiness schema, updated sitemap, Search Console verified.

**Phase 2 — Weeks 3–6 (fast wins — start ranking here)**
Tier C uncontested pages: majlis, carport, furniture restoration, shower glass,
property clearing, decluttering. Low difficulty, high ticket, no real competitor.

**Phase 3 — Weeks 5–10 (the moat)**
Full Sharjah silo. You are alone in that market.

**Phase 4 — Weeks 8–16 (volume)**
Neighbourhood pages + Tier G micro-tasks + emergency pages.

**Phase 5 — ongoing**
Two blog posts per week from Tier H. This is what closes the 394 gap.

**Realistic timeline:** Tier C keywords — 4–10 weeks. Tier D Sharjah — 6–12 weeks.
Tier A Dubai head terms — 6–12 months, and only with links and reviews behind them.

---

## 6. THE 15 KEYWORDS TO ATTACK FIRST

Ranked by (low competition × high commercial intent × you already offer it):

1. majlis design dubai
2. outdoor majlis construction dubai
3. furniture restoration dubai
4. carport installation dubai
5. car garage construction dubai
6. shower glass installation dubai
7. property clearing dubai
8. decluttering services dubai
9. furniture painting dubai
10. handyman services sharjah
11. ac maintenance sharjah
12. plumbing services sharjah
13. furniture disassembly and reassembly dubai
14. ac coil cleaning dubai
15. move in move out cleaning dubai

Every one of these is a service you already deliver, with a page that doesn't exist yet.
