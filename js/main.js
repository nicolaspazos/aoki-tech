/* Aoki Tech — homepage scripts */
(function () {
  'use strict';

  /* ============= Header: scroll state ============= */
  const header = document.getElementById('site-header');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============= Mobile nav toggle ============= */
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============= Reveal on scroll ============= */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ============= Capability card spotlight ============= */
  const capCards = document.querySelectorAll('.cap-card');
  capCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  /* ============= Count-up stats ============= */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const prefix = el.textContent.startsWith('+') ? '+' : '';
        const duration = 1600;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = prefix + Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  }

  /* ============= 3D mouse tilt (reusable) ============= */
  function attachTilt(el, maxTilt) {
    if (!el) return;
    let raf = null;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (x - 0.5) * (maxTilt * 2);
      const ry = (0.5 - y) * (maxTilt * 2);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.classList.add('is-tilting');
        el.style.setProperty('--rx', rx + 'deg');
        el.style.setProperty('--ry', ry + 'deg');
      });
    });
    el.addEventListener('mouseleave', () => {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }

  // Phone gets a subtle tilt
  attachTilt(document.querySelector('.phone-frame'), 5);

  /* ============= Theme toggle ============= */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const root = document.documentElement;
    const setPressed = () => {
      themeToggle.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
    };
    setPressed();
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('aoki-theme', next); } catch (e) {}
      setPressed();
    });
  }

  /* ============= Chat replay loop ============= */
  const chatBody = document.getElementById('chat-body');
  if (chatBody) {
    const bubbles = chatBody.querySelectorAll('.bubble');
    const replay = () => {
      bubbles.forEach(b => {
        b.style.animation = 'none';
        // force reflow
        void b.offsetWidth;
        b.style.animation = '';
      });
    };
    // Replay every ~10s after the initial intro
    setInterval(replay, 12000);
  }

  /* ============= Footer year ============= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============= Smooth anchor offset ============= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
