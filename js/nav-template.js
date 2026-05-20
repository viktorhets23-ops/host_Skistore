/* nav-template.js — inject shared nav + sidebar + footer */
(function() {
  const navHTML = `
  <nav class="top-nav">
    <a href="index.html" class="nav-logo">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3L3 26h26L16 3z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M10 26l6-10 6 10" stroke="var(--accent)" stroke-width="2" fill="none"/>
      </svg>
      Alpine<span>Peak</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Головна</a></li>
      <li><a href="catalog.html">Каталог</a></li>
      <li><a href="skis.html">Лижі</a></li>
      <li><a href="clothes.html">Одяг</a></li>
      <li><a href="rental.html">Прокат</a></li>
      <li><a href="blog.html">Блог</a></li>
      <li><a href="about.html">Про нас</a></li>
      <li><a href="contact.html">Контакти</a></li>
      <li><a href="#" class="nav-cart cart-toggle-btn">🛒 Кошик <span class="cart-badge" style="display:none;background:var(--accent2);color:#fff;padding:2px 7px;border-radius:20px;font-size:0.75rem;margin-left:4px"></span></a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </nav>`;

  const sidebarHTML = `
  <aside class="sidebar">
    <div class="sidebar-title">Навігація</div>
    <ul class="sidebar-nav">
      <li><a href="index.html">🏠 Головна</a></li>
      <li class="has-sub">
        <a href="#">🎿 Продукція</a>
        <ul class="sub-menu">
          <li><a href="catalog.html">Весь каталог</a></li>
          <li><a href="skis.html">Лижі та сноуборди</a></li>
          <li><a href="clothes.html">Одяг та взуття</a></li>
        </ul>
      </li>
      <li><a href="rental.html">🔑 Прокат <span class="sidebar-badge">HOT</span></a></li>
      <li><a href="blog.html">📰 Блог</a></li>
      <li><a href="about.html">ℹ️ Про нас</a></li>
      <li><a href="contact.html">📍 Контакти</a></li>
    </ul>
    <div style="padding:1.5rem;margin-top:2rem;border-top:1px solid var(--border)">
      <div style="font-size:0.75rem;color:var(--silver);margin-bottom:8px;letter-spacing:2px;text-transform:uppercase">Соцмережі</div>
      <div class="social-bar" style="margin-top:0">
        <a href="https://facebook.com" target="_blank" class="social-link" title="Facebook">f</a>
        <a href="https://instagram.com" target="_blank" class="social-link" title="Instagram">📷</a>
        <a href="https://youtube.com" target="_blank" class="social-link" title="YouTube">▶</a>
        <a href="https://t.me" target="_blank" class="social-link" title="Telegram">✈</a>
      </div>
    </div>
  </aside>`;

  const footerHTML = `
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="nav-logo" style="margin-bottom:1rem">
          <svg viewBox="0 0 32 32" fill="none" style="width:24px"><path d="M16 3L3 26h26L16 3z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 26l6-10 6 10" stroke="var(--accent)" stroke-width="2" fill="none"/></svg>
          Alpine<span>Peak</span>
        </div>
        <p>Найкращий вибір лижного спорядження у Львові. Якість, стиль та безпека на кожному схилі.</p>
        <div class="social-bar">
          <a href="https://facebook.com" target="_blank" class="social-link">f</a>
          <a href="https://instagram.com" target="_blank" class="social-link">📷</a>
          <a href="https://youtube.com" target="_blank" class="social-link">▶</a>
          <a href="https://t.me" target="_blank" class="social-link">✈</a>
          <a href="https://tiktok.com" target="_blank" class="social-link">♪</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Каталог</h5>
        <ul>
          <li><a href="skis.html">Гірські лижі</a></li>
          <li><a href="skis.html">Сноуборди</a></li>
          <li><a href="clothes.html">Гірськолижний одяг</a></li>
          <li><a href="clothes.html">Взуття</a></li>
          <li><a href="catalog.html">Аксесуари</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Сервіс</h5>
        <ul>
          <li><a href="rental.html">Прокат обладнання</a></li>
          <li><a href="about.html">Ремонт та заточка</a></li>
          <li><a href="contact.html">Доставка</a></li>
          <li><a href="contact.html">Повернення</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Компанія</h5>
        <ul>
          <li><a href="about.html">Про нас</a></li>
          <li><a href="blog.html">Блог</a></li>
          <li><a href="contact.html">Контакти</a></li>
          <li><a href="#">Партнерам</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Alpine Peak. Всі права захищені.</span>
      <span>🏔 Зроблено з ❤️ у Львові</span>
    </div>
  </footer>
  <div class="cart-drawer">
    <div class="cart-header">
      <div class="cart-title">Кошик 🛒</div>
      <button class="cart-close">✕</button>
    </div>
    <div class="cart-items"></div>
    <hr class="divider">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
      <span style="font-family:'Rajdhani',sans-serif;font-weight:700;color:var(--white);letter-spacing:1px">РАЗОМ:</span>
      <span class="cart-total" style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:var(--accent)">0 ₴</span>
    </div>
    <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="showNotification('🎉 Замовлення оформлено! Дякуємо!')">Оформити замовлення</button>
  </div>
  <div class="modal-overlay" id="galleryModal"><div class="modal-box"></div></div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  const wrapper = document.querySelector('.page-wrapper');
  if (wrapper) wrapper.insertAdjacentHTML('afterbegin', sidebarHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
