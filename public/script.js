// =============================================
// ABIOLA LAWAL PORTFOLIO — script.js
// =============================================

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

// MOBILE MENU
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const mmLinks = document.querySelectorAll('.mm-link, .mm-btn');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

mmLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// SKILLS TABS
const tabBtns = document.querySelectorAll('.tab-btn');
const skillTiles = document.querySelectorAll('.skill-tile');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.tab;
    skillTiles.forEach(tile => {
      if (cat === 'all' || tile.dataset.cat === cat) {
        tile.classList.remove('hidden');
      } else {
        tile.classList.add('hidden');
      }
    });
  });
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll(
  '.timeline-item, .project-card, .cert-card, .skill-tile, .contact-card, .about-grid > *, .stat-item'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * (entry.target.dataset.revealDelay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.dataset.revealDelay = i % 6;
  revealObserver.observe(el);
});

// CONTACT FORM (Formspree fallback — replace with actual endpoint)
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit span');
  btn.textContent = 'Sending...';
  formMsg.textContent = '';
  formMsg.className = 'form-msg';

  const data = Object.fromEntries(new FormData(contactForm));

  // Replace with your actual form endpoint (Formspree, Netlify, etc.)
  // For Formspree: https://formspree.io/f/YOUR_FORM_ID
  const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID';

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      formMsg.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formMsg.className = 'form-msg';
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch {
    formMsg.textContent = '✗ Something went wrong. Email me directly at infra@abiolalawal.com';
    formMsg.className = 'form-msg error';
  } finally {
    btn.textContent = 'Send Message';
  }
});

// ACTIVE NAV LINK on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));
