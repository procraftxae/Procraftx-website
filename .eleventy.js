const fs = require("fs");
const path = require("path");
const servicesData = require("./src/_data/services.js");
const specialtiesData = require("./src/_data/specialties.js");
const siteData = require("./src/_data/site.js");
const pagesData = require("./src/_data/pages.js");
const faqData = require("./src/_data/faq.js");
const detailTopicsData = require("./src/_data/detailTopics.js");
const detailContentData = require("./src/_data/detailContent.js");

// Reads width/height straight out of a JPEG's SOF segment (no library —
// every image on the site is a .jpg) so <img> tags can carry intrinsic
// dimensions and avoid layout shift, without hand-maintaining them per image.
function getJpegDims(absPath) {
  const buf = fs.readFileSync(absPath);
  let offset = 2; // skip the FFD8 SOI marker
  while (offset < buf.length) {
    if (buf[offset] !== 0xff) { offset++; continue; }
    const marker = buf[offset + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const length = buf.readUInt16BE(offset + 2);
    const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSof) {
      return { w: buf.readUInt16BE(offset + 7), h: buf.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }
  throw new Error(`No JPEG SOF marker found in ${absPath}`);
}
const imageDimsCache = new Map();
function imageDims(relSrc) {
  if (!imageDimsCache.has(relSrc)) {
    imageDimsCache.set(relSrc, getJpegDims(path.join(__dirname, relSrc)));
  }
  return imageDimsCache.get(relSrc);
}

// data fields store the HTML-entity form (e.g. "&amp;") for use inside HTML
// bodies; JSON-LD is not HTML and must use the literal character instead.
function deEnt(s) {
  return s.replace(/&amp;/g, "&");
}

// Referenced from pages (Service/Article) that don't themselves carry the
// full HomeAndConstructionBusiness node (only index.njk does) — a bare
// {"@id": "...#business"} only resolves within the SAME document's JSON-LD
// graph, so it was a dangling reference on every other page. Inlining the
// identifying properties alongside the @id lets it stand on its own while
// still merging with the full node where that is present.
const BUSINESS_REF = {
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://www.procraftx.ae/#business",
  name: "Procraftx",
  url: "https://www.procraftx.ae/"
};

function buildOfferCatalog(lang) {
  const prefix = `https://www.procraftx.ae/${lang === "ar" ? "ar/" : ""}`;
  const items = [];
  servicesData.categories.forEach((cat) => {
    // Each individual service now has its own detail page, so its Offer
    // points there (not at the category hub page) with the richer
    // metaDescription that page was written with, not the one-line desc.
    cat.services.forEach((s) => {
      items.push({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deEnt(s.name[lang]),
          description: deEnt(detailContentData[s.id].metaDescription[lang]),
          url: `${prefix}${s.id}.html`
        }
      });
    });
  });
  specialtiesData.forEach((sp) => {
    items.push({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: deEnt(sp.h4[lang]), description: deEnt(sp.longDesc[lang]), url: `${prefix}${sp.id}.html` }
    });
  });
  const cc = siteData.customizeCard;
  items.push({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: deEnt(cc.title[lang]), description: deEnt(cc.body[lang]), url: `${prefix}customize-works.html` }
  });
  return items;
}

