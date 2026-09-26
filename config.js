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
  metaDescription: "Centre pluridisciplinaire Dar El Chifaa: Soins médicaux généraux, médecine assermentée et chirurgie dentaire complète. Ouvert 7j/7 à Alger.",

  phone: "+213 00 00 00 00",
  whatsapp: "213000000000",
  email: "contact@darelchifaa.dz",
  address: "Alger, Algérie",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.123!2d3.05!3d36.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ1JzAwLjAiTiAzwrAwMyc2MC4wIkU!5e0!3m2!1sfr!2sdz!4v1625000000000!3m2!1sfr!2sdz",
  
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

  stats: {
    experience: 8,
    patients: 5000,
    certificates: 15
  },

  bookingLinks: {
    medical: "https://wa.me/213000000000?text=Bonjour,%20je%20souhaite%20réserver%20une%20consultation%20médicale",
    dental: "https://wa.me/213000000000?text=Bonjour,%20je%20souhaite%20réserver%20un%20rendez-vous%20dentaire",
    default: "https://wa.me/213000000000?text=Bonjour,%20je%20souhaite%20réserver%20un%20rendez-vous"
  },

  // Medical Services
  medicalServices: [
    { icon: "🩺", title: "Médecine Générale", desc: "Consultations médicales générales, examens cliniques et suivi de santé globale.", bookingType: "medical" },
    { icon: "📜", title: "Cabinet Assermenté", desc: "Délivrance de certificats médicaux officiels, expertises et démarches réglementaires.", bookingType: "medical" },
    { icon: "🚑", title: "Soins & Urgences 7j/7", desc: "Prise en charge rapide des urgences médicales de premier recours et soins continus.", bookingType: "medical" }
  ],

  // Dental Services
  dentalServices: [
    { icon: "🚨", title: "Chirurgie Dentaire", desc: "جراحة الأسنان - Traitements chirurgicaux, extractions simples et complexes en toute sécurité.", bookingType: "dental" },
    { icon: "🦷", title: "Prothèse Dentaire", desc: "تركيب طقم الأسنان - Solutions prothétiques fixes et amovibles sur mesure.", bookingType: "dental" },
    { icon: "🩺", title: "Traitement Gencive", desc: "علاج اللثة - Soins des gencives, détartrage et traitement des affections parodontales.", bookingType: "dental" },
    { icon: "✨", title: "Esthétique Dentaire", desc: "حشوات تجميلية - Obturations esthétiques, composites et restauration du sourire.", bookingType: "dental" },
    { icon: "💎", title: "Blanchiment Dentaire", desc: "تبييض الأسنان - Éclaircissement dentaire professionnel pour un sourire éclatant.", bookingType: "dental" },
    { icon: "😬", title: "Orthodontie (ODF)", desc: "تقويم الأسنان - Alignement dentaire et correction fonctionnelle pour enfants et adultes.", bookingType: "dental" }
  ],
  
  beforeAfterCases: [
    {
      title: "Restauration Esthétique & Prothèse",
      desc: "Restauration complète de la dentition et soins esthétiques réalisés au cabinet.",
      beforeImg: "images/before-implant.jpg",
      afterImg: "images/after-implant.jpg"
    },
    {
      title: "Blanchiment & Soins du Sourire",
      desc: "Traitement d'éclaircissement dentaire professionnel et harmonisation.",
      beforeImg: "images/before-facettes.jpg",
      afterImg: "images/after-facettes.jpg"
    }
  ],

  reviews: [
    { name: "Karim M.", department: "Médecine Générale", rating: 5, text: "Consultation rapide pour un certificat médical assermenté. Équipe très efficace." },
    { name: "Fatima Z.", department: "Chirurgie Dentaire", rating: 5, text: "Soin des gencives sans douleur et équipe dentaire très à l'écoute." }
  ],

  hours: [
    { days: "Ouvert 7j/7", time: "08:00 - 20:00" }
  ]
};

// Global export for use in script_2.js and inline page scripts
window.clinicConfig = clinicConfig;