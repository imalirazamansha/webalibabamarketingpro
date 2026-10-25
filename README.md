# Ali Baba Marketing Pro — Official Website (V5)

Multi-page, SEO-optimised website for **Ali Baba Marketing Pro**, a growth-first digital marketing agency based in Lahore, serving clients worldwide.

## Live Site
Published via GitHub Pages: https://imalirazamansha.github.io/webalibabamarketingpro/

## V5 — Black + Lime default, 35 palettes in admin
- Default theme: Black + Lime (dark black, lime green accents, modern growth feel).
- All 35 palettes live in the secret admin panel, so the owner can switch the whole site look without a rebuild: original 5, 10 big-company-style, 10 soft/pastel, 10 industry-mapped.
- Pages are self-contained (CSS and JavaScript inlined), so each page works on its own. Shared files `styles.css` / `script.js` in this repo are kept for the ShopNest landing page (`shopnest.html`), which still uses the earlier theme — do not delete them.
- Secret admin file (not linked from the public site, noindex): `abmp-admin-m7k9x2.html` — palette switcher, content/section/appearance editing, live preview. Basic passcode gate for a static site; permanent server-level admin sign-in (Supabase, as ShopNest uses) is the next security step.

## Pages (all interlinked)
- `index.html` — Home (hero, icon marquee, services, growth journey Get Found → Get Chosen → Keep Customers, free-audit checklist, made for Pakistani businesses, FAQ)
- `about.html` — About Us (story, mission & values, team model)
- `services.html` — 9 detailed services
- `industries.html` — 8 industry playbooks (fashion, beauty, jewelry, home, e-commerce/DTC, travel, food, local)
- `portfolio.html` — Campaign systems & reporting approach
- `blog.html` — 3 guides in easy English (reel hooks, Meta ads for DTC, 30-day content calendar)
- `contact.html` — Contact form (Web3Forms — submissions delivered to Gmail, in-page success message). Fields: name, email, phone number, WhatsApp number, business/website, service, message, plus checkboxes for contact preference: Call me / WhatsApp me.
- `privacy.html` — Privacy policy
- `shopnest.html` — ShopNest resell landing page (earlier theme, preserved)

## Copy and SEO
- Easy English for a Pakistani audience: short sentences, simple words, local examples (Instagram sellers, small shops, WhatsApp ordering).
- Unique title + meta description + keywords per page, canonical URLs, Open Graph & Twitter cards, JSON-LD Organization data, semantic HTML with one H1 per page, `sitemap.xml` (8 URLs) and `robots.txt` (admin disallowed).
- Fully responsive / mobile-first: full-width tap targets, 16px form inputs, responsive grids and marquee.

## Security notes (static GitHub Pages)
- Forms use HTTPS POST to Web3Forms with a honeypot anti-spam field and input validation. No passwords or private data are stored in the site files.
- Admin is not linked publicly, is noindex/nofollow, and sits behind a passcode gate. This is a deterrent on a static site, not server authentication.

## Contact
Email: alibabamarketing1@gmail.com — Lahore, Pakistan · Mon–Sat 9am–7pm PKT
