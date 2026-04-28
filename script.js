// Navbar scroll
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const isPDViewOpen = document.getElementById('product-detail-view').style.display === 'block';
  navbar.classList.toggle('scrolled', window.scrollY > 50 || isPDViewOpen);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('mobile-open');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('mobile-open');
}));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.getAttribute('id'); });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

// Product filter
document.querySelectorAll('.product-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.product-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      if (f === 'all' || card.dataset.category === f) { card.style.display = ''; card.style.animation = 'fadeInUp .5s ease'; }
      else card.style.display = 'none';
    });
  });
});

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Product card click to view dedicated product page
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.product-card-link')) {
      e.preventDefault(); // allow JS to handle routing
    }

    // Extract data
    const title = card.querySelector('h3').innerText;
    const desc = card.querySelector('p').innerText;
    const imgSrc = card.querySelector('img').src;

    // Populate dynamic view
    document.getElementById('pd-title').innerText = title;
    document.getElementById('pd-breadcrumb-current').innerText = title;
    document.getElementById('pd-spec-title').innerText = title + ' Specification';
    document.getElementById('pd-desc').innerText = desc;
    document.getElementById('pd-image').src = imgSrc;

    // Populate specs table
    const specsTbody = document.getElementById('pd-specs-tbody');
    specsTbody.innerHTML = '';
    card.querySelectorAll('.product-card-spec').forEach(spec => {
      let text = spec.innerText.trim();
      // Split key/value if there's a colon (like "Usage: Industrial")
      let key = text;
      let val = '';
      if(text.includes(':')) {
        const parts = text.split(':');
        key = parts[0].trim();
        val = parts[1].trim();
      } else {
        // For simple ones like "50 KVA" or "Three Phase" that don't have colons but are specs
        // We can parse based on content, or just show them
        if (text.includes('KVA')) { key = 'Rated Power'; val = text; }
        else if (text.includes('V')) { key = 'Voltage'; val = text; }
        else { key = 'Feature'; val = text; }
      }
      
      const tr = document.createElement('tr');
      const tdKey = document.createElement('td');
      tdKey.innerText = key;
      const tdVal = document.createElement('td');
      tdVal.innerText = val;
      tr.appendChild(tdKey);
      tr.appendChild(tdVal);
      specsTbody.appendChild(tr);
    });

    // Toggle Views
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('product-detail-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'instant' });
    navbar.classList.add('scrolled'); // Force solid background so text is readable
  });
});

// Back to products button
document.getElementById('back-to-products').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('product-detail-view').style.display = 'none';
  document.getElementById('home-view').style.display = 'block';
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  window.dispatchEvent(new Event('scroll')); // Update navbar state based on new scroll position
});

// Form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
  btn.style.background = 'var(--teal)';
  setTimeout(() => { btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Inquiry'; btn.style.background = ''; e.target.reset(); }, 3000);
});
