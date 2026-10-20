// Ali Baba Marketing Pro — site scripts
(function(){
  // Mobile menu
  var btn=document.getElementById('menuBtn'), nav=document.getElementById('navLinks');
  if(btn&&nav){btn.addEventListener('click',function(){
    var open=nav.classList.toggle('open'); btn.setAttribute('aria-expanded',open); btn.textContent=open?'✕':'☰';});}
  // Active nav link
  var file=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.nav-links a').forEach(function(a){
    if(a.getAttribute('data-nav')===file){a.classList.add('active');}});
  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(b){b.addEventListener('click',function(){
    var item=b.parentElement, was=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});
    if(!was)item.classList.add('open');});});
  // Reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in'); io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(el){io.observe(el);});
  } else { els.forEach(function(el){el.classList.add('in');}); }
  // Back to top
  var top=document.getElementById('toTop');
  if(top){window.addEventListener('scroll',function(){
    top.classList.toggle('show',window.scrollY>600);});
    top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});}
  // Year
  var y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
  // Contact form -> FormSubmit AJAX: delivers to agency Gmail + in-page success message
  var form=document.getElementById('contactForm');
  if(form){form.addEventListener('submit',function(ev){ev.preventDefault();
    var success=document.getElementById('formSuccess'), error=document.getElementById('formError');
    var btn=document.getElementById('sendBtn');
    if(success)success.hidden=true; if(error)error.hidden=true;
    var d=new FormData(form);
    if(d.get('_honey'))return; // spam honeypot
    if(btn){btn.disabled=true; btn.textContent='Sending…';}
    fetch('https://formsubmit.co/ajax/alibabamarketing1@gmail.com',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({
        name:d.get('name'), email:d.get('email'), _replyto:d.get('email'),
        service:d.get('service'), message:d.get('message'),
        _subject:'New Website Enquiry — '+d.get('service'),
        _template:'table', _captcha:'false', _honey:''
      })
    }).then(function(r){return r.json().catch(function(){return{};}).then(function(j){return{ok:r.ok,j:j};});})
    .then(function(res){
      if(res.ok && String(res.j.success)!=='false'){
        form.reset();
        if(success){success.hidden=false; success.scrollIntoView({behavior:'smooth',block:'center'});}
      } else { if(error){ var msg=document.getElementById('formErrorMsg');
          if(msg && res.j && res.j.message && /activation/i.test(res.j.message)){
            msg.textContent='This form is not activated yet. The site owner needs to click the "Activate Form" link emailed to alibabamarketing1@gmail.com — after activation, your message will be delivered here instantly.';
          } error.hidden=false; } }
    }).catch(function(){ if(error)error.hidden=false; })
    .finally(function(){ if(btn){btn.disabled=false; btn.textContent='Send Message →';} });
  });}
})();
