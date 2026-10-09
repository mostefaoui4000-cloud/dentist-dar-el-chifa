document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("clinic_lang") || "fr";

  // 1. ANALYTICS & CONSENT
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

  // 2. BOOKING LISTENERS
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

        window.open(bookingUrl, "_blank");
      });
    });
  };

  // 3. DYNAMIC CONFIG & META INJECTION
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

    document.querySelectorAll(".dynamic-clinic-name").forEach(el => el.textContent = clinicConfig.name);
    document.querySelectorAll(".dynamic-phone-link").forEach(el => {
      el.textContent = clinicConfig.phone;
      el.href = `tel:${clinicConfig.phone.replace(/\s+/g, '')}`;
    });
    document.querySelectorAll(".dynamic-email-link").forEach(el => {
      el.textContent = clinicConfig.email;
      el.href = `mailto:${clinicConfig.email}`;
    });

    const mapsIframe = document.getElementById("maps-target");
    if (mapsIframe) mapsIframe.src = clinicConfig.mapsEmbedUrl;
  }

  // 4. SERVICES RENDERER
  function renderServices(servicesArray) {
    const container = document.getElementById("services-target");
    if (!container || !servicesArray) return;

    const isAr = currentLang === "ar";

    container.innerHTML = servicesArray.map(service => {
      const title = isAr && service.arTitle ? service.arTitle : service.title;
      const desc = isAr && service.arDesc ? service.arDesc : service.desc;
      const bookingType = service.bookingType || 'default';
      const bookingUrl = clinicConfig && clinicConfig.bookingLinks ? (clinicConfig.bookingLinks[bookingType] || clinicConfig.bookingLinks.default) : '#';
      const btnLabel = isAr ? "احجز الآن &larr;" : "Prendre RDV &rarr;";

      return `
        <div class="service-card fade-up visible">
          <div class="service-icon">${service.iconSvg || '🩺'}</div>
          <h3>${title}</h3>
          <p>${desc}</p>
          <button class="btn btn-primary open-booking" data-booking-url="${bookingUrl}">
            ${btnLabel}
          </button>
        </div>
      `;
    }).join('');

    attachBookingListeners(container);
  }

  // 5. HOURS RENDERER
  function renderHours(dept) {
    const hoursTarget = document.getElementById("hours-target");
    if (!hoursTarget || !clinicConfig.departmentHours) return;

    const list = clinicConfig.departmentHours[dept] || clinicConfig.departmentHours.medical;
    hoursTarget.innerHTML = list.map(h => `
      <li>
        <strong>${h.days}</strong>
        <span>${h.time}</span>
      </li>
    `).join('');
  }

  // 6. DEPARTMENT STATE MANAGEMENT
  function applyDepartmentState(dept) {
    document.body.setAttribute("data-active-dept", dept);

    document.querySelectorAll(".dept-switch-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-dept") === dept);
    });

    if (window.clinicConfig && clinicConfig.colors) {
      const activeColor = (dept === "medical") ? clinicConfig.colors.primary : clinicConfig.colors.secondary;
      document.documentElement.style.setProperty('--primary-color', activeColor);
    }

    const heroTitle = document.querySelector("#hero h1");
    const heroBtn = document.getElementById("hero-main-btn");
    const dict = window.clinicConfig && window.clinicConfig.i18n ? window.clinicConfig.i18n[currentLang] : null;

    if (dept === "medical") {
      if (heroTitle && dict) heroTitle.innerHTML = dict.heroTitleMedical;
      if (heroBtn && dict) {
        heroBtn.innerHTML = dict.btnMedical;
        heroBtn.setAttribute("data-booking-url", clinicConfig.bookingLinks ? clinicConfig.bookingLinks.medical : "#");
      }
    } else {
      if (heroTitle && dict) heroTitle.innerHTML = dict.heroTitleDental;
      if (heroBtn && dict) {
        heroBtn.innerHTML = dict.btnDental;
        heroBtn.setAttribute("data-booking-url", clinicConfig.bookingLinks ? clinicConfig.bookingLinks.dental : "#");
      }
    }

    if (window.clinicConfig) {
      const services = (dept === "medical") ? clinicConfig.medicalServices : clinicConfig.dentalServices;
      renderServices(services);
      renderHours(dept);
    }

    document.querySelectorAll(".dept-card, .gallery-item").forEach(item => {
      const itemDept = item.getAttribute("data-dept");
      if (!itemDept || itemDept === dept) {
        item.style.setProperty("display", "block", "important");
      } else {
        item.style.setProperty("display", "none", "important");
      }
    });
  }

  document.body.addEventListener("click", (e) => {
    const switchBtn = e.target.closest(".dept-switch-btn");
    if (switchBtn) {
      const selectedDept = switchBtn.getAttribute("data-dept");
      applyDepartmentState(selectedDept);
    }
  });

  // 7. COMPLETE LANGUAGE SWITCHER ENGINE
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("clinic_lang", lang);

    const isAr = lang === "ar";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");

    const langBtnText = document.getElementById("current-lang-text");
    if (langBtnText) {
      langBtnText.textContent = isAr ? "FR" : "AR";
    }

    if (!window.clinicConfig || !window.clinicConfig.i18n) return;
    const dict = window.clinicConfig.i18n[lang];

    const updateText = (selector, text) => {
      const el = document.querySelector(selector);
      if (el && text) el.innerHTML = text;
    };

    // Header & Navigation
    updateText(".brand-subtitle", dict.brandSubtitle);
    updateText('a[href="#hero"]', dict.navHome);
    updateText('a[href="#services"]', dict.navServices);
    updateText('a[href="#before-after"]', dict.navBeforeAfter);
    updateText('a[href="#gallery"]', dict.navGallery);
    updateText('a[href="#reviews"]', dict.navReviews);
    updateText('a[href="#contact"]', dict.navContact);

    // Hero Description
    updateText('.hero-text p', dict.heroDesc);

    // Why Choose Us Section
    updateText('.why-choose-us .section-header h2', dict.whyTitle);
    updateText('.why-choose-us .section-header p', dict.whySubtitle);
    
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length >= 4) {
      featureCards[0].querySelector('h3').innerHTML = dict.whyFeature1Title;
      featureCards[0].querySelector('p').innerHTML = dict.whyFeature1Desc;
      featureCards[1].querySelector('h3').innerHTML = dict.whyFeature2Title;
      featureCards[1].querySelector('p').innerHTML = dict.whyFeature2Desc;
      featureCards[2].querySelector('h3').innerHTML = dict.whyFeature3Title;
      featureCards[2].querySelector('p').innerHTML = dict.whyFeature3Desc;
      featureCards[3].querySelector('h3').innerHTML = dict.whyFeature4Title;
      featureCards[3].querySelector('p').innerHTML = dict.whyFeature4Desc;
    }

    // Section Titles & Subtitles
    updateText('.services .section-header h2', dict.servicesTitle);
    updateText('.services .section-header p', dict.servicesSubtitle);
    updateText('.before-after .section-header h2', dict.beforeAfterTitle);
    updateText('.before-after .section-header p', dict.beforeAfterSubtitle);
    updateText('.gallery .section-header h2', dict.galleryTitle);
    updateText('.gallery .section-header p', dict.gallerySubtitle);
    updateText('.reviews .section-header h2', dict.reviewsTitle);
    updateText('.reviews .section-header p', dict.reviewsSubtitle);

    // Contact Section
    updateText('.contact-info h2', dict.contactTitle);
    updateText('.contact-lead', dict.contactLead);
    updateText('.contact-item:nth-child(1) strong', dict.addressLabel);
    updateText('.contact-item:nth-child(2) strong', dict.phoneLabel);
    updateText('.contact-item:nth-child(3) strong', dict.emailLabel);
    updateText('.hours-box h3', dict.hoursTitle);

    // Call to Action
    updateText('.cta-section h2', dict.ctaTitle);
    updateText('.cta-section p', dict.ctaDesc);
    updateText('.cta-actions .open-booking', dict.ctaBtnBooking);
    updateText('.cta-actions .whatsapp-btn', dict.ctaBtnWa);

    // Footer
    const footerP = document.querySelector('footer .footer-container p:first-child');
    if (footerP) {
      footerP.innerHTML = `&copy; 2026 <span class="dynamic-clinic-name">${window.clinicConfig.name}</span>. ${dict.footerRights}`;
    }

    const activeDept = document.body.getAttribute("data-active-dept") || "medical";
    applyDepartmentState(activeDept);
  }

  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const nextLang = currentLang === "fr" ? "ar" : "fr";
      applyLanguage(nextLang);
    });
  }

  // Initialize Language State
  applyLanguage(currentLang);

  // 8. REVIEWS RENDERER
  if (window.clinicConfig && clinicConfig.reviews) {
    const reviewsTarget = document.getElementById("reviews-target");
    if (reviewsTarget) {
      reviewsTarget.innerHTML = clinicConfig.reviews.map(r => {
        const isArabic = /[\u0600-\u06FF]/.test(r.text);
        const textAttr = isArabic ? 'dir="rtl" lang="ar" class="ar-review"' : '';
        return `
          <div class="review-card">
            <div class="star-rating">★★★★★</div>
            <p ${textAttr}>"${r.text}"</p>
            <div class="review-author">- ${r.name}</div>
            <small class="review-dept">${r.department}</small>
          </div>
        `;
      }).join('');
    }
  }

  // 9. BEFORE / AFTER COMPARISON SLIDER
  const baTarget = document.getElementById("before-after-target");
  if (baTarget && window.clinicConfig && clinicConfig.beforeAfterCases) {
    baTarget.innerHTML = clinicConfig.beforeAfterCases.map((item, idx) => `
      <div class="ba-card fade-up visible">
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
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');

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

  // 10. MOBILE MENU TOGGLE
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

  attachBookingListeners(document);

  // 11. LOCAL SEO JSON-LD SCHEMA
  if (window.clinicConfig) {
    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": ["MedicalClinic", "Dentist"],
      "name": clinicConfig.name,
      "image": clinicConfig.siteUrl + "/images/hero.jpg",
      "telephone": clinicConfig.phone,
      "email": clinicConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": clinicConfig.address,
        "addressLocality": "Alger",
        "addressCountry": "DZ"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.672683,
        "longitude": 2.843024
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "url": clinicConfig.siteUrl
    };

    const schemaScript = document.getElementById("schema-json");
    if (schemaScript) schemaScript.text = JSON.stringify(schemaMarkup);
  }
});