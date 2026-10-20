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
  // Contact form -> mailto compose
  var form=document.getElementById('contactForm');
  if(form){form.addEventListener('submit',function(ev){ev.preventDefault();
    var d=new FormData(form);
    var subject=encodeURIComponent('New Project Enquiry — '+(d.get('service')||'Ali Baba Marketing Pro'));
    var body=encodeURIComponent('Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nService: '+d.get('service')+'\n\n'+d.get('message'));
    location.href='mailto:alibabamarketing1@gmail.com?subject='+subject+'&body='+body;});}
})();
