const clinicConfig = {
  name: "Dar El Chifaa",
  departments: {
    medical: {
      title: "Pôle Médecine Générale & Assermentée",
      lead: "Médecins Généralistes & Experts Assermentés",
      desc: "Une équipe de médecins dévoués aux consultations générales, au suivi de santé globale et à la délivrance de certificats officiels."
    },
    dental: {
      title: "Pôle Chirurgie Dentaire & Esthétique",
      lead: "Chirurgiens-Dentistes & Orthodontistes",
      desc: "Des spécialistes de la santé bucco-dentaire dédiés aux soins chirurgicaux, prothétiques et à l'esthétique de votre sourire."
    }
  },
  speciality: "Centre Médical & Dentaire Assermenté",

  siteUrl: "https://www.darelchifaa.dz",
  pageTitle: "Centre Médical & Dentaire Dar El Chifaa | عيادة دار الشفاء",
  metaDescription: "Centre pluridisciplinaire Dar El Chifaa: Soins médicaux généraux, médecine assermentée et chirurgie dentaire à Sidi Abdellah, Alger.",

  phone: "0770 74 74 14",
  phoneRaw: "+213770747414",
  whatsapp: "213770747414",
  email: "contact@darelchifaa.dz",
  address: "Sidi Abdellah, Cité 5000 Logements Aslan, Entrée Atlas 13300, Alger",
  
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3200.0756122857074!2d2.8430239999999998!3d36.672683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDQwJzIxLjciTiAywrA1MCczNC45IkU!5e0!3m2!1sen!2sdz!4v1790876591765!5m2!1sen!2sdz",
  
  facebook: "https://facebook.com/darelchifaa",
  instagram: "https://instagram.com/darelchifaa",
  
  analytics: {
    ga4Id: "",
    metaPixelId: ""
  },

  colors: {
    primary: "#1D5299",
    secondary: "#E05038",
    background: "#F4F7FA",
    text: "#1A1A1A"
  },

  bookingLinks: {
    medical: "https://wa.me/213770747414?text=Bonjour,%20je%20souhaite%20réserver%20une%20consultation%20médicale",
    dental: "https://wa.me/213770747414?text=Bonjour,%20je%20souhaite%20réserver%20un%20rendez-vous%20dentaire",
    default: "https://wa.me/213770747414?text=Bonjour,%20je%20souhaite%20réserver%20un%20rendez-vous"
  },

  medicalServices: [
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A7.5 7.5 0 0 0 12 12.5 7.5 7.5 0 0 0 19.5 5V2.6a.3.3 0 0 0-.3-.3h-2.4a.3.3 0 0 0-.3.3V5a4.5 4.5 0 0 1-9 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M12 12.5v4.5"/><circle cx="12" cy="19" r="2"/></svg>`, 
      title: "Médecine Générale", 
      arTitle: "الطب العام",
      desc: "Consultations médicales générales, examens cliniques et suivi de santé globale.", 
      arDesc: "فحوصات طبية عامة، متابعة صحية شاملة وفحوصات إكلينيكية.",
      bookingType: "medical" 
    },
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`, 
      title: "Cabinet Assermenté", 
      arTitle: "طب معتمد",
      desc: "Délivrance de certificats médicaux officiels, expertises et démarches réglementaires.", 
      arDesc: "تسليم الشهادات الطبية الرسمية والخبرات القضائية والإدارية.",
      bookingType: "medical" 
    },
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 8v4"/><path d="M10 10h4"/></svg>`, 
      title: "Soins & Urgences", 
      arTitle: "علاجات وإسعافات",
      desc: "Prise en charge rapide des urgences médicales de premier recours et soins continus.", 
      arDesc: "التكفل السريع بالحالات المستعجلة والإسعافات الأولية.",
      bookingType: "medical" 
    }
  ],

  dentalServices: [
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 6 5 6 9c0 3 1.5 6 3 9.5 1 2.5 1.5 3.5 3 3.5s2-1 3-3.5c1.5-3.5 3-6.5 3-9.5 0-4-2-7-6-7z"/></svg>`, 
      title: "Chirurgie Dentaire", 
      arTitle: "جراحة الأسنان",
      desc: "Traitements chirurgicaux, extractions simples et complexes en toute sécurité.", 
      arDesc: "القلع العادي والمعقد في ظروف آمنة.",
      bookingType: "dental" 
    },
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`, 
      title: "Prothèse Dentaire", 
      arTitle: "تركيب الأسنان",
      desc: "Solutions prothétiques fixes et amovibles sur mesure.", 
      arDesc: "تركيب طقم الأسنان الثابت والتحرك حسب المقاس.",
      bookingType: "dental" 
    },
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`, 
      title: "Traitement Gencive", 
      arTitle: "علاج اللثة",
      desc: "Soins des gencives, détartrage et traitement des affections parodontales.", 
      arDesc: "تنظيف الأسنان وعلاج أمراض اللثة.",
      bookingType: "dental" 
    },
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`, 
      title: "Esthétique Dentaire", 
      arTitle: "تجميل الأسنان",
      desc: "Obturations esthétiques, composites et restauration du sourire.", 
      arDesc: "حشوات تجميلية واستعادة جمال الابتسامة.",
      bookingType: "dental" 
    },
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`, 
      title: "Blanchiment Dentaire", 
      arTitle: "تبييض الأسنان",
      desc: "Éclaircissement dentaire professionnel pour un sourire éclatant.", 
      arDesc: "تبييض الأسنان الاحترافي لابتسامة مشرقة.",
      bookingType: "dental" 
    },
    { 
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></svg>`, 
      title: "Orthodontie (ODF)", 
      arTitle: "تقويم الأسنان",
      desc: "Alignement dentaire et correction fonctionnelle pour enfants et adultes.", 
      arDesc: "تقويم الأسنان وتعديل الاطباق للأطفال والكبار.",
      bookingType: "dental" 
    }
  ],
  
  beforeAfterCases: [
    {
      title: "Restauration Esthétique & Prothèse",
      desc: "Restauration complète de la dentition et soins esthétiques réalisés au cabinet.",
      beforeImg: "images/restauration-avant.jpg",
      afterImg: "images/restauration-apres.jpg"
    },
    {
      title: "Blanchiment & Soins du Sourire",
      desc: "Traitement d'éclaircissement dentaire professionnel et harmonisation.",
      beforeImg: "images/blanchiment-avant.jpg",
      afterImg: "images/blanchiment-apres.jpg"
    }
  ],

  reviews: [
    { 
      name: "amel nesrine toumi", 
      department: "Pôle Médecine & Soins", 
      rating: 5, 
      text: "Je suis passée aujourd'hui chez le Dr Khlifi elle est excellente et très à l'écoute de ses patients, ensuite j'ai été prise en charge par l'infirmière Hadjer qui a pris soin de moi et a été très gentille et patiente." 
    },
    { 
      name: "younes addad", 
      department: "Centre Dar El Chifaa", 
      rating: 5, 
      text: "Très bonne expérience avec cette clinique. Un personnel professionnel, les services sont de qualité et la prise en charge est excellente. Je recommande vivement cette clinique." 
    },
    { 
      name: "Rebhi Waniss", 
      department: "Pôle Dentaire & Soins", 
      rating: 5, 
      text: "عيادة في القمة ماشاء الله تبارك الرحمن" 
    }
  ],

  departmentHours: {
    medical: [
      { days: "Pôle Médical (7j/7)", time: "24h / 24" },
      { days: "Urgences Médicales", time: "Service 24h/24" }
    ],
    dental: [
      { days: "Pôle Dentaire (7j/7)", time: "24h / 24" },
      { days: "Urgences Dentaires", time: "Service 24h/24" }
    ]
  },

  i18n: {
    fr: {
      brandSubtitle: "CENTRE MÉDICAL & DENTAIRE",
      navHome: "Accueil",
      navServices: "Services",
      navBeforeAfter: "Avant / Après",
      navGallery: "Centre",
      navReviews: "Avis Patients",
      navContact: "Contact",
      heroTitleMedical: "Votre santé globale et consultations en <strong>Médecine Générale</strong>.",
      heroTitleDental: "Votre plus beau sourire avec nos experts en <strong>Chirurgie Dentaire</strong>.",
      heroDesc: "Bienvenue chez <span class=\"dynamic-clinic-name\">Dar El Chifaa</span>. Une prise en charge complète en <strong>Médecine Générale Assermentée</strong> et <strong>Chirurgie Dentaire</strong> à Sidi Abdellah.",
      btnMedical: "🩺 Prendre RDV Consultation Médicale",
      btnDental: "🦷 Prendre RDV Soins Dentaires",
      whyTitle: "Pourquoi Choisir Dar El Chifaa ?",
      whySubtitle: "Un plateau technique moderne et des soins de santé centrés sur votre confort et votre sécurité à Sidi Abdellah.",
      whyFeature1Title: "Pôle Assermenté & Officiel",
      whyFeature1Desc: "Délivrance de certificats médicaux officiels, bilans de santé globaux et expertises réglementaires.",
      whyFeature2Title: "Technologies Modernes",
      whyFeature2Desc: "Équipements récents pour la chirurgie dentaire, l'implantologie et les soins esthétiques du sourire.",
      whyFeature3Title: "Accès Facile & Parking",
      whyFeature3Desc: "Implanté au cœur de Sidi Abdellah (Cité 5000 Logements Aslan) avec un accès simple et rapide.",
      whyFeature4Title: "Prise en Charge Rapide",
      whyFeature4Desc: "Gestion optimisée des rendez-vous via WhatsApp pour réduire votre temps d'attente au cabinet.",
      servicesTitle: "Nos Prestations",
      servicesSubtitle: "Découvrez l'ensemble de nos soins spécialisés.",
      beforeAfterTitle: "Résultats Avant / Après",
      beforeAfterSubtitle: "Transformations réalisées par nos chirurgiens-dentistes.",
      galleryTitle: "Notre Centre",
      gallerySubtitle: "Un environnement moderne et stérile conçu pour votre sécurité et votre confort.",
      reviewsTitle: "Avis Vérifiés de nos Patients",
      reviewsSubtitle: "Témoignages réels extraits de notre fiche Google Business.",
      contactTitle: "Contact & Horaires",
      contactLead: "Retrouvez notre centre à Sidi Abdellah pour vos consultations et soins.",
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      hoursTitle: "Horaires d'Ouverture",
      ctaTitle: "Prêt à prendre soin de votre santé ?",
      ctaDesc: "Réservez votre consultation sur WhatsApp en un instant.",
      ctaBtnBooking: "Choisir un Rendez-vous",
      ctaBtnWa: "WhatsApp Direct",
      footerRights: "Tous droits réservés.",
      footerCredits: "Conçu & développé par"
    },
    ar: {
      brandSubtitle: "مركز طبي وجراحة الأسنان",
      navHome: "الرئيسية",
      navServices: "خدماتنا",
      navBeforeAfter: "قبل / بعد",
      navGallery: "المركز",
      navReviews: "آراء المرضى",
      navContact: "اتصل بنا",
      heroTitleMedical: "صحتكم العامة واستشاراتكم في <strong>الطب العام المعتمد</strong>.",
      heroTitleDental: "ابتسامتكم الأجمل مع خبرائنا في <strong>جراحة وتجميل الأسنان</strong>.",
      heroDesc: "مرحبا بكم في عيادة <span class=\"dynamic-clinic-name\">دار الشفاء</span>. تكفل طبي شامل في <strong>الطب العام المعتمد</strong> و<strong>جراحة الأسنان</strong> بسيدي عبد الله.",
      btnMedical: "🩺 حجز موعد استشارة طبية",
      btnDental: "🦷 حجز موعد علاج الأسنان",
      whyTitle: "لماذا تختار عيادة دار الشفاء؟",
      whySubtitle: "تجهيزات حديثة ورعاية صحية berكزة على راحتكم وسلامتكم بسيدي عبد الله.",
      whyFeature1Title: "عيادة معتمدة ورسمية",
      whyFeature1Desc: "تسليم الشهادات الطبية الرسمية، الفحوصات الشاملة والخبرات القضائية والإدارية.",
      whyFeature2Title: "تقنيات حديثة",
      whyFeature2Desc: "معدات متطورة لجراحة الأسنان، زراعة الأسنان وتجميل الابتسامة.",
      whyFeature3Title: "سهولة الوصول وموقف سيارات",
      whyFeature3Desc: "موقع مميز في قلب سيدي عبد الله (حي 5000 مسكن أصلان) مع وصول سهل وسريع.",
      whyFeature4Title: "تكفل سريع",
      whyFeature4Desc: "تنظيم مواعيد مرن عبر الواتساب وتقليل وقت الانتظار في العيادة.",
      servicesTitle: "خدماتنا الطبية",
      servicesSubtitle: "اكتشفوا جميع خدماتنا الطبية المتخصصة.",
      beforeAfterTitle: "نتائج قبل / بعد",
      beforeAfterSubtitle: "تحولات وتجميل الابتسامة من طرف أطباء الأسنان.",
      galleryTitle: "عيادتنا",
      gallerySubtitle: "بيئة حديثة ومعقمة مصممة لراحتكم وسلامتكم.",
      reviewsTitle: "آراء مرضانا الموثقة",
      reviewsSubtitle: "شهادات حقيقية من مستخدمي جوجل.",
      contactTitle: "الاتصال وأوقات العمل",
      contactLead: "تفضلوا بزيارة مركزنا بسيدي عبد الله لاستشاراتكم وعلاجاتكم.",
      addressLabel: "العنوان",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      hoursTitle: "أوقات العمل",
      ctaTitle: "هل أنت جاهز للعناية بصحتك؟",
      ctaDesc: "احجز استشارتك عبر الواتساب في لحظات.",
      ctaBtnBooking: "اختر موعداً",
      ctaBtnWa: "واتساب مباشر",
      footerRights: "جميع الحقوق محفوظة.",
      footerCredits: "تصميم وتطوير"
    }
  }
};

window.clinicConfig = clinicConfig;