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
    {n:'Water Tank Cleaning', d:'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6'},
    {n:'Custom Furniture Design & Build', d:'M4 18v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M4 18v3M20 18v3M2 18h20M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4'}
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
      const isAr = document.documentElement.lang === 'ar';
      muteBtn.setAttribute('aria-label', muted ? (isAr ? 'تشغيل صوت الفيديو' : 'Unmute video') : (isAr ? 'كتم صوت الفيديو' : 'Mute video'));
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
    playFallback.setAttribute('aria-label', document.documentElement.lang === 'ar' ? 'تشغيل الفيديو' : 'Play video');
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

  // clicking "Request quote" on a service card pre-selects it in the booking form.
  // matches any [data-service] element so it works for both the text links on
  // regular cards and the CTA button on the text-only catch-all card
  document.querySelectorAll('.sub-card [data-service]').forEach(link=>{
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
      const isAr = document.documentElement.lang === 'ar';
      const labels = isAr
        ? {intro:'طلب حجز جديد من الموقع:', name:'الاسم', phone:'الهاتف', address:'العنوان', service:'الخدمة', notes:'ملاحظات'}
        : {intro:'New booking request from the website:', name:'Name', phone:'Phone', address:'Address', service:'Service', notes:'Notes'};
      const lines = [
        labels.intro,
        '',
        `${labels.name}: ${nameInput.value.trim()}`,
        `${labels.phone}: ${phoneInput.value.trim()}`
      ];
      if(addressInput.value.trim()) lines.push(`${labels.address}: ${addressInput.value.trim()}`);
      if(serviceSelect.value) lines.push(`${labels.service}: ${serviceSelect.value}`);
      if(notesInput.value.trim()) lines.push(`${labels.notes}: ${notesInput.value.trim()}`);
      const waUrl = `https://wa.me/${BOOKING_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

      // opened synchronously, still inside the click's event handler — a delay
      // here (e.g. via setTimeout) risks the browser's popup blocker silently
      // killing it, since most browsers only allow popups tied directly to a
      // user gesture
      window.open(waUrl, '_blank', 'noopener');

      const submitBtn = bookForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = isAr ? 'جارٍ فتح واتساب…' : 'Opening WhatsApp…';
      setTimeout(()=>{
        submitBtn.textContent = isAr ? 'اطلب زيارتي المجانية' : 'Request My Free Visit';
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

  // language toggle: this page is single-language (Arabic content lives at
  // genuinely separate /ar/ URLs so search engines can index it, instead of
  // an in-place JS swap), so the button just navigates to the matching page
  // in the other language.
  const langToggle = document.getElementById('langToggle');
  const isArPage = document.documentElement.lang === 'ar';
  const isFaqPage = /faq\.html$/.test(location.pathname);
  langToggle.addEventListener('click', ()=>{
    location.href = isArPage ? (isFaqPage ? '../faq.html' : '../') : (isFaqPage ? 'ar/faq.html' : 'ar/');
  });
