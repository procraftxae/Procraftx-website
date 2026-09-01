# ProCraftX.ae — Content Optimization Pack
Ready-to-paste titles, meta descriptions, heading structures and schema.
Character counts verified. Readability targeted at **Grade 7–8** (Flesch 60–70) — the right
level for a UAE market where most searchers read English as a second language.

---

## READABILITY RULES FOR ALL COPY

Your current homepage copy ("All services. In one.", "Trusted with the small stuff and the
big stuff.") is well-written and on-brand. Keep that voice. Apply these constraints to the
new service pages:

- Sentences under 20 words. Average 12–15.
- Paragraphs 2–3 sentences.
- No jargon without a plain-English gloss: "coil cleaning (the part that stops your AC cooling)".
- Prices in AED, written as numerals.
- Active voice. "We replace the compressor" not "the compressor is replaced".
- Front-load the keyword in the first 100 words, naturally, once.
- Target 700–1,100 words per service page.
- Keyword density 0.8–1.5%. Do not exceed 2% — over-optimisation is a real penalty.

---

## PAGE 1 — HOMEPAGE (rewrite existing)

```html
<title>Home Maintenance Dubai &amp; Sharjah | AC, Plumbing | ProCraftX</title>
<!-- 57 chars -->

<meta name="description" content="AC, plumbing, electrical &amp; handyman services across Dubai &amp; Sharjah. Free walkthrough, flat quote before we start, 100% guarantee. Call 050 791 7075.">
<!-- 152 chars -->
```

**H1 change.** Your current H1 is `All services. In one.` — strong brand line, zero keyword
value. Google reads the H1 as the page's topic statement.

```html
<h1>Home Maintenance Services in Dubai &amp; Sharjah</h1>
<p class="tagline">All services. In one.</p>
```
You keep the brand line as visible copy directly beneath. Nothing is lost visually.

**Primary:** home maintenance dubai · **Secondary:** maintenance companies in dubai,
home maintenance sharjah, ac plumbing electrical dubai

---

## PAGE 2 — `/pricing/` ⭐ BUILD THIS FIRST

The data's clearest finding: four of the ten highest-frequency keywords are price queries,
and **no competitor has a real pricing page.**

```html
<title>Home Maintenance Prices Dubai 2026 | AC, Plumbing Rates</title>
<!-- 55 chars -->

<meta name="description" content="What home maintenance actually costs in Dubai. AC service, plumbing, painting and cleaning rates in AED. No hidden charges, flat quote before we start.">
<!-- 150 chars -->
```

```
H1  Home Maintenance Prices in Dubai and Sharjah
H2  AC service cost in Dubai
H2  Plumbing rates
H2  Electrical work rates
H2  Painting price per room and per villa
H2  Deep cleaning and move-out cleaning prices
H2  Movers and packers cost
H2  What changes the price
H2  Why we quote flat, before we start
```

Targets: `ac service cost in dubai` (9 hits), `deep cleaning dubai price` (19),
`painting price in dubai` (18), `movers and packers dubai cost` (16),
`ac maintenance dubai price`, `ac repair dubai cost`, `emergency plumber dubai price`.

**Publish real AED numbers or ranges.** A page that says "contact us for pricing" will not
rank for these and will not convert. Ranges are fine: "AC service: AED 150–350 depending
on unit type."

Add `Service` + `Offer` schema with `priceRange` per service.

---

## PAGE 3 — `/ac-maintenance-dubai/`

```html
<title>AC Maintenance Dubai | AC Repair &amp; Service | ProCraftX</title>
<!-- 55 chars -->
<meta name="description" content="AC repair and maintenance across Dubai. Servicing, gas refilling, coil and duct cleaning. Same-day callout, flat quote, 100% guarantee. Call 050 791 7075.">
<!-- 152 chars -->
```
```
H1  AC Maintenance and Repair in Dubai
H2  AC servicing and repair
H2  AC gas refilling
H2  Coil cleaning
H2  Duct cleaning
H2  Emergency AC repair — same day
H2  AC service cost in Dubai        <-- link to /pricing/
H2  Areas we cover in Dubai
H2  Frequently asked questions
```
Targets: `ac repair dubai near me` (21 hits), `ac repair services in dubai` (18),
`ac maintenance companies in dubai` (13), `ac maintenance dubai near me` (6),
`emergency ac repair dubai near me` (5).

⚠️ Add a line: *"We service home and building air conditioning. We do not repair car AC."*
`car ac repair dubai near me` appears at 4 hits — you will attract that traffic
accidentally. Say so and stop wasting callouts.

---

## PAGE 4 — `/ac-repair-sharjah/` ⭐ FASTEST WIN

```html
<title>AC Repair Sharjah | Same-Day AC Service | ProCraftX</title>
<!-- 50 chars -->
<meta name="description" content="AC repair and servicing in Sharjah — Al Nahda, Rolla, Muweilah and Al Majaz. Same-day callout, flat quote before we start. Call 050 791 7075.">
<!-- 140 chars -->
```
```
H1  AC Repair and Servicing in Sharjah
H2  Same-day AC repair across Sharjah
H2  AC service in Al Nahda
H2  AC service in Rolla
H2  AC service in Muweilah
H2  AC service in Al Majaz and Al Qasimia
H2  AC repair cost in Sharjah
```
Targets — **all verified in autocomplete, zero competitor coverage**:
`ac repair sharjah`, `ac repair sharjah near me`, `ac repair sharjah muweilah`,
`ac repair sharjah al nahda`, `ac repair sharjah rolla`, `ac service sharjah price`,
`ac maintenance company sharjah`.

**Build the matching `/cleaning-services-sharjah/`** — second-strongest Sharjah cluster
(`cleaning company sharjah price list`, `cleaning services sharjah near me`,
`cleaning services sharjah open now`, `cleaning services sharjah muweilah`).

Note `cleaning services sharjah open now` — add opening hours to the page and to schema.

---

## PAGE 5 — `/car-parking-shades-dubai/` (renamed from "carport")

```html
<title>Car Parking Shades Dubai &amp; Sharjah | Supply &amp; Install</title>
<!-- 56 chars -->
<meta name="description" content="Car parking shades supplied and installed across Dubai, Sharjah and Ajman. Custom sizes for villas and compounds. Free site visit and flat quote.">
<!-- 144 chars -->
```
```
H1  Car Parking Shades in Dubai, Sharjah and Ajman
H2  Villa car parking shades
H2  Custom sizes and fabric options
H2  Car parking shade price in UAE      <-- price intent confirmed
H2  Installation process
H2  Areas we cover
```
Targets: `car parking shades dubai`, `car parking shades suppliers in dubai`,
`car parking shades suppliers in sharjah`, `car parking shade ajman`,
`car parking shade price in uae`, `car parking shade companies in dubai`.

Use "car parking shade" throughout. Mention "carport" **once** as a synonym, no more.

---

## PAGE 6 — `/furniture-restoration-dubai/`

```html
<title>Furniture Restoration Dubai | Sofa &amp; Wood Repair</title>
<!-- 51 chars -->
<meta name="description" content="Furniture restoration in Dubai — wooden furniture, antiques, sofa repair and reupholstery. Collection and return included. Free quote before we start.">
<!-- 149 chars -->
```
```
H1  Furniture Restoration in Dubai
H2  Wooden furniture restoration
H2  Antique furniture restoration
H2  Sofa repair and reupholstery
H2  Furniture painting and refinishing
H2  Furniture restoration cost
H2  How collection and return works
```
Targets: `furniture restoration dubai`, `wooden furniture restoration dubai`,
`antique furniture restoration dubai`, `furniture repair dubai`,
`furniture refurbishment dubai`, `sofa repair dubai`, `sofa repair dubai cost`,
`couch repair dubai`, `upholstery repair dubai`.

---

## PAGE 7 — `/shower-glass-partition-dubai/`

```html
<title>Shower Glass Partition Dubai | Supply &amp; Fitting</title>
<!-- 50 chars -->
<meta name="description" content="Shower glass partitions and screens fitted across Dubai. Frameless and framed, custom sizes, mirrors. Free measure and flat quote. Call 050 791 7075.">
<!-- 148 chars -->
```
```
H1  Shower Glass Partitions in Dubai
H2  Frameless shower glass partitions
H2  Bathroom glass partitions and screens
H2  Custom mirrors
H2  Shower glass partition price in Dubai
H2  Measuring and fitting
```
Use **"partition"** as the head term — it outranks "installation" in autocomplete.
Targets: `shower glass partition dubai`, `shower glass partition dubai price`,
`bathroom glass partition dubai`, `glass shower screen dubai`, `shower glass panel dubai`.

---

## PAGE 8 — `/villa-maintenance-contract-dubai/`

```html
<title>Villa Maintenance Contract Dubai | Annual AMC Packages</title>
<!-- 54 chars -->
<meta name="description" content="Annual villa maintenance contracts in Dubai and Sharjah. AC, plumbing, electrical and handyman cover in one package. Clear monthly pricing in AED.">
<!-- 145 chars -->
```
```
H1  Villa Maintenance Contracts in Dubai and Sharjah
H2  What the annual contract covers
H2  Villa maintenance cost in Dubai
H2  Package tiers and monthly pricing
H2  Emergency response times
H2  Apartment and townhouse cover
```
Targets: `villa maintenance dubai`, `villa maintenance contract dubai`,
`villa maintenance services dubai`, `villa maintenance cost dubai`,
`annual maintenance contract for villa dubai`, `property maintenance dubai`.

**Price against mplus** (AED 104 / 188 / 272 per month) and fixperts (Classic /
Executive / Elite). Neither owns *villa-specific* language. You can.

---

## PAGE 9 — `/majlis-dubai/` (keep, but reposition)

Do **not** build a traffic campaign here — see the majlis warning in
`procraftx-keyword-research.md`. Bare "majlis" queries are restaurant intent.

```html
<title>Outdoor Majlis Design &amp; Construction | Dubai &amp; Sharjah</title>
<!-- 56 chars -->
<meta name="description" content="Outdoor majlis design, construction and renovation in Dubai and Sharjah. Custom seating, shading and finishes. Free site visit and flat quote.">
<!-- 141 chars -->
```
Target only the qualified long-tail: `outdoor majlis design dubai`, `majlis renovation dubai`,
`arabian majlis sharjah`. Link to it prominently from the homepage and villa-maintenance page —
it converts visitors who arrive elsewhere. That is its job.

---

## SCHEMA — REPLACE YOUR CURRENT BLOCK

Your existing `HomeAndConstructionBusiness` is missing `address`, `geo`, `openingHours` and
`aggregateRating`. Fill in the bracketed values and paste site-wide:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://procraftx.ae/#business",
  "name": "ProCraftX",
  "url": "https://procraftx.ae/",
  "logo": "https://procraftx.ae/assets/images/logo.png",
  "image": "https://procraftx.ae/assets/images/service-promo-poster.jpg",
  "telephone": "+971507917075",
  "email": "[YOUR EMAIL]",
  "priceRange": "AED",
  "description": "AC, plumbing, electrical, handyman, furniture care and home clearing services in Dubai and Sharjah.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[YOUR STREET]",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "[POSTAL CODE]",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LONG]"
  },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Ajman" },
    { "@type": "City", "name": "Abu Dhabi" }
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  }],
  "sameAs": [
    "https://facebook.com/Procraftx",
    "https://instagram.com/Procraftx.ae"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Home Maintenance Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AC Maintenance and Repair", "areaServed": "Dubai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plumbing Services", "areaServed": "Dubai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical Services", "areaServed": "Dubai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Handyman Services", "areaServed": "Dubai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Furniture Restoration", "areaServed": "Dubai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Parking Shades", "areaServed": "Dubai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shower Glass Partitions", "areaServed": "Dubai" }}
    ]
  }
}
</script>
```

### AggregateRating — only when it is genuinely true

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "127",
  "bestRating": "5"
}
```

**Use your real Google Business Profile numbers.** Inflated or invented review counts are a
structured-data violation — Google removes rich results and can apply a manual action.
If you don't yet have reviews, leave this out and add it once you do. The stars are the
single biggest CTR gain available to you, so getting real reviews is worth prioritising.

---

## INTERNAL LINKING — currently zero

Every new page must link to at least 3 others with descriptive anchor text.

- Homepage → all service pages, using the service keyword as the anchor
- Every service page → `/pricing/` (anchor: "AC service cost in Dubai")
- Every Dubai page → its Sharjah equivalent, and back
- Every service page → `/villa-maintenance-contract-dubai/` (recurring-revenue funnel)
- All pages → `/faq/`

Anchor text should be the target keyword. Never "click here" or "read more".
