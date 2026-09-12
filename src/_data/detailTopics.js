// Flat list of the 10 topics that get their own dedicated page: the 7 named
// specialties plus the 3 service categories. Built from specialties.js and
// services.js.categories so the detail pages never drift from the
// homepage cards — same id, same images, same short/long descriptions.
const specialties = require("./specialties.js");
const services = require("./services.js");
const site = require("./site.js");

const fromSpecialties = specialties.map((sp) => ({
  id: sp.id,
  kind: "specialty",
  h3: sp.h3,
  shortDesc: sp.shortDesc,
  longDesc: sp.longDesc,
  images: sp.images,
  dataService: sp.dataService
}));

const fromServices = services.categories.map((cat) => ({
  id: cat.id,
  kind: "service-category",
  h3: cat.title,
  shortDesc: cat.desc,
  // service categories don't have one longDesc — each individual service
  // under them does. Detail pages use `services` (below) for the list of
  // sub-services instead of longDesc.
  longDesc: null,
  images: cat.services.map((s) => ({ src: s.img, alt: s.alt })),
  services: cat.services,
  dataService: cat.title
}));

// "All Customize Works" isn't in specialties.js or services.js — it's the
// catch-all CTA card (site.customizeCard), rendered directly in index.njk.
// It has no photo gallery, so `images` stays empty; detail.njk skips the
// media block when that's the case. Given as its own topic (not folded
// into fromSpecialties above) because the business explicitly treats
// custom/bespoke work as a core focus, not an afterthought.
const customizeWorks = {
  id: "customize-works",
  kind: "specialty",
  h3: site.customizeCard.title,
  shortDesc: site.customizeCard.lead,
  longDesc: site.customizeCard.body,
  images: [],
  dataService: site.customizeCard.dataService
};

module.exports = [...fromSpecialties, ...fromServices, customizeWorks];
