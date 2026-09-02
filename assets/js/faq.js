  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:0.1});
  revealEls.forEach(el=>io.observe(el));

  // mobile nav: toggle open/close, close on link click, close on outside click / Escape
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');

  function openMenu(){
    navLinks.classList.add('is-open');
    navLinks.style.display='flex'; navLinks.style.flexDirection='column';
    navLinks.style.position='absolute'; navLinks.style.top='60px'; navLinks.style.left='0'; navLinks.style.right='0';
    navLinks.style.padding='18px 32px'; navLinks.style.gap='16px';
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    navLinks.classList.remove('is-open');
    navLinks.style.display=''; navLinks.style.position='';
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded','false');
  }
  burger.addEventListener('click', ()=>{
    const isOpen = navLinks.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e)=>{
    if(navLinks.classList.contains('is-open') && !navLinks.contains(e.target) && e.target !== burger && !burger.contains(e.target)){
      closeMenu();
    }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && navLinks.classList.contains('is-open')) closeMenu();
  });
  window.matchMedia('(min-width:721px)').addEventListener('change', (e)=>{ if(e.matches) closeMenu(); });

  /* ---------------- EN / AR TRANSLATION ---------------- */
  const AR = {
    "Services":"خدماتنا","Specialties":"التخصصات","Reviews":"التقييمات","FAQs":"الأسئلة الشائعة",
    "See our core home maintenance services →":"اطّلع على خدمات الصيانة المنزلية الأساسية ←",
    "See our furniture services →":"اطّلع على خدمات الأثاث لدينا ←",
    "See home clearing & sanitization →":"اطّلع على تفريغ المنزل والتعقيم ←",
    "See window & glass installations →":"اطّلع على تركيبات النوافذ والزجاج ←",
    "See outdoor majlis services →":"اطّلع على خدمات المجالس الخارجية ←",
    "See car garage construction →":"اطّلع على إنشاء كراجات السيارات ←",
    "Book a Visit":"احجز زيارة",
    "Good To Know":"معلومات مفيدة","Questions we get a lot.":"أسئلة نتلقاها كثيرًا.",
    "From how we're set up to what to expect from each of our 17 services — the answers to what people ask us most.":"من طريقة عملنا إلى ما يمكن توقعه من كل خدمة من خدماتنا الـ17 — إجابات على أكثر ما يسألنا عنه عملاؤنا.",
    "Booking & Business":"الحجز والأعمال",
    "Do you charge for the initial quote?":"هل تتقاضون رسومًا مقابل عرض السعر الأولي؟",
    "No. The walkthrough and quote are free — you only pay once you approve the price, with no obligation to book with us afterward.":"لا. المعاينة وعرض السعر مجانيان — تدفع فقط بعد موافقتك على السعر، دون أي التزام بالحجز معنا لاحقًا.",
    "Are your technicians licensed and insured?":"هل الفنيون لديكم مرخّصون ومؤمَّنون؟",
    "Yes. Every technician we send is licensed for their trade, background-checked, and covered by liability insurance, so you're protected from the first knock on the door.":"نعم. كل فني نرسله مرخّص في مجاله، وتم التحقق من خلفيته، ومغطى بتأمين المسؤولية، فأنت محمي منذ أول طرقة على الباب.",
    "What areas do you service?":"ما هي المناطق التي تغطونها؟",
    "We're based in Dubai and Sharjah, and also take jobs in Ajman and Abu Dhabi. There's no fixed service radius — call or WhatsApp us with your location and we'll confirm we can get a technician to you.":"نحن مقرّنا في دبي والشارقة، كما نغطي عجمان وأبوظبي أيضًا. لا يوجد نطاق خدمة محدد — اتصل بنا أو راسلنا على واتساب بموقعك وسنؤكد لك إمكانية وصول فني إليك.",
    "How quickly can someone come out?":"ما مدى سرعة وصول أحد الفنيين؟",
    "Most requests get an appointment within the same week, and many are same-visit once a technician is on site. Call or WhatsApp us and we'll give you the next available slot.":"تحصل معظم الطلبات على موعد خلال نفس الأسبوع، والعديد منها يُنجز في نفس الزيارة بمجرد وصول الفني. اتصل بنا أو راسلنا على واتساب وسنمنحك أقرب موعد متاح.",
    "How do I find out what a job will cost?":"كيف أعرف تكلفة عملي؟",
    "Every home and job is different, so we don't publish flat rates. Send us the details on WhatsApp or by phone and we'll get back to you with a clear price before any work starts.":"كل منزل ومهمة مختلفان، لذا لا ننشر أسعارًا ثابتة. أرسل لنا التفاصيل عبر واتساب أو الهاتف وسنعود إليك بسعر واضح قبل بدء أي عمل.",
    "What payment methods do you accept?":"ما هي طرق الدفع التي تقبلونها؟",
    "We accept cash, card, and bank transfer. You'll always see the price before we start, so there are no surprises on the invoice.":"نقبل الدفع النقدي والبطاقة والتحويل البنكي. سترى السعر دائمًا قبل أن نبدأ، فلا مفاجآت في الفاتورة.",
    "What's covered by your guarantee?":"ما الذي يغطيه الضمان؟",
    "Any repair we perform is covered for parts and labor. If the same issue reappears, we come back at no charge.":"أي إصلاح نقوم به مغطى بالقطع والعمالة. وإذا تكررت نفس المشكلة، نعود لإصلاحها دون أي رسوم.",
    "Do you offer discounts for bundling multiple services in one visit?":"هل تقدمون خصومات عند دمج عدة خدمات في زيارة واحدة؟",
    "Yes — when you combine services from different categories in a single visit, we factor that into the quote, so bundling almost always works out cheaper than booking separately.":"نعم — عند دمج خدمات من فئات مختلفة في زيارة واحدة، نأخذ ذلك بعين الاعتبار عند التسعير، لذا يكون الدمج غالبًا أوفر من الحجز المنفصل.",
    "What happens if I need to reschedule or cancel my appointment?":"ماذا يحدث إذا احتجت لتأجيل أو إلغاء موعدي؟",
    "No problem — just call or WhatsApp us as early as you can and we'll move your slot. There's no cancellation fee as long as you give us reasonable notice.":"لا مشكلة — فقط اتصل بنا أو راسلنا على واتساب بأقرب وقت ممكن وسنغيّر موعدك. لا توجد رسوم إلغاء طالما أخطرتنا بوقت معقول.",
    "Do you work weekends and public holidays?":"هل تعملون في عطلات نهاية الأسبوع والعطلات الرسمية؟",
    "Yes, we're open seven days a week including most public holidays, though slots fill up faster — book a little earlier if you need a weekend visit.":"نعم، نعمل سبعة أيام في الأسبوع بما في ذلك معظم العطلات الرسمية، لكن المواعيد تُحجز بسرعة أكبر — احجز مبكرًا قليلًا إذا كنت بحاجة لزيارة في عطلة نهاية الأسبوع.",
    "Core Home Maintenance":"الصيانة المنزلية الأساسية",
    "Do you handle emergency AC or plumbing issues?":"هل تتعاملون مع أعطال التكييف أو السباكة الطارئة؟",
    "Yes — if your AC stops cooling or you have an active leak, tell us it's urgent when you call and we'll prioritize getting a technician to you as fast as possible.":"نعم — إذا توقف تكييفك عن التبريد أو كان لديك تسرب نشط، أخبرنا أن الأمر عاجل عند الاتصال وسنعطيه الأولوية لإرسال فني بأسرع وقت ممكن.",
    "Can one visit cover plumbing, electrical, and handyman work together?":"هل يمكن لزيارة واحدة أن تغطي السباكة والكهرباء وأعمال الصيانة العامة معًا؟",
    "Yes. Most of our technicians are cross-trained, and for bigger jobs we can send a small crew so several core maintenance tasks get done in a single visit.":"نعم. معظم فنيينا مدربون على أكثر من تخصص، وللمهام الكبيرة يمكننا إرسال فريق صغير لإنجاز عدة أعمال صيانة أساسية في زيارة واحدة.",
    "Do you supply the paint and materials for painting or masonry work?":"هل توفرون الدهان والمواد لأعمال الدهان أو البناء؟",
    "We can supply standard paints and materials as part of your quote, or work with materials you've already purchased — just let us know your preference when booking.":"يمكننا توفير الدهانات والمواد القياسية ضمن عرض السعر، أو العمل بالمواد التي اشتريتها مسبقًا — فقط أخبرنا برغبتك عند الحجز.",
    "Can you install new light fixtures or ceiling fans, not just repair existing ones?":"هل يمكنكم تركيب تجهيزات إضاءة أو مراوح سقف جديدة، وليس فقط إصلاح الموجود؟",
    "Yes — our electricians handle new installations as well as repairs, from light fixtures and ceiling fans to extra sockets and switches.":"نعم — يتعامل كهربائيونا مع التركيبات الجديدة وكذلك الإصلاحات، من تجهيزات الإضاءة ومراوح السقف إلى المقابس والمفاتيح الإضافية.",
    "Do you service split, central, and window AC units?":"هل تصونون وحدات التكييف السبليت والمركزي والشباك؟",
    "We work on all common residential AC types — split units, central systems, and window units — for cleaning, gas top-ups, and repairs.":"نعمل على جميع أنواع التكييف المنزلي الشائعة — السبليت والمركزي والشباك — للتنظيف وتعبئة الغاز والإصلاحات.",
    "Is a permit needed for electrical work in my home?":"هل يلزم تصريح لأعمال الكهرباء في منزلي؟",
    "Routine repairs and fixture swaps don't require a permit. For larger rewiring or panel upgrades, we'll let you know if paperwork is needed and can guide you through it.":"الإصلاحات الروتينية واستبدال التجهيزات لا تتطلب تصريحًا. أما أعمال إعادة التوصيل الكبيرة أو ترقية اللوحة الكهربائية، فسنخبرك إذا كانت هناك حاجة لأوراق رسمية ونساعدك في إتمامها.",
    "Our Furniture Services":"خدمات الأثاث لدينا",
    "Do I need to bring furniture to you, or do you work on-site?":"هل يجب أن أحضر الأثاث إليكم أم تعملون في الموقع؟",
    "Most upholstery, mattress, and furniture cleaning is done right at your home. Larger restoration or painting jobs may be collected and returned once finished — we'll tell you which applies when we quote the job.":"يتم تنظيف معظم التنجيد والمراتب والأثاث في منزلك مباشرة. أما أعمال الترميم أو الدهان الكبيرة فقد تُنقل وتُعاد بعد الانتهاء — وسنخبرك بما ينطبق عند تقديم عرض السعر.",
    "Will disassembling and reassembling my furniture damage it?":"هل يؤدي فك الأثاث وإعادة تركيبه إلى إتلافه؟",
    "No — our technicians are trained to safely take apart and rebuild furniture for moves or repairs, using the correct tools so no hardware or joints are damaged.":"لا — فنيونا مدربون على فك وتركيب الأثاث بأمان للنقل أو الإصلاح، باستخدام الأدوات الصحيحة حتى لا تتلف أي قطع أو مفاصل.",
    "Is your furniture and upholstery cleaning safe for delicate or antique pieces?":"هل تنظيف الأثاث والتنجيد لديكم آمن للقطع الحساسة أو الأنتيكة؟",
    "Yes. We assess the fabric or finish before starting and adjust our products and methods accordingly, so delicate and antique furniture is treated with extra care.":"نعم. نقيّم القماش أو الطلاء قبل البدء ونعدّل موادنا وأساليبنا بناءً على ذلك، فيُعامل الأثاث الحساس والأنتيكة بعناية إضافية.",
    "How long does furniture restoration or painting usually take?":"كم يستغرق ترميم أو دهان الأثاث عادةً؟",
    "Small pieces are often finished within a few days; larger or more detailed restorations can take one to two weeks. We'll give you a clear timeline when we quote the job.":"غالبًا ما تُنجز القطع الصغيرة خلال أيام قليلة؛ أما أعمال الترميم الأكبر أو الأكثر تفصيلًا فقد تستغرق أسبوعًا إلى أسبوعين. سنعطيك جدولًا زمنيًا واضحًا عند تقديم عرض السعر.",
    "Can you match the original color and finish when restoring wood furniture?":"هل يمكنكم مطابقة اللون والطلاء الأصليين عند ترميم الأثاث الخشبي؟",
    "Yes — we can mix stains and finishes to match your existing furniture closely, or refinish in a new color if you'd rather update the look.":"نعم — يمكننا مزج الأصباغ والطلاءات لمطابقة أثاثك الحالي بدقة، أو إعادة طلائه بلون جديد إذا كنت ترغب في تحديث المظهر.",
    "Do you offer pickup and delivery for large furniture pieces?":"هل تقدمون خدمة الاستلام والتوصيل للقطع الكبيرة من الأثاث؟",
    "Yes, pickup and delivery is available for restoration or off-site cleaning jobs — we'll arrange a convenient time when we schedule the work.":"نعم، خدمة الاستلام والتوصيل متاحة لأعمال الترميم أو التنظيف خارج الموقع — سننسق وقتًا مناسبًا عند جدولة العمل.",
    "Home Clearing & Sanitization":"تفريغ المنزل والتعقيم",
    "Do you offer move-in or move-out deep cleaning?":"هل تقدمون تنظيفًا عميقًا عند الانتقال أو الإخلاء؟",
    "Yes — our move-in/move-out clean covers cabinets, ovens, and windows so the property is spotless before keys change hands.":"نعم — يشمل تنظيف الانتقال أو الإخلاء لدينا الخزائن والأفران والنوافذ، ليكون العقار نظيفًا تمامًا قبل تسليم المفاتيح.",
    "Can you handle packing, pest control, and cleaning in one project?":"هل يمكنكم التعامل مع التغليف ومكافحة الحشرات والتنظيف في مشروع واحد؟",
    "Yes. If you're relocating, we can bundle packing and moving with disinfection, pest treatment, and a final clean so the whole transition is handled by one crew.":"نعم. إذا كنت تنتقل، يمكننا دمج التغليف والنقل مع التعقيم ومكافحة الحشرات والتنظيف النهائي، ليتولى فريق واحد عملية الانتقال بأكملها.",
    "How often should I book recurring home cleaning?":"كم مرة يجب أن أحجز تنظيف المنزل المتكرر؟",
    "Most households book weekly or bi-weekly cleaning, but we're flexible — tell us your routine and we'll set up a schedule that fits.":"تحجز معظم المنازل تنظيفًا أسبوعيًا أو كل أسبوعين، لكننا مرنون — أخبرنا بروتينك وسنضع جدولًا يناسبك.",
    "What happens to items I want to donate or discard during decluttering?":"ماذا يحدث للأغراض التي أرغب في التبرع بها أو التخلص منها أثناء التنظيم؟",
    "Tell us what's staying, going to donation, or being thrown out, and we'll sort and haul it accordingly — including drop-off at donation centers where possible.":"أخبرنا بما سيبقى وما سيُتبرع به وما سيُرمى، وسنقوم بالفرز والنقل وفقًا لذلك — بما في ذلك التوصيل إلى مراكز التبرع حيثما أمكن.",
    "Are your disinfection products safe for pets and children?":"هل مواد التعقيم لديكم آمنة للحيوانات الأليفة والأطفال؟",
    "Yes, we use products that are effective against germs and pests but safe once dry. We'll also advise on any ventilation time needed before pets or kids go back into treated rooms.":"نعم، نستخدم مواد فعالة ضد الجراثيم والحشرات لكنها آمنة بعد الجفاف. كما سننصحك بأي وقت تهوية لازم قبل عودة الحيوانات الأليفة أو الأطفال إلى الغرف المعالجة.",
    "Do you provide packing materials, or do I need to supply my own boxes?":"هل توفرون مواد التغليف أم يجب أن أوفر الصناديق بنفسي؟",
    "We can supply boxes, tape, and wrapping as part of the move, or use materials you already have — just let us know when you book.":"يمكننا توفير الصناديق وشريط اللصق ومواد التغليف كجزء من عملية النقل، أو استخدام المواد التي تملكها بالفعل — فقط أخبرنا عند الحجز.",
    "Window & Glass Installations":"تركيبات النوافذ والزجاج",
    "What types of windows do you install?":"ما أنواع النوافذ التي تركبونها؟",
    "Aluminium, uPVC, sliding, casement, and double-glazed windows — we'll help you pick the right type for the room and your budget.":"نوافذ الألمنيوم، واليو بي في سي، والسحّاب، والمفصلية، والمزدوجة الزجاج — سنساعدك على اختيار النوع المناسب للغرفة وميزانيتك.",
    "Can you replace a single cracked window, or do I need to redo the whole set?":"هل يمكنكم استبدال نافذة واحدة مكسورة، أم يجب استبدال المجموعة بأكملها؟",
    "A single window is no problem — we quote and replace just the unit that needs it, no need to touch the rest.":"استبدال نافذة واحدة لا يمثل مشكلة — نقدّم عرض سعر ونستبدل الوحدة التي تحتاج فقط، دون الحاجة للمس البقية.",
    "How long does shower glass replacement take?":"كم يستغرق استبدال زجاج الحمام؟",
    "Most shower glass replacements are finished in a single visit, measured and fitted precisely for a watertight seal.":"تُنجز معظم عمليات استبدال زجاج الحمام في زيارة واحدة، بقياس وتركيب دقيقين لضمان عزل مقاوم للماء.",
    "Is double-glazing worth it for heat and noise here?":"هل يستحق الزجاج المزدوج الاستثمار للحرارة والضوضاء هنا؟",
    "Yes — double-glazed units noticeably cut outside noise and help keep interiors cooler, which also eases the load on your AC.":"نعم — تقلل الوحدات المزدوجة الزجاج الضوضاء الخارجية بشكل ملحوظ وتساعد في إبقاء الأجواء الداخلية أكثر برودة، مما يخفف أيضًا الحمل عن مكيف الهواء.",
    "Do you only install new windows, or also repair existing ones?":"هل تركّبون نوافذ جديدة فقط، أم تصلحون الموجودة أيضًا؟",
    "Both — we handle repairs like broken seals, sticking frames, and damaged glass, as well as full installation and replacement.":"كلاهما — نتعامل مع إصلاحات مثل العزل التالف، والإطارات العالقة، والزجاج التالف، بالإضافة إلى التركيب والاستبدال الكامل.",
    "Outdoor Majlis Services":"خدمات المجالس الخارجية",
    "What's the difference between a glass majlis and a traditional Arabic majlis?":"ما الفرق بين المجلس الزجاجي والمجلس العربي التقليدي؟",
    "A glass majlis is a modern, fully-glazed structure with a sleek aluminum frame, while a traditional Arabic majlis uses classic tented or clad designs with detailed finishes. We build both.":"المجلس الزجاجي هو هيكل حديث بالكامل من الزجاج بإطار ألمنيوم أنيق، بينما يستخدم المجلس العربي التقليدي تصاميم مخيّمة أو مكسوة كلاسيكية بلمسات نهائية مفصّلة. نبني كلا النوعين.",
    "Can you build a majlis on any property?":"هل يمكنكم بناء مجلس على أي عقار؟",
    "In most cases yes — the design just needs to suit your property's space and layout. We'll assess the site and advise on any approvals needed before we start.":"في معظم الحالات نعم — يحتاج التصميم فقط إلى أن يناسب مساحة عقارك وتخطيطه. سنقيّم الموقع ونقدم النصح بشأن أي موافقات مطلوبة قبل البدء.",
    "How long does building a majlis take?":"كم يستغرق بناء المجلس؟",
    "It depends on the size and finish — a straightforward pergola can take days, while a fully fitted-out glass or traditional majlis can take a few weeks. We'll give you a clear timeline after the site visit.":"يعتمد ذلك على الحجم والتشطيب — يمكن أن تستغرق البرجولا البسيطة أيامًا، بينما قد يستغرق المجلس الزجاجي أو التقليدي المجهز بالكامل بضعة أسابيع. سنعطيك جدولاً زمنيًا واضحًا بعد معاينة الموقع.",
    "Do you only build new majlis, or also renovate existing ones?":"هل تبنون مجالس جديدة فقط، أم تجدّدون الموجودة أيضًا؟",
    "Both. We handle full renovations and expansions too — from re-cladding and roof repairs to a complete interior refresh.":"كلاهما. نتولى أيضًا التجديدات والتوسعات الكاملة — من إعادة الكسوة وإصلاح الأسقف إلى تجديد داخلي كامل.",
    "Can you add features like a fireplace or sound system to my majlis?":"هل يمكنكم إضافة ميزات مثل مدفأة أو نظام صوت لمجلسي؟",
    "Yes — we fit bespoke features including smart lighting, sound systems, fireplaces, coffee stations, TV units, and custom storage, either during construction or as a retrofit.":"نعم — نركّب ميزات مخصصة تشمل الإضاءة الذكية، وأنظمة الصوت، والمدافئ، ومحطات القهوة، ووحدات التلفزيون، وحلول التخزين المخصصة، سواء أثناء البناء أو كإضافة لاحقة.",
    "Outdoor Car Garage Construction":"إنشاء كراجات السيارات الخارجية",
    "What's the difference between a carport and a full garage?":"ما الفرق بين المظلة والكراج الكامل؟",
    "A carport is an open-sided shade structure that protects your car from sun and rain, while a full garage is a fully enclosed structure with walls and a door. We build both.":"المظلة هي هيكل ظليل مفتوح الجوانب يحمي سيارتك من الشمس والمطر، بينما الكراج الكامل هو هيكل مغلق تمامًا بجدران وباب. نبني كلا النوعين.",
    "What materials do you build garages and carports from?":"ما المواد التي تستخدمونها لبناء الكراجات والمظلات؟",
    "Steel structures, aluminum garages, and sandwich panel garages — we'll recommend the best fit based on your budget and how much protection you need.":"هياكل فولاذية، وكراجات ألمنيوم، وكراجات بألواح ساندويتش — سنوصي بالأنسب بناءً على ميزانيتك ومستوى الحماية الذي تحتاجه.",
    "How many cars can a custom carport or garage cover?":"كم عدد السيارات التي يمكن أن تغطيها المظلة أو الكراج المخصص؟",
    "We design for anywhere from a single car to multi-car setups — just tell us how many vehicles you need to cover and we'll size it accordingly.":"نصمم لأي عدد بدءًا من سيارة واحدة وصولاً إلى إعدادات لعدة سيارات — فقط أخبرنا بعدد المركبات التي تحتاج لتغطيتها وسنحدد الحجم وفقًا لذلك.",
    "Do you handle permits for garage construction?":"هل تتولون تصاريح بناء الكراج؟",
    "We'll let you know what approvals your property needs and guide you through the process alongside the build.":"سنخبرك بالموافقات التي يحتاجها عقارك ونرشدك خلال العملية جنبًا إلى جنب مع البناء.",
    "Can the garage design match my house's existing style?":"هل يمكن أن يتناسب تصميم الكراج مع طراز منزلي الحالي؟",
    "Yes — we design the structure, finish, and color to complement your home rather than look bolted on.":"نعم — نصمم الهيكل والتشطيب واللون ليكمل منزلك بدلاً من أن يبدو مضافًا بشكل منفصل.",
    "Interior Design":"التصميم الداخلي",
    "What does your interior design service actually include?":"ماذا تشمل خدمة التصميم الداخلي لديكم فعليًا؟",
    "From concept and space planning through material selection, custom joinery, and full styling — we handle the whole process, not just decoration advice.":"من الفكرة وتخطيط المساحة إلى اختيار المواد والنجارة المخصصة والتنسيق الكامل — نتولى العملية بأكملها، وليس مجرد نصائح للديكور.",
    "Do you provide 3D visuals before work starts?":"هل تقدمون تصورات ثلاثية الأبعاد قبل بدء العمل؟",
    "Yes. We put together mood boards and 3D visuals so you can see the result and request changes before any work begins.":"نعم. نُعدّ لوحات إلهام وتصورات ثلاثية الأبعاد لترى النتيجة وتطلب أي تعديلات قبل بدء أي عمل.",
    "Can you design just one room, or does it have to be the whole home?":"هل يمكنكم تصميم غرفة واحدة فقط، أم يجب أن يكون المنزل بالكامل؟",
    "Either — we take on single-room refreshes as well as complete villa or apartment fit-outs.":"كلاهما — نقوم بتجديد غرفة واحدة وكذلك التجهيز الكامل للفلل أو الشقق.",
    "Do you source and supply the furniture too?":"هل توفرون الأثاث أيضًا؟",
    "Yes, furniture sourcing and placement is part of the service, alongside décor and accessory styling.":"نعم، توفير الأثاث وتنسيقه جزء من الخدمة، إلى جانب تنسيق الديكور والإكسسوارات.",
    "Do you handle the actual construction work, or just the design?":"هل تتولون أعمال التنفيذ الفعلية، أم التصميم فقط؟",
    "Both — our design comes with complete supervised fit-out, including flooring, wall treatments, false ceilings, and lighting installation.":"كلاهما — يأتي تصميمنا مع تجهيز كامل تحت إشراف مباشر، يشمل الأرضيات ومعالجات الجدران والأسقف المستعارة وتركيب الإضاءة.",
    "See interior design services →":"اطّلع على خدمات التصميم الداخلي ←",
    "Swimming Pool Construction & Design":"إنشاء وتصميم حمامات السباحة",
    "Do you build pools from scratch, or only renovate existing ones?":"هل تبنون حمامات السباحة من الصفر، أم تجددون الموجودة فقط؟",
    "Both. We handle full new builds from excavation through finishing, as well as renovation and resurfacing of ageing pools.":"كلاهما. نتولى الإنشاء الكامل من الحفر وحتى التشطيب، بالإضافة إلى تجديد وإعادة تكسية الحمامات القديمة.",
    "What pool styles can you design?":"ما أنماط حمامات السباحة التي يمكنكم تصميمها؟",
    "Infinity-edge, overflow, and plunge pool designs, among others — we'll plan the layout around your space and budget in 3D before construction starts.":"تصاميم حمامات اللانهاية والفيضان والغطس وغيرها — نخطط التصميم حسب مساحتك وميزانيتك بتصور ثلاثي الأبعاد قبل بدء الإنشاء.",
    "Do you fix leaks in an existing pool?":"هل تصلحون التسريبات في حمام سباحة قائم؟",
    "Yes, leak detection and structural repair are part of our renovation work.":"نعم، كشف التسريبات والإصلاح الإنشائي جزء من أعمال التجديد لدينا.",
    "What's included in ongoing pool maintenance?":"ماذا تشمل صيانة حمام السباحة الدورية؟",
    "Cleaning, water testing and chemical balancing, and filter servicing, plus equipment upgrades when needed.":"التنظيف، وفحص المياه وموازنة الكيماويات، وصيانة الفلاتر، بالإضافة إلى تحديث المعدات عند الحاجة.",
    "Can you add features like lighting or a jacuzzi to an existing pool?":"هل يمكنكم إضافة ميزات مثل الإضاءة أو الجاكوزي لحمام سباحة قائم؟",
    "Yes — underwater lighting, jacuzzis, and water features can be added during a renovation, not just in a new build.":"نعم — يمكن إضافة الإضاءة تحت الماء والجاكوزي وميزات المياه أثناء التجديد، وليس فقط في الإنشاء الجديد.",
    "See swimming pool construction & design →":"اطّلع على إنشاء وتصميم حمامات السباحة ←",
    "Landscaping & Gardening":"تنسيق الحدائق والبستنة",
    "Do you install irrigation systems, or just do the landscaping?":"هل تركّبون أنظمة الري، أم تنسيق الحدائق فقط؟",
    "Both — full irrigation design and installation (sprinklers, drip lines, smart timers) is part of the same service as the garden design and planting.":"كلاهما — تصميم وتركيب نظام الري الكامل (الرشاشات وخطوط التنقيط والمؤقتات الذكية) جزء من نفس خدمة تصميم الحديقة والزراعة.",
    "Can you fix an existing irrigation system instead of installing a new one?":"هل يمكنكم إصلاح نظام ري قائم بدلاً من تركيب نظام جديد؟",
    "Yes, we repair leaks, blockages, and broken sprinkler heads on existing systems.":"نعم، نصلح التسريبات والانسدادات ورؤوس الرشاشات المكسورة في الأنظمة القائمة.",
    "Do you offer artificial grass as an option?":"هل توفرون العشب الصناعي كخيار؟",
    "Yes, alongside natural lawns — we'll recommend whichever suits your space and maintenance preference.":"نعم، إلى جانب العشب الطبيعي — سننصحك بما يناسب مساحتك وتفضيلاتك في الصيانة.",
    "Is ongoing garden maintenance available, or is this a one-time job?":"هل صيانة الحديقة المستمرة متاحة، أم أن هذا عمل لمرة واحدة؟",
    "Both — one-time design and installation, or ongoing maintenance like mowing, trimming, weed control, and seasonal replanting.":"كلاهما — تصميم وتركيب لمرة واحدة، أو صيانة مستمرة مثل جز العشب والتقليم ومكافحة الأعشاب وإعادة الزراعة الموسمية.",
    "What hard landscaping options do you offer?":"ما خيارات التنسيق الصلب للحدائق التي تقدمونها؟",
    "Pathways, pergolas, decking, and decorative gravel, designed to fit alongside the planting and irrigation work.":"الممرات والبرجولات والأرضيات الخشبية والحصى الزخرفي، مصممة لتتناسب مع أعمال الزراعة والري.",
    "See landscaping & gardening →":"اطّلع على تنسيق الحدائق والبستنة ←",
    "Still Have A Question?":"لا يزال لديك سؤال؟",
    "We're happy to talk it through.":"يسعدنا أن نناقشه معك.",
    "Didn't find what you were looking for? Message us on WhatsApp or call — a real person answers, not a bot.":"لم تجد ما كنت تبحث عنه؟ راسلنا على واتساب أو اتصل بنا — يرد عليك شخص حقيقي، وليس روبوتًا.",
    "Chat on WhatsApp":"تواصل عبر واتساب",
    "Skip to content":"تخطَّ إلى المحتوى"
  };

  let i18nNodes = [];
  function collectI18nNodes(){
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.data || !node.data.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if(!p) return NodeFilter.FILTER_REJECT;
        if(p.closest('svg,script,style,#langToggle')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n;
    while((n = walker.nextNode())) nodes.push({node:n, original:n.data});
    return nodes;
  }

  function applyLang(lang){
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    i18nNodes.forEach(({node, original})=>{
      const key = original.trim();
      node.data = lang === 'ar' ? (AR[key] || original) : original;
    });
    langToggle.setAttribute('aria-pressed', lang === 'ar' ? 'true' : 'false');
    // the button now shows only the target language, so spell the action out
    // for screen readers, in the language currently being read
    langToggle.setAttribute('aria-label', lang === 'ar' ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic');
  }

  const langToggle = document.getElementById('langToggle');
  let currentLang = 'en';
  // applyLang() only runs on click, so set the initial label here too
  langToggle.setAttribute('aria-label', 'Switch to Arabic');
  i18nNodes = collectI18nNodes();
  langToggle.addEventListener('click', ()=>{
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyLang(currentLang);
  });
