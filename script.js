(() => {
      // reveal
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){ entry.target.classList.add('show') }
        })
      }, { threshold: 0.15 })
      document.querySelectorAll('.fade-up,.scale-in').forEach(el => observer.observe(el))

      // FAQ (single open) — smooth animation
      const faqItems = document.querySelectorAll('.faq-item')

      const closeItem = (item) => {
        item.classList.remove('active')
        const ans = item.querySelector('.faq-answer')
        if(ans){
          ans.style.maxHeight = ans.scrollHeight + 'px'
          requestAnimationFrame(() => { ans.style.maxHeight = '0px' })
        }
      }

      faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question')
        const ans = item.querySelector('.faq-answer')
        if(!btn || !ans) return

        ans.style.maxHeight = '0px'

        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('active')

          faqItems.forEach(i => { if(i !== item) closeItem(i) })

          if(isOpen){
            closeItem(item)
          }else{
            item.classList.add('active')
            ans.style.maxHeight = ans.scrollHeight + 'px'
          }
        })
      })

      // keep height correct on resize
      window.addEventListener('resize', () => {
        faqItems.forEach(item => {
          if(!item.classList.contains('active')) return
          const ans = item.querySelector('.faq-answer')
          if(ans) ans.style.maxHeight = ans.scrollHeight + 'px'
        })
      })

      // contact form (Formspree)
      const form = document.getElementById('contactForm')
      const statusEl = document.getElementById('formStatus')
      if(form && statusEl){
        form.addEventListener('submit', async (e)=>{
          if(form.action.includes('YOUR_FORM_ID')){
            e.preventDefault()
            statusEl.textContent = 'replace YOUR_FORM_ID in the form action to make this send for real.'
            return
          }
          e.preventDefault()
          statusEl.textContent = 'sending…'
          try{
            const res = await fetch(form.action, {
              method: 'POST',
              body: new FormData(form),
              headers: { 'Accept': 'application/json' }
            })
            if(res.ok){
              form.reset()
              statusEl.textContent = 'Sent! We will be in touch soon.'
            }else{
              statusEl.textContent = 'Could not send. Try again or email us directly.'
            }
          }catch(err){
            statusEl.textContent = 'Network error. Try again or email us directly.'
          }
        })
      }

      // lightweight tests
      console.assert(document.querySelectorAll('#contactForm').length === 1, 'Expected exactly 1 contact form with id="contactForm"')
      console.assert(document.querySelectorAll('.faq-item').length === 4, 'Expected 4 FAQ items')
      console.assert(document.querySelectorAll('.bubble').length > 0, 'Expected at least 1 bubble element')
    })()
