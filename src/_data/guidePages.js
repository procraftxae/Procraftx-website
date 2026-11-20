// Cross product of the 2 guide pages × 2 languages = 4 pagination items for
// src/guide.njk, same pattern as detailPages.js.
const langs = require("./langs.js");

const guideKeys = ["poolCostGuide", "acMaintenanceSigns"];

module.exports = langs.flatMap((lang) => guideKeys.map((pageKey) => ({ lang, pageKey })));
