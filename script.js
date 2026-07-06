// Alterna PT/EN e lembra a escolha entre páginas (sessionStorage).
(function(){
  const root = document.documentElement;
  const KEY = 'aqueles-lang';

  function aplicar(lang){
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    const btn = document.getElementById('langBtn');
    if(btn) btn.textContent = lang === 'pt' ? 'EN' : 'PT';
  }

  const salvo = sessionStorage.getItem(KEY);
  if(salvo) aplicar(salvo);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('langBtn');
    if(btn){
      btn.addEventListener('click', () => {
        const atual = root.getAttribute('data-lang') === 'pt' ? 'en' : 'pt';
        aplicar(atual);
        sessionStorage.setItem(KEY, atual);
      });
    }

    // Menu "Trabalhos": funciona por hover no desktop (CSS) e por toque/clique
    // aqui, já que iOS Safari não abre dropdowns só-hover no toque.
    document.querySelectorAll('.dropdown').forEach(dd => {
      const gatilho = dd.querySelector('button');
      if(!gatilho) return;
      gatilho.setAttribute('aria-expanded', 'false');
      gatilho.addEventListener('click', (e) => {
        e.stopPropagation();
        const aberto = dd.classList.contains('open');
        document.querySelectorAll('.dropdown.open').forEach(o => {
          o.classList.remove('open');
          o.querySelector('button')?.setAttribute('aria-expanded','false');
        });
        if(!aberto){
          dd.classList.add('open');
          gatilho.setAttribute('aria-expanded','true');
        }
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('button')?.setAttribute('aria-expanded','false');
      });
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        document.querySelectorAll('.dropdown.open').forEach(o => o.classList.remove('open'));
      }
    });
  });
})();
