/**
 * Neelkantha Stabilizers – main.js
 * ES6 Vanilla JavaScript for interactive UI elements.
 *
 * Covers:
 *  1. Mobile navigation toggle
 *  2. Sticky header style on scroll
 *  3. Active nav-link highlight on scroll
 *  4. Product gallery filter (Air Cooled / Oil Cooled / 3-Phase)
 *  5. Product detail modal (content swap, no page reload)
 *  6. Contact form validation
 *  7. Counter animation (hero stats)
 *  8. Scroll-reveal animation
 *  9. Back-to-top button
 * 10. Footer "filter target" links
 * 11. Current year in footer
 */

'use strict';

/* ================================================
   PRODUCT DATA
   ================================================ */
const PRODUCT_DATA = {
  'ac-1': {
    id: 'ac-1',
    name: 'NKS-AC 500VA',
    category: 'Air Cooled',
    categoryKey: 'air-cooled',
    icon: 'fa-solid fa-wind',
    tagline: 'Compact protection for home appliances – reliable, silent, and efficient.',
    specs: [
      ['Capacity',          '500 VA / 400 W'],
      ['Input Voltage',     '140 V – 280 V AC'],
      ['Output Voltage',    '220 V ± 1%'],
      ['Phase',             'Single Phase'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '20 ms'],
      ['Cooling Method',    'Air Cooled (Fan)'],
      ['Protection',        'Over / Under Voltage, Short Circuit'],
      ['Warranty',          '2 Years'],
    ],
    features: [
      'Digital voltage display with LED indicators',
      'Built-in time delay relay to protect compressor-based loads',
      'Thermal overload protection',
      'Wide input voltage correction range',
      'Wall-mountable and floor-standing options',
    ],
  },
  'ac-2': {
    id: 'ac-2',
    name: 'NKS-AC 1KVA',
    category: 'Air Cooled',
    categoryKey: 'air-cooled',
    icon: 'fa-solid fa-wind',
    tagline: 'Perfect for refrigerators, ACs, and multi-appliance home setups.',
    specs: [
      ['Capacity',          '1 KVA / 800 W'],
      ['Input Voltage',     '130 V – 290 V AC'],
      ['Output Voltage',    '220 V ± 1%'],
      ['Phase',             'Single Phase'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '20 ms'],
      ['Cooling Method',    'Air Cooled (Fan)'],
      ['Protection',        'Over / Under Voltage, Short Circuit'],
      ['Warranty',          '2 Years'],
    ],
    features: [
      'High surge withstand capability for motor-driven loads',
      'Microprocessor-based precise voltage sensing',
      'Auto-restart after voltage normalisation',
      'Powder-coated MS enclosure for durability',
      'ISI-approved components throughout',
    ],
  },
  'ac-3': {
    id: 'ac-3',
    name: 'NKS-AC 2KVA',
    category: 'Air Cooled',
    categoryKey: 'air-cooled',
    icon: 'fa-solid fa-wind',
    tagline: 'Heavy-duty single-phase protection for shops, clinics, and offices.',
    specs: [
      ['Capacity',          '2 KVA / 1.6 KW'],
      ['Input Voltage',     '120 V – 300 V AC'],
      ['Output Voltage',    '220 V ± 1%'],
      ['Phase',             'Single Phase'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '20 ms'],
      ['Cooling Method',    'Air Cooled (Forced)'],
      ['Protection',        'Over / Under Voltage, Short Circuit, Over Temperature'],
      ['Warranty',          '2 Years'],
    ],
    features: [
      'Servo motor technology for stepless voltage correction',
      'Digital voltmeter for input and output monitoring',
      'RS-232 / RS-485 communication port (optional)',
      'Front-panel LED status indicators',
      'Compact footprint with easy front-access maintenance',
    ],
  },
  'oc-1': {
    id: 'oc-1',
    name: 'NKS-OC 5KVA',
    category: 'Oil Cooled',
    categoryKey: 'oil-cooled',
    icon: 'fa-solid fa-droplet',
    tagline: 'Industrial-grade oil-immersed design for continuous heavy-duty operation.',
    specs: [
      ['Capacity',          '5 KVA / 4 KW'],
      ['Input Voltage',     '110 V – 300 V AC'],
      ['Output Voltage',    '220 V ± 1%'],
      ['Phase',             'Single Phase'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '15 ms'],
      ['Cooling Method',    'Oil Immersed (Natural)'],
      ['Protection',        'Over / Under Voltage, Short Circuit, Oil Level'],
      ['Warranty',          '3 Years'],
    ],
    features: [
      'Oil-immersed transformer for superior heat dissipation',
      'Silent operation – ideal for noise-sensitive environments',
      'Stainless steel oil tank with drain plug',
      'Oil level sight glass for easy monitoring',
      'Suitable for 100% continuous duty cycle',
    ],
  },
  'oc-2': {
    id: 'oc-2',
    name: 'NKS-OC 10KVA',
    category: 'Oil Cooled',
    categoryKey: 'oil-cooled',
    icon: 'fa-solid fa-droplet',
    tagline: 'Robust protection for factories, hospitals, and commercial complexes.',
    specs: [
      ['Capacity',          '10 KVA / 8 KW'],
      ['Input Voltage',     '110 V – 300 V AC'],
      ['Output Voltage',    '220 V ± 1%'],
      ['Phase',             'Single Phase'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '15 ms'],
      ['Cooling Method',    'Oil Immersed (Natural)'],
      ['Protection',        'Over / Under Voltage, Short Circuit, Overload, Over Temperature'],
      ['Warranty',          '3 Years'],
    ],
    features: [
      'Motorised servo technology with carbon brush for smooth correction',
      'IP-44-rated weatherproof enclosure',
      'Built-in output MCB for load protection',
      'Heavy-duty wheels for portability',
      'Optional bypass switch for maintenance without downtime',
    ],
  },
  'oc-3': {
    id: 'oc-3',
    name: 'NKS-OC 25KVA',
    category: 'Oil Cooled',
    categoryKey: 'oil-cooled',
    icon: 'fa-solid fa-droplet',
    tagline: 'High-capacity solution for demanding industrial loads and production lines.',
    specs: [
      ['Capacity',          '25 KVA / 20 KW'],
      ['Input Voltage',     '100 V – 300 V AC'],
      ['Output Voltage',    '220 V ± 1%'],
      ['Phase',             'Single Phase'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '15 ms'],
      ['Cooling Method',    'Oil Immersed (Natural/Forced)'],
      ['Protection',        'Over / Under Voltage, Short Circuit, Overload, Oil Level, Over Temperature'],
      ['Warranty',          '3 Years'],
    ],
    features: [
      'Extra-wide 100 V – 300 V input range for severely fluctuating grids',
      'Dual wound transformer for galvanic isolation',
      'Colour-coded wiring and labelled terminal block',
      'SS304 oil tank with gasket-sealed lid',
      'Modbus RTU support for SCADA integration (optional)',
    ],
  },
  'tp-1': {
    id: 'tp-1',
    name: 'NKS-3P 15KVA',
    category: '3-Phase',
    categoryKey: 'three-phase',
    icon: 'fa-solid fa-triangle-exclamation',
    tagline: 'Balanced 3-phase regulation for CNC machinery and commercial complexes.',
    specs: [
      ['Capacity',          '15 KVA / 12 KW'],
      ['Input Voltage',     '300 V – 470 V (L-L)'],
      ['Output Voltage',    '415 V ± 1% (L-L)'],
      ['Phase',             'Three Phase, 4-Wire'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '20 ms'],
      ['Cooling Method',    'Air Cooled (Forced)'],
      ['Protection',        'Over / Under Voltage, Phase Failure, Phase Sequence, Short Circuit'],
      ['Warranty',          '3 Years'],
    ],
    features: [
      'Independent per-phase servo motors for true balanced output',
      'Phase failure and reverse-phase sequence protection',
      'Dual-scale analogue meters for all three phases',
      'Optional GPRS/GSM remote monitoring module',
      'Easy front-panel maintenance with hinged door',
    ],
  },
  'tp-2': {
    id: 'tp-2',
    name: 'NKS-3P 45KVA',
    category: '3-Phase',
    categoryKey: 'three-phase',
    icon: 'fa-solid fa-triangle-exclamation',
    tagline: 'Heavy-duty regulation for large factories, data centres, and multi-floor buildings.',
    specs: [
      ['Capacity',          '45 KVA / 36 KW'],
      ['Input Voltage',     '280 V – 480 V (L-L)'],
      ['Output Voltage',    '415 V ± 1% (L-L)'],
      ['Phase',             'Three Phase, 4-Wire'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '15 ms'],
      ['Cooling Method',    'Oil Cooled (Natural)'],
      ['Protection',        'Over / Under Voltage, Phase Failure, Phase Sequence, Short Circuit, Overload'],
      ['Warranty',          '3 Years'],
    ],
    features: [
      'Oil-immersed transformer for extended continuous operation',
      'Digital LCD display for all three-phase voltages',
      'MCCB input and output protection',
      'Comprehensive alarm relay output (volt-free contact)',
      'Powder-coated CRCA steel cabinet with padlock provision',
    ],
  },
  'tp-3': {
    id: 'tp-3',
    name: 'NKS-3P 100KVA',
    category: '3-Phase',
    categoryKey: 'three-phase',
    icon: 'fa-solid fa-triangle-exclamation',
    tagline: 'Enterprise-grade stabilization for hospitals, textile mills, and large industrial plants.',
    specs: [
      ['Capacity',          '100 KVA / 80 KW'],
      ['Input Voltage',     '260 V – 490 V (L-L)'],
      ['Output Voltage',    '415 V ± 1% (L-L)'],
      ['Phase',             'Three Phase, 4-Wire'],
      ['Frequency',         '50 Hz'],
      ['Correction Time',   '10 ms'],
      ['Cooling Method',    'Oil Cooled (Forced / Natural)'],
      ['Protection',        'Over / Under Voltage, Phase Failure, Phase Sequence, Short Circuit, Overload, Over Temperature'],
      ['Warranty',          '5 Years'],
    ],
    features: [
      'Ultra-fast 10 ms correction response time',
      'Dual-mode cooling: natural convection + cooling fan',
      'Touchscreen HMI with event log and data export (USB)',
      'RS-485 Modbus RTU / TCP/IP SCADA integration',
      'BIS, CE & ISO certified; suitable for export markets',
    ],
  },
};

