
(() => {
  const menu = document.querySelector('.menuBtn');
  const nav = document.querySelector('.nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('.navdrop').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const group = btn.closest('.navgroup');
      const open = group.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
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
