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
