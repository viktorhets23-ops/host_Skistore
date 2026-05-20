/* ============================================
   ALPINE PEAK — Main JavaScript
   ============================================ */

// ---- Utility ----
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// ---- Active nav link ----
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a, .sidebar-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page) { a.classList.add('active'); }
  });
}

// ---- Mobile nav toggle ----
function initHamburger() {
  const ham = $('.hamburger');
  const links = $('.nav-links');
  if (!ham || !links) return;
  ham.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:absolute;top:var(--nav-h);left:0;right:0;background:rgba(10,15,30,0.97);padding:1rem;gap:4px;border-bottom:1px solid var(--border);z-index:999;';
    ham.classList.toggle('open', !open);
  });
}

// ---- Sidebar submenu ----
function initSidebar() {
  $$('.sidebar-nav .has-sub > a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    });
  });
}

// ---- Scroll reveal ----
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => obs.observe(el));
}

// ---- Cart ----
let cart = JSON.parse(localStorage.getItem('alpinecart') || '[]');

function saveCart() { localStorage.setItem('alpinecart', JSON.stringify(cart)); }

function addToCart(name, price, emoji) {
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price, emoji, qty: 1 }); }
  saveCart(); updateCartBadge(); showNotification(`${emoji} "${name}" додано в кошик!`); renderCart();
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  saveCart(); updateCartBadge(); renderCart();
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  $$('.cart-badge').forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'inline-block' : 'none';
  });
}