module.exports = function (eleventyConfig) {
  // styles.css and assets/ already live at their final served path (project
  // root) and are outside src/, so Eleventy never touches them — no
  // passthrough copy needed (and copying a directory onto itself is
  // destructive, not a safe no-op: confirmed the hard way, restored from git).

  // NOTE: `| safe` in the templates is Nunjucks' own built-in filter (marks
  // a string as pre-escaped so autoescape leaves it alone) — do NOT shadow
  // it with a custom filter of the same name here. An earlier version of
  // this file did exactly that (a no-op passthrough function), which let
  // autoescape run anyway and double-encoded every "&amp;" into "&amp;amp;"
  // across the whole site, turned apostrophes into "&#39;", and leaked raw
  // SVG markup as visible escaped text in the trust-card icons.

  eleventyConfig.addFilter("imageDims", imageDims);
  eleventyConfig.addFilter("webpSrc", (relSrc) => relSrc.replace(/\.jpe?g$/i, ".webp"));
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("indexJsonLd", function (lang) {
    const p = pagesData.index;
    const obj = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.procraftx.ae/#business",
      name: "Procraftx",
      alternateName: "بروكرافتكس",
      description: deEnt(p.jsonLdDescription[lang]),
      url: lang === "ar" ? "https://www.procraftx.ae/ar/" : "https://www.procraftx.ae/",
      image: "https://www.procraftx.ae/assets/images/service-promo-poster.jpg",
      logo: "https://www.procraftx.ae/assets/images/logo.png",
      telephone: siteData.business.phone,
      email: siteData.business.email,
      address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
      identifier: {
        "@type": "PropertyValue",
        name: "Trade License Number",
        value: siteData.business.tradeLicenseNumber
      },
      priceRange: "$$",
      inLanguage: lang,
      openingHours: "Mo-Su 00:00-23:59",
      areaServed: siteData.business.areaServed.map((c) => ({ "@type": "City", name: c[lang] })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: deEnt(p.jsonLdCatalogName[lang]),
        itemListElement: buildOfferCatalog(lang)
      },
      sameAs: [
        siteData.business.social.instagram,
        siteData.business.social.facebook,
        siteData.business.social.tiktok,
        siteData.business.social.x
      ]
    };
    return JSON.stringify(obj, null, 2);
  });

  eleventyConfig.addFilter("articleJsonLd", function (pageKey, lang) {
    const p = pagesData[pageKey];
    const url = `https://www.procraftx.ae/${lang === "ar" ? "ar/" : ""}${p.slug}.html`;
    const obj = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: deEnt(p.heroH1[lang]),
      description: deEnt(p.description[lang]),
      image: "https://www.procraftx.ae/assets/images/service-promo-poster.jpg",
      inLanguage: lang,
      datePublished: p.datePublished,
      dateModified: p.datePublished,
      author: { "@type": "Organization", name: "Procraftx" },
      publisher: BUSINESS_REF,
      mainEntityOfPage: url,
      url
    };
    return JSON.stringify(obj, null, 2);
  });

  eleventyConfig.addFilter("guideBreadcrumbJsonLd", function (pageKey, lang) {
    const p = pagesData[pageKey];
    const prefix = `https://www.procraftx.ae/${lang === "ar" ? "ar/" : ""}`;
    const itemListElement = [
      { "@type": "ListItem", position: 1, name: siteData.detailPage.breadcrumbHome[lang], item: prefix },
      { "@type": "ListItem", position: 2, name: lang === "ar" ? p.heroH1.ar : deEnt(p.heroH1.en), item: `${prefix}${p.slug}.html` }
    ];
    return JSON.stringify(
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement },
      null,
      2
    );
  });

  eleventyConfig.addFilter("faqJsonLd", function (lang) {
    const mainEntity = [];
    faqData.forEach((g) => {
      g.questions.forEach((q) => {
        mainEntity.push({
          "@type": "Question",
          name: lang === "ar" ? q.qAr : deEnt(q.qEn),
          acceptedAnswer: { "@type": "Answer", text: lang === "ar" ? q.aAr : deEnt(q.aEn) }
        });
      });
    });
    return JSON.stringify(
      { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: lang, mainEntity },
      null,
      2
    );
  });

  // One Service block per detail page (src/detail.njk) — name/description
  // pulled from the same detailContent.js the visible page uses, so they
  // can't drift from what's actually on the page.
  eleventyConfig.addFilter("detailServiceJsonLd", function (topicId, lang) {
    const topic = detailTopicsData.find((t) => t.id === topicId);
    const content = detailContentData[topicId];
    const obj = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "ar" ? content.h1.ar : deEnt(content.h1.en),
      description: lang === "ar" ? content.metaDescription.ar : deEnt(content.metaDescription.en),
      provider: BUSINESS_REF,
      areaServed: siteData.business.areaServed.map((c) => ({ "@type": "City", name: c[lang] })),
      inLanguage: lang,
      url: `https://www.procraftx.ae/${lang === "ar" ? "ar/" : ""}${topic.id}.html`
    };
    return JSON.stringify(obj, null, 2);
  });

  // Matches the visible breadcrumb ("Home / Topic") on each detail page.
  eleventyConfig.addFilter("detailBreadcrumbJsonLd", function (topicId, lang) {
    const topic = detailTopicsData.find((t) => t.id === topicId);
    const prefix = `https://www.procraftx.ae/${lang === "ar" ? "ar/" : ""}`;
    const itemListElement = [
      { "@type": "ListItem", position: 1, name: siteData.detailPage.breadcrumbHome[lang], item: prefix }
    ];
    if (topic.categoryId) {
      const category = detailTopicsData.find((t) => t.id === topic.categoryId);
      itemListElement.push({
        "@type": "ListItem",
        position: 2,
        name: lang === "ar" ? category.h3.ar : deEnt(category.h3.en),
        item: `${prefix}${category.id}.html`
      });
    }
    itemListElement.push({
      "@type": "ListItem",
      position: itemListElement.length + 1,
      name: lang === "ar" ? topic.h3.ar : deEnt(topic.h3.en),
      item: `${prefix}${topic.id}.html`
    });
    const obj = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement };
    return JSON.stringify(obj, null, 2);
  });

  // Resolves a topic id to its matching FAQ group (same `id`/`anchor`
  // join key faq.js already uses). Same reasoning as relatedTopics below —
  // `faq | selectattr("anchor", "equalto", topic.id) | first` in the
  // template silently returned the WRONG group (always index 1, "Core Home
  // Maintenance", regardless of topic.id), so the lookup happens here in
  // plain JS instead.
  eleventyConfig.addFilter("detailFaqGroup", function (topicId) {
    return faqData.find((g) => g.anchor === topicId) || null;
  });

  // Same reasoning as above: Nunjucks `selectattr(...).first` inside the
  // breadcrumb was found to always resolve to the first item in
  // detailTopics regardless of the id being matched (confirmed empirically
  // across all 22 new pages — every one showed "Interior Design" as its
  // parent category). Plain JS sidesteps it entirely, like detailFaqGroup.
  eleventyConfig.addFilter("parentCategory", function (categoryId) {
    return detailTopicsData.find((t) => t.id === categoryId) || null;
  });

  // Resolves relatedIds -> [{href, label}] outside the template. A Nunjucks
  // `{% set %}` re-assigned inside a `{% for %}` loop combined with a
  // `selectattr(...).first` chain doesn't reliably re-scope per iteration —
  // every related-link ended up with the CURRENT page's own label instead
  // of its own. Doing the lookup here in plain JS sidesteps that entirely.
  eleventyConfig.addFilter("relatedTopics", function (relatedIds, lang) {
    return relatedIds
      .map((id) => {
        const topic = detailTopicsData.find((t) => t.id === id);
        if (topic) return { href: topic.id + ".html", label: topic.h3[lang] };
        const guide = pagesData[id]; // id may be a guide page key, e.g. "poolCostGuide"
        if (guide && guide.slug) return { href: guide.slug + ".html", label: guide.heroH1[lang] };
        return null;
      })
      .filter(Boolean);
  });

  // FAQPage scoped to just this one detail page's 8 questions (the group
  // whose `anchor` matches the topic id), not the full 88-question set.
  eleventyConfig.addFilter("detailFaqJsonLd", function (topicId, lang) {
    const group = faqData.find((g) => g.anchor === topicId);
    const mainEntity = (group ? group.questions : []).map((q) => ({
      "@type": "Question",
      name: lang === "ar" ? q.qAr : deEnt(q.qEn),
      acceptedAnswer: { "@type": "Answer", text: lang === "ar" ? q.aAr : deEnt(q.aEn) }
    }));
    return JSON.stringify(
      { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: lang, mainEntity },
      null,
      2
    );
  });

  return {
    dir: {
      input: "src",
      output: ".",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
