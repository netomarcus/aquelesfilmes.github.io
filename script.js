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
    if(!btn) return;
    btn.addEventListener('click', () => {
      const atual = root.getAttribute('data-lang') === 'pt' ? 'en' : 'pt';
      aplicar(atual);
      sessionStorage.setItem(KEY, atual);
    });
  });
})();