function renderCart() {
  const el = $('.cart-items');
  if (!el) return;
  if (!cart.length) { el.innerHTML = '<p style="color:var(--silver);text-align:center;padding:2rem">Кошик порожній</p>'; updateCartTotal(); return; }
  el.innerHTML = cart.map(i => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:2rem">${i.emoji}</span>
      <div style="flex:1">
        <div style="font-family:'Rajdhani',sans-serif;font-weight:700;color:var(--white)">${i.name}</div>
        <div style="font-size:0.85rem;color:var(--silver)">${i.qty} × ${i.price.toLocaleString()} ₴</div>
      </div>
      <button onclick="removeFromCart('${i.name}')" style="background:none;border:none;color:var(--silver);cursor:pointer;font-size:1.2rem;padding:4px">✕</button>
    </div>
  `).join('');
  updateCartTotal();
}

function updateCartTotal() {
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const el = $('.cart-total');
  if (el) el.textContent = total.toLocaleString() + ' ₴';
}

function initCart() {
  const btn = $('.cart-toggle-btn');
  const drawer = $('.cart-drawer');
  const close = $('.cart-close');
  if (btn && drawer) { btn.addEventListener('click', () => { drawer.classList.toggle('open'); renderCart(); }); }
  if (close && drawer) { close.addEventListener('click', () => drawer.classList.remove('open')); }
  updateCartBadge(); renderCart();
}

// ---- Notification ----
function showNotification(msg) {
  let n = $('.notification');
  if (!n) { n = document.createElement('div'); n.className = 'notification'; document.body.appendChild(n); }
  n.textContent = msg; n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 3000);
}

// ---- Filter tabs ----
function initFilterTabs() {
  $$('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.filter-tabs');
      $$('.filter-tab', group).forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      $$('.product-card').forEach(card => {
        if (!filter || filter === 'all' || card.dataset.category === filter) {
          card.style.display = ''; card.style.animation = 'fadeIn 0.4s ease';
        } else { card.style.display = 'none'; }
      });
    });
  });
}

// ---- FAQ accordion ----
function initFaq() {
  $$('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      $$('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ---- Wishlist ----
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
function toggleWishlist(btn, name) {
  const idx = wishlist.indexOf(name);
  if (idx > -1) { wishlist.splice(idx, 1); btn.classList.remove('active'); btn.textContent = '♡'; }
  else { wishlist.push(name); btn.classList.add('active'); btn.textContent = '♥'; showNotification('❤️ Додано до обраного!'); }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
function initWishlists() {
  $$('.wishlist-btn').forEach(btn => {
    const name = btn.dataset.name;
    if (wishlist.includes(name)) { btn.classList.add('active'); btn.textContent = '♥'; }
    btn.addEventListener('click', () => toggleWishlist(btn, name));
  });
}

// ---- Product search ----
function initSearch() {
  const inp = $('.search-input');
  if (!inp) return;
  inp.addEventListener('input', () => {
    const val = inp.value.toLowerCase().trim();
    $$('.product-card').forEach(card => {
      const name = (card.querySelector('.product-name')?.textContent || '').toLowerCase();
      card.style.display = (!val || name.includes(val)) ? '' : 'none';
    });
  });
}

// ---- Form validation ----
function initForms() {
  $$('form.validate').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = $$('[required]', form);
      let valid = true;
      inputs.forEach(inp => {
        if (!inp.value.trim()) {
          inp.style.borderColor = 'var(--accent2)';
          valid = false;
        } else { inp.style.borderColor = ''; }
      });
      if (valid) {
        showNotification('✅ Форму надіслано успішно!');
        form.reset();
      } else { showNotification('⚠️ Заповніть всі обов\'язкові поля'); }
    });
  });
}

// ---- Modal ----
function openModal(id) {
  const m = $('#' + id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = $('#' + id);
  if (m) m.classList.remove('open');
}
function initModals() {
  $$('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
}

// ---- Smooth counter animation ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  $$('[data-target]').forEach(el => obs.observe(el));
}

// ---- Image gallery lightbox ----
function initGallery() {
  $$('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const emoji = item.querySelector('.gallery-emoji')?.textContent || '🏔';
      const caption = item.dataset.caption || '';
      const html = `<div style="text-align:center">
        <div style="font-size:8rem;margin-bottom:1rem">${emoji}</div>
        <p style="color:var(--silver)">${caption}</p>
        <button onclick="closeModal('galleryModal')" class="btn btn-outline" style="margin-top:1.5rem">Закрити</button>
      </div>`;
      const box = $('#galleryModal .modal-box');
      if (box) { box.innerHTML = html; openModal('galleryModal'); }
    });
  });
}

// ---- Sticky nav shadow ----
function initNavScroll() {
  window.addEventListener('scroll', () => {
    const nav = $('.top-nav');
    if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.5)' : '';
  });
}

// ---- Price filter ----
function initPriceFilter() {
  const range = $('#priceRange');
  const display = $('#priceDisplay');
  if (!range) return;
  range.addEventListener('input', () => {
    const max = range.value;
    if (display) display.textContent = parseInt(max).toLocaleString() + ' ₴';
    $$('.product-card').forEach(card => {
      const priceEl = card.querySelector('.price-new');
      if (!priceEl) return;
      const price = parseInt(priceEl.textContent.replace(/\D/g, ''));
      card.style.display = price <= max ? '' : 'none';
    });
  });
}

// ---- Sort products ----
function sortProducts(order) {
  const grid = $('.products-grid');
  if (!grid) return;
  const cards = $$('.product-card', grid);
  cards.sort((a, b) => {
    const pa = parseInt(a.querySelector('.price-new')?.textContent.replace(/\D/g, '') || 0);
    const pb = parseInt(b.querySelector('.price-new')?.textContent.replace(/\D/g, '') || 0);
    const na = a.querySelector('.product-name')?.textContent || '';
    const nb = b.querySelector('.product-name')?.textContent || '';
    if (order === 'price-asc') return pa - pb;
    if (order === 'price-desc') return pb - pa;
    if (order === 'name') return na.localeCompare(nb, 'uk');
    return 0;
  });
  cards.forEach(c => grid.appendChild(c));
}

// ---- Init all ----
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initHamburger();
  initSidebar();
  initReveal();
  initCart();
  initFilterTabs();
  initFaq();
  initWishlists();
  initSearch();
  initForms();
  initModals();
  initCounters();
  initGallery();
  initNavScroll();
  initPriceFilter();
});
