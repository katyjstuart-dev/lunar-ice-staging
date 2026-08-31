
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
