(() => {
  const C = window.clinic, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const lang = document.documentElement.lang === "ar" ? "ar" : "fr";
  const ls = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const track = (n, p = {}) => window.gtag && gtag("event", n, { ...p, language: lang, department_name: document.body.dataset.dept });

  /* Analytics only after consent */
  function loadAnalytics() {
    if (C.ga4) {
      const s = document.createElement("script");
      s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + C.ga4;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag("js", new Date()); gtag("config", C.ga4);
    }
    if (C.pixel) {
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", C.pixel); fbq("track", "PageView");
    }
  }
  const box = $("#consent"), saved = ls.get("cookieConsent");
  if (saved === "accepted") loadAnalytics(); else if (!saved) box.hidden = false;
  $("#c-yes").onclick = () => { ls.set("cookieConsent", "accepted"); box.hidden = true; loadAnalytics(); };
  $("#c-no").onclick = () => { ls.set("cookieConsent", "declined"); box.hidden = true; };

  /* Contact data from config (Arabic address on the Arabic page) */
  $$("[data-bind]").forEach(e => { const k = e.dataset.bind; e.textContent = (lang === "ar" && C[k + "Ar"]) || C[k]; });
  const hrefs = { tel: "tel:" + C.tel, mail: "mailto:" + C.email, fb: C.links.fb, ig: C.links.ig, maps: C.links.maps, reviews: C.links.reviews };
  $$("[data-href]").forEach(e => e.href = hrefs[e.dataset.href]);

  /* WhatsApp links: message in the page language, naming the service */
  function refreshLinks() {
    const d = document.body.dataset.dept;
    $$("[data-wa]").forEach(a => {
      const card = a.closest(".card");
      const svc = (card ? $("h3", card) : $('[data-set="' + d + '"]')).textContent.trim();
      a.href = "https://wa.me/" + C.wa + "?text=" + encodeURIComponent(C.msg[lang](svc));
      a.dataset.svc = svc;
    });
  }
  function setDept(d) {
    document.body.dataset.dept = d;
    $$("[data-set]").forEach(b => b.setAttribute("aria-pressed", b.dataset.set === d));
    refreshLinks();
  }

  document.addEventListener("click", e => {
    const s = e.target.closest("[data-set]");
    if (s) { setDept(s.dataset.set); track("select_department"); }
    const t = e.target.closest("[data-track]");
    if (t) {
      const k = t.dataset.track;
      track("click_" + k, { service_name: t.dataset.svc, event_category: k === "booking" ? "Conversion" : "Engagement" });
      if (k === "booking" && window.fbq) fbq("track", "Schedule");
    }
  });

  const mt = $(".menu-toggle"), nav = $("#nav");
  const closeNav = () => { nav.classList.remove("open"); mt.setAttribute("aria-expanded", "false"); };
  mt.onclick = () => mt.setAttribute("aria-expanded", nav.classList.toggle("open"));
  nav.onclick = e => { if (e.target.tagName === "A") closeNav(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeNav(); });
  document.addEventListener("click", e => { if (!e.target.closest(".top")) closeNav(); });

  /* Local SEO schema */
  $("#ld").textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": ["MedicalClinic", "Dentist"],
    name: C.name, url: C.site + (lang === "ar" ? "/ar/" : "/"), image: C.image, telephone: C.tel, email: C.email, inLanguage: lang,
    address: { "@type": "PostalAddress", streetAddress: C.address, addressLocality: "Sidi Abdellah", addressRegion: "Alger", addressCountry: "DZ" },
    geo: { "@type": "GeoCoordinates", latitude: C.geo[0], longitude: C.geo[1] },
    sameAs: [C.links.fb, C.links.ig], hasMap: C.links.maps,
    openingHoursSpecification: C.open24h ? { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" } : undefined
  });

  $("#yr").textContent = new Date().getFullYear();
  setDept(location.hash === "#dental" ? "dental" : "medical");
})();
