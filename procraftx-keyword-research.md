# ProCraftX.ae — Keyword Research Findings
**Method:** 2,299 real expansions harvested from Google Autocomplete (`gl=ae`, `hl=en`)
across 66 seed terms with a–z suffix expansion and commercial modifiers.
**Output:** `procraftx-keywords.csv` — 875 filtered, scored, banded keywords.

## Read this first: what this data is and is not

| | |
|---|---|
| **Real** | The keyword *strings*. These are genuine queries UAE users type — Google returns them because people search them. |
| **Real** | `suggest_hits` — how many independent seeds surfaced the term. A strong relative popularity proxy. |
| **Modelled** | `score` and difficulty bands. Derived from suggest frequency + intent modifiers + observed competitor coverage. |
| **Not available** | Absolute monthly search volume and Ahrefs/Semrush KD. Those need a paid API. **I have not invented numbers.** |

To get true volume, put the CSV's `keyword` column into Google Keyword Planner
(free with a Google Ads account) — it will return real AED-market volume for all 875.

---

## MAJOR CORRECTION TO MY FIRST REPORT

My earlier report ranked **"majlis design dubai"** and **"outdoor majlis construction dubai"**
as your #1 and #2 priority keywords. **The live data says that was wrong.** Here is the raw
autocomplete for `majlis dubai` in the UAE:

```
majlis dubai airport            majlis dubai mall
majlis dubai airport price      majlis dubai iftar
majlis dubai golf               majlis dubai ramadan
majalis dubai perfume           majlis dubai world trade centre
```

Every single one is a **restaurant, airport lounge, golf club, Ramadan dining or perfume**
query. Zero construction intent. Worse:

```
"majlis contractor"   → NO SUGGESTIONS AT ALL (negligible volume)
"majlis construction" → returns only itself (negligible volume)
"majlis design"       → skews to sofas, living-room ideas, "majlis design in pakistan"
"outdoor majlis"      → skews to furniture: seating, sofa, tent, carpet, "for sale"
```

**What this means:** ranking #1 for "majlis dubai" would send you people looking for
somewhere to eat. Chasing it would have wasted months.

**Revised guidance:** keep the majlis page — it is a genuine differentiator that converts
visitors who arrive from other pages, and it supports high-ticket referral work. But treat it
as a **conversion and credibility asset, not a traffic-acquisition play.** Target the
qualified long-tail only: `outdoor majlis design dubai`, `majlis renovation dubai`.

This is exactly why the harvest was worth running.

---

## SECOND CORRECTION: "carport" is the wrong word for this market

```
"carport dubai" → carport dubai / solar carport dubai / carport kosten (German!) /
                  "do i need a permit to build a detached carport"
```
Thin, and polluted with non-UAE traffic.

The actual UAE vernacular is **"car parking shade"**:

```
car parking shades dubai              car parking shades suppliers in dubai
car parking shades suppliers in uae   car parking shades suppliers in sharjah
car parking shade ajman               car parking shade price in uae
car parking shade abu dhabi
```

**Rename the page and all its copy from "carport" to "car parking shades".**
Same service, same customer — a term real people actually use. Cover Sharjah and Ajman
in the same page; both appear in autocomplete and both are inside your service area.

---

## CONFIRMED WINNERS (data backed the original call)

### Furniture restoration — strongest verified niche
`furniture restoration dubai` is the **#1 autocomplete result for the bare phrase
"furniture restoration"** globally-weighted to AE. That is a strong demand signal.
Full verified cluster:

```
furniture restoration dubai        sofa repair dubai
furniture repair dubai             sofa repair dubai near me
furniture refurbishment dubai      sofa repair dubai cost
wooden furniture restoration dubai couch repair dubai
antique furniture restoration dubai upholstery repair dubai
furniture restoration cost
```
`antique furniture restoration dubai` is high-ticket and near-uncontested. Build this page.

### Shower / glass partition — verified with price intent
```
shower glass partition dubai          bathroom glass partition dubai
shower glass partition dubai price    shower glass panel dubai
shower glass partition price          glass shower screen dubai
shower glass partition near me        office glass partition dubai
```
Note: **"partition" outperforms "installation"** as the head term. Also note
`shower glass partition dragon mart` — users are price-comparing against Dragon Mart.
Publish prices to compete.

### Sharjah — confirmed open, and it goes deeper than expected
Not only do the emirate-level terms exist, **Sharjah neighbourhood terms autocomplete too**:

```
ac repair sharjah muweilah    ac repair sharjah al nahda
ac repair sharjah rolla       cleaning services sharjah muweilah
ac repair sharjah near me     cleaning services sharjah open now
electrician sharjah near me   cleaning company sharjah price list
plumber near me sharjah       chiller maintenance company in sharjah
```
Google only autocompletes what people search. **Zero of your five competitors targets
Sharjah.** This remains your single best opportunity and it is bigger than I first thought.

