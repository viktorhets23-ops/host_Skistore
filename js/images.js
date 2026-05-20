/* images.js — замінює emoji-заглушки на реальні фото товарів */

const PRODUCT_IMAGES = {
  /* ---- ЛИЖІ ---- */
  'Rossignol Experience 86': 'img/products/rossignol-exp86.jpeg',
  'Salomon QST 92': 'img/products/2t.jpg',
  'Atomic Vantage 90 Ti': 'img/products/3t.jpg',
  'Fischer RC4 The Curv': 'img/products/4t.jpeg',

  /* ---- СНОУБОРДИ ---- */
  'Burton Custom Flying V':
    'img/products/5t.jpg',
  'Lib Tech Cold Brew':
    'img/products/6t.jpg',
  'Lib Tech Cold Brew C2':
    'img/products/7t.jpg',
  'Jones Flagship':
    'img/products/8t.jpg',

  /* ---- ЧЕРЕВИКИ ---- */
  'Head Raptor 130S GW':
    'img/products/9t.jpg',
  'Salomon S/Pro 120':
    'img/products/10t.jpg',
  'Burton Photon BOA Wide':
    'img/products/11t.jpg',

  /* ---- ОДЯГ ---- */
  'Salomon QST Guard Jacket':
    'img/products/12t.jpg',
  'Rossignol Fonction Jacket':
    'img/products/13t.jpg',
  'Burton Covert Pants':
    'img/products/14t.jpg',
  'Icebreaker 260 Tech Top':
    'img/products/15t.jpg',

  /* ---- ШОЛОМИ ---- */
  'Oakley MOD5 Helmet':
    'img/products/16t.jpg',

  /* ---- МАСКИ ---- */
  'Oakley Flight Tracker':
    'img/products/17t.jpg',

  /* ---- ПАЛКИ ---- */
  'Leki Carbon 14S':
    'img/products/18t.jpg',

  /* ---- РУКАВИЦІ ---- */
  'Black Diamond Guide':
    'img/products/19t.jpg',
  'Black Diamond Guide Gloves':
    'img/products/20t.jpg',
};

// Fallback images per category
const CATEGORY_FALLBACKS = {
  'skis':       'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80',
  'snowboard':  'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=400&q=80',
  'boots':      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  'jacket':     'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80',
  'clothes':    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80',
  'helmets':    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80',
  'poles':      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=400&q=80',
  'accessories':'https://images.unsplash.com/photo-1511715112108-9acc80ae98e3?w=400&q=80',
  'default':    'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&q=80',
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-card').forEach(card => {
    const imgDiv  = card.querySelector('.product-img');
    const nameEl  = card.querySelector('.product-name');
    if (!imgDiv || !nameEl) return;

    const name     = nameEl.textContent.trim();
    const category = card.dataset.category || 'default';
    const src      = PRODUCT_IMAGES[name] || CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS['default'];

    // preserve badges / wishlist buttons
    const badge   = imgDiv.querySelector('.product-badge');
    const wish    = imgDiv.querySelector('.wishlist-btn');

    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    img.loading = 'lazy';
    img.onerror = function() {
      this.src = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS['default'];
    };

    imgDiv.innerHTML = '';
    imgDiv.appendChild(img);
    if (badge) imgDiv.appendChild(badge);
    if (wish)  imgDiv.appendChild(wish);
  });

  // Gallery items - replace emoji with ski/mountain photos
  const galleryPhotos = [
    'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
    'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80',
    'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&q=80',
    'https://images.unsplash.com/photo-1545013616-e4d1e5e97551?w=800&q=80',
    'https://images.unsplash.com/photo-1547971071-1dc911cca287?w=800&q=80',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
  ];
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const src = galleryPhotos[i % galleryPhotos.length];
    const caption = item.dataset.caption || '';
    const emoji   = item.querySelector('.gallery-emoji');
    const img = document.createElement('img');
    img.src = src;
    img.alt = caption;
    img.loading = 'lazy';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
    item.style.position = 'relative';
    item.insertBefore(img, item.firstChild);
    if (emoji) emoji.style.display = 'none';
  });
});
