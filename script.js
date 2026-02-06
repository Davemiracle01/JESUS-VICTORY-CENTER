// ────────────────────────────────────────────────
// Config & Shared Observer Options
// ────────────────────────────────────────────────
const OBSERVER_OPTIONS = {
  reveal: { threshold: 0.18 },
  lazy:   { rootMargin: '220px 0px' }
};

// ────────────────────────────────────────────────
// Scroll Reveal (one-time class addition)
// ────────────────────────────────────────────────
const revealItems = document.querySelectorAll(
  '.card, .welcome-card, .img-grid img, .video-wrapper'
);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('reveal');
    observer.unobserve(entry.target);
  });
}, OBSERVER_OPTIONS.reveal);

revealItems.forEach(el => revealObserver.observe(el));

// ────────────────────────────────────────────────
// Native Lazy Loading + data-src fallback
// (works even when loading="lazy" is supported)
// ────────────────────────────────────────────────
const lazyMedia = document.querySelectorAll('img[data-src], video[data-src]');

if ('loading' in HTMLImageElement.prototype || 'loading' in HTMLVideoElement.prototype) {
  // Browser supports native lazy → just set loading attribute if not already present
  lazyMedia.forEach(el => {
    if (!el.hasAttribute('loading')) {
      el.setAttribute('loading', 'lazy');
    }
    // Still remove data-src if present to clean up DOM
    if (el.dataset.src) {
      el.src = el.dataset.src;
      el.removeAttribute('data-src');
    }
  });
} else {
  // Fallback: IntersectionObserver lazy loading
  const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const media = entry.target;
      if (media.dataset.src) {
        media.src = media.dataset.src;
        media.removeAttribute('data-src');
      }

      observer.unobserve(media);
    });
  }, OBSERVER_OPTIONS.lazy);

  lazyMedia.forEach(media => lazyObserver.observe(media));
}

// ────────────────────────────────────────────────
// Navbar shadow intensity on scroll (subtle & performant)
// ────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');

if (navbar) {
  const updateNavbarShadow = () => {
    const shadow = window.scrollY > 50
      ? '0 10px 30px rgba(0,0,0,0.11)'
      : '0 6px 20px rgba(0,0,0,0.07)';

    if (navbar.style.boxShadow !== shadow) {
      navbar.style.boxShadow = shadow;
    }
  };

  // Use requestAnimationFrame + throttle-like behavior
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavbarShadow();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateNavbarShadow();
}

// ────────────────────────────────────────────────
// Footer copyright year (safe & simple)
// ────────────────────────────────────────────────
document.getElementById('year')?.replaceChildren(new Date().getFullYear());
