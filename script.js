/* ── Year ─────────────────────────────────── */
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

/* ── Custom Cursor ───────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  })();

  document.querySelectorAll('a, button, .masonry-item, .service-row, .sermon-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
  });
}

/* ── Navbar scroll ───────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Hamburger / mobile drawer ───────────── */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Scroll reveal ───────────────────────── */
const revEls = document.querySelectorAll('.reveal');
if (revEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  revEls.forEach(el => obs.observe(el));
}

/* ── Canvas particles (floating gold motes) ─ */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, motes = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Mote {
    constructor() { this.reset(true); }
    reset(init) {
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : H + 20;
      this.r     = Math.random() * 1.6 + 0.3;
      this.speed = Math.random() * 0.35 + 0.12;
      this.drift = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.55 + 0.15;
      this.life  = init ? Math.random() * 300 : 0;
      this.maxL  = Math.random() * 280 + 180;
    }
    tick() {
      this.y -= this.speed;
      this.x += this.drift;
      this.life++;
      if (this.life > this.maxL || this.y < -10) this.reset(false);
    }
    draw() {
      const p    = this.life / this.maxL;
      const fade = p < 0.12 ? p / 0.12 : p > 0.8 ? (1 - p) / 0.2 : 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196,154,60,${this.alpha * fade})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 65; i++) motes.push(new Mote());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    motes.forEach(m => { m.tick(); m.draw(); });
    requestAnimationFrame(loop);
  })();
})();

/* ── Smooth anchor scroll ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
