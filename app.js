// Ali Baba Marketing Pro V5 — theme + content store (staging prototype).
// Keys: abmp_theme, abmp_content, abmp_sections, abmp_appearance.
// Staging note: this prototype saves in THIS browser (localStorage), like a
// preview. The permanent version wires the same keys to Supabase, as ShopNest
// does, so a change in admin updates the live site for every visitor.
(function(){
  var THEMES = {
    "navy-cyan": "Navy + Cyan",
    "black-lime": "Black + Lime",
    "midnight-orange": "Midnight + Orange",
    "teal-white": "Teal + White",
    "navy-gold": "Navy + Gold",
    "coral-growth": "Coral Growth",
    "search-blue": "Search Blue",
    "saas-blue": "SaaS Blue",
    "mint-growth": "Mint Growth",
    "sunshine-creator": "Sunshine Creator",
    "violet-creator": "Violet Creator",
    "crimson-bold": "Crimson Bold",
    "ocean-agency": "Ocean Agency",
    "forest-premium": "Forest Premium",
    "slate-modern": "Slate Modern",
    "blush-rose": "Blush Rose",
    "sky-pastel": "Sky Pastel",
    "lavender-mist": "Lavender Mist",
    "mint-cream": "Mint Cream",
    "peach-glow": "Peach Glow",
    "butter-lemon": "Butter Lemon",
    "sage-calm": "Sage Calm",
    "powder-blue": "Powder Blue",
    "lilac-grey": "Lilac Grey",
    "sand-beige": "Sand Beige",
    "fashion-editorial": "Fashion Editorial",
    "beauty-glow": "Beauty Glow",
    "jewelry-luxe": "Jewelry Luxe",
    "home-warm": "Home Warm",
    "ecommerce-conversion": "E-commerce Conversion",
    "travel-wander": "Travel Wander",
    "food-appetite": "Food Appetite",
    "realestate-trust": "Real Estate Trust",
    "tech-indigo": "Tech Indigo",
    "health-vitality": "Health Vitality"
  };
  var DEFAULT_CONTENT = {
    heroTitle: "We Turn Scrolls Into Sales",
    heroSub: "Content people love, ads that convert, and reporting you can actually understand — for e-commerce, fashion, beauty and lifestyle brands.",
    heroCta: "Book a Free Audit",
    whatsapp: "0316-4324778",
    email: "alibabamarketing1@gmail.com"
  };
  function read(key, fallback){
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  }
  function save(key, val){ try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){} }
  function getTheme(){ return read("abmp_theme_v2", "black-lime") || "black-lime"; }
  function applyTheme(name){
    if(!THEMES[name]) name = "black-lime";
    document.documentElement.setAttribute("data-theme", name);
    save("abmp_theme_v2", name);
    document.querySelectorAll("[data-palette]").forEach(function(el){
      el.classList.toggle("active", el.getAttribute("data-palette") === name);
      var btn = el.querySelector(".palette-apply");
      if(btn) btn.textContent = el.getAttribute("data-palette") === name ? "✓ Active" : "Apply this palette";
    });
    var label = document.getElementById("activeThemeLabel");
    if(label) label.textContent = THEMES[name];
    var frame = document.getElementById("previewFrame");
    if(frame) frame.src = frame.src; // reload preview so it picks up the new theme
  }
  function applyContent(){
    var c = read("abmp_content", DEFAULT_CONTENT);
    var merged = Object.assign({}, DEFAULT_CONTENT, c);
    document.querySelectorAll("[data-content]").forEach(function(el){
      var k = el.getAttribute("data-content");
      if(merged[k]) el.textContent = merged[k];
    });
    var secs = read("abmp_sections", {});
    document.querySelectorAll("[data-section]").forEach(function(el){
      var k = el.getAttribute("data-section");
      if(secs[k] === false) el.style.display = "none";
    });
    var app = read("abmp_appearance", {});
    if(app.radius) document.documentElement.style.setProperty("--radius", app.radius + "px");
    return merged;
  }
  // Mobile menu toggle (fixes sticky header on mobile)
    var menuBtn=document.getElementById('menuBtn'), navLinks=document.getElementById('navLinks');
    if(menuBtn && navLinks){
      menuBtn.addEventListener('click', function(){
        var open=navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open);
        menuBtn.textContent=open?'✕':'☰';
      });
      navLinks.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ navLinks.classList.remove('open'); menuBtn.textContent='☰'; }); });
    }
  // Site behaviour: reveal, FAQ, counters
  document.addEventListener("DOMContentLoaded", function(){
    applyTheme(getTheme());
    var content = applyContent();
    // Admin page wiring
    var heroTitle = document.getElementById("fHeroTitle");
    if(heroTitle){
      heroTitle.value = content.heroTitle;
      document.getElementById("fHeroSub").value = content.heroSub;
      document.getElementById("fHeroCta").value = content.heroCta;
      document.getElementById("fWhatsapp").value = content.whatsapp;
      document.getElementById("fEmail").value = content.email;
      var secs = read("abmp_sections", {});
      document.querySelectorAll("[data-section-toggle]").forEach(function(cb){
        var k = cb.getAttribute("data-section-toggle");
        cb.checked = secs[k] !== false;
      });
      var app = read("abmp_appearance", {});
      var radius = document.getElementById("fRadius");
      if(radius && app.radius) radius.value = app.radius;
    }
    document.querySelectorAll("[data-palette]").forEach(function(el){
      el.addEventListener("click", function(){ applyTheme(el.getAttribute("data-palette")); });
    });
    var saveBtn = document.getElementById("saveContent");
    if(saveBtn) saveBtn.addEventListener("click", function(){
      save("abmp_content", {
        heroTitle: document.getElementById("fHeroTitle").value,
        heroSub: document.getElementById("fHeroSub").value,
        heroCta: document.getElementById("fHeroCta").value,
        whatsapp: document.getElementById("fWhatsapp").value,
        email: document.getElementById("fEmail").value
      });
      var secs = {};
      document.querySelectorAll("[data-section-toggle]").forEach(function(cb){
        secs[cb.getAttribute("data-section-toggle")] = cb.checked;
      });
      save("abmp_sections", secs);
      var radius = document.getElementById("fRadius");
      if(radius) save("abmp_appearance", { radius: radius.value });
      var msg = document.getElementById("saveMsg");
      if(msg){ msg.textContent = "✓ Saved. Open the homepage in this browser to see it with the active palette."; }
      var frame = document.getElementById("previewFrame");
      if(frame) frame.src = frame.src;
    });
    var resetBtn = document.getElementById("resetAll");
    if(resetBtn) resetBtn.addEventListener("click", function(){
      ["abmp_theme","abmp_theme_v2","abmp_content","abmp_sections","abmp_appearance"].forEach(function(k){
        try { localStorage.removeItem(k); } catch(e){}
      });
      location.reload();
    });
    // Reveal on scroll
    var els = document.querySelectorAll(".reveal");
    if("IntersectionObserver" in window){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: .12 });
      els.forEach(function(el){ io.observe(el); });
    } else { els.forEach(function(el){ el.classList.add("in"); }); }
    // FAQ
    document.querySelectorAll(".faq-q").forEach(function(b){
      b.addEventListener("click", function(){
        var item = b.parentElement, was = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); });
        if(!was) item.classList.add("open");
      });
    });
    // Counter animation
    document.querySelectorAll("[data-count]").forEach(function(el){
      var target = parseInt(el.getAttribute("data-count"), 10), n = 0;
      var t = setInterval(function(){ n += Math.ceil(target/30); if(n >= target){ n = target; clearInterval(t); } el.textContent = n; }, 40);
    });
  });
  window.ABMP = { applyTheme: applyTheme, THEMES: THEMES };
})();