/* ================================================
   DOM HELPERS
   ================================================ */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/* ================================================
   1. MOBILE NAV TOGGLE
   ================================================ */
(function initMobileNav() {
  const hamburger = $('#hamburger');
  const nav = $('#main-nav');
  if (!hamburger || !nav) return;

  const toggle = (forceClose = false) => {
    const isOpen = !forceClose && !hamburger.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    nav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  hamburger.addEventListener('click', () => toggle());

  // Close nav when a link is clicked
  $$('.nav-link', nav).forEach(link => {
    link.addEventListener('click', () => toggle(true));
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      toggle(true);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(true);
  });
})();

/* ================================================
   2. STICKY HEADER
   ================================================ */
(function initStickyHeader() {
  const header = $('#site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ================================================
   3. ACTIVE NAV LINK (IntersectionObserver)
   ================================================ */
(function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(sec => observer.observe(sec));
})();

/* ================================================
   4. PRODUCT GALLERY FILTER
   ================================================ */
(function initProductFilter() {
  const filterButtons = $$('.filter-btn');
  const productCards = $$('.product-card');
  if (!filterButtons.length || !productCards.length) return;

  const filterProducts = filter => {
    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.remove('fade-in', 'hidden');

      if (match) {
        // Trigger reflow to restart animation
        void card.offsetWidth; // eslint-disable-line no-void
        card.classList.add('fade-in');
      } else {
        card.classList.add('hidden');
      }
    });
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterButtons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      filterProducts(filter);
    });
  });
})();

