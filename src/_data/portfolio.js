// Real completed-project photos go here, grouped by specialty. Each category
// starts with an empty `projects` array — the page shows a "coming soon"
// empty state until real photos are added. Never fill these with the
// existing generic/stock-style service photos; this page exists specifically
// to show verifiably real finished work (see CLAUDE.md: fabricated trust
// signals were removed once already and must not come back).
//
// When adding real photos, push into the matching category's `projects`:
//   { image: "assets/images/portfolio/<file>.jpg", alt: { en, ar }, caption: { en, ar } }

module.exports = [
  { categoryId: "interior-design", title: { en: "Interior Design", ar: "التصميم الداخلي" }, projects: [] },
  { categoryId: "furniture-design-build", title: { en: "Custom Furniture", ar: "الأثاث المخصص" }, projects: [] },
  { categoryId: "outdoor-majlis", title: { en: "Majlis & Pergolas", ar: "المجالس والبرجولات" }, projects: [] },
  { categoryId: "swimming-pools", title: { en: "Swimming Pools", ar: "المسابح" }, projects: [] },
  { categoryId: "gardening-irrigation", title: { en: "Landscaping & Gardens", ar: "تنسيق الحدائق" }, projects: [] },
  { categoryId: "car-garage", title: { en: "Garages & Carports", ar: "الكراجات ومظلات السيارات" }, projects: [] },
  { categoryId: "doors-windows", title: { en: "Doors & Windows", ar: "الأبواب والنوافذ" }, projects: [] },
  { categoryId: "windows-glass", title: { en: "Custom Glass Work", ar: "أعمال الزجاج المخصصة" }, projects: [] },
  { categoryId: "window-tinting", title: { en: "Window Tinting", ar: "تظليل النوافذ" }, projects: [] }
];
