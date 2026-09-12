const servicesData = require("./src/_data/services.js");
const specialtiesData = require("./src/_data/specialties.js");
const siteData = require("./src/_data/site.js");
const pagesData = require("./src/_data/pages.js");
const faqData = require("./src/_data/faq.js");
const detailTopicsData = require("./src/_data/detailTopics.js");
const detailContentData = require("./src/_data/detailContent.js");

// data fields store the HTML-entity form (e.g. "&amp;") for use inside HTML
// bodies; JSON-LD is not HTML and must use the literal character instead.
function deEnt(s) {
  return s.replace(/&amp;/g, "&");
}

function buildOfferCatalog(lang) {
  const prefix = `https://procraftx.ae/${lang === "ar" ? "ar/" : ""}`;
  const items = [];
  servicesData.categories.forEach((cat) => {
    // the 13 individual services don't each get their own page — only the
    // 3 categories do — so they point to their category's detail page.
    const url = `${prefix}${cat.id}.html`;
    cat.services.forEach((s) => {
      items.push({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: deEnt(s.name[lang]), description: deEnt(s.desc[lang]), url }
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

  eleventyConfig.addFilter("indexJsonLd", function (lang) {
    const p = pagesData.index;
    const obj = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: "Procraftx",
      description: deEnt(p.jsonLdDescription[lang]),
      url: lang === "ar" ? "https://procraftx.ae/ar/" : "https://procraftx.ae/",
      image: "https://procraftx.ae/assets/images/service-promo-poster.jpg",
      telephone: siteData.business.phone,
      email: siteData.business.email,
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
      provider: { "@type": "HomeAndConstructionBusiness", name: "Procraftx", telephone: siteData.business.phone, email: siteData.business.email },
      areaServed: siteData.business.areaServed.map((c) => ({ "@type": "City", name: c[lang] })),
      inLanguage: lang,
      url: `https://procraftx.ae/${lang === "ar" ? "ar/" : ""}${topic.id}.html`
    };
    return JSON.stringify(obj, null, 2);
  });

  // Matches the visible breadcrumb ("Home / Topic") on each detail page.
  eleventyConfig.addFilter("detailBreadcrumbJsonLd", function (topicId, lang) {
    const topic = detailTopicsData.find((t) => t.id === topicId);
    const prefix = `https://procraftx.ae/${lang === "ar" ? "ar/" : ""}`;
    const obj = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteData.detailPage.breadcrumbHome[lang], item: prefix },
        { "@type": "ListItem", position: 2, name: lang === "ar" ? topic.h3.ar : deEnt(topic.h3.en), item: `${prefix}${topic.id}.html` }
      ]
    };
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

  // Resolves relatedIds -> [{href, label}] outside the template. A Nunjucks
  // `{% set %}` re-assigned inside a `{% for %}` loop combined with a
  // `selectattr(...).first` chain doesn't reliably re-scope per iteration —
  // every related-link ended up with the CURRENT page's own label instead
  // of its own. Doing the lookup here in plain JS sidesteps that entirely.
  eleventyConfig.addFilter("relatedTopics", function (relatedIds, lang) {
    return relatedIds
      .map((id) => detailTopicsData.find((t) => t.id === id))
      .filter(Boolean)
      .map((t) => ({ href: t.id + ".html", label: t.h3[lang] }));
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