/* ================================================
   5. PRODUCT DETAIL MODAL
   ================================================ */
(function initProductModal() {
  const overlay = $('#product-modal-overlay');
  const modal = $('#product-modal');
  const closeBtn = $('#modal-close');
  const inner = $('#modal-inner');
  if (!overlay || !modal || !closeBtn || !inner) return;

  let lastFocusedElement = null;

  /**
   * Build the HTML for a product modal.
   * @param {Object} product
   * @returns {string}
   */
  const buildModalHTML = product => {
    const specsRows = product.specs
      .map(([label, value]) => `
        <tr>
          <th scope="row">${label}</th>
          <td>${value}</td>
        </tr>`)
      .join('');

    const featuresItems = product.features
      .map(f => `<li>${f}</li>`)
      .join('');

    return `
      <div class="modal-product-layout">
        <div class="modal-product-image">
          <div class="modal-product-img-placeholder">
            <i class="${product.icon}" aria-hidden="true"></i>
          </div>
        </div>

        <div class="modal-product-details">
          <span class="modal-product-category">
            <i class="${product.icon}" aria-hidden="true"></i>
            ${product.category}
          </span>

          <h2 class="modal-product-name" id="modal-product-name">${product.name}</h2>
          <p class="modal-product-tagline">${product.tagline}</p>

          <p class="modal-specs-title">Technical Specifications</p>
          <table class="modal-specs-table" aria-label="${product.name} specifications">
            <tbody>${specsRows}</tbody>
          </table>

          <p class="modal-features-title">Key Features</p>
          <ul class="modal-features-list" aria-label="${product.name} features">
            ${featuresItems}
          </ul>

          <div class="modal-cta-group">
            <a href="#contact" class="btn btn-primary modal-quote-btn">
              <i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Request a Quote
            </a>
            <button class="btn btn-outline modal-close-inline">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i> Close
            </button>
          </div>
        </div>
      </div>
    `;
  };

  /** Open the modal with data for the given product id. */
  const openModal = productId => {
    const product = PRODUCT_DATA[productId];
    if (!product) return;

    lastFocusedElement = document.activeElement;

    inner.innerHTML = buildModalHTML(product);
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    closeBtn.focus();

    // Inline close button inside modal content
    const inlineClose = inner.querySelector('.modal-close-inline');
    if (inlineClose) {
      inlineClose.addEventListener('click', closeModal);
    }

    // Quote button closes modal and scrolls to contact
    const quoteBtn = inner.querySelector('.modal-quote-btn');
    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        closeModal();
      });
    }
  };

  /** Close the modal. */
  const closeModal = () => {
    overlay.hidden = true;
    inner.innerHTML = '';
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  // "View Details" button clicks
  document.addEventListener('click', e => {
    const btn = e.target.closest('.view-details-btn');
    if (btn) {
      e.preventDefault();
      openModal(btn.dataset.id);
    }
  });

  // Keyboard activation on product cards
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const btn = e.target.closest('.view-details-btn');
      if (btn) {
        e.preventDefault();
        openModal(btn.dataset.id);
      }
    }
  });

  // Close on X button
  closeBtn.addEventListener('click', closeModal);

  // Close on overlay background click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });

  // Trap focus inside modal
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;

    const focusable = $$('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])', modal)
      .filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();

