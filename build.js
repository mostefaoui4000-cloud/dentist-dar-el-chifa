/* Generates ar/index.html from index.html (French) + ar.json (Arabic).
   Edit French in index.html, Arabic in ar.json, then run:  node build.js */
const fs = require("fs"), ar = JSON.parse(fs.readFileSync("ar.json", "utf8"));
const attrs = {
  "Espace d'accueil du centre Dar El Chifaa": "فضاء الاستقبال بمركز دار الشفاء",
  "Cabinet dentaire du centre Dar El Chifaa": "عيادة الأسنان بمركز دار الشفاء",
  "Fauteuil du cabinet dentaire": "كرسي عيادة الأسنان",
  "Façade du centre Dar El Chifaa": "واجهة مركز دار الشفاء",
  "Espace d'accueil et réception": "فضاء الاستقبال",
  "Navigation principale": "التنقل الرئيسي", "Pôle": "القطب", "Menu": "القائمة",
  "Localisation du centre Dar El Chifaa": "موقع مركز دار الشفاء", "Cookies": "ملفات تعريف الارتباط"
};
const FR_LANG = '<a id="lang" class="lang" href="ar/" hreflang="ar" lang="ar" aria-label="Version arabe">العربية</a>';
const AR_LANG = '<a id="lang" class="lang" href="../" hreflang="fr" lang="fr" aria-label="Version française">Français</a>';
const swap = (h, a, b) => { if (!h.includes(a)) throw new Error("Not found: " + a.slice(0, 50)); return h.split(a).join(b); };

let h = fs.readFileSync("index.html", "utf8");
h = h.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i18n="(\w+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (m, open, tag, key, inner, close) => {
  if (!(key in ar)) throw new Error("Missing Arabic key: " + key);
  return open + ar[key] + close;
});
h = swap(h, '<html lang="fr">', '<html lang="ar" dir="rtl">');
h = h.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${ar.title}</title>`);
h = h.replace(/(<meta name="description" content=")[^"]*/, (m, a) => a + ar.desc);
h = h.replace(/(<meta property="og:title" content=")[^"]*/, (m, a) => a + "مركز دار الشفاء الطبي وجراحة الأسنان");
h = h.replace(/(<meta property="og:description" content=")[^"]*/, (m, a) => a + ar.desc);
h = swap(h, '<meta property="og:locale" content="fr_FR">', '<meta property="og:locale" content="ar_AR">');
h = swap(h, '<link rel="canonical" href="https://www.darelchifaa.com/">', '<link rel="canonical" href="https://www.darelchifaa.com/ar/">');
h = swap(h, '<meta property="og:url" content="https://www.darelchifaa.com/">', '<meta property="og:url" content="https://www.darelchifaa.com/ar/">');
h = swap(h, FR_LANG, AR_LANG);
h = h.split("<blockquote>").join('<blockquote lang="fr" dir="ltr">'); // French patient quotes stay French
for (const [f, a] of Object.entries(attrs)) for (const at of ["alt", "aria-label", "title"]) h = h.split(`${at}="${f}"`).join(`${at}="${a}"`);
h = h.replace(/(src|href)="(images\/|style\.css|config\.js|script\.js)/g, '$1="../$2');
fs.mkdirSync("ar", { recursive: true });
fs.writeFileSync("ar/index.html", h);
console.log("ar/index.html written");
