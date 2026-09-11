
(() => {
  const menu = document.querySelector('.menuBtn');
  const nav = document.querySelector('.nav');
  const navHome = nav?.parentNode;
  const navNext = nav?.nextSibling;
  if (nav) {
    nav.id = nav.id || 'mobile-navigation';
    nav.classList.add('mobile-nav-panel');
  }
  if (menu && nav) menu.setAttribute('aria-controls', nav.id);
  const placeNav = () => {
    if (!nav || !navHome) return;
    if (window.innerWidth <= 900 && nav.parentNode !== document.body) document.body.appendChild(nav);
    if (window.innerWidth > 900 && nav.parentNode === document.body) navHome.insertBefore(nav, navNext);
  };
  const groups = [...document.querySelectorAll('.navgroup')];
  const closeGroups = (except) => groups.forEach(group => {
    if (group === except) return;
    group.classList.remove('open');
    const button = group.querySelector('.navdrop');
    if (button) button.setAttribute('aria-expanded', 'false');
  });
  const closeMenu = () => {
    if (!menu || !nav) return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
    closeGroups();
  };
  if (menu && nav) {
    menu.addEventListener('click', () => {
      placeNav();
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('mobile-nav-open', open);
      if (!open) closeGroups();
    });
  }
  groups.forEach(group => {
    const btn = group.querySelector('.navdrop');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeGroups(group);
      const open = group.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  if (nav) nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (window.innerWidth <= 900 && nav?.classList.contains('open') && !e.target.closest('.top')) closeMenu();
  });
  placeNav();
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
    placeNav();
  });
})();

document.querySelectorAll('.real-logo img').forEach(function(img){img.addEventListener('error',function(){this.style.display='none';var f=this.parentElement.querySelector('.logo-fallback');if(f)f.style.display='block';});});


// V46 back-to-top control
(() => {
  const btn=document.createElement('button');
  btn.className='back-to-top-v46';
  btn.type='button';
  btn.setAttribute('aria-label','Back to top');
  btn.innerHTML='<span class="backtop-arrow-v64">↑</span><span class="backtop-label-v64">Top of page</span>';
  document.body.appendChild(btn);
  const update=()=>btn.classList.toggle('show', window.scrollY>500);
  window.addEventListener('scroll',update,{passive:true});
  update();
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

// V52 homepage hero rotating punch-line
(() => {
  const holder = document.querySelector('.hero-punch-v52');
  if (!holder) return;
  const line = holder.querySelector('span');
  if (!line) return;
  const messages = [
    'BIG EVENT? NO DRAMA.',
    'WEDDING? SORTED.',
    'BAR RUNNING LOW? WE’RE ON IT.',
    '12KG CUBED & CRUSHED.'
  ];
  let i = 0;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.setInterval(() => {
    line.classList.add('changing');
    window.setTimeout(() => {
      i = (i + 1) % messages.length;
      line.textContent = messages[i];
      line.classList.remove('changing');
    }, 280);
  }, 3600);
})();

// V66 — floating WhatsApp logo shortcut on every page
(() => {
  if (document.querySelector('.floating-wa-v65')) return;
  const a=document.createElement('a');
  a.className='floating-wa-v65';
  a.href='https://wa.me/447907783121';
  a.setAttribute('aria-label','WhatsApp Lunar Ice');
  a.setAttribute('title','WhatsApp Lunar Ice');
  a.innerHTML='<svg class="floating-wa-svg-v66" aria-hidden="true" viewBox="0 0 32 32"><path fill="currentColor" d="M16 3a12.8 12.8 0 0 0-11 19.4L3.4 29l6.8-1.8A12.9 12.9 0 1 0 16 3zm0 23.4c-2 0-4-.6-5.7-1.6l-.4-.2-4 1 1.1-3.9-.3-.4A10.5 10.5 0 1 1 16 26.4zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3.1-1.7-4.4-3.8-.3-.5.3-.5.9-1.6.1-.2 0-.5 0-.7l-1-2.4c-.3-.6-.6-.5-.8-.5h-.7c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4c.2.3 2.7 4.1 6.5 5.8 2.4 1 3.4 1.1 4.6.9.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5z"/></svg>';
  document.body.appendChild(a);
})();

// V78 — homepage should open at the actual top on mobile/in-app browsers.
// iOS/WhatsApp/Safari can restore an old scroll position when reopening a page.
(() => {
  const path = window.location.pathname.replace(/\/+$/, '');
  const isHome = path === '' || path === '/index.html';
  if (!isHome || window.location.hash) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const resetTop = () => window.scrollTo(0, 0);
  window.addEventListener('pageshow', resetTop, {once:true});
  requestAnimationFrame(resetTop);
})();
