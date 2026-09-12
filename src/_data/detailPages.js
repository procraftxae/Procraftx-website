// Cross product of the 10 topics × 2 languages = 20 pagination items for
// src/detail.njk. Eleventy's `pagination.data` only iterates one array, so
// the {lang, topic} pairing has to be built here rather than in the template.
const topics = require("./detailTopics.js");
const langs = require("./langs.js");

module.exports = langs.flatMap((lang) => topics.map((topic) => ({ lang, topic })));
