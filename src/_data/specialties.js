// 7 named specialties (the 8th, "All Customize Works", is a catch-all CTA card
// handled directly in index.njk from site.customizeCard, not this list).
// h4/longDesc double as the JSON-LD hasOfferCatalog Service name/description.
// bookingOptions: the <option>s this specialty contributes to the booking
// form's <optgroup> — usually one matching dataService, except Windows/Glass
// which offers two distinct options under one group.
module.exports = [
  {
    id: "interior-design",
    comment: { en: "4. Interior Design", ar: "4. التصميم الداخلي" },
    dataService: { en: "Interior Design", ar: "التصميم الداخلي" },
    bookingGroupLabel: { en: "Interior Design", ar: "التصميم الداخلي" },
    bookingOptions: [{ en: "Interior Design", ar: "التصميم الداخلي" }],
    bookingOrder: 5,
    images: [
      { src: "assets/images/interior-1.jpg", alt: { en: "Modern styled living room interior", ar: "تصميم داخلي حديث لغرفة معيشة" } },
      { src: "assets/images/interior-2.jpg", alt: { en: "Designer reviewing material and finish samples", ar: "مصمم يراجع عينات المواد والتشطيبات" } },
      { src: "assets/images/interior-3.jpg", alt: { en: "Custom joinery and built-in storage wall", ar: "نجارة مخصصة وجدار تخزين مدمج" } },
      { src: "assets/images/interior-4.jpg", alt: { en: "Bedroom with coordinated lighting and furnishings", ar: "غرفة نوم بإضاءة وأثاث منسق" } },
      { src: "assets/images/interior-5.jpg", alt: { en: "Majlis seating area styled with décor and lighting", ar: "منطقة جلوس مجلس منسقة بديكور وإضاءة" } }
    ],
    h3: { en: "Interior Design", ar: "التصميم الداخلي" },
    shortDesc: { en: "Concept design, space planning, custom joinery and full styling — from a single room refresh to a complete home fit-out.", ar: "تصميم المفهوم، وتخطيط المساحات، والنجارة المخصصة، والتنسيق الكامل — من تجديد غرفة واحدة إلى تجهيز منزل بالكامل." },
    h4: { en: "Interior Design &amp; Fit-Out", ar: "التصميم الداخلي والتجهيز" },
    longDesc: {
      en: "Full interior design service covering concept development, space planning, and layout optimisation, with mood boards and 3D visuals so you can see the result before work begins. We handle material, finish and colour selection, flooring and wall treatments, false ceilings and gypsum work, lighting design, curtains and blinds, and custom joinery including wardrobes, TV units, and kitchen cabinetry. Delivery covers furniture sourcing and placement, décor and accessory styling, and complete supervised fit-out — for single rooms, majlis areas, or whole villas and apartments.",
      ar: "خدمة تصميم داخلي متكاملة تشمل تطوير المفهوم، وتخطيط المساحات، وتحسين التوزيع، مع لوحات إلهام ومجسمات ثلاثية الأبعاد لترى النتيجة قبل بدء العمل. نتولى اختيار المواد والتشطيبات والألوان، ومعالجات الأرضيات والجدران، والأسقف المستعارة وأعمال الجبس، وتصميم الإضاءة، والستائر، والنجارة المخصصة بما فيها خزائن الملابس ووحدات التلفزيون وخزائن المطبخ. ويشمل التنفيذ توريد الأثاث وتوزيعه، وتنسيق الديكور والإكسسوارات، والتجهيز الكامل تحت إشراف متخصص — لغرفة واحدة أو مجلس أو فيلا وشقة بالكامل."
    }
  },
  {
    id: "outdoor-majlis",
    comment: { en: "5. Outdoor Majlis Services", ar: "5. خدمات المجالس الخارجية" },
    dataService: { en: "Outdoor Majlis Services", ar: "خدمات المجالس الخارجية" },
    bookingGroupLabel: { en: "Outdoor Majlis Services", ar: "خدمات المجالس الخارجية" },
    bookingOptions: [{ en: "Outdoor Majlis Services", ar: "خدمات المجالس الخارجية" }],
    bookingOrder: 1,
    images: [
      { src: "assets/images/majlis-1.jpg", alt: { en: "Modern glass majlis with sheer curtains and lounge seating", ar: "مجلس زجاجي حديث بستائر شفافة ومقاعد استرخاء" } },
      { src: "assets/images/majlis-2.jpg", alt: { en: "Outdoor pergola majlis with modern lounge furniture", ar: "مجلس برجولا خارجي بأثاث استرخاء حديث" } },
      { src: "assets/images/majlis-3.jpg", alt: { en: "Traditional majlis annex with tiled roof and glass doors", ar: "ملحق مجلس تقليدي بسقف مبلط وأبواب زجاجية" } },
      { src: "assets/images/majlis-4.jpg", alt: { en: "Ornate traditional Arabic majlis tent with gold detailing", ar: "خيمة مجلس عربي تقليدي مزخرفة بتفاصيل ذهبية" } },
      { src: "assets/images/majlis-5.jpg", alt: { en: "Modern sandwich panel guest annex with garden lighting", ar: "ملحق ضيافة حديث بألواح ساندويتش وإضاءة حدائق" } }
    ],
    h3: { en: "Outdoor Majlis Services", ar: "خدمات المجالس الخارجية" },
    shortDesc: { en: "Custom-built glass majlis, traditional Arabic majlis, sandwich panel majlis, pergolas, and guest annexes — designed, built, and maintained from the ground up.", ar: "مجالس زجاجية مخصصة، ومجالس عربية تقليدية، ومجالس بالألواح الساندويتش، وبرجولات، وملحقات ضيافة — تصميم وبناء وصيانة من الألف إلى الياء." },
    h4: { en: "Majlis Design, Construction &amp; Renovation", ar: "تصميم وبناء وتجديد المجالس" },
    longDesc: {
      en: "Design, construction, renovation, and expansion of glass majlis, traditional Arabic majlis, sandwich panel majlis, pergolas, and guest annexes, including complete interior fit-out — custom seating, flooring, wall cladding, ceilings, lighting, curtains, insulation, and décor. Ongoing maintenance covers roof repairs, waterproofing, repainting, AC servicing, electrical and plumbing work, glass replacement, structural repairs, aluminium doors and windows, sliding glass systems, weatherproof enclosures, stone cladding, decorative façades, paving, boundary walls, and outdoor lighting — plus bespoke features like smart lighting, sound systems, fireplaces, coffee stations, TV units, and custom storage.",
      ar: "تصميم وبناء وتجديد وتوسعة المجالس الزجاجية والمجالس العربية التقليدية ومجالس الألواح الساندويتش والبرجولات وملحقات الضيافة، بما في ذلك التجهيز الداخلي الكامل — مقاعد مخصصة، أرضيات، تكسية جدران، أسقف، إضاءة، ستائر، عزل، وديكور. تشمل الصيانة المستمرة إصلاح الأسقف، العزل المائي، إعادة الطلاء، صيانة التكييف، الأعمال الكهربائية والسباكة، استبدال الزجاج، الإصلاحات الإنشائية، أبواب ونوافذ الألمنيوم، أنظمة الزجاج المنزلق، الحواجز المقاومة للعوامل الجوية، تكسية الحجر، الواجهات الزخرفية، الرصف، الأسوار، والإضاءة الخارجية — بالإضافة إلى ميزات مخصصة مثل الإضاءة الذكية، أنظمة الصوت، المدافئ، محطات القهوة، وحدات التلفزيون، وحلول التخزين المخصصة."
    }
  },
  {
    id: "car-garage",
    comment: { en: "6. Outdoor Car Garage Construction", ar: "6. إنشاء كراجات السيارات الخارجية" },
    dataService: { en: "Outdoor Car Garage Construction", ar: "إنشاء كراجات السيارات الخارجية" },
    bookingGroupLabel: { en: "Outdoor Car Garage Construction", ar: "إنشاء كراجات السيارات الخارجية" },
    bookingOptions: [{ en: "Outdoor Car Garage Construction", ar: "إنشاء كراجات السيارات الخارجية" }],
    bookingOrder: 2,
    images: [
      { src: "assets/images/garage-1.jpg", alt: { en: "Curved fabric carport shade beside a villa garage", ar: "مظلة قماشية منحنية بجانب كراج فيلا" } },
      { src: "assets/images/garage-2.jpg", alt: { en: "Modern louvered aluminum carport over two SUVs", ar: "مظلة ألمنيوم حديثة بفتحات تهوية فوق سيارتي دفع رباعي" } },
      { src: "assets/images/garage-3.jpg", alt: { en: "Steel slat carport with ambient lighting over a car", ar: "مظلة بألواح فولاذية بإضاءة محيطية فوق سيارة" } },
      { src: "assets/images/garage-4.jpg", alt: { en: "Tensioned fabric shade sail carport over a sedan", ar: "مظلة قماشية مشدودة فوق سيارة سيدان" } },
      { src: "assets/images/garage-5.jpg", alt: { en: "Wooden pergola-style carport shading two vehicles", ar: "مظلة خشبية على طراز البرجولا تظلل سيارتين" } }
    ],
    h3: { en: "Outdoor Car Garage Construction", ar: "إنشاء كراجات السيارات الخارجية" },
    shortDesc: { en: "Custom car garages, carports, parking shades, steel structures, aluminum garages, and sandwich panel garages for residential properties.", ar: "كراجات سيارات مخصصة، ومظلات سيارات، ومظلات مواقف، وهياكل فولاذية، وكراجات ألمنيوم، وكراجات بألواح ساندويتش للعقارات السكنية." },
    h4: { en: "Custom Car Garage &amp; Carport Construction", ar: "إنشاء كراجات ومظلات سيارات مخصصة" },
    longDesc: {
      en: "Design and build of custom car garages, carports, and parking shades — steel structures, aluminum garages, and sandwich panel garages built to protect vehicles and suit residential properties.",
      ar: "تصميم وبناء كراجات سيارات ومظلات مواقف مخصصة — هياكل فولاذية، وكراجات ألمنيوم، وكراجات بألواح ساندويتش مصممة لحماية المركبات وتناسب العقارات السكنية."
    }
  },
  {
    id: "windows-glass",
    comment: { en: "7. Window &amp; Glass Installations", ar: "7. تركيبات النوافذ والزجاج" },
    dataService: { en: "Home Window Installation", ar: "تركيب نوافذ المنزل" },
    bookingGroupLabel: { en: "Window &amp; Glass Installations", ar: "تركيبات النوافذ والزجاج" },
    bookingOptions: [
      { en: "Home Window Installation", ar: "تركيب نوافذ المنزل" },
      { en: "Shower Glass Replacement", ar: "استبدال زجاج الحمام" }
    ],
    bookingOrder: 3,
    images: [
      { src: "assets/images/window-install-1.jpg", alt: { en: "Technician installing a casement window indoors", ar: "فني يركّب نافذة مفصلية من الداخل" } },
      { src: "assets/images/window-install-2.jpg", alt: { en: "Two workers fitting a window into a framed opening", ar: "عاملان يركّبان نافذة في فتحة مؤطرة" } },
      { src: "assets/images/window-install-3.jpg", alt: { en: "Workers measuring and installing a window on a brick house", ar: "عمال يقيسون ويركّبون نافذة في منزل من الطوب" } },
      { src: "assets/images/window-install-4.jpg", alt: { en: "Technician installing a window from inside a home", ar: "فني يركّب نافذة من داخل المنزل" } },
      { src: "assets/images/shower-glass-1.jpg", alt: { en: "Technician installing a glass shower enclosure", ar: "فني يركّب حاجز زجاجي للحمام" } }
    ],
    h3: { en: "Window &amp; Glass Installations", ar: "تركيبات النوافذ والزجاج" },
    shortDesc: { en: "Aluminium, uPVC, sliding, casement and double-glazed windows, plus shower glass — installed, replaced, or repaired for a durable, weather-tight fit.", ar: "نوافذ الألمنيوم، واليو بي في سي، والسحّاب، والمفصلية، والمزدوجة الزجاج، بالإضافة إلى زجاج الحمام — تركيب واستبدال وإصلاح لضمان ثبات ومقاومة للعوامل الجوية." },
    h4: { en: "Home Window &amp; Shower Glass Installation", ar: "تركيب نوافذ المنزل وزجاج الحمام" },
    longDesc: {
      en: "Installation, replacement, and repair of aluminium, uPVC, sliding, casement, and double-glazed windows, plus shower glass — built for durability, weather protection, and a watertight fit.",
      ar: "تركيب واستبدال وإصلاح نوافذ الألمنيوم، واليو بي في سي، والسحّاب، والمفصلية، والمزدوجة الزجاج، بالإضافة إلى زجاج الحمام — مصممة لتدوم طويلاً وتحمي من العوامل الجوية وتمنع تسرب الماء."
    }
  },
  {
    id: "window-tinting",
    comment: { en: "8. Residential Window Tinting", ar: "8. تظليل نوافذ المنازل" },
    dataService: { en: "Residential Window Tinting", ar: "تظليل نوافذ المنازل" },
    bookingGroupLabel: { en: "Residential Window Tinting", ar: "تظليل نوافذ المنازل" },
    bookingOptions: [{ en: "Residential Window Tinting", ar: "تظليل نوافذ المنازل" }],
    bookingOrder: 4,
    images: [
      { src: "assets/images/tinting-1.jpg", alt: { en: "Technician applying tinting film to a villa window", ar: "فني يركّب فيلم تظليل على نافذة فيلا" } },
      { src: "assets/images/tinting-2.jpg", alt: { en: "Living room with heat-rejection tinted windows", ar: "غرفة معيشة بنوافذ مظللة عازلة للحرارة" } },
      { src: "assets/images/tinting-3.jpg", alt: { en: "Frosted privacy film on a bathroom window", ar: "فيلم مصنفر للخصوصية على نافذة حمام" } },
      { src: "assets/images/tinting-4.jpg", alt: { en: "Decorative patterned film on a glass partition", ar: "فيلم زخرفي على فاصل زجاجي" } },
      { src: "assets/images/tinting-5.jpg", alt: { en: "Installer smoothing tint film with a squeegee", ar: "فني تركيب يمسح فيلم التظليل بممسحة" } }
    ],
    h3: { en: "Residential Window Tinting", ar: "تظليل نوافذ المنازل" },
    shortDesc: { en: "Heat-rejection, UV-blocking, privacy, security and decorative films — professionally applied to villa and apartment glass.", ar: "أفلام عازلة للحرارة، وحاجبة للأشعة فوق البنفسجية، وأفلام الخصوصية والحماية والزخرفة — تُركّب باحترافية على زجاج الفلل والشقق." },
    h4: { en: "Home Window Film &amp; Tinting", ar: "أفلام وتظليل نوافذ المنزل" },
    longDesc: {
      en: "Supply and installation of residential window films — heat-rejection and solar-control tint to cut cooling costs, UV-blocking film that stops furniture and flooring from fading, and glare-reduction film for bright rooms. Privacy options include one-way mirror, frosted, and decorative patterned film for bathrooms, partitions, and street-facing windows, plus safety and security film that holds glass together on impact. Every job includes glass preparation, precision cut-to-fit application, bubble-free finishing, and removal or replacement of old peeling tint.",
      ar: "توريد وتركيب أفلام نوافذ المنازل — تظليل عازل للحرارة ومتحكم في أشعة الشمس لخفض تكاليف التبريد، وفيلم حاجب للأشعة فوق البنفسجية يمنع بهتان الأثاث والأرضيات، وفيلم مقلل للوهج للغرف شديدة الإضاءة. تشمل خيارات الخصوصية الفيلم العاكس أحادي الاتجاه، والفيلم المصنفر، والفيلم المزخرف للحمامات والفواصل والنوافذ المطلة على الشارع، بالإضافة إلى فيلم الأمان والحماية الذي يحافظ على تماسك الزجاج عند الارتطام. يشمل كل عمل تجهيز الزجاج، والقص الدقيق حسب المقاس، وتشطيبًا خاليًا من الفقاعات، وإزالة أو استبدال التظليل القديم المتقشر."
    }
  },
  {
    id: "swimming-pools",
    comment: { en: "9. Swimming Pool Construction &amp; Design", ar: "9. إنشاء وتصميم حمامات السباحة" },
    dataService: { en: "Swimming Pool Construction &amp; Design", ar: "إنشاء وتصميم حمامات السباحة" },
    bookingGroupLabel: { en: "Swimming Pool Construction &amp; Design", ar: "إنشاء وتصميم حمامات السباحة" },
    bookingOptions: [{ en: "Swimming Pool Construction &amp; Design", ar: "إنشاء وتصميم حمامات السباحة" }],
    bookingOrder: 6,
    images: [
      { src: "assets/images/pool-1.jpg", alt: { en: "Newly built villa swimming pool with blue tiling", ar: "مسبح فيلا حديث البناء ببلاط أزرق" } },
      { src: "assets/images/pool-2.jpg", alt: { en: "Pool under construction with rebar and shell formed", ar: "مسبح قيد الإنشاء بحديد تسليح وهيكل مصبوب" } },
      { src: "assets/images/pool-3.jpg", alt: { en: "Infinity-edge pool with landscaped deck", ar: "مسبح بحافة لا نهائية وسطح مناظر طبيعية" } },
      { src: "assets/images/pool-4.jpg", alt: { en: "Technician servicing pool filtration equipment", ar: "فني يصون معدات فلترة المسبح" } },
      { src: "assets/images/pool-5.jpg", alt: { en: "Illuminated pool with underwater lighting at dusk", ar: "مسبح مضاء بإضاءة تحت الماء عند الغروب" } }
    ],
    h3: { en: "Swimming Pool Construction &amp; Design", ar: "إنشاء وتصميم حمامات السباحة" },
    shortDesc: { en: "Custom pool design and construction, renovation and resurfacing, plus ongoing cleaning and equipment maintenance.", ar: "تصميم وإنشاء حمامات سباحة مخصصة، وتجديد وإعادة تشطيب، بالإضافة إلى التنظيف الدوري وصيانة المعدات." },
    h4: { en: "Pool Design, Construction &amp; Maintenance", ar: "تصميم وإنشاء وصيانة حمامات السباحة" },
    longDesc: {
      en: "End-to-end swimming pool projects — design and 3D planning, excavation, shell construction, waterproofing, and tiling or mosaic finishes, including infinity-edge, overflow, and plunge pool designs. Installation covers filtration and pump systems, heating and chilling units, underwater lighting, jacuzzis and water features, plus surrounding decking, coping stones, and landscaping. We also handle renovation and resurfacing of ageing pools, leak detection and structural repair, tile and grout replacement, and equipment upgrades — backed by scheduled maintenance covering cleaning, water testing and chemical balancing, and filter servicing.",
      ar: "مشاريع حمامات سباحة متكاملة — التصميم والتخطيط ثلاثي الأبعاد، والحفر، وبناء الهيكل، والعزل المائي، وتشطيبات البلاط أو الفسيفساء، بما في ذلك تصاميم الحواف اللامتناهية والفائضة وأحواض الغطس. ويشمل التركيب أنظمة الفلترة والمضخات، ووحدات التسخين والتبريد، والإضاءة تحت الماء، والجاكوزي والنوافير، بالإضافة إلى الأسطح المحيطة وأحجار الحواف وتنسيق الحدائق. كما نتولى تجديد وإعادة تشطيب الحمامات القديمة، وكشف التسربات والإصلاحات الإنشائية، واستبدال البلاط والجَبَّانة، وترقية المعدات — مدعومة بصيانة دورية تشمل التنظيف وفحص المياه وموازنة المواد الكيميائية وصيانة الفلاتر."
    }
  },
  {
    id: "gardening-irrigation",
    comment: { en: "10. Landscaping &amp; Gardening", ar: "10. تنسيق الحدائق والبستنة" },
    dataService: { en: "Landscaping &amp; Gardening", ar: "تنسيق الحدائق والبستنة" },
    bookingGroupLabel: { en: "Landscaping &amp; Gardening", ar: "تنسيق الحدائق والبستنة" },
    bookingOptions: [{ en: "Landscaping &amp; Gardening", ar: "تنسيق الحدائق والبستنة" }],
    bookingOrder: 7,
    images: [
      { src: "assets/images/garden-1.jpg", alt: { en: "Pop-up sprinklers watering the lawn of a modern villa garden", ar: "رشاشات مياه منبثقة تروي عشب حديقة فيلا حديثة" } },
      { src: "assets/images/garden-2.jpg", alt: { en: "Gardener planting flowers in a mulched bed beside a modern home", ar: "بستاني يزرع الزهور في حوض مغطى بالنشارة بجانب منزل حديث" } },
      { src: "assets/images/garden-3.jpg", alt: { en: "Gardener mowing a striped villa lawn lined with palm trees", ar: "بستاني يجز عشب حديقة فيلا مصطف بالنخيل" } },
      { src: "assets/images/garden-4.jpg", alt: { en: "Gardener trimming a hedge with a powered hedge trimmer", ar: "بستاني يشذّب سياجًا بمقص كهربائي" } },
      { src: "assets/images/garden-5.jpg", alt: { en: "Finished villa garden with manicured lawn, palm trees and flower beds", ar: "حديقة فيلا مكتملة بعشب مشذّب ونخيل وأحواض زهور" } }
    ],
    h3: { en: "Landscaping &amp; Gardening", ar: "تنسيق الحدائق والبستنة" },
    shortDesc: { en: "Garden design and planting, automatic irrigation installation and repair, and regular upkeep to keep everything green year-round.", ar: "تصميم الحدائق والزراعة، وتركيب وإصلاح أنظمة الري الأوتوماتيكية، وصيانة دورية للحفاظ على الخضرة طوال العام." },
    h4: { en: "Landscaping &amp; Irrigation", ar: "تنسيق الحدائق والري" },
    longDesc: {
      en: "Complete garden and landscaping work — design and soft landscaping, natural lawns and artificial grass, tree, shrub and seasonal flower planting, plus hard landscaping such as pathways, pergolas, decking, and decorative gravel. Irrigation covers full system design and installation, automatic sprinkler and drip-line setup, smart timers and controllers, pump and valve fitting, and repair of leaks, blockages, and broken sprinkler heads. Ongoing maintenance includes mowing, hedge and tree trimming, weed and pest control, fertilisation, seasonal replanting, and irrigation system checks.",
      ar: "أعمال حدائق وتنسيق متكاملة — التصميم والتنسيق الأخضر، والمسطحات الطبيعية والعشب الصناعي، وزراعة الأشجار والشجيرات والزهور الموسمية، بالإضافة إلى التنسيق الصلب مثل الممرات والبرجولات والأسطح الخشبية والحصى الزخرفي. ويشمل الري تصميم وتركيب النظام بالكامل، وتركيب الرشاشات الأوتوماتيكية وخطوط التنقيط، والمؤقتات وأجهزة التحكم الذكية، وتركيب المضخات والصمامات، وإصلاح التسربات والانسدادات ورؤوس الرشاشات التالفة. وتشمل الصيانة المستمرة قص العشب، وتشذيب الأسيجة والأشجار، ومكافحة الأعشاب والآفات، والتسميد، وإعادة الزراعة الموسمية، وفحص أنظمة الري."
    }
  }
];