Note `handyman service sharjah` returns only 3 suggestions — thin. But `ac`, `cleaning`
and `plumber` in Sharjah are all healthy. **Lead with AC and cleaning in Sharjah, not handyman.**

### Villa maintenance — a cluster I missed entirely first time
```
villa maintenance dubai              villa maintenance contract dubai
villa maintenance services dubai     villa maintenance cost dubai
annual maintenance contract for villa dubai
property maintenance dubai           villa management dubai
```
"Villa" is the high-value UAE property segment. mplus and fixperts sell generic packages;
none of them own **villa-specific** contract language. Build
`/villa-maintenance-contract-dubai`. High ticket, recurring revenue, weak competition.

---

## TOP TRANSACTIONAL TERMS BY MEASURED FREQUENCY

Ranked by `suggest_hits` — how many independent seeds surfaced them:

| Keyword | hits | Intent | Band |
|---|---|---|---|
| ac repair dubai near me | 21 | Transactional | Head |
| deep cleaning dubai price | 19 | Commercial | Blog/price |
| painting price in dubai | 18 | Commercial | Blog/price |
| ac repair services in dubai | 18 | Commercial | Head |
| movers and packers dubai cost | 16 | Commercial | Blog/price |
| deep cleaning companies in dubai | 15 | Transactional | Head |
| maintenance companies in dubai | 14 | Transactional | Head |
| ac maintenance companies in dubai | 13 | Transactional | Head |
| cheap movers and packers in dubai | 12 | Commercial | Head |
| ac service cost in dubai | 9 | Commercial | Blog/price |
| handyman services dubai marina | 8 | Commercial | **Local** |
| ac maintenance dubai near me | 6 | Transactional | Head |
| handyman dubai near me | 5 | Transactional | Head |
| plumbing services dubai near me | 5 | Transactional | Head |

**Pattern worth acting on:** four of the top ten are **price queries**
(`deep cleaning dubai price`, `painting price in dubai`, `movers and packers dubai cost`,
`ac service cost in dubai`). UAE customers search price before they search company.

**Nobody in your competitor set publishes a real price page.** mplus shows package prices;
handyman-dubai shows "starting prices". Neither has a proper pricing guide.

**Build `/pricing/` with actual AED rates per service.** It is the highest-frequency,
lowest-competition cluster in the entire dataset, and it aligns with your existing
"flat quote before we start" positioning. This is your fastest realistic win.

**Also note `handyman services dubai marina` at 8 hits** — higher than most emirate-level
terms. Neighbourhood pages are validated; Marina is the strongest.

---

## THE BANDS (full data in `procraftx-keywords.csv`)

| Band | Count | Meaning | Priority |
|---|---|---|---|
| **A-GOLD** | 35 | Services you deliver, minimal competitor coverage | 1st — but read the majlis warning |
| **B-SHARJAH** | 48 | Zero competitor coverage | 1st — best risk/reward |
| **C-LOCAL** | 52 | Neighbourhood pages, thin competition | 2nd |
| **D-BLOG** | 65 | Price/informational, builds authority | 2nd — includes the price cluster |
| **E-HEAD** | 675 | Core money terms, all 5 compete | 3rd — 6–12 month horizon |

CSV columns: `band, keyword, score, suggest_hits, intent, rationale`.
Sort by `band` then `score`.

---

## REVISED FIRST 12 KEYWORDS TO ATTACK

Corrected for everything the live data showed:

| # | Keyword | Why |
|---|---|---|
| 1 | ac service cost in dubai | Price cluster, 9 hits, nobody owns it |
| 2 | deep cleaning dubai price | 19 hits — highest-frequency price term found |
| 3 | painting price in dubai | 18 hits, no competitor price page |
| 4 | movers and packers dubai cost | 16 hits |
| 5 | car parking shades dubai | Corrected term; suppliers-in-dubai variant confirmed |
| 6 | furniture restoration dubai | #1 autocomplete for the bare phrase |
| 7 | antique furniture restoration dubai | High ticket, near-zero competition |
| 8 | sofa repair dubai | Verified cluster with `near me` + `cost` |
| 9 | shower glass partition dubai | "Partition" beats "installation"; price intent |
| 10 | ac repair sharjah | Emirate-level, zero competitors |
| 11 | cleaning services sharjah | Strongest Sharjah cluster after AC |
| 12 | villa maintenance contract dubai | Recurring revenue, weak competition |

Dropped from my original list: `majlis design dubai`, `outdoor majlis construction dubai`,
`carport installation dubai`, `car garage construction dubai` — the data does not support them
as traffic plays. Keep the pages for conversion; don't build a campaign around them.
