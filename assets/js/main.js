  // graceful fallback if an external image fails to load (e.g. no network access)
  // uses a capturing document-level listener (img "error" events don't bubble)
  // instead of inline onerror="" attributes, so this file can ship without 'unsafe-inline' in CSP
  document.addEventListener('error', (e)=>{
    const img = e.target;
    if(!(img instanceof HTMLImageElement)) return;
    const c = img.closest('.thumb') || img.closest('.bg') || img.closest('.banner');
    if(c) c.classList.add('img-fallback');
    img.remove();
  }, true);

  // hero parallax: background image drifts slower than the page on both
  // mouse-wheel scroll (desktop) and touch scroll (mobile swipe) — both
  // fire the same native "scroll" event, so one listener covers both.
  (function(){
    const heroBg = document.querySelector('.hero .bg');
    const hero = document.querySelector('.hero');
    if(!heroBg || !hero) return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const FACTOR = 0.18;
    let ticking = false;
    function update(){
      const rect = hero.getBoundingClientRect();
      const bufferPx = hero.offsetHeight * 0.05;
      let offset = rect.top * FACTOR;
      if(offset > bufferPx) offset = bufferPx;
      if(offset < -bufferPx) offset = -bufferPx;
      heroBg.style.transform = `translateY(${offset}px)`;
      ticking = false;
    }
    function onScroll(){
      if(!ticking){
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    update();
  })();

  // build the trades marquee (duplicated once for a seamless loop)
  const trades = [
    {n:'AC Services', d:'M12 2v20M4.5 5.5l15 13M19.5 5.5l-15 13'},
    {n:'Plumbing Support', d:'M14.7 6.3a4 4 0 0 0-5.66 5.66L3 18v3h3l6.04-6.04a4 4 0 0 0 5.66-5.66l-2.5 2.5-2-2 2.5-2.5z'},
    {n:'Electrical Work', d:'M13 2L4 14h7l-1 8 9-12h-7l1-8z'},
    {n:'Handyman Tasks', d:'M4 21l7-7M14.5 6.5l3 3L21 6l-3-3-3.5 3.5zM3 21l3.5-1L15 11.5l-2.5-2.5L4 17.5 3 21z'},
    {n:'Wall Painting & Masonry', d:'M3 17l6-6 3 3 8-8M20 6h-4V2'},
    {n:'Disassembly & Reassembly', d:'M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0 1 15-6.7L20 4M20 15a9 9 0 0 1-15 6.7L4 20'},
    {n:'Restoration & Furniture Painting', d:'M6 8h12l-1.5 12h-9L6 8zM8 8V5a4 4 0 0 1 8 0v3'},
    {n:'Furniture Cleaning', d:'M12 2C9 6 5 8 5 13a7 7 0 0 0 14 0c0-5-4-7-7-11z'},
    {n:'Disinfection & Pest Management', d:'M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3zM9 12l2 2 4-4'},
    {n:'Packers & Movers', d:'M3 7h11v8H3zM14 10h4l3 3v2h-7v-5z'},
    {n:'Home Cleaning', d:'M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10'},
    {n:'Water Tank Cleaning', d:'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6'}
  ];
  const track = document.getElementById('marqueeTrack');
  if(track){
    const itemsHTML = trades.map(t=>`<span class="marquee-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="${t.d}"/></svg>${t.n}</span>`).join('');
    track.innerHTML = itemsHTML + itemsHTML; // duplicate for seamless looping
  }

  // animated stat counters
  const counters = document.querySelectorAll('.stats-grid .num');
  const countIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, {threshold:0.4});
  counters.forEach(el=>countIO.observe(el));

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:0.1});
  revealEls.forEach(el=>io.observe(el));

  // deep links like /#swimming-pools land on a block whose reveal-on-scroll
  // animation still has it at opacity:0, so the visitor arrives at what looks
  // like an empty page. Force the target (and anything inside it) visible.
  function revealHashTarget(){
    const id = location.hash;
    if(!id || id === '#') return;
    let target;
    try{ target = document.querySelector(id); }catch(e){ return; } // guard malformed hashes
    if(!target) return;
    target.classList.add('in');
    target.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();

  // promo banner video: starts muted (autoplay requires it) and stays muted
  // unless the visitor taps the mute button themselves. It also re-mutes as
  // soon as it scrolls out of view, so sound never plays off-screen.
  //
  // IMPORTANT: it must NEVER be auto-unmuted by script (e.g. on scroll into
  // view) with no direct tap behind it. iOS Safari and some Android browsers
  // silently PAUSE a video that autoplayed muted the instant script sets
  // .muted = false without a real user gesture — no error, no event fired
  // for it, the video just freezes on whatever frame it was on. That was the
  // actual cause of the video "not working" on mobile: a previous version of
  // this code auto-unmuted on scroll-into-view and mobile browsers silently
  // killed playback in response. Muting programmatically is always safe (it
  // never triggers a pause); unmuting is only ever safe from a real tap.
  (function(){
    const banner = document.getElementById('promoBanner');
    const media = banner ? banner.querySelector('.banner-media') : null;
    const video = media ? media.querySelector('.banner-video') : null;
    const muteBtn = document.getElementById('muteToggle');
    if(!banner || !media || !video || !muteBtn) return;
    const iconMuted = muteBtn.querySelector('.icon-muted');
    const iconUnmuted = muteBtn.querySelector('.icon-unmuted');

    // reflects the video's real muted state, whatever caused the change
    // (our own calls, browser autoplay policy overriding us, etc.)
    function syncIcon(){
      const muted = video.muted;
      iconMuted.style.display = muted ? '' : 'none';
      iconUnmuted.style.display = muted ? 'none' : '';
      muteBtn.setAttribute('aria-pressed', String(!muted));
      muteBtn.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
    }
    video.addEventListener('volumechange', syncIcon);

    muteBtn.addEventListener('click', ()=>{ video.muted = !video.muted; });

    syncIcon();
    const bannerIO = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) video.muted = true;
      });
    }, {threshold:0.6});
    bannerIO.observe(media);

    // some mobile browsers (iOS Low Power Mode, Android Data Saver, etc.)
    // silently block autoplay even with muted+playsinline set correctly, and
    // browsers can pause the video later for reasons outside our control too.
    // Since there are no native controls, any such pause would leave the
    // video frozen with no way to resume it — so watch for that and show a
    // tap-to-play button as a fallback whenever it happens.
    const playFallback = document.createElement('button');
    playFallback.type = 'button';
    playFallback.className = 'banner-play-fallback';
    playFallback.setAttribute('aria-label', 'Play video');
    playFallback.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    media.appendChild(playFallback);

    function showPlayFallback(){ playFallback.classList.add('is-visible'); }
    function hidePlayFallback(){ playFallback.classList.remove('is-visible'); }

    const playAttempt = video.play();
    if(playAttempt && typeof playAttempt.catch === 'function'){
      playAttempt.catch(showPlayFallback);
    }
    video.addEventListener('playing', hidePlayFallback);
    video.addEventListener('pause', ()=>{ if(!video.ended) showPlayFallback(); });
    playFallback.addEventListener('click', ()=>{
      video.play().then(hidePlayFallback).catch(()=>{});
    });
  })();

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

  // clicking "Request quote" on a service card pre-selects it in the booking form
  document.querySelectorAll('.sub-card .link[data-service]').forEach(link=>{
    link.addEventListener('click', ()=>{
      const select = document.getElementById('service');
      const wanted = link.dataset.service;
      for(const opt of select.options){
        if(opt.value === wanted || opt.text === wanted){ select.value = opt.value; break; }
      }
    });
  });

  // per-card photo slideshows: prev/next buttons cycle through that card's own
  // photos in place (no scrolling involved, just swapping which <img> shows)
  document.querySelectorAll('.thumb-slideshow').forEach(thumb=>{
    const photos = [...thumb.querySelectorAll('img')];
    const prevBtn = thumb.querySelector('.thumb-prev');
    const nextBtn = thumb.querySelector('.thumb-next');
    const dotsWrap = thumb.querySelector('.thumb-dots');
    if(photos.length <= 1){
      prevBtn?.classList.add('is-hidden');
      nextBtn?.classList.add('is-hidden');
      return;
    }

    if(dotsWrap){
      dotsWrap.innerHTML = photos.map((_, i)=>
        `<button type="button" aria-label="Go to photo ${i + 1}"></button>`
      ).join('');
    }
    const dots = dotsWrap ? [...dotsWrap.children] : [];

    let current = 0;
    function show(i){
      current = (i + photos.length) % photos.length;
      photos.forEach((p, pi)=> p.style.display = pi === current ? '' : 'none');
      dots.forEach((d, di)=> d.classList.toggle('active', di === current));
    }

    const AUTO_ADVANCE_MS = 3000;
    let timer = null;
    function startAuto(){
      stopAuto();
      timer = setInterval(()=> show(current + 1), AUTO_ADVANCE_MS);
    }
    function stopAuto(){
      if(timer) clearInterval(timer);
    }
    function userNav(i){
      show(i);
      startAuto(); // manual navigation resets the countdown instead of stacking on top of it
    }

    prevBtn?.addEventListener('click', (e)=>{ e.preventDefault(); userNav(current - 1); });
    nextBtn?.addEventListener('click', (e)=>{ e.preventDefault(); userNav(current + 1); });
    dots.forEach((dot, i)=> dot.addEventListener('click', (e)=>{ e.preventDefault(); userNav(i); }));

    thumb.addEventListener('mouseenter', stopAuto);
    thumb.addEventListener('mouseleave', startAuto);

    show(0);
    startAuto();
  });

  // booking form: validates, then opens WhatsApp pre-filled with the request
  // details so the visitor just needs to tap send — there's no way for a
  // browser to deliver a WhatsApp message silently without the paid
  // WhatsApp Business API, so this is the closest thing to "submit" that
  // actually reaches the business.
  const BOOKING_WHATSAPP_NUMBER = '971507917075';
  const bookForm = document.getElementById('bookForm');
  if(bookForm){
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const serviceSelect = document.getElementById('service');
    const notesInput = document.getElementById('notes');
    bookForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      let valid = true;
      const nameField = document.getElementById('nameField');
      const phoneField = document.getElementById('phoneField');
      const nameOk = !!nameInput.value.trim();
      const phoneOk = /^[0-9+()\s-]{7,}$/.test(phoneInput.value.trim());
      nameField.classList.toggle('has-error', !nameOk);
      phoneField.classList.toggle('has-error', !phoneOk);
      // mirror the visual error state for assistive tech
      nameInput.setAttribute('aria-invalid', String(!nameOk));
      phoneInput.setAttribute('aria-invalid', String(!phoneOk));
      if(!nameOk) valid = false;
      if(!phoneOk) valid = false;
      if(!valid){
        (nameField.classList.contains('has-error') ? nameInput : phoneInput).focus();
        return;
      }
      const lines = [
        'New booking request from the website:',
        '',
        `Name: ${nameInput.value.trim()}`,
        `Phone: ${phoneInput.value.trim()}`
      ];
      if(addressInput.value.trim()) lines.push(`Address: ${addressInput.value.trim()}`);
      if(serviceSelect.value) lines.push(`Service: ${serviceSelect.value}`);
      if(notesInput.value.trim()) lines.push(`Notes: ${notesInput.value.trim()}`);
      const waUrl = `https://wa.me/${BOOKING_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

      // opened synchronously, still inside the click's event handler — a delay
      // here (e.g. via setTimeout) risks the browser's popup blocker silently
      // killing it, since most browsers only allow popups tied directly to a
      // user gesture
      window.open(waUrl, '_blank', 'noopener');

      const submitBtn = bookForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Opening WhatsApp…';
      setTimeout(()=>{
        submitBtn.textContent = 'Request My Free Visit';
        submitBtn.disabled = false;
        bookForm.querySelector('.confirm').style.display = 'block';
        bookForm.reset();
      }, 400);
    });
    [nameInput, phoneInput].forEach(input=>{
      input.addEventListener('input', ()=>{
        input.closest('.field').classList.remove('has-error');
        input.setAttribute('aria-invalid', 'false');
      });
    });
  }

  /* ---------------- EN / AR TRANSLATION ---------------- */
  const AR = {
    "PROCRAFTX":"بروكرافتكس",
    "Services":"خدماتنا","FAQs":"الأسئلة الشائعة",
    "Book a Visit":"احجز زيارة",
    "Licensed · Insured · 7 specialties, 12 services":"مرخّص · مؤمَّن · 7 تخصصات، 12 خدمة",
    "All services.":"كل الخدمات.","In one.":"في مكان واحد.",
    "Core home maintenance, specialized furniture care, and full home clearing & sanitization — one trusted crew handles it all, with a flat quote before we start and a guarantee behind every job.":"الصيانة المنزلية الأساسية، والعناية المتخصصة بالأثاث، وتفريغ المنزل وتعقيمه بالكامل — فريق واحد موثوق يتولى كل شيء، بسعر واضح قبل البدء وضمان على كل عمل.",
    "Book a Free Visit":"احجز زيارة مجانية","See All Services":"استعرض جميع الخدمات",
    "Expert Crews":"فرق عمل محترفة","Licensed & background-checked":"مرخّصة وموثّقة الخلفية",
    "100% Guarantee":"ضمان 100%","Parts & labor covered":"القطع والعمالة مشمولة",
    "One team, every job":"فريق واحد لكل الأعمال",
    "24/7 Support":"دعم على مدار الساعة","Real people, real fast":"فريق حقيقي، استجابة سريعة",
    "Repairs completed":"إصلاح مكتمل","Typical arrival window":"وقت الوصول المعتاد","Services & specialties":"خدمات وتخصصات",
    "All Services In One":"كل الخدمات في مكان واحد","Our Services":"خدماتنا",
    "Our Specialties":"تخصصاتنا",
    "Specialties":"التخصصات",
    "Core Home Maintenance":"الصيانة المنزلية الأساسية",
    "The everyday repairs that keep your home running — AC, plumbing, electrical, handyman and painting, handled by trained pros.":"الإصلاحات اليومية التي تُبقي منزلك يعمل بسلاسة — تكييف، سباكة، كهرباء، صيانة عامة ودهانات، على يد فنيين مدربين.",
    "Air Conditioning (AC) Services":"خدمات تكييف الهواء",
    "Filters cleaned, gas refilled, and leaks fixed to keep your cooling efficient.":"تنظيف الفلاتر، تعبئة الغاز، وإصلاح التسريبات للحفاظ على كفاءة التبريد.",
    "AC Services":"خدمات التكييف",
    "Plumbing Support":"خدمات السباكة",
    "Pipe leaks repaired, drains unclogged, and fixtures like taps or toilets installed.":"إصلاح تسريبات الأنابيب، تسليك المصارف، وتركيب التجهيزات مثل الحنفيات والمراحيض.",
    "Electrical Work":"الأعمال الكهربائية",
    "Light fixtures mounted, faulty wiring fixed, and power sockets safely replaced.":"تركيب تجهيزات الإضاءة، إصلاح الأسلاك التالفة، واستبدال المقابس الكهربائية بأمان.",
    "Handyman Tasks":"أعمال الصيانة العامة",
    "Hanging shelves, mounting TVs, fixing door hinges, and small everyday repairs.":"تعليق الأرفف، تركيب شاشات التلفاز، إصلاح مفصلات الأبواب، وإصلاحات يومية بسيطة.",
    "Wall Painting & Masonry":"دهان الجدران والبناء",
    "Fresh wall coatings applied, drywall cracks repaired, and tile or brickwork fixed.":"طلاء جدران جديد، إصلاح شقوق الجدران الجصية، وإصلاح البلاط أو الطوب.",
    "Our Furniture Services":"خدمات الأثاث لدينا",
    "From deep cleans to full restoration — we take care of the furniture other companies won't touch.":"من التنظيف العميق إلى الترميم الكامل — نعتني بالأثاث الذي لا تلمسه شركات أخرى.",
    "Disassembly & Reassembly":"الفك وإعادة التركيب",
    "Heavy furniture safely taken apart for moving and put back together correctly.":"فك الأثاث الثقيل بأمان لنقله وإعادة تركيبه بشكل صحيح.",
    "Restoration & Furniture Painting":"ترميم ودهان الأثاث",
    "Old wooden furniture sanded, varnished, painted, or repaired to look brand new.":"صنفرة الأثاث الخشبي القديم وطلاؤه بالورنيش أو الدهان أو إصلاحه ليبدو جديدًا.",
    "Furniture Cleaning":"تنظيف الأثاث",
    "Specialized stain removal and steam cleaning for delicate leather, fabric and carpets.":"إزالة متخصصة للبقع وتنظيف بالبخار للجلد والأقمشة والسجاد الحساس.",
    "Home Clearing & Sanitization":"تفريغ المنزل والتعقيم",
    "Moving in, moving out, or just resetting the house — cleaning, clearing and pest-proofing in one call.":"سواء كنت تنتقل إلى منزل جديد أو تغادره أو ترغب في تجديد منزلك — تنظيف وتفريغ ومكافحة حشرات بمكالمة واحدة.",
    "Disinfection & Pest Management":"التعقيم ومكافحة الحشرات",
    "Eradicating bugs like bedbugs or ants, and sanitizing surfaces against bacteria.":"القضاء على الحشرات مثل بق الفراش والنمل، وتعقيم الأسطح من البكتيريا.",
    "Packers & Movers":"التغليف والنقل",
    "Securely wrapping your belongings, loading trucks, and transporting to a new home.":"تغليف ممتلكاتك بأمان، تحميلها على الشاحنات، ونقلها إلى المنزل الجديد.",
    "Home Cleaning":"تنظيف المنزل",
    "Routine dusting, vacuuming, mopping, and bathroom cleaning for standard upkeep.":"إزالة الغبار والتنظيف بالمكنسة الكهربائية والمسح وتنظيف الحمامات للصيانة الدورية.",
    "Water Tank Cleaning":"تنظيف خزانات المياه",
    "High-pressure cleaning and disinfection of overhead and underground water tanks to keep your supply safe.":"تنظيف وتعقيم بالضغط العالي لخزانات المياه العلوية والأرضية للحفاظ على سلامة مصدر المياه.",
    "Window & Glass Installations":"تركيبات النوافذ والزجاج",
    "Aluminium, uPVC, sliding, casement and double-glazed windows, plus shower glass — installed, replaced, or repaired for a durable, weather-tight fit.":"نوافذ الألمنيوم، واليو بي في سي، والسحّاب، والمفصلية، والمزدوجة الزجاج، بالإضافة إلى زجاج الحمام — تركيب واستبدال وإصلاح لضمان ثبات ومقاومة للعوامل الجوية.",
    "Home Window Installation":"تركيب نوافذ المنزل",
    "Shower Glass Replacement":"استبدال زجاج الحمام",
    "Cracked, foggy, or outdated shower glass replaced with a precise, watertight fit.":"استبدال زجاج الحمام المكسور أو الضبابي أو القديم بتركيب دقيق ومقاوم للماء.",
    "Home Window & Shower Glass Installation":"تركيب نوافذ المنزل وزجاج الحمام",
    "Installation, replacement, and repair of aluminium, uPVC, sliding, casement, and double-glazed windows, plus shower glass — built for durability, weather protection, and a watertight fit.":"تركيب واستبدال وإصلاح نوافذ الألمنيوم، واليو بي في سي، والسحّاب، والمفصلية، والمزدوجة الزجاج، بالإضافة إلى زجاج الحمام — مصممة لتدوم طويلاً وتحمي من العوامل الجوية وتمنع تسرب الماء.",
    "Outdoor Majlis Services":"خدمات المجالس الخارجية",
    "Custom-built glass majlis, traditional Arabic majlis, sandwich panel majlis, pergolas, and guest annexes — designed, built, and maintained from the ground up.":"مجالس زجاجية مخصصة، ومجالس عربية تقليدية، ومجالس بالألواح الساندويتش، وبرجولات، وملحقات ضيافة — تصميم وبناء وصيانة من الألف إلى الياء.",
    "Majlis Design, Construction & Renovation":"تصميم وبناء وتجديد المجالس",
    "Design, construction, renovation, and expansion of glass majlis, traditional Arabic majlis, sandwich panel majlis, pergolas, and guest annexes, including complete interior fit-out — custom seating, flooring, wall cladding, ceilings, lighting, curtains, insulation, and décor. Ongoing maintenance covers roof repairs, waterproofing, repainting, AC servicing, electrical and plumbing work, glass replacement, structural repairs, aluminium doors and windows, sliding glass systems, weatherproof enclosures, stone cladding, decorative façades, paving, boundary walls, and outdoor lighting — plus bespoke features like smart lighting, sound systems, fireplaces, coffee stations, TV units, and custom storage.":"تصميم وبناء وتجديد وتوسعة المجالس الزجاجية والمجالس العربية التقليدية ومجالس الألواح الساندويتش والبرجولات وملحقات الضيافة، بما في ذلك التجهيز الداخلي الكامل — مقاعد مخصصة، أرضيات، تكسية جدران، أسقف، إضاءة، ستائر، عزل، وديكور. تشمل الصيانة المستمرة إصلاح الأسقف، العزل المائي، إعادة الطلاء، صيانة التكييف، الأعمال الكهربائية والسباكة، استبدال الزجاج، الإصلاحات الإنشائية، أبواب ونوافذ الألمنيوم، أنظمة الزجاج المنزلق، الحواجز المقاومة للعوامل الجوية، تكسية الحجر، الواجهات الزخرفية، الرصف، الأسوار، والإضاءة الخارجية — بالإضافة إلى ميزات مخصصة مثل الإضاءة الذكية، أنظمة الصوت، المدافئ، محطات القهوة، وحدات التلفزيون، وحلول التخزين المخصصة.",
    "Outdoor Car Garage Construction":"إنشاء كراجات السيارات الخارجية",
    "Custom car garages, carports, parking shades, steel structures, aluminum garages, and sandwich panel garages for residential properties.":"كراجات سيارات مخصصة، ومظلات سيارات، ومظلات مواقف، وهياكل فولاذية، وكراجات ألمنيوم، وكراجات بألواح ساندويتش للعقارات السكنية.",
    "Custom Car Garage & Carport Construction":"إنشاء كراجات ومظلات سيارات مخصصة",
    "Design and build of custom car garages, carports, and parking shades — steel structures, aluminum garages, and sandwich panel garages built to protect vehicles and suit residential properties.":"تصميم وبناء كراجات سيارات ومظلات مواقف مخصصة — هياكل فولاذية، وكراجات ألمنيوم، وكراجات بألواح ساندويتش مصممة لحماية المركبات وتناسب العقارات السكنية.",
    "Residential Window Tinting":"تظليل نوافذ المنازل",
    "Heat-rejection, UV-blocking, privacy, security and decorative films — professionally applied to villa and apartment glass.":"أفلام عازلة للحرارة، وحاجبة للأشعة فوق البنفسجية، وأفلام الخصوصية والحماية والزخرفة — تُركّب باحترافية على زجاج الفلل والشقق.",
    "Home Window Film & Tinting":"أفلام وتظليل نوافذ المنزل",
    "Supply and installation of residential window films — heat-rejection and solar-control tint to cut cooling costs, UV-blocking film that stops furniture and flooring from fading, and glare-reduction film for bright rooms. Privacy options include one-way mirror, frosted, and decorative patterned film for bathrooms, partitions, and street-facing windows, plus safety and security film that holds glass together on impact. Every job includes glass preparation, precision cut-to-fit application, bubble-free finishing, and removal or replacement of old peeling tint.":"توريد وتركيب أفلام نوافذ المنازل — تظليل عازل للحرارة ومتحكم في أشعة الشمس لخفض تكاليف التبريد، وفيلم حاجب للأشعة فوق البنفسجية يمنع بهتان الأثاث والأرضيات، وفيلم مقلل للوهج للغرف شديدة الإضاءة. تشمل خيارات الخصوصية الفيلم العاكس أحادي الاتجاه، والفيلم المصنفر، والفيلم المزخرف للحمامات والفواصل والنوافذ المطلة على الشارع، بالإضافة إلى فيلم الأمان والحماية الذي يحافظ على تماسك الزجاج عند الارتطام. يشمل كل عمل تجهيز الزجاج، والقص الدقيق حسب المقاس، وتشطيبًا خاليًا من الفقاعات، وإزالة أو استبدال التظليل القديم المتقشر.",
    "Interior Design":"التصميم الداخلي",
    "Concept design, space planning, custom joinery and full styling — from a single room refresh to a complete home fit-out.":"تصميم المفهوم، وتخطيط المساحات، والنجارة المخصصة، والتنسيق الكامل — من تجديد غرفة واحدة إلى تجهيز منزل بالكامل.",
    "Interior Design & Fit-Out":"التصميم الداخلي والتجهيز",
    "Full interior design service covering concept development, space planning, and layout optimisation, with mood boards and 3D visuals so you can see the result before work begins. We handle material, finish and colour selection, flooring and wall treatments, false ceilings and gypsum work, lighting design, curtains and blinds, and custom joinery including wardrobes, TV units, and kitchen cabinetry. Delivery covers furniture sourcing and placement, décor and accessory styling, and complete supervised fit-out — for single rooms, majlis areas, or whole villas and apartments.":"خدمة تصميم داخلي متكاملة تشمل تطوير المفهوم، وتخطيط المساحات، وتحسين التوزيع، مع لوحات إلهام ومجسمات ثلاثية الأبعاد لترى النتيجة قبل بدء العمل. نتولى اختيار المواد والتشطيبات والألوان، ومعالجات الأرضيات والجدران، والأسقف المستعارة وأعمال الجبس، وتصميم الإضاءة، والستائر، والنجارة المخصصة بما فيها خزائن الملابس ووحدات التلفزيون وخزائن المطبخ. ويشمل التنفيذ توريد الأثاث وتوزيعه، وتنسيق الديكور والإكسسوارات، والتجهيز الكامل تحت إشراف متخصص — لغرفة واحدة أو مجلس أو فيلا وشقة بالكامل.",
    "Swimming Pool Construction & Design":"إنشاء وتصميم حمامات السباحة",
    "Custom pool design and construction, renovation and resurfacing, plus ongoing cleaning and equipment maintenance.":"تصميم وإنشاء حمامات سباحة مخصصة، وتجديد وإعادة تشطيب، بالإضافة إلى التنظيف الدوري وصيانة المعدات.",
    "Pool Design, Construction & Maintenance":"تصميم وإنشاء وصيانة حمامات السباحة",
    "End-to-end swimming pool projects — design and 3D planning, excavation, shell construction, waterproofing, and tiling or mosaic finishes, including infinity-edge, overflow, and plunge pool designs. Installation covers filtration and pump systems, heating and chilling units, underwater lighting, jacuzzis and water features, plus surrounding decking, coping stones, and landscaping. We also handle renovation and resurfacing of ageing pools, leak detection and structural repair, tile and grout replacement, and equipment upgrades — backed by scheduled maintenance covering cleaning, water testing and chemical balancing, and filter servicing.":"مشاريع حمامات سباحة متكاملة — التصميم والتخطيط ثلاثي الأبعاد، والحفر، وبناء الهيكل، والعزل المائي، وتشطيبات البلاط أو الفسيفساء، بما في ذلك تصاميم الحواف اللامتناهية والفائضة وأحواض الغطس. ويشمل التركيب أنظمة الفلترة والمضخات، ووحدات التسخين والتبريد، والإضاءة تحت الماء، والجاكوزي والنوافير، بالإضافة إلى الأسطح المحيطة وأحجار الحواف وتنسيق الحدائق. كما نتولى تجديد وإعادة تشطيب الحمامات القديمة، وكشف التسربات والإصلاحات الإنشائية، واستبدال البلاط والجَبَّانة، وترقية المعدات — مدعومة بصيانة دورية تشمل التنظيف وفحص المياه وموازنة المواد الكيميائية وصيانة الفلاتر.",
    "Landscaping & Gardening":"تنسيق الحدائق والبستنة",
    "Garden design and planting, automatic irrigation installation and repair, and regular upkeep to keep everything green year-round.":"تصميم الحدائق والزراعة، وتركيب وإصلاح أنظمة الري الأوتوماتيكية، وصيانة دورية للحفاظ على الخضرة طوال العام.",
    "Landscaping & Irrigation":"تنسيق الحدائق والري",
    "Complete garden and landscaping work — design and soft landscaping, natural lawns and artificial grass, tree, shrub and seasonal flower planting, plus hard landscaping such as pathways, pergolas, decking, and decorative gravel. Irrigation covers full system design and installation, automatic sprinkler and drip-line setup, smart timers and controllers, pump and valve fitting, and repair of leaks, blockages, and broken sprinkler heads. Ongoing maintenance includes mowing, hedge and tree trimming, weed and pest control, fertilisation, seasonal replanting, and irrigation system checks.":"أعمال حدائق وتنسيق متكاملة — التصميم والتنسيق الأخضر، والمسطحات الطبيعية والعشب الصناعي، وزراعة الأشجار والشجيرات والزهور الموسمية، بالإضافة إلى التنسيق الصلب مثل الممرات والبرجولات والأسطح الخشبية والحصى الزخرفي. ويشمل الري تصميم وتركيب النظام بالكامل، وتركيب الرشاشات الأوتوماتيكية وخطوط التنقيط، والمؤقتات وأجهزة التحكم الذكية، وتركيب المضخات والصمامات، وإصلاح التسربات والانسدادات ورؤوس الرشاشات التالفة. وتشمل الصيانة المستمرة قص العشب، وتشذيب الأسيجة والأشجار، ومكافحة الأعشاب والآفات، والتسميد، وإعادة الزراعة الموسمية، وفحص أنظمة الري.",
    "Request quote":"اطلب عرض سعر",
    "Mobile & on-demand":"خدمة متنقلة وفورية",
    "We come to you — same-week, most jobs same-visit.":"نأتي إليك — خلال نفس الأسبوع، ومعظم الأعمال تُنجز في نفس الزيارة.",
    "Book online or on WhatsApp, tell us what's wrong, and a fully equipped crew shows up ready to fix it. No waiting weeks for a callback.":"احجز عبر الإنترنت أو واتساب، أخبرنا بالمشكلة، ويصلك فريق مجهز بالكامل جاهز للإصلاح. بلا انتظار أسابيع لأحد يتصل بك.",
    "Chat on WhatsApp":"تواصل عبر واتساب",
    "Get Started":"ابدأ الآن",
    "Let's take a look before it becomes a bigger job.":"دعنا نلقي نظرة قبل أن تتفاقم المشكلة.",
    "Fill out the form and a real person will call to confirm your appointment — usually within the hour.":"املأ النموذج وسيتصل بك شخص حقيقي لتأكيد موعدك — عادةً خلال ساعة.",
    "WhatsApp us anytime":"راسلنا على واتساب في أي وقت",
    "We reply within one business day":"نرد خلال يوم عمل واحد",
    "Follow us on Instagram":"تابعنا على إنستقرام",
    "Follow us on Facebook":"تابعنا على فيسبوك",
    "Follow us on TikTok":"تابعنا على تيك توك",
    "Follow us on X":"تابعنا على إكس",
    "Full name":"الاسم الكامل","Phone / WhatsApp":"الهاتف / واتساب","Address":"العنوان",
    "Service needed":"الخدمة المطلوبة","What's going on?":"ما هي المشكلة؟",
    "Request My Free Visit":"اطلب زيارتي المجانية",
    "We've opened WhatsApp with your request filled in — just hit send to confirm your booking.":"لقد فتحنا واتساب مع طلبك جاهزًا — فقط اضغط إرسال لتأكيد حجزك.",
    "Please enter your name.":"يرجى إدخال اسمك.",
    "Please enter a valid phone number.":"يرجى إدخال رقم هاتف صحيح.",
    "Not sure yet":"غير متأكد بعد",
    "About Us":"من نحن",
    "One trusted crew for everything your home needs.":"فريق موثوق واحد لكل ما يحتاجه منزلك.",
    "Welcome to Procraftx! Our mission is to give every home in Dubai and Sharjah one trusted crew for everything it needs, instead of a different contractor for every job. We believe your home deserves the same care and attention to detail as any showroom — so our licensed, background-checked technicians handle it that way, backed by a 100% guarantee on every visit. Whether it's a leaking tap, a full furniture restoration, or a custom-built majlis, we quote fairly, show up on time, and get it right the first time.":"مرحبًا بك في بروكرافتكس! مهمتنا هي أن نمنح كل منزل في دبي والشارقة فريقًا موثوقًا واحدًا لكل ما يحتاجه، بدلاً من مقاول مختلف لكل مهمة. نؤمن أن منزلك يستحق نفس العناية والاهتمام بالتفاصيل التي يحظى بها أي صالة عرض — لذا يتعامل فنيونا المرخّصون والمدقّق في خلفياتهم بهذه الروح، مدعومين بضمان 100% على كل زيارة. سواء كانت حنفية تسرّب، أو ترميم أثاث كامل، أو مجلس مبني حسب الطلب، نقدّم عرض سعر عادل، ونصل في الوقت المحدد، وننجز العمل بشكل صحيح من أول مرة.",
    "Do you charge for the initial quote?":"هل تتقاضون رسومًا مقابل عرض السعر الأولي؟",
    "Are your technicians licensed and insured?":"هل الفنيون لديكم مرخّصون ومؤمَّنون؟",
    "What areas do you service?":"ما هي المناطق التي تغطونها؟",
    "How quickly can someone come out?":"ما مدى سرعة وصول أحد الفنيين؟",
    "How do I find out what a job will cost?":"كيف أعرف تكلفة عملي؟",
    "What payment methods do you accept?":"ما هي طرق الدفع التي تقبلونها؟",
    "No. The walkthrough and quote are free — you only pay once you approve the price, with no obligation to book with us afterward.":"لا. المعاينة وعرض السعر مجانيان — تدفع فقط بعد موافقتك على السعر، دون أي التزام بالحجز معنا لاحقًا.",
    "Yes. Every technician we send is licensed for their trade, background-checked, and covered by liability insurance, so you're protected from the first knock on the door.":"نعم. كل فني نرسله مرخّص في مجاله، وتم التحقق من خلفيته، ومغطى بتأمين المسؤولية، فأنت محمي منذ أول طرقة على الباب.",
    "We're based in Dubai and Sharjah, and also take jobs in Ajman and Abu Dhabi. There's no fixed service radius — call or WhatsApp us with your location and we'll confirm we can get a technician to you.":"نحن مقرّنا في دبي والشارقة، كما نغطي عجمان وأبوظبي أيضًا. لا يوجد نطاق خدمة محدد — اتصل بنا أو راسلنا على واتساب بموقعك وسنؤكد لك إمكانية وصول فني إليك.",
    "Most requests get an appointment within the same week, and many are same-visit once a technician is on site. Call or WhatsApp us and we'll give you the next available slot.":"تحصل معظم الطلبات على موعد خلال نفس الأسبوع، والعديد منها يُنجز في نفس الزيارة بمجرد وصول الفني. اتصل بنا أو راسلنا على واتساب وسنمنحك أقرب موعد متاح.",
    "Every home and job is different, so we don't publish flat rates. Send us the details on WhatsApp or by phone and we'll get back to you with a clear price before any work starts.":"كل منزل ومهمة مختلفان، لذا لا ننشر أسعارًا ثابتة. أرسل لنا التفاصيل عبر واتساب أو الهاتف وسنعود إليك بسعر واضح قبل بدء أي عمل.",
    "We accept cash, card, and bank transfer. You'll always see the price before we start, so there are no surprises on the invoice.":"نقبل الدفع النقدي والبطاقة والتحويل البنكي. سترى السعر دائمًا قبل أن نبدأ، فلا مفاجآت في الفاتورة.",
    "Learn More":"اعرف المزيد",
    "Skip to content":"تخطَّ إلى المحتوى"
  };

  const PLACEHOLDERS = [
    {id:'name', en:'Jordan Smith', ar:'مثال: أحمد محمد'},
    {id:'address', en:'Street, Area, City', ar:'الشارع، المنطقة، المدينة'},
    {id:'notes', en:"Tell us what you're noticing...", ar:'أخبرنا بما لاحظته...'}
  ];

  let i18nNodes = [];
  function collectI18nNodes(){
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.data || !node.data.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if(!p) return NodeFilter.FILTER_REJECT;
        if(p.closest('svg,script,style,#langToggle')) return NodeFilter.FILTER_REJECT;
        if(p.closest('.stats-grid .num')) return NodeFilter.FILTER_REJECT;
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
    const logoEl = document.querySelector('.logo');
    if(logoEl) logoEl.textContent = lang === 'ar' ? AR['PROCRAFTX'] : 'PROCRAFTX';
    document.querySelectorAll('optgroup[label]').forEach(og=>{
      const enLabel = og.dataset.enLabel || og.getAttribute('label');
      if(!og.dataset.enLabel) og.dataset.enLabel = enLabel;
      og.setAttribute('label', lang === 'ar' ? (AR[og.dataset.enLabel] || og.dataset.enLabel) : og.dataset.enLabel);
    });
    PLACEHOLDERS.forEach(p=>{
      const el = document.getElementById(p.id);
      if(el) el.placeholder = lang === 'ar' ? p.ar : p.en;
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
  // wait one tick so the marquee (built above) is already in the DOM before we capture original text
  setTimeout(()=>{
    i18nNodes = collectI18nNodes();
  }, 0);
  langToggle.addEventListener('click', ()=>{
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    if(!i18nNodes.length) i18nNodes = collectI18nNodes();
    applyLang(currentLang);
  });