/* ================================================
   6. CONTACT FORM VALIDATION
   ================================================ */
(function initContactForm() {
  const form = $('#contact-form');
  const successMsg = $('#form-success');
  if (!form) return;

  const rules = {
    name:    { required: true, minLength: 2 },
    email:   { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    subject: { required: true },
    message: { required: true, minLength: 10 },
  };

  const messages = {
    name: {
      required:  'Please enter your full name.',
      minLength: 'Name must be at least 2 characters.',
    },
    email: {
      required: 'Please enter your email address.',
      pattern:  'Please enter a valid email address.',
    },
    subject: {
      required: 'Please select a subject.',
    },
    message: {
      required:  'Please enter a message.',
      minLength: 'Message must be at least 10 characters.',
    },
  };

  const showError = (fieldName, msg) => {
    const field = form.elements[fieldName];
    const errorEl = $(`#${fieldName}-error`);
    if (field) field.classList.add('error');
    if (errorEl) errorEl.textContent = msg;
  };

  const clearError = fieldName => {
    const field = form.elements[fieldName];
    const errorEl = $(`#${fieldName}-error`);
    if (field) field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
  };

  const validateField = fieldName => {
    const field = form.elements[fieldName];
    if (!field) return true;

    const value = field.value.trim();
    const rule = rules[fieldName];
    if (!rule) return true;

    if (rule.required && !value) {
      showError(fieldName, messages[fieldName].required);
      return false;
    }
    if (rule.minLength && value.length < rule.minLength) {
      showError(fieldName, messages[fieldName].minLength);
      return false;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      showError(fieldName, messages[fieldName].pattern);
      return false;
    }

    clearError(fieldName);
    return true;
  };

  // Validate on blur
  Object.keys(rules).forEach(name => {
    const field = form.elements[name];
    if (field) {
      field.addEventListener('blur', () => validateField(name));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(name);
      });
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const valid = Object.keys(rules).map(n => validateField(n)).every(Boolean);
    if (!valid) return;

    // Simulate async submission
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    }

    setTimeout(() => {
      form.reset();
      if (successMsg) successMsg.hidden = false;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      }

      // Hide success message after 6 seconds
      setTimeout(() => {
        if (successMsg) successMsg.hidden = true;
      }, 6000);
    }, 1200);
  });
})();

/* ================================================
   7. COUNTER ANIMATION (Hero Stats)
   ================================================ */
(function initCounters() {
  const counters = $$('[data-target]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    const tick = now => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(easeOut(progress) * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
})();

/* ================================================
   8. SCROLL REVEAL
   ================================================ */
(function initScrollReveal() {
  // Add .reveal class to major sections' children
  const targets = [
    ...$$('.about-grid > *'),
    ...$$('.values-grid > *'),
    ...$$('.product-card'),
    ...$$('.service-card'),
    ...$$('.contact-grid > *'),
  ];

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();

/* ================================================
   9. BACK TO TOP
   ================================================ */
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  const onScroll = () => {
    btn.hidden = window.scrollY < 400;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ================================================
   10. FOOTER FILTER TARGET LINKS
   ================================================ */
(function initFooterFilterLinks() {
  $$('[data-filter-target]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const filterValue = link.dataset.filterTarget;

      // Scroll to products section
      const productsSection = $('#products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Trigger the matching filter button
      setTimeout(() => {
        const filterBtn = $(`.filter-btn[data-filter="${filterValue}"]`);
        if (filterBtn) filterBtn.click();
      }, 600);
    });
  });
})();

/* ================================================
   11. CURRENT YEAR IN FOOTER
   ================================================ */
(function setCurrentYear() {
  const el = $('#current-year');
  if (el) el.textContent = new Date().getFullYear();
})();
