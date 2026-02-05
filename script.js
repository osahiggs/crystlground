(() => {
  // Reveal-on-scroll (fade-up/scale-in)
  try{
    const els = document.querySelectorAll('.fade-up, .scale-in');
    if(els.length){
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
      els.forEach(el=>obs.observe(el));
    }
  }catch(_){}

  // FAQ smooth accordion
  try{
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item)=>{
      const btn = item.querySelector('.faq-question');
      const ans = item.querySelector('.faq-answer');
      if(!btn || !ans) return;
      ans.style.height = '0px';
      btn.addEventListener('click', ()=>{
        const open = item.classList.contains('open');
        items.forEach(o=>{
          if(o!==item){ o.classList.remove('open'); const a=o.querySelector('.faq-answer'); if(a) a.style.height='0px'; }
        });
        if(open){ item.classList.remove('open'); ans.style.height='0px'; }
        else { item.classList.add('open'); ans.style.height = ans.scrollHeight + 'px'; }
      });
    });
    window.addEventListener('resize', ()=>{
      items.forEach(i=>{
        if(i.classList.contains('open')){
          const a=i.querySelector('.faq-answer'); if(a) a.style.height = a.scrollHeight + 'px';
        }
      });
    });
  }catch(_){}

  // Artists tiles fade-in
  try{
    const tiles = document.querySelectorAll('.artist-tile, .fade-in');
    if(tiles.length){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
      tiles.forEach(t=>io.observe(t));
    }
  }catch(_){}

  // Contact form status
  try{
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    if(form && statusEl){
      form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        statusEl.textContent = 'sending…';
        try{
          const res = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{'Accept':'application/json'} });
          if(res.ok){ form.reset(); statusEl.textContent = "sent. we'll get back to you soon."; }
          else { statusEl.textContent = 'could not send. try again or email us directly.'; }
        }catch(err){
          statusEl.textContent = 'network error. try again or email us directly.';
        }
      });
    }
  }catch(_){}
})();