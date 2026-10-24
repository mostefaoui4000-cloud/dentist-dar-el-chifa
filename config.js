/* Contact data, analytics and message templates (used by script.js).
   French text lives in index.html; Arabic text lives in ar.json (see build.js). */
window.clinic = {
  name: "Dar El Chifaa",
  site: "https://www.darelchifaa.com",
  phone: "0770 74 74 14", tel: "+213770747414", wa: "213770747414",
  email: "clinic.darelchifa@gmail.com",
  address: "Sidi Abdellah, Cité 5000 Logements Aslan, Entrée Atlas 13300, Alger",
  addressAr: "سيدي عبد الله، حي 5000 مسكن أصلان، مدخل أطلس 13300، الجزائر",
  geo: [36.672683, 2.843024],
  image: "https://www.darelchifaa.com/images/centre-cabinet-medical-dentaire-dar-el-chifaa-alger-sidiabdellah-reception.jpeg",
  links: {
    fb: "https://facebook.com/darelchifaa",
    ig: "https://instagram.com/darelchifaa",
    maps: "https://www.google.com/maps/search/?api=1&query=36.672683,2.843024",
    reviews: "https://www.google.com/maps/search/?api=1&query=Dar+El+Chifaa+Sidi+Abdellah"
  },
  open24h: true, // VERIFY: set to false if not truly open 24/7 (and edit the "hrs" line in index.html and ar.json)
  ga4: "G-Y1ZVXQD3JP", pixel: "",
  msg: {
    fr: s => `Bonjour, je souhaite prendre rendez-vous : ${s}`,
    ar: s => `مرحبا، أريد حجز موعد: ${s}`
  }
};
