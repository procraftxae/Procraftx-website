// 12 core services grouped into 3 categories, in on-page order.
// dataService (en/ar) must exactly match the FAQ/booking-form option text.
module.exports = {
  categories: [
    {
      id: "core-home-maintenance",
      comment: { en: "1. Core Home Maintenance", ar: "1. الصيانة المنزلية الأساسية" },
      title: { en: "Core Home Maintenance", ar: "الصيانة المنزلية الأساسية" },
      services: [
        {
          img: "assets/images/plumbing-service.jpg",
          alt: { en: "Plumber repairing a leaking pipe under a sink", ar: "سبّاك يصلح أنبوبًا يتسرب تحت المغسلة" },
          name: { en: "Plumbing Support", ar: "خدمات السباكة" },
          desc: { en: "Leak repairs, drain unclogging, and fixture installation.", ar: "إصلاح التسريبات، تسليك المصارف، وتركيب التجهيزات." }
        },
        {
          img: "assets/images/electrical-service.jpg",
          alt: { en: "Electrician testing wiring at a light fixture and outlet with a multimeter", ar: "كهربائي يفحص الأسلاك عند تجهيزة إضاءة ومقبس بجهاز قياس" },
          name: { en: "Electrical Work", ar: "الأعمال الكهربائية" },
          desc: { en: "Light fixtures, wiring repairs, and socket replacement.", ar: "تركيب الإضاءة، إصلاح الأسلاك، واستبدال المقابس." }
        },
        {
          img: "assets/images/ac-service.jpg",
          alt: { en: "Technician pressure-washing an AC unit", ar: "فني يغسل وحدة تكييف بالضغط العالي" },
          name: { en: "Air Conditioning (AC) Services", ar: "خدمات تكييف الهواء" },
          desc: { en: "Filter cleaning, gas refills, and leak repairs.", ar: "تنظيف الفلاتر، تعبئة الغاز، وإصلاح التسريبات." }
        },
        {
          img: "assets/images/wall-painting-service.jpg",
          alt: { en: "Worker patching a wall and repointing brickwork", ar: "عامل يرقّع جدارًا ويعيد ملء فواصل الطوب" },
          name: { en: "Wall Painting &amp; Masonry", ar: "دهان الجدران والبناء" },
          desc: { en: "Wall painting, crack repairs, and tile or brickwork fixes.", ar: "دهان الجدران، إصلاح الشقوق، وإصلاح البلاط أو الطوب." }
        }
      ]
    },
    {
      id: "home-clearing",
      comment: { en: "2. Deep Cleaning &amp; Sanitization", ar: "2. التنظيف العميق والتعقيم" },
      title: { en: "Deep Cleaning &amp; Sanitization", ar: "التنظيف العميق والتعقيم" },
      services: [
        {
          img: "assets/images/home-cleaning-service.jpg",
          alt: { en: "Cleaner vacuuming a rug in a living room", ar: "عامل تنظيف يكنس سجادة في غرفة المعيشة" },
          name: { en: "Home Cleaning", ar: "تنظيف المنزل" },
          desc: { en: "Dusting, vacuuming, and mopping for routine upkeep.", ar: "إزالة الغبار والتنظيف بالمكنسة والمسح للصيانة الدورية." }
        },
        {
          img: "assets/images/furniture-cleaning-service.jpg",
          alt: { en: "Furniture cleaning specialist steam-cleaning a stained sofa", ar: "أخصائي تنظيف أثاث ينظف بالبخار أريكة ملطخة" },
          name: { en: "Furniture Cleaning", ar: "تنظيف الأثاث" },
          desc: { en: "Steam cleaning and stain removal for upholstery and carpets.", ar: "تنظيف بالبخار وإزالة بقع للمفروشات والسجاد." }
        },
        {
          img: "assets/images/water-tank-cleaning-service.jpg",
          alt: { en: "Technician pressure-washing the inside of a water tank", ar: "فني يغسل داخل خزان مياه بالضغط العالي" },
          name: { en: "Water Tank Cleaning", ar: "تنظيف خزانات المياه" },
          desc: { en: "Pressure cleaning for overhead and underground tanks.", ar: "تنظيف بالضغط لخزانات المياه العلوية والأرضية." }
        },
        {
          img: "assets/images/disinfection-service.jpg",
          alt: { en: "Technician disinfecting a room and treating a bedbug and ant infestation", ar: "فني يعقّم غرفة ويعالج انتشار بق الفراش والنمل" },
          name: { en: "Disinfection &amp; Pest Management", ar: "التعقيم ومكافحة الحشرات" },
          desc: { en: "Pest control and surface sanitizing against bacteria.", ar: "مكافحة الحشرات وتعقيم الأسطح من البكتيريا." }
        }
      ]
    },
    {
      id: "furniture-services",
      comment: { en: "3. Furniture &amp; Moving Services", ar: "3. خدمات الأثاث والنقل" },
      title: { en: "Furniture &amp; Moving Services", ar: "خدمات الأثاث والنقل" },
      services: [
        {
          img: "assets/images/furniture-design-build-service.jpg",
          alt: { en: "Carpenter building a custom wooden furniture piece", ar: "نجار يصنع قطعة أثاث خشبية مخصصة" },
          name: { en: "Custom Furniture Design &amp; Build", ar: "تصميم وتصنيع الأثاث المخصص" },
          desc: { en: "Custom furniture designed, built, and installed to fit your space.", ar: "أثاث مخصص يُصمَّم ويُصنَّع ويُركَّب ليناسب مساحتك." }
        },
        {
          img: "assets/images/restoration-service.jpg",
          alt: { en: "Furniture specialist sanding and painting a wooden chair", ar: "أخصائي أثاث يصنفر ويدهن كرسيًا خشبيًا" },
          name: { en: "Restoration &amp; Furniture Painting", ar: "ترميم ودهان الأثاث" },
          desc: { en: "Sanding, varnishing, and painting for worn furniture.", ar: "صنفرة وطلاء وترميم الأثاث الخشبي القديم." }
        },
        {
          img: "assets/images/handyman-service.jpg",
          alt: { en: "Handyman mounting a wall shelf with a drill", ar: "فني صيانة عامة يركّب رفًا على الجدار بمثقاب" },
          name: { en: "Handyman Tasks", ar: "أعمال الصيانة العامة" },
          desc: { en: "Shelving, TV mounting, and small everyday fixes.", ar: "تعليق أرفف وتركيب شاشات وإصلاحات منزلية بسيطة." }
        },
        {
          img: "assets/images/packers-movers-service.jpg",
          alt: { en: "Procraftx crew wrapping furniture and loading a moving truck", ar: "طاقم بروكرافتكس يغلّف الأثاث ويحمّل شاحنة نقل" },
          name: { en: "Packers &amp; Movers", ar: "التغليف والنقل" },
          desc: { en: "Safe packing, loading, and moving to your new home.", ar: "تغليف وتحميل ونقل آمن إلى منزلك الجديد." }
        }
      ]
    }
  ]
};
