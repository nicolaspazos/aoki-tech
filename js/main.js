/* Aoki Tech — homepage scripts */
(function () {
  'use strict';

  /* ============================================================
     i18n — Spanish (source) + English
     ============================================================ */
  const TRANS = {
    es: {
      'meta.title': 'Aoki Tech | Tu Agente de IA que vende por vos 24/7',
      'meta.description': 'Aoki Tech es la plataforma líder en automatización conversacional con IA para LATAM. Creá tu Agente de IA en minutos y convertí visitantes en clientes 24/7 por WhatsApp, Instagram y Messenger.',
      'nav.steps': 'Cómo funciona',
      'nav.clients': 'Clientes',
      'nav.pricing': 'Precios',
      'nav.login': 'Iniciar sesión',
      'nav.demo': 'Agendá una demo',
      'nav.cta': 'Creá tu Agente IA',

      'hero.eyebrow': 'Meta Business Partner · Powered by GPT & Gemini',
      'hero.title': '<span class="row"><span class="word">Tu <span class="accent">agente de IA</span></span></span><span class="row"><span class="word">que vende</span></span><span class="row"><span class="word">por vos <span class="accent-alt">24/7.</span></span></span>',
      'hero.lede': 'Automatizá conversaciones por WhatsApp e Instagram, agendá reuniones, enviá archivos y cerrá ventas mientras dormís. Entrenado para tu negocio en minutos, sin código.',
      'hero.cta1': 'Probalo Gratis',
      'hero.cta2': 'Ver funciones',
      'hero.stat1Label': 'Horas ahorradas',
      'hero.stat2Label': 'Más facturación',
      'hero.stat3Label': 'Atención sin pausa',

      'chat.title': 'La Primera Café',
      'chat.status': 'En línea · Agente IA',
      'chat.b1': 'Hola! Quiero el menú del día 🍽️',
      'chat.b2': '¡Hola! Por supuesto, te paso el menú de hoy 👇',
      'chat.fileName': 'Menú-Almuerzo.pdf',
      'chat.fileMeta': '128 KB · PDF',
      'chat.b3': '¿Lo preparan para retirar?',
      'chat.b4': '¡Dale! ¿Para qué hora lo querés? Tenemos turnos desde las 12:00 🕛',
      'chat.input': 'Escribí un mensaje…',

      'badge1.title': 'Respuestas automáticas',
      'badge1.sub': '98.5% resueltas por IA',
      'badge2.title': 'Respuesta < 2 seg',
      'badge2.sub': 'Sin filas, sin esperas',

      'clients.heading': '+300 Clientes ya confían en nosotros',

      'partner.eyebrow': 'Reconocidos por Meta',
      'partner.title': 'Obtuvimos la insignia de <span class="grad-text">Meta Business Partner</span>',
      'partner.body': 'Un hito que valida nuestra tecnología, nuestro equipo y nuestra visión. Aoki es uno de los pocos partners certificados de WhatsApp Business en Latinoamérica.',

      'features.eyebrow': 'Todo lo que puede hacer',
      'features.title': 'Una sola IA que reemplaza<br>a un equipo entero.',
      'features.lede': 'Optimizá cada interacción y escalá tu negocio con herramientas diseñadas para crecer sin esfuerzo. Tu Agente IA atiende, vende, agenda y reporta sin que muevas un dedo.',
      'features.f1.title': 'Responde 24/7',
      'features.f1.desc': 'Atención inmediata a cualquier hora del día, todos los días del año. Nunca más pierdas un lead por falta de respuesta.',
      'features.f2.title': 'Integración con Tienda Nube',
      'features.f2.desc': 'Conectá tu tienda online y dejá que la IA gestione consultas, stock, envíos y seguimiento de pedidos automáticamente.',
      'features.f3.title': 'Notificaciones automáticas',
      'features.f3.desc': 'Recibí alertas y reportes en tiempo real sobre el rendimiento de tu agente, conversiones y conversaciones críticas.',
      'features.f4.title': 'Lee y escribe en Google Sheets',
      'features.f4.desc': 'Sincronizá datos automáticamente y actualizá tu base en tiempo real. Tu CRM siempre limpio, sin trabajo manual.',
      'features.f5.title': 'Agenda en Google Calendar',
      'features.f5.desc': 'Sincroniza reuniones, recordatorios y citas con tu calendario. Sin doble agenda, sin pisotones, sin olvidos.',
      'features.f6.title': 'Campañas de envíos masivos',
      'features.f6.desc': 'Alcanzá a toda tu audiencia con un solo clic. Promociones, recordatorios, novedades — segmentadas y personalizadas.',
      'features.f7.title': 'Métricas claras',
      'features.f7.desc': 'Dashboard con KPIs accionables: tasa de respuesta, conversión, ventas, satisfacción. Decisiones basadas en datos.',
      'features.f8.title': 'Envío de archivos',
      'features.f8.desc': 'Tu agente comparte PDFs, catálogos, fotos y videos al instante. Catálogo siempre a mano, sin intervención humana.',
      'features.f9.title': 'Cierra ventas',
      'features.f9.desc': 'Entrenado para acompañar al cliente desde el primer mensaje hasta el pago. Calificá leads y convertí más.',
      'features.f10.title': 'Todos tus chats en un panel',
      'features.f10.desc': 'Unificá WhatsApp, Instagram, Messenger y Webchat en un solo inbox. Tu equipo no se pierde ningún mensaje.',
      'features.f11.title': 'Seguimiento automático',
      'features.f11.desc': 'El agente recupera carritos abandonados, reactiva clientes inactivos y hace follow-up sin que lo pidas.',
      'features.f12.title': 'Recordatorios automáticos',
      'features.f12.desc': 'Citas, pagos pendientes, renovaciones, eventos. Tu IA recuerda lo que tus clientes olvidan.',

      'steps.eyebrow': 'Cómo funciona',
      'steps.title': 'Tres pasos<br>para crear<br>tu Agente IA.',
      'steps.lede': 'Configurá tu Agente IA en minutos y empezá a convertir visitantes en clientes automáticamente. Sin código, sin instalaciones, sin complicaciones.',
      'steps.cta': 'Creá tu Agente IA',
      'steps.s1.title': 'Conectalo a tus redes',
      'steps.s1.desc': 'Integrá WhatsApp, Instagram y tu sitio web en un solo lugar. Conexión en menos de 5 minutos, sin tocar una sola línea de código.',
      'steps.s2.title': 'Dale una personalidad',
      'steps.s2.desc': 'Definí su tono, su estilo, sus respuestas. Cargá tu menú, tu catálogo, tus preguntas frecuentes. Hablará como vos, pero mejor.',
      'steps.s3.title': 'Cerrá más ventas',
      'steps.s3.desc': 'Entrenalo para vender, para agendar, para cobrar. Mientras dormís, el agente trabaja, califica leads y convierte conversaciones en clientes.',

      'pricing.eyebrow': 'Planes',
      'pricing.title': 'Planes que crecen<br>con tu negocio.',
      'pricing.lede': 'Elegí el plan ideal para automatizar tus mensajes y atender más clientes sin esfuerzo. Cancelás cuando quieras.',
      'pricing.basic.name': 'Básico',
      'pricing.basic.desc': 'Ideal para emprendedores que quieren automatizar tareas y brindar atención rápida.',
      'pricing.basic.unit': 'USD / mes',
      'pricing.basic.f1': '1.000 mensajes / mes',
      'pricing.basic.f2': '1 canal (WhatsApp o Instagram)',
      'pricing.basic.f3': 'Google Sheets',
      'pricing.basic.f4': 'Google Calendar',
      'pricing.basic.f5': 'Integraciones externas',
      'pricing.basic.f6': 'Soporte por WhatsApp',
      'pricing.basic.f7': '2 hs de capacitación',
      'pricing.basic.cta': 'Empezar ahora',
      'pricing.full.tag': 'Más popular',
      'pricing.full.name': 'Full',
      'pricing.full.desc': 'Para empresas en crecimiento que buscan escalar sin límites y optimizar su rendimiento.',
      'pricing.full.unit': 'USD / mes',
      'pricing.full.f1': '5.000 mensajes / mes',
      'pricing.full.f2': '3 canales activos',
      'pricing.full.f3': 'Google Sheets',
      'pricing.full.f4': 'Google Calendar',
      'pricing.full.f5': 'Métricas avanzadas',
      'pricing.full.f6': 'Soporte prioritario',
      'pricing.full.f7': '1 h de capacitación mensual',
      'pricing.full.cta': 'Empezar ahora',
      'pricing.custom.name': 'Custom',
      'pricing.custom.desc': 'Soluciones a medida para empresas que necesitan máxima personalización e integraciones.',
      'pricing.custom.priceNum': 'A medida',
      'pricing.custom.unit': 'consultá',
      'pricing.custom.f1': '> 5.000 mensajes / mes',
      'pricing.custom.f2': 'Más de 3 canales',
      'pricing.custom.f3': 'Integraciones externas (CRM, ERP)',
      'pricing.custom.f4': 'Workflows personalizados',
      'pricing.custom.f5': 'Atención personalizada',
      'pricing.custom.f6': 'Capacitación a medida',
      'pricing.custom.f7': 'Success manager dedicado',
      'pricing.custom.cta': 'Hablemos',
      'pricing.note': 'Todos los planes incluyen soporte técnico y actualizaciones gratuitas.',

      'cta.eyebrow': 'Empezá hoy',
      'cta.title': '¿Listo para transformar la<br>manera en que vendés online?',
      'cta.lede': 'Unite a miles de empresas que ya están automatizando sus conversaciones con IA y multiplicando sus ventas. Sin tarjeta. Sin compromiso.',
      'cta.namePh': 'Tu nombre',
      'cta.emailPh': 'Email de trabajo',
      'cta.btn': 'Probar mi Agente IA',
      'cta.f1': 'Setup gratis',
      'cta.f2': 'Sin tarjeta',
      'cta.f3': 'Cancelás cuando quieras',

      'footer.tagline': 'La plataforma líder en automatización conversacional con IA para LATAM. Hacemos que tus conversaciones vendan por vos, 24/7.',
      'footer.providersLabel': 'IA potenciada por',
      'footer.product': 'Producto',
      'footer.support': 'Soporte',
      'footer.company': 'Empresa',
      'footer.p1': 'Funciones',
      'footer.p2': 'Precios',
      'footer.p3': 'Cómo funciona',
      'footer.p4': 'Clientes',
      'footer.s1': 'Centro de ayuda',
      'footer.s2': 'Contacto',
      'footer.s3': 'Estado del servicio',
      'footer.c1': 'Acerca de',
      'footer.c2': 'Blog',
      'footer.c3': 'Bases y condiciones',
      'footer.legal': '© <span id="year"></span> Aoki Tech. Todos los derechos reservados. · Términos · Privacidad'
    },

    en: {
      'meta.title': 'Aoki Tech | Your AI Agent that sells for you 24/7',
      'meta.description': "Aoki Tech is Latin America's leading AI conversational automation platform. Create your AI Agent in minutes and convert visitors into customers 24/7 via WhatsApp, Instagram and Messenger.",
      'nav.steps': 'How it works',
      'nav.clients': 'Clients',
      'nav.pricing': 'Pricing',
      'nav.login': 'Log in',
      'nav.demo': 'Book a demo',
      'nav.cta': 'Create your AI Agent',

      'hero.eyebrow': 'Meta Business Partner · Powered by GPT & Gemini',
      'hero.title': '<span class="row"><span class="word">Your <span class="accent">AI agent</span></span></span><span class="row"><span class="word">that sells</span></span><span class="row"><span class="word">for you <span class="accent-alt">24/7.</span></span></span>',
      'hero.lede': 'Automate conversations on WhatsApp and Instagram, book meetings, send files and close sales while you sleep. Trained for your business in minutes, no code required.',
      'hero.cta1': 'Try it Free',
      'hero.cta2': 'See features',
      'hero.stat1Label': 'Hours saved',
      'hero.stat2Label': 'More revenue',
      'hero.stat3Label': 'Always on',

      'chat.title': 'La Primera Café',
      'chat.status': 'Online · AI Agent',
      'chat.b1': "Hi! I'd like today's menu 🍽️",
      'chat.b2': "Hi there! Sure, here's today's menu 👇",
      'chat.fileName': 'Lunch-Menu.pdf',
      'chat.fileMeta': '128 KB · PDF',
      'chat.b3': 'Can you have it ready for pickup?',
      'chat.b4': 'Of course! What time would you like? Slots available from 12:00 🕛',
      'chat.input': 'Type a message…',

      'badge1.title': 'Automated replies',
      'badge1.sub': '98.5% resolved by AI',
      'badge2.title': 'Reply in < 2 sec',
      'badge2.sub': 'No queues, no waits',

      'clients.heading': '+300 Clients already trust us',

      'partner.eyebrow': 'Recognized by Meta',
      'partner.title': 'We earned the <span class="grad-text">Meta Business Partner</span> badge',
      'partner.body': 'A milestone that validates our technology, our team and our vision. Aoki is one of the few certified WhatsApp Business partners in Latin America.',

      'features.eyebrow': 'Everything it can do',
      'features.title': 'One AI that replaces<br>an entire team.',
      'features.lede': "Optimize every interaction and scale your business with tools designed for effortless growth. Your AI Agent answers, sells, schedules and reports — without you lifting a finger.",
      'features.f1.title': 'Replies 24/7',
      'features.f1.desc': 'Instant attention at any hour, every day of the year. Never lose a lead because nobody answered.',
      'features.f2.title': 'Tienda Nube integration',
      'features.f2.desc': 'Connect your online store and let the AI handle inquiries, stock, shipping and order tracking automatically.',
      'features.f3.title': 'Automated notifications',
      'features.f3.desc': "Get real-time alerts and reports on your agent's performance, conversions and critical conversations.",
      'features.f4.title': 'Reads & writes Google Sheets',
      'features.f4.desc': 'Sync data automatically and update your records in real time. Your CRM always clean, with no manual work.',
      'features.f5.title': 'Books in Google Calendar',
      'features.f5.desc': 'Sync meetings, reminders and appointments with your calendar. No double bookings, no clashes, no forgotten dates.',
      'features.f6.title': 'Mass-message campaigns',
      'features.f6.desc': 'Reach your entire audience with a single click. Promotions, reminders, news — segmented and personalized.',
      'features.f7.title': 'Clear metrics',
      'features.f7.desc': 'Dashboard with actionable KPIs: response rate, conversion, sales, satisfaction. Data-driven decisions.',
      'features.f8.title': 'File sharing',
      'features.f8.desc': 'Your agent shares PDFs, catalogs, photos and videos instantly. Catalog always at hand, no human intervention.',
      'features.f9.title': 'Closes sales',
      'features.f9.desc': 'Trained to walk customers from first message to checkout. Qualify leads and convert more.',
      'features.f10.title': 'All chats in one inbox',
      'features.f10.desc': 'Unify WhatsApp, Instagram, Messenger and Web chat in a single inbox. Your team never misses a message.',
      'features.f11.title': 'Automatic follow-up',
      'features.f11.desc': 'The agent recovers abandoned carts, re-activates inactive customers and follows up without you asking.',
      'features.f12.title': 'Automatic reminders',
      'features.f12.desc': 'Appointments, pending payments, renewals, events. Your AI remembers what your customers forget.',

      'steps.eyebrow': 'How it works',
      'steps.title': 'Three steps<br>to create<br>your AI Agent.',
      'steps.lede': 'Set up your AI Agent in minutes and start converting visitors into customers automatically. No code, no installs, no headaches.',
      'steps.cta': 'Create your AI Agent',
      'steps.s1.title': 'Connect your channels',
      'steps.s1.desc': 'Integrate WhatsApp, Instagram and your website in one place. Connection in less than 5 minutes, without touching a single line of code.',
      'steps.s2.title': 'Give it a personality',
      'steps.s2.desc': 'Define its tone, its style, its replies. Upload your menu, your catalog, your FAQs. It will speak like you, but better.',
      'steps.s3.title': 'Close more sales',
      'steps.s3.desc': 'Train it to sell, to schedule, to charge. While you sleep, the agent works, qualifies leads and turns conversations into customers.',

      'pricing.eyebrow': 'Plans',
      'pricing.title': 'Plans that grow<br>with your business.',
      'pricing.lede': 'Pick the plan that automates your messages and lets you serve more customers without effort. Cancel anytime.',
      'pricing.basic.name': 'Basic',
      'pricing.basic.desc': 'Perfect for entrepreneurs who want to automate tasks and offer fast support.',
      'pricing.basic.unit': 'USD / month',
      'pricing.basic.f1': '1,000 messages / month',
      'pricing.basic.f2': '1 channel (WhatsApp or Instagram)',
      'pricing.basic.f3': 'Google Sheets',
      'pricing.basic.f4': 'Google Calendar',
      'pricing.basic.f5': 'External integrations',
      'pricing.basic.f6': 'WhatsApp support',
      'pricing.basic.f7': '2 hours of training',
      'pricing.basic.cta': 'Start now',
      'pricing.full.tag': 'Most popular',
      'pricing.full.name': 'Full',
      'pricing.full.desc': 'For growing companies that want to scale without limits and optimize their performance.',
      'pricing.full.unit': 'USD / month',
      'pricing.full.f1': '5,000 messages / month',
      'pricing.full.f2': '3 active channels',
      'pricing.full.f3': 'Google Sheets',
      'pricing.full.f4': 'Google Calendar',
      'pricing.full.f5': 'Advanced metrics',
      'pricing.full.f6': 'Priority support',
      'pricing.full.f7': '1 hour of training per month',
      'pricing.full.cta': 'Start now',
      'pricing.custom.name': 'Custom',
      'pricing.custom.desc': 'Tailor-made solutions for businesses that need maximum personalization and integrations.',
      'pricing.custom.priceNum': 'Custom',
      'pricing.custom.unit': "let's talk",
      'pricing.custom.f1': '> 5,000 messages / month',
      'pricing.custom.f2': 'More than 3 channels',
      'pricing.custom.f3': 'External integrations (CRM, ERP)',
      'pricing.custom.f4': 'Custom workflows',
      'pricing.custom.f5': 'White-glove support',
      'pricing.custom.f6': 'Tailored training',
      'pricing.custom.f7': 'Dedicated success manager',
      'pricing.custom.cta': "Let's talk",
      'pricing.note': 'Every plan includes technical support and free updates.',

      'cta.eyebrow': 'Start today',
      'cta.title': 'Ready to transform how<br>you sell online?',
      'cta.lede': 'Join thousands of companies already automating their conversations with AI and multiplying their sales. No card. No commitment.',
      'cta.namePh': 'Your name',
      'cta.emailPh': 'Work email',
      'cta.btn': 'Try my AI Agent',
      'cta.f1': 'Free setup',
      'cta.f2': 'No card',
      'cta.f3': 'Cancel anytime',

      'footer.tagline': "Latin America's leading platform for AI-powered conversational automation. We make your conversations sell for you, 24/7.",
      'footer.providersLabel': 'AI powered by',
      'footer.product': 'Product',
      'footer.support': 'Support',
      'footer.company': 'Company',
      'footer.p1': 'Features',
      'footer.p2': 'Pricing',
      'footer.p3': 'How it works',
      'footer.p4': 'Clients',
      'footer.s1': 'Help center',
      'footer.s2': 'Contact',
      'footer.s3': 'Service status',
      'footer.c1': 'About',
      'footer.c2': 'Blog',
      'footer.c3': 'Terms & conditions',
      'footer.legal': '© <span id="year"></span> Aoki Tech. All rights reserved. · Terms · Privacy'
    }
  };

  function applyLang(lang) {
    const dict = TRANS[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (dict[k] !== undefined) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.dataset.i18nHtml;
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.dataset.i18nPlaceholder;
      if (dict[k] !== undefined) el.placeholder = dict[k];
    });
    if (dict['meta.title']) document.title = dict['meta.title'];
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && dict['meta.description']) descMeta.setAttribute('content', dict['meta.description']);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'es_AR');
    const animateLogos = document.documentElement.classList.contains('lang-switching');
    document.querySelectorAll('img[data-logo-swap]').forEach(img => {
      const next = img.dataset['logo' + (lang === 'en' ? 'En' : 'Es')];
      if (!next || img.getAttribute('src') === next) return;
      if (!animateLogos) {
        img.setAttribute('src', next);
        return;
      }
      img.classList.add('is-swapping');
      const swap = () => {
        img.setAttribute('src', next);
        const reveal = () => img.classList.remove('is-swapping');
        if (img.decode) {
          img.decode().then(reveal).catch(reveal);
        } else {
          img.addEventListener('load', reveal, { once: true });
        }
      };
      // Wait for the fade-out to mostly complete before swapping the source
      setTimeout(swap, 220);
    });
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ============================================================
     Header: scroll state
     ============================================================ */
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

  /* ============================================================
     Mobile nav toggle
     ============================================================ */
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

  /* ============================================================
     Reveal on scroll
     ============================================================ */
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

  /* ============================================================
     Capability card spotlight
     ============================================================ */
  document.querySelectorAll('.cap-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  /* ============================================================
     Count-up stats
     ============================================================ */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const prefix = el.textContent.trim().startsWith('+') ? '+' : '';
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

  /* ============================================================
     3D mouse tilt (phone)
     ============================================================ */
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
  attachTilt(document.querySelector('.phone-frame'), 5);

  /* ============================================================
     Theme toggle
     ============================================================ */
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

  /* ============================================================
     Language toggle
     ============================================================ */
  const langToggle = document.getElementById('lang-toggle');

  let langSwitchBusy = false;
  function setLang(lang, animate) {
    const root = document.documentElement;
    if (root.dataset.lang === lang && animate) return;
    if (langSwitchBusy && animate) return; // ignore rapid re-clicks
    if (langToggle) langToggle.dataset.active = lang;

    if (!animate) {
      applyLang(lang);
      return;
    }

    langSwitchBusy = true;

    // Reset any in-flight ribbons by clearing the class first
    root.classList.remove('lang-running');
    delete root.dataset.switchingTo;
    // Force reflow so the next class addition restarts CSS animations cleanly
    void root.offsetWidth;

    // Now set the target-lang palette attr and the running class — both stay on
    // for the FULL duration of the ribbon animation (1.4s)
    root.dataset.switchingTo = lang;
    void root.offsetWidth;
    root.classList.add('lang-switching');
    root.classList.add('lang-running');

    // Mid-animation: swap the page text
    setTimeout(() => {
      applyLang(lang);
      try { localStorage.setItem('aoki-lang', lang); } catch (e) {}
    }, 360);

    // Page fade-back-in
    setTimeout(() => {
      root.classList.remove('lang-switching');
    }, 400);

    // Ribbon animation finishes ~1.4s in (1.2s anim + 0.2s last-stripe delay)
    setTimeout(() => {
      root.classList.remove('lang-running');
      delete root.dataset.switchingTo;
      langSwitchBusy = false;
    }, 1500);
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.dataset.lang || 'es';
      setLang(current === 'es' ? 'en' : 'es', true);
    });
  }

  // Initial language: from localStorage (set by bootstrap script) or default 'es'
  let initialLang = 'es';
  try {
    const stored = localStorage.getItem('aoki-lang');
    if (stored === 'en' || stored === 'es') initialLang = stored;
  } catch (e) {}
  setLang(initialLang, false);

  /* ============================================================
     Chat replay loop + platform tabs
     ============================================================ */
  const chatBody = document.getElementById('chat-body');
  const phoneFrame = document.querySelector('.phone-frame');
  let chatBubbles = [];
  if (chatBody) chatBubbles = Array.from(chatBody.querySelectorAll('.bubble'));
  function replayChat() {
    chatBubbles.forEach(b => {
      b.style.animationName = 'none';
      void b.offsetWidth;
      b.style.animationName = '';
    });
  }
  if (chatBody) setInterval(replayChat, 8500);

  // Platform tabs
  const chatTabs = document.querySelectorAll('.chat-tab');
  if (chatTabs.length && phoneFrame) {
    chatTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const platform = tab.dataset.platform;
        if (!platform || phoneFrame.dataset.platform === platform) return;
        chatTabs.forEach(t => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        phoneFrame.dataset.platform = platform;
        replayChat();
      });
    });
  }

  /* ============================================================
     Footer year (also re-set after lang switch)
     ============================================================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     Smooth anchor scroll
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
