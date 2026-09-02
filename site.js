
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
  btn.innerHTML='↑';
  document.body.appendChild(btn);
  const update=()=>btn.classList.toggle('show', window.scrollY>500);
  window.addEventListener('scroll',update,{passive:true});
  update();
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();
