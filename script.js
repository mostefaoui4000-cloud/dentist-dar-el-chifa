document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DYNAMIC GA4 & META PIXEL INJECTION
  // ==========================================
  function loadAnalytics() {
    if (!window.clinicConfig || !clinicConfig.analytics) return;
    const { ga4Id, metaPixelId } = clinicConfig.analytics;

    if (ga4Id && ga4Id.trim() !== "") {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', ga4Id, { 'send_page_view': true });
    }

    if (metaPixelId && metaPixelId.trim() !== "") {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', metaPixelId);
      fbq('track', 'PageView');
    }
  }

  // Cookie Consent Handler
  const consentBanner = document.getElementById("consentBanner");
  const consentAccept = document.getElementById("consentAccept");
  const consentDecline = document.getElementById("consentDecline");
  const storedConsent = localStorage.getItem("cookieConsent");

  if (storedConsent === "accepted") {
    loadAnalytics();
  } else if (storedConsent !== "declined" && consentBanner) {
    consentBanner.classList.add("visible");
  }

  if (consentAccept) {
    consentAccept.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      if (consentBanner) consentBanner.classList.remove("visible");
      loadAnalytics();
    });
  }
  if (consentDecline) {
    consentDecline.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      if (consentBanner) consentBanner.classList.remove("visible");
    });
  }

  // ==========================================
  // 2. EVENT TRACKING & BOOKING LISTENERS
  // ==========================================
  const attachBookingListeners = (container) => {
    const targets = container ? container.querySelectorAll(".open-booking") : document.querySelectorAll(".open-booking");
    targets.forEach(btn => {
      if (btn.dataset.listenerAttached === "true") return;
      btn.dataset.listenerAttached = "true";

      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        let bookingUrl = btn.getAttribute("data-booking-url");
        if (!bookingUrl && window.clinicConfig) {
          const activeDept = document.body.getAttribute("data-active-dept") || "medical";
          bookingUrl = (clinicConfig.bookingLinks && clinicConfig.bookingLinks[activeDept]) || clinicConfig.bookingLinks.default;
        }

        if (window.gtag) gtag('event', 'click_booking', { 'event_category': 'Conversion' });
        if (window.fbq) fbq('track', 'Schedule');

        openBookingModal(bookingUrl);
      });
    });
  };

  document.querySelectorAll(".whatsapp-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.gtag) gtag('event', 'click_whatsapp', { 'event_category': 'Conversion' });
      if (window.fbq) fbq('track', 'Contact');
    });
  });

  function openBookingModal(url) {
    const targetUrl = url || (clinicConfig.bookingLinks ? clinicConfig.bookingLinks.default : '#');
    window.open(targetUrl, "_blank");
  }

  // ==========================================
  // 3. DYNAMIC CONFIG & SEO INJECTION
  // ==========================================
  if (window.clinicConfig) {
    const pageUrl = clinicConfig.siteUrl ? clinicConfig.siteUrl.replace(/\/$/, "") + "/" : window.location.href;
    const ogImageUrl = clinicConfig.siteUrl ? clinicConfig.siteUrl.replace(/\/$/, "") + "/images/hero.jpg" : window.location.href + "images/hero.jpg";

    if (clinicConfig.pageTitle) document.title = clinicConfig.pageTitle;
    const setMeta = (id, attr, value) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute(attr, value);
    };

    setMeta("meta-description", "content", clinicConfig.metaDescription);
    setMeta("canonical-link", "href", pageUrl);
    setMeta("og-title", "content", clinicConfig.pageTitle);
    setMeta("og-description", "content", clinicConfig.metaDescription);
    setMeta("og-image", "content", ogImageUrl);
    setMeta("og-url", "content", pageUrl);
    setMeta("twitter-title", "content", clinicConfig.pageTitle);
    setMeta("twitter-description", "content", clinicConfig.metaDescription);
    setMeta("twitter-image", "content", ogImageUrl);

    const logoImg = document.getElementById("logo-img");
    if (logoImg) logoImg.alt = `${clinicConfig.name} logo`;

    document.querySelectorAll(".dynamic-clinic-name").forEach(el => el.textContent = clinicConfig.name);
    if (clinicConfig.doctorName) {
      document.querySelectorAll(".dynamic-doctor-name").forEach(el => el.textContent = clinicConfig.doctorName);
    }
    document.querySelectorAll(".dynamic-speciality").forEach(el => el.textContent = clinicConfig.speciality);

    document.querySelectorAll(".whatsapp-btn").forEach(el => el.href = `https://wa.me/${clinicConfig.whatsapp}`);
    document.querySelectorAll(".dynamic-phone-link").forEach(el => {
      el.textContent = clinicConfig.phone;
      el.href = `tel:${clinicConfig.phone.replace(/\s+/g, '')}`;
    });
    document.querySelectorAll(".dynamic-email-link").forEach(el => {
      el.textContent = clinicConfig.email;
      el.href = `mailto:${clinicConfig.email}`;
    });

    const addressEl = document.querySelector(".address-text");
    if (addressEl) addressEl.textContent = `📍 ${clinicConfig.address}`;

    const mapsIframe = document.getElementById("maps-target");
    if (mapsIframe) mapsIframe.src = clinicConfig.mapsEmbedUrl;
  }

  // ==========================================
  // 4. DEPARTMENT SWITCHER & SERVICES RENDERER
  // ==========================================
  function renderServices(servicesArray) {
    const container = document.getElementById("services-target");
    if (!container || !servicesArray) return;

    container.innerHTML = servicesArray.map(service => {
      const descriptionText = service.desc || service.description || '';
      const bookingType = service.bookingType || 'default';
      const defaultUrl = clinicConfig && clinicConfig.bookingLinks ? (clinicConfig.bookingLinks[bookingType] || clinicConfig.bookingLinks.default) : '#';
      const bookingUrl = service.bookingUrl || defaultUrl;

      return `
        <div class="service-card fade-up visible">
          <div class="service-icon">${service.icon || '🩺'}</div>
          <h3>${service.title}</h3>
          <p>${descriptionText}</p>
          <button class="btn btn-primary open-booking" data-booking-url="${bookingUrl}">
            Prendre RDV &rarr;
          </button>
        </div>
      `;
    }).join('');

    attachBookingListeners(container);
  }

