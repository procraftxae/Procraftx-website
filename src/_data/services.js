// 13 core services grouped into 3 categories, in on-page order.
// dataService (en/ar) must exactly match the FAQ/booking-form option text.
module.exports = {
  categories: [
    {
      id: "core-home-maintenance",
      comment: { en: "1. Core Home Maintenance", ar: "1. الصيانة المنزلية الأساسية" },
      title: { en: "Core Home Maintenance", ar: "الصيانة المنزلية الأساسية" },
      desc: {
        en: "The everyday repairs that keep your home running — AC, plumbing, electrical, handyman and painting, handled by trained pros.",
        ar: "الإصلاحات اليومية التي تُبقي منزلك يعمل بسلاسة — تكييف، سباكة، كهرباء، صيانة عامة ودهانات، على يد فنيين مدربين."
      },
      services: [
        {
          img: "assets/images/ac-service.jpg",
          alt: { en: "Technician pressure-washing an AC unit", ar: "فني يغسل وحدة تكييف بالضغط العالي" },
          name: { en: "Air Conditioning (AC) Services", ar: "خدمات تكييف الهواء" },
          desc: { en: "Filters cleaned, gas refilled, and leaks fixed to keep your cooling efficient.", ar: "تنظيف الفلاتر، تعبئة الغاز، وإصلاح التسريبات للحفاظ على كفاءة التبريد." }
        },
        {
          img: "assets/images/plumbing-service.jpg",
          alt: { en: "Plumber repairing a leaking pipe under a sink", ar: "سبّاك يصلح أنبوبًا يتسرب تحت المغسلة" },
          name: { en: "Plumbing Support", ar: "خدمات السباكة" },
          desc: { en: "Pipe leaks repaired, drains unclogged, and fixtures like taps or toilets installed.", ar: "إصلاح تسريبات الأنابيب، تسليك المصارف، وتركيب التجهيزات مثل الحنفيات والمراحيض." }
        },
        {
          img: "assets/images/electrical-service.jpg",
          alt: { en: "Electrician testing wiring at a light fixture and outlet with a multimeter", ar: "كهربائي يفحص الأسلاك عند تجهيزة إضاءة ومقبس بجهاز قياس" },
          name: { en: "Electrical Work", ar: "الأعمال الكهربائية" },
          desc: { en: "Light fixtures mounted, faulty wiring fixed, and power sockets safely replaced.", ar: "تركيب تجهيزات الإضاءة، إصلاح الأسلاك التالفة، واستبدال المقابس الكهربائية بأمان." }
        },
        {
          img: "assets/images/handyman-service.jpg",
          alt: { en: "Handyman mounting a wall shelf with a drill", ar: "فني صيانة عامة يركّب رفًا على الجدار بمثقاب" },
          name: { en: "Handyman Tasks", ar: "أعمال الصيانة العامة" },
          desc: { en: "Hanging shelves, mounting TVs, fixing door hinges, and small everyday repairs.", ar: "تعليق الأرفف، تركيب شاشات التلفاز، إصلاح مفصلات الأبواب، وإصلاحات يومية بسيطة." }
        },
        {
          img: "assets/images/wall-painting-service.jpg",
          alt: { en: "Worker patching a wall and repointing brickwork", ar: "عامل يرقّع جدارًا ويعيد ملء فواصل الطوب" },
          name: { en: "Wall Painting &amp; Masonry", ar: "دهان الجدران والبناء" },
          desc: { en: "Fresh wall coatings applied, drywall cracks repaired, and tile or brickwork fixed.", ar: "طلاء جدران جديد، إصلاح شقوق الجدران الجصية، وإصلاح البلاط أو الطوب." }
        }
      ]
    },
    {
      id: "furniture-services",
      comment: { en: "2. Our Furniture &amp; Moving Services", ar: "2. خدمات الأثاث والنقل" },
      title: { en: "Our Furniture &amp; Moving Services", ar: "خدمات الأثاث والنقل لدينا" },
      desc: {
        en: "Disassembly and reassembly, packing and moving, restoration, and custom builds — every furniture job, handled by one team.",
        ar: "تفكيك وتركيب، تغليف ونقل، ترميم، وتصميم مخصص — كل ما يخص أثاثك بفريق واحد."
      },
      services: [
        {
          img: "assets/images/disassembly-service.jpg",
          alt: { en: "Workers disassembling a large wardrobe", ar: "عمال يفككون خزانة كبيرة" },
          name: { en: "Disassembly &amp; Reassembly", ar: "الفك وإعادة التركيب" },
          desc: { en: "Heavy furniture safely taken apart for moving and put back together correctly.", ar: "فك الأثاث الثقيل بأمان لنقله وإعادة تركيبه بشكل صحيح." }
        },
        {
          img: "assets/images/packers-movers-service.jpg",
          alt: { en: "Procraftx crew wrapping furniture and loading a moving truck", ar: "طاقم بروكرافتكس يغلّف الأثاث ويحمّل شاحنة نقل" },
          name: { en: "Packers &amp; Movers", ar: "التغليف والنقل" },
          desc: { en: "Securely wrapping your belongings, loading trucks, and transporting to a new home.", ar: "تغليف ممتلكاتك بأمان، تحميلها على الشاحنات، ونقلها إلى المنزل الجديد." }
        },
        {
          img: "assets/images/restoration-service.jpg",
          alt: { en: "Furniture specialist sanding and painting a wooden chair", ar: "أخصائي أثاث يصنفر ويدهن كرسيًا خشبيًا" },
          name: { en: "Restoration &amp; Furniture Painting", ar: "ترميم ودهان الأثاث" },
          desc: { en: "Old wooden furniture sanded, varnished, painted, or repaired to look brand new.", ar: "صنفرة الأثاث الخشبي القديم وطلاؤه بالورنيش أو الدهان أو إصلاحه ليبدو جديدًا." }
        },
        {
          img: "assets/images/furniture-design-build-service.jpg",
          alt: { en: "Carpenter building a custom wooden furniture piece", ar: "نجار يصنع قطعة أثاث خشبية مخصصة" },
          name: { en: "Custom Furniture Design &amp; Build", ar: "تصميم وتصنيع الأثاث المخصص" },
          desc: { en: "Custom furniture designed, built, and installed to fit your space and style exactly.", ar: "أثاث مخصص يُصمَّم ويُصنَّع ويُركَّب ليناسب مساحتك وأسلوبك تمامًا." }
        }
      ]
    },
    {
      id: "home-clearing",
      comment: { en: "3. Deep Cleaning &amp; Sanitization", ar: "3. التنظيف العميق والتعقيم" },
      title: { en: "Deep Cleaning &amp; Sanitization", ar: "التنظيف العميق والتعقيم" },
      desc: {
        en: "Deep cleaning, pest control, and sanitizing for your home and furniture — all in one call.",
        ar: "تنظيف عميق، مكافحة حشرات، وتعقيم لمنزلك وأثاثك — كل ذلك بمكالمة واحدة."
      },
      services: [
        {
          img: "assets/images/disinfection-service.jpg",
          alt: { en: "Technician disinfecting a room and treating a bedbug and ant infestation", ar: "فني يعقّم غرفة ويعالج انتشار بق الفراش والنمل" },
          name: { en: "Disinfection &amp; Pest Management", ar: "التعقيم ومكافحة الحشرات" },
          desc: { en: "Eradicating bugs like bedbugs or ants, and sanitizing surfaces against bacteria.", ar: "القضاء على الحشرات مثل بق الفراش والنمل، وتعقيم الأسطح من البكتيريا." }
        },
        {
          img: "assets/images/furniture-cleaning-service.jpg",
          alt: { en: "Furniture cleaning specialist steam-cleaning a stained sofa", ar: "أخصائي تنظيف أثاث ينظف بالبخار أريكة ملطخة" },
          name: { en: "Furniture Cleaning", ar: "تنظيف الأثاث" },
          desc: { en: "Specialized stain removal and steam cleaning for delicate leather, fabric and carpets.", ar: "إزالة متخصصة للبقع وتنظيف بالبخار للجلد والأقمشة والسجاد الحساس." }
        },
        {
          img: "assets/images/home-cleaning-service.jpg",
          alt: { en: "Cleaner vacuuming a rug in a living room", ar: "عامل تنظيف يكنس سجادة في غرفة المعيشة" },
          name: { en: "Home Cleaning", ar: "تنظيف المنزل" },
          desc: { en: "Routine dusting, vacuuming, mopping, and bathroom cleaning for standard upkeep.", ar: "إزالة الغبار والتنظيف بالمكنسة الكهربائية والمسح وتنظيف الحمامات للصيانة الدورية." }
        },
        {
          img: "assets/images/water-tank-cleaning-service.jpg",
          alt: { en: "Technician pressure-washing the inside of a water tank", ar: "فني يغسل داخل خزان مياه بالضغط العالي" },
          name: { en: "Water Tank Cleaning", ar: "تنظيف خزانات المياه" },
          desc: { en: "High-pressure cleaning and disinfection of overhead and underground water tanks to keep your supply safe.", ar: "تنظيف وتعقيم بالضغط العالي لخزانات المياه العلوية والأرضية للحفاظ على سلامة مصدر المياه." }
        }
      ]
    }
  ]
};
