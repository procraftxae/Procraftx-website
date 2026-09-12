const servicesData = require("./src/_data/services.js");
const specialtiesData = require("./src/_data/specialties.js");
const siteData = require("./src/_data/site.js");
const pagesData = require("./src/_data/pages.js");
const faqData = require("./src/_data/faq.js");

// data fields store the HTML-entity form (e.g. "&amp;") for use inside HTML
// bodies; JSON-LD is not HTML and must use the literal character instead.
function deEnt(s) {
  return s.replace(/&amp;/g, "&");
}

function buildOfferCatalog(lang) {
  const items = [];
  servicesData.categories.forEach((cat) => {
    cat.services.forEach((s) => {
      items.push({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: deEnt(s.name[lang]), description: deEnt(s.desc[lang]) }
      });
    });
  });
  specialtiesData.forEach((sp) => {
    items.push({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: deEnt(sp.h4[lang]), description: deEnt(sp.longDesc[lang]) }
    });
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