function applyDepartmentState(dept) {
  document.body.setAttribute("data-active-dept", dept);

  // 1. Sync Department Switcher Buttons
  document.querySelectorAll(".dept-switch-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-dept") === dept);
  });

  // 2. Change Theme Primary Color
  if (window.clinicConfig && clinicConfig.colors) {
    const activeColor = (dept === "medical") ? clinicConfig.colors.primary : clinicConfig.colors.secondary;
    document.documentElement.style.setProperty('--primary-color', activeColor);
  }

  // 3. Dynamic Hero Content Swap
  const heroTitle = document.querySelector("#hero h1");
  const heroImg = document.querySelector(".hero-image img");
  const heroBtn = document.getElementById("hero-main-btn");

  if (dept === "medical") {
    if (heroTitle) heroTitle.innerHTML = "Votre santé globale et consultations <strong>Médecine Générale</strong>.";
    if (heroImg) heroImg.src = "images/medical-team.jpg";
    if (heroBtn) {
      heroBtn.innerHTML = "🩺 Prendre RDV Consultation Médicale";
      heroBtn.setAttribute("data-booking-url", clinicConfig.bookingLinks ? clinicConfig.bookingLinks.medical : "#");
    }
  } else {
    if (heroTitle) heroTitle.innerHTML = "Votre plus beau sourire avec nos experts en <strong>Chirurgie Dentaire</strong>.";
    if (heroImg) heroImg.src = "images/dental-team.jpg";
    if (heroBtn) {
      heroBtn.innerHTML = "🦷 Prendre RDV Soins Dentaires";
      heroBtn.setAttribute("data-booking-url", clinicConfig.bookingLinks ? clinicConfig.bookingLinks.dental : "#");
    }
  }

  // 4. Render Only the Active Department Services
  if (window.clinicConfig) {
    const services = (dept === "medical") ? clinicConfig.medicalServices : clinicConfig.dentalServices;
    renderServices(services);
  }

  // 5. Hide the Opposite Department Card Entirely in the About Section
  document.querySelectorAll(".dept-card").forEach(card => {
    const cardDept = card.getAttribute("data-dept");
    if (cardDept === dept) {
      card.style.setProperty("display", "flex", "important");
    } else {
      card.style.setProperty("display", "none", "important");
    }
  });
}
  // Delegated Click Listener for Department Switcher
  document.body.addEventListener("click", (e) => {
    const switchBtn = e.target.closest(".dept-switch-btn");
    if (switchBtn) {
      const selectedDept = switchBtn.getAttribute("data-dept");
      applyDepartmentState(selectedDept);
    }
  });

  // Initial State Load
  applyDepartmentState("medical");

  // ==========================================
  // 5. REVIEWS & HOURS RENDERERS
  // ==========================================
  if (window.clinicConfig && clinicConfig.reviews) {
    const reviewsTarget = document.getElementById("reviews-target");
    if (reviewsTarget) {
      reviewsTarget.innerHTML = "";
      clinicConfig.reviews.forEach(r => {
        const card = document.createElement("div");
        card.className = "review-card";

        const stars = document.createElement("div");
        stars.className = "star-rating";
        stars.textContent = "★".repeat(r.rating || 5);

        const text = document.createElement("p");
        text.textContent = `"${r.text}"`;

        const author = document.createElement("div");
        author.className = "review-author";
        author.textContent = `- ${r.name}`;

        card.append(stars, text, author);
        reviewsTarget.appendChild(card);
      });
    }
  }

  if (window.clinicConfig && clinicConfig.hours) {
    const hoursTarget = document.getElementById("hours-target");
    if (hoursTarget) {
      hoursTarget.innerHTML = "";
      clinicConfig.hours.forEach(h => {
        const li = document.createElement("li");
        const days = document.createElement("strong");
        days.textContent = h.days;

        const time = document.createElement("span");
        time.textContent = h.time;

        li.append(days, time);
        hoursTarget.appendChild(li);
      });
    }
  }

  // ==========================================
  // 6. BEFORE / AFTER DRAG SLIDER
  // ==========================================
  const baTarget = document.getElementById("before-after-target");
  if (baTarget && window.clinicConfig && clinicConfig.beforeAfterCases) {
    baTarget.innerHTML = "";
    clinicConfig.beforeAfterCases.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "ba-card fade-up";
      const itemDesc = item.desc || item.description || '';

      card.innerHTML = `
        <div class="ba-slider-container" id="ba-container-${idx}">
          <div class="ba-image ba-after">
            <img src="${item.afterImg}" alt="${item.title} - Après" loading="lazy">
            <span class="ba-badge after-badge">Après</span>
          </div>
          <div class="ba-before" id="ba-before-${idx}">
            <img src="${item.beforeImg}" alt="${item.title} - Avant" id="ba-before-img-${idx}" loading="lazy">
            <span class="ba-badge before-badge">Avant</span>
          </div>
          <div class="ba-line" id="ba-line-${idx}">
            <div class="ba-button">↔</div>
          </div>
          <input type="range" min="0" max="100" value="50" class="ba-range" aria-label="Comparer Avant et Après" data-index="${idx}">
        </div>
        <div class="ba-info">
          <h3>${item.title}</h3>
          <p>${itemDesc}</p>
        </div>
      `;

      baTarget.appendChild(card);
    });

    document.querySelectorAll(".ba-range").forEach(range => {
      const updateSlider = () => {
        const idx = range.getAttribute("data-index");
        const val = range.value;
        const container = document.getElementById(`ba-container-${idx}`);
        const before = document.getElementById(`ba-before-${idx}`);
        const beforeImg = document.getElementById(`ba-before-img-${idx}`);
        const line = document.getElementById(`ba-line-${idx}`);

        if (container && before && beforeImg && line) {
          const containerWidth = container.offsetWidth;
          before.style.width = `${val}%`;
          beforeImg.style.width = `${containerWidth}px`;
          line.style.left = `${val}%`;
        }
      };

      range.addEventListener("input", updateSlider);
      window.addEventListener("resize", updateSlider);
      setTimeout(updateSlider, 100);
    });
  }

  // ==========================================
  // 7. MOBILE NAVIGATION & MODALS
  // ==========================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const modal = document.getElementById("bookingModal");
  const closeModal = document.querySelector(".close-modal");
  const iframeContainer = document.getElementById("iframe-container");

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      if (iframeContainer) iframeContainer.innerHTML = "";
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal.click();
    });
  }

  attachBookingListeners(document);

  // ==========================================
  // 8. SCROLL ANIMATIONS & STATS
  // ==========================================
  const fadeElements = document.querySelectorAll(".fade-up");
  const appearanceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);

        if (entry.target.classList.contains('about')) {
          triggerCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => appearanceObserver.observe(el));

  const aboutSection = document.querySelector(".about");
  if (aboutSection) appearanceObserver.observe(aboutSection);

  function triggerCounters() {
    if (!window.clinicConfig || !clinicConfig.stats) return;
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
      const type = counter.getAttribute("data-target");
      const target = clinicConfig.stats[type] || 0;
      let count = 0;
      const speed = target / 30;

      const updateCount = () => {
        if (count < target) {
          count = Math.ceil(count + speed);
          counter.innerText = count > target ? target + "+" : count + "+";
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + "+";
        }
      };
      updateCount();
    });
  }

  // ==========================================
  // 9. SCHEMA MARKUP
  // ==========================================
  if (window.clinicConfig) {
    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": clinicConfig.name,
      "image": window.location.href + "images/hero.jpg",
      "telephone": clinicConfig.phone,
      "email": clinicConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": clinicConfig.address,
        "addressLocality": "Alger",
        "addressCountry": "DZ"
      },
      "url": window.location.href
    };

    const schemaScript = document.getElementById("schema-json");
    if (schemaScript) schemaScript.text = JSON.stringify(schemaMarkup);
  }
});