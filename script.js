/* ── Jesus Victory Center · script.js ── */
'use strict';

/* YEAR */
document.querySelectorAll('[id="year"]').forEach(el => el.textContent = new Date().getFullYear());

/* CURSOR */
(function(){
  const c = document.getElementById('cursor');
  const r = document.getElementById('cursorRing');
  if(!c||!r) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
  (function tick(){
    c.style.left=mx+'px'; c.style.top=my+'px';
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    r.style.left=rx+'px'; r.style.top=ry+'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.ministry-card,.service-row,.sermon-item,.act-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ c.classList.add('hov'); r.classList.add('hov'); });
    el.addEventListener('mouseleave',()=>{ c.classList.remove('hov'); r.classList.remove('hov'); });
  });
})();

/* NAVBAR SCROLL */
(function(){
  const nb = document.getElementById('navbar');
  if(!nb) return;
  const upd = ()=> nb.classList.toggle('scrolled', window.scrollY > 55);
  window.addEventListener('scroll', upd, {passive:true});
  upd();
})();

/* HAMBURGER / DRAWER */
(function(){
  const h = document.getElementById('hamburger');
  const d = document.getElementById('drawer');
  if(!h||!d) return;
  let open=false;
  const toggle = ()=>{
    open=!open;
    h.classList.toggle('open',open);
    d.classList.toggle('open',open);
    document.body.style.overflow = open?'hidden':'';
  };
  h.addEventListener('click', toggle);
  d.querySelectorAll('a').forEach(a=> a.addEventListener('click',()=>{
    if(open) toggle();
  }));
  document.addEventListener('click', e=>{
    if(open && !d.contains(e.target) && !h.contains(e.target)) toggle();
  });
})();

/* SCROLL REVEAL */
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  },{threshold:.1});
  els.forEach(el=> obs.observe(el));
})();

/* MINI MENU */
(function(){
  const menu = document.getElementById('miniMenu');
  if(!menu) return;
  const isInner = !document.querySelector('.hero');

  if(isInner){
    menu.classList.add('always');
  } else {
    const hero = document.querySelector('.hero');
    new IntersectionObserver(([e])=>{
      menu.classList.toggle('visible', !e.isIntersecting);
    },{threshold:.15}).observe(hero);
  }

  /* Smooth scroll for anchor targets */
  menu.querySelectorAll('.mm-btn[data-target]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const t = btn.getAttribute('data-target');
      if(t.startsWith('http')||t.endsWith('.html')){
        window.location.href = t; return;
      }
      const el = document.getElementById(t);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  /* Active state by scroll */
  const sections = [];
  menu.querySelectorAll('.mm-btn[data-target]').forEach(btn=>{
    const id = btn.getAttribute('data-target');
    if(id && !id.includes('.')){
      const el = document.getElementById(id);
      if(el) sections.push({el, btn});
    }
  });
  if(sections.length){
    const sObs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          sections.forEach(s=> s.btn.classList.toggle('active', s.el===e.target));
        }
      });
    },{rootMargin:'-40% 0px -40% 0px',threshold:0});
    sections.forEach(s=> sObs.observe(s.el));
  }
})();

/* PARTICLES (hero only) */
(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W,H,motes=[];
  const resize = ()=>{
    W=canvas.width=canvas.offsetWidth;
    H=canvas.height=canvas.offsetHeight;
  };
  window.addEventListener('resize', resize, {passive:true});
  resize();
  class Mote {
    constructor(init){ this.reset(init); }
    reset(init){
      this.x=Math.random()*(W||1400);
      this.y=init?Math.random()*(H||800):H+10;
      this.r=Math.random()*1.4+.3;
      this.sp=Math.random()*.3+.1;
      this.dr=(Math.random()-.5)*.22;
      this.a=Math.random()*.5+.12;
      this.life=init?Math.random()*280:0;
      this.max=Math.random()*260+160;
    }
    tick(){ this.y-=this.sp; this.x+=this.dr; this.life++;
      if(this.life>this.max||this.y<-8) this.reset(false); }
    draw(){
      const p=this.life/this.max;
      const fade=p<.12?p/.12:p>.82?(1-p)/.18:1;
      ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(212,132,26,${this.a*fade})`; ctx.fill();
    }
  }
  for(let i=0;i<60;i++) motes.push(new Mote(true));
  (function loop(){ ctx.clearRect(0,0,W,H); motes.forEach(m=>{m.tick();m.draw();}); requestAnimationFrame(loop); })();
})();

/* SCROLL PROGRESS BAR */
(function(){
  const bar = document.getElementById('progressBar');
  if(!bar) return;
  window.addEventListener('scroll',()=>{
    const d=document.documentElement;
    bar.style.width = ((d.scrollTop||document.body.scrollTop)/(d.scrollHeight-d.clientHeight)*100)+'%';
  },{passive:true});
})();
