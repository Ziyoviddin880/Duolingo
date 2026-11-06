# Bilimdon: AI yordamida o‘quv platformasi — 15 darslik reja

> Asos: «Metodika: saytdan Duolingo kabi platformagacha» (24 dars, backendli).
> Bu versiya **yangi guruh** uchun: faqat **HTML + CSS + JS**, **backendsiz**, **ChatGPT’ning bepul versiyasi** bilan.
> Tayyor demo: `demo/` papkasi (`demo/index.html` faylini brauzerda oching).

---

## 1. Asosiy qarorlar

### Backend qo‘shmaymiz — to‘g‘ri qaror
| Sabab | Izoh |
|---|---|
| Vaqt | 15 darsda HTML/CSS/JS + server + baza + auth — yangi boshlovchilarga juda ko‘p. PDF’da faqat backendga 4 dars (5–8) ketgan. |
| Bepul ChatGPT | Server + frontend + baza kodini birga ko‘rsatish uchun uzun kontekst kerak — bepul limit tez tugaydi. |
| Joylashtirish | Statik saytni GitHub Pages / Netlify’ga 2 daqiqada, bepul, kartasiz joylash mumkin. Backend uchun Render/Railway — murakkab va ko‘pincha pullik. |
| Natija | Har bir o‘quvchi kurs oxirida ishlaydigan havolaga ega bo‘ladi. |

**Backend o‘rniga:** `localStorage` (brauzer xotirasi). Progress, XP, seriya, o‘qituvchi qo‘shgan darslar — hammasi shu yerda.

**Cheklovlarni darsda «muammo» sifatida ko‘rsatamiz** (bu keyingi kursga ko‘prik bo‘ladi):
- Boshqa kompyuterda progress yo‘q → «Shuning uchun server va baza kerak».
- Reyting soxta (botlar) → «Haqiqiy reyting uchun umumiy baza kerak».
- O‘qituvchi PIN’i JS kodida ko‘rinadi → «Haqiqiy himoya faqat serverda bo‘ladi».
- To‘g‘ri javoblar DevTools’da ko‘rinadi, XP’ni Console orqali o‘zgartirish mumkin → «Brauzerga ishonib bo‘lmaydi».

### Texnologiyalar
- HTML, CSS (oddiy CSS, Tailwind shart emas — ChatGPT ikkalasini ham yaxshi yozadi; oddiy CSS’ni tushuntirish osonroq).
- Vanilla JavaScript (framework yo‘q).
- Kutubxona kerak emas: tovush — Web Audio API, talaffuz — `speechSynthesis`, konfetti va grafik — o‘zimiz yozamiz.
- Muharrir: VS Code + Live Server kengaytmasi (ixtiyoriy — `index.html`ni ikki marta bosish ham yetadi).
- Hosting: GitHub Pages yoki Netlify Drop.

### Bepul ChatGPT bilan ishlash qoidalari (1-darsda o‘rgatiladi, doskada ilib qo‘ying)
1. **Bitta so‘rov — bitta vazifa.** «Butun saytni yoz» emas, «hero bo‘limini yoz».
2. **Kontekst bering.** «Menda shunday kod bor: …(kod)… Shunga … qo‘sh».
3. **Fayllar kichik bo‘lsin** (200–300 qator). Uzun kod bepul versiyada kesiladi va limit tez tugaydi. Shuning uchun demo’da har bir sahifaning o‘z JS fayli bor.
4. **Har doim tushuntirishni so‘rang:** «Har bir qatorni o‘zbek tilida, 12 yoshli bolaga tushuntirgandek izohla».
5. **Xatoni to‘g‘ri yuboring:** «Nima qildim → nimani kutdim → nima bo‘ldi → Console’dagi xato matni».
6. **Ko‘r-ko‘rona nusxa ko‘chirmang.** Har darsda o‘quvchi kamida bitta o‘zgarishni (rang, matn, raqam) o‘zi qo‘lda kiritadi va tushuntiradi.
7. **Limit tugasa:** Gemini, Copilot, Claude, DeepSeek — bepul muqobillar, xuddi shu promptlar ishlaydi.

### Prompt shabloni (har darsda shu tuzilma)
```
ROL:       Sen tajribali frontend-dasturchi va o‘qituvchisan.
KONTEKST:  Men HTML, CSS, JS’da o‘quv sayti qilyapman. Mana mening kodim: ...
VAZIFA:    ... qo‘sh / tuzat / yasab ber.
CHEKLOV:   Faqat oddiy JavaScript, kutubxonasiz. Kod 80 qatordan oshmasin.
FORMAT:    Avval kod, keyin har bir qism nima qilishini 3–5 gapda tushuntir.
```

---

## 2. Demo loyiha (birinchi darsda ko‘rsatish uchun)

`demo/index.html` — ikki marta bosing, internet faqat shrift uchun kerak.

| Fayl | Nima | Qaysi darsda quriladi |
|---|---|---|
| `index.html`, `js/landing.js` | Lending: hero, imkoniyatlar, kurslar, FAQ, burger-menyu, animatsiyalar | 1–4 |
| `start.html`, `js/start.js` | «Kirish»: ism, avatar, kurs, kunlik maqsad | 5 |
| `js/data.js` | Kurslar → bo‘limlar → darslar → mashqlar (JSON uslubida) | 6 |
| `js/store.js` | Holat, localStorage, XP, yuraklar, seriya, yutuqlar, validatsiya | 6, 10, 11 |
| `learn.html`, `js/learn.js` | Kurs xaritasi (yopiq / ochiq / o‘tilgan) | 7 |
| `lesson.html`, `js/lesson.js` | Dars mexanizmi: 7 xil mashq turi, natija ekrani | 8–9 |
| `profile.html`, `js/profile.js` | Profil, 7 kunlik grafik, yutuqlar | 12 |
| `leaderboard.html`, `js/leaderboard.js` | Haftalik reyting | 12 |
| `admin.html`, `js/admin.js` | O‘qituvchi paneli + **ChatGPT’dan mashq import qilish** (PIN: 1234) | 13 |
| `js/ui.js`, `css/style.css` | Umumiy menyu, modal, toast, konfetti, tovush, dizayn | hamma darslarda |

**Mashq turlari:** `choice` (variant tanlash), `truefalse`, `fill` (bo‘sh joy), `order` (so‘zlardan gap tuzish), `match` (juftliklar), `input` (yozib javob), `listen` (tinglab tanlash).

### Birinchi darsdagi 5 daqiqalik ko‘rsatish ssenariysi
1. Lending → «Bepul boshlash» → ism va avatar.
2. Kurs xaritasi → 1-dars: bitta xato qiling (yurak kamayadi, savol oxirida qaytadi).
3. Natija ekrani: XP, konfetti, yangi yutuq → xaritada keyingi dars ochildi.
4. **«Wow» moment:** O‘qituvchi paneli → promptni nusxalang → ChatGPT’ga yuboring → javobni joylang → yangi mashqlar darhol darsda paydo bo‘ladi.
5. Telefonda ochib ko‘rsating (yoki DevTools → telefon rejimi).
6. Yakun: «15 darsdan keyin har biringizda shunday sayt bo‘ladi — o‘z mavzungiz bilan».

---

## 3. 15 dars — umumiy ko‘rinish

Har bir dars ~60 daqiqa: **10 daq** tushuntirish → **10 daq** ko‘rsatish (jonli prompt) → **35 daq** amaliyot → **5 daq** yakun va uy vazifasi.

| # | Mavzu | Darsdan keyin o‘quvchida bor |
|---|---|---|
| 1 | Tanishuv, ChatGPT bilan ishlash, HTML skeleti | Bo‘limlarga ajratilgan oddiy sahifa |
| 2 | HTML: lending bo‘limlari, SEO asoslari | To‘liq lending tuzilmasi |
| 3 | CSS: dizayn, ranglar, flex/grid, moslashuvchanlik | Chiroyli, telefonda ham yaxshi lending |
| 4 | JS asoslari: burger-menyu, animatsiyalar, FAQ | «Jonli» lending |
| 5 | Formalar va localStorage: «Kirish» sahifasi | Ism/avatar eslab qolinadi |
| 6 | Ma’lumotlar: obyekt va massivlar, kurs kontenti | `data.js` — o‘z mavzusidagi kurs |
| 7 | Kurs xaritasi: ma’lumotdan sahifa yasash | Darslar yo‘lakchasi |
| 8 | Dars mexanizmi 1: tanlash, to‘g‘ri/noto‘g‘ri | Ishlaydigan dars |
| 9 | Dars mexanizmi 2: yangi mashq turlari, natija | To‘liq dars sikli |
| 10 | Geymifikatsiya: XP, darajalar, yuraklar | O‘yin qoidalari |
| 11 | Seriya, kunlik maqsad, yutuqlar, tovush, konfetti | Motivatsiya tizimi |
| 12 | Profil, grafik, reyting, mobil menyu | Profil va reyting |
| 13 | O‘qituvchi paneli + ChatGPT’dan mashq import | SI-yordamchili panel |
| 14 | Testlash, xatolarni topish, «XP’ni aldash» | Tuzatilgan, tekshirilgan loyiha |
| 15 | GitHub Pages’ga joylash va himoya | Ishlaydigan havola + taqdimot |

---

## 4. Darslar batafsil

### 1-dars. Tanishuv, ChatGPT va HTML skeleti
- **Tushuntirish:** sayt nimadan iborat (HTML — skelet, CSS — kiyim, JS — harakat). ChatGPT — yordamchi, lekin javobgar — siz. Yuqoridagi 7 qoida va prompt shabloni.
- **Ko‘rsatish:** demo’ni ko‘rsatish (5 daqiqalik ssenariy). VS Code o‘rnatish, papka ochish, `index.html` yaratish.
- **Prompt:** «Sen o‘qituvchisan. Menga oddiy HTML sahifa skeletini yoz: header, hero, imkoniyatlar, kurslar, FAQ, footer. CSS’siz. Har bir teg nima uchun kerakligini izohda yoz.»
- **Amaliyot:** o‘quvchi o‘z platformasi nomini va mavzusini tanlaydi (ingliz tili, matematika, tarix, dasturlash, futbol viktorinasi…), 5–6 bo‘limli bezaksiz sahifa yasaydi.
- **Natija:** o‘quvchi brauzerda «header qayerda, hero qayerda» ko‘rsatadi.
- **Uy vazifasi:** platforma nomi, logotip-emoji, 3 ta rang tanlash. Sevimli saytni bo‘limlarga ajratib yozish.

### 2-dars. Lending tuzilmasi va SEO
- **Tushuntirish:** `h1–h3`, `p`, `a`, `img`, `section`, `nav`, `footer`. `title`, `description`, `alt` — nega Google uchun muhim. FAQ’ni `details/summary` bilan.
- **Prompt:** «Mening sahifamga “Imkoniyatlar” bo‘limini qo‘sh: 4 ta kartochka, har birida emoji, sarlavha, 1 gap. Faqat HTML.»
- **Amaliyot:** barcha bo‘limlarni matn bilan to‘ldirish, 5 ta savolli FAQ, meta-teglar.
- **Natija:** to‘liq lending tuzilmasi (hali bezaksiz).
- **Uy vazifasi:** «Qanday ishlaydi» (3 qadam) bo‘limini o‘zi yozish, ChatGPT faqat tekshiradi.

### 3-dars. CSS: dizayn va moslashuvchanlik
- **Tushuntirish:** selektor, rang, shrift (Google Fonts), `padding/margin`, `border-radius`, flex va grid. `:root` o‘zgaruvchilari — rangni bitta joyda o‘zgartirish. Mobile-first, `@media`.
- **Ko‘rsatish:** demo’dagi «3D tugma» (`box-shadow` + `:active`). DevTools → telefon rejimi.
- **Prompt:** «Mening hero bo‘limimni CSS bilan bezat. Ranglar: asosiy #7c4dff, urg‘u #ff9f1c. Shrift Nunito. Tugmalar 3D uslubda (pastida qalin soya, bosganda pastga tushadi). Telefonda ustunlar bitta qatorga tushsin.»
- **Amaliyot:** butun lendingni bezash, 360 / 768 / 1280 px’da tekshirish.
- **Uy vazifasi:** har bir kenglikda nima «buzilayotganini» yozib, tuzatish.

### 4-dars. JavaScript asoslari: sahifani jonlantirish
- **Tushuntirish:** o‘zgaruvchi, funksiya, `document.querySelector`, `onclick`, `classList.toggle`. Animatsiya yordam berishi kerak, xalaqit emas.
- **Ko‘rsatish:** burger-menyu, «yuqoriga» tugmasi, skrollda paydo bo‘lish (`IntersectionObserver`) — `js/landing.js`.
- **Prompt:** «Telefon uchun burger-menyu yasab ber: ☰ tugmasi bosilganda menyu ochiladi, ✕ bosilganda yopiladi. Oddiy JS, kutubxonasiz. Har bir qatorni tushuntir.»
- **Amaliyot:** burger-menyu, skroll animatsiyasi, hero’dagi bosiladigan demo-savol.
- **Natija:** lending tayyor ✅ (birinchi «katta» natija — ota-onaga ko‘rsatish mumkin).
- **Uy vazifasi:** bitta ortiqcha animatsiyani o‘chirib, nega xalaqit berganini bir gapda yozish.

### 5-dars. Formalar va localStorage: «Kirish» sahifasi
- **Tushuntirish:** forma, `input`, `submit`, `preventDefault`, tekshirish (ism kamida 2 harf). `localStorage.setItem / getItem`, `JSON.stringify / parse`. DevTools → Application → Local Storage.
- **Muhokama:** «Bu haqiqiy ro‘yxatdan o‘tishmi? Boshqa kompyuterdan kirsam nima bo‘ladi?» (backendga ko‘prik).
- **Prompt:** «start.html sahifasini yasa: ism inputi, 10 ta emoji-avatardan tanlash, kunlik maqsad (10/20/30/50 XP). Saqlash bosilganda localStorage’ga yozilsin va learn.html’ga o‘tsin.»
- **Amaliyot:** kirish sahifasi; lendingdagi tugma foydalanuvchi bor bo‘lsa «Davom etish» deb yozadi.
- **Uy vazifasi:** localStorage’ni DevTools’da topish, qo‘lda ismni o‘zgartirish va natijani ko‘rish.

### 6-dars. Ma’lumotlar: kurs kontentini SI bilan yaratish
- **Tushuntirish:** obyekt, massiv, ichma-ich tuzilma: **kurs → bo‘lim → dars → mashq**. Mashq tuzilishi: `type`, `question`, `options`, `answer`, `explain`.
- **Ko‘rsatish:** `js/data.js`. ChatGPT’dan kontent so‘rash va uni **tekshirish** (javob variantlar ichida bormi? fakt to‘g‘rimi?).
- **Prompt:** «Mavzu: “Hayvonlar” (ingliz tili, bolalar uchun). 6 ta mashqni JS massiv ko‘rinishida yoz. Turlari: choice, truefalse, fill. Format: {type, question, options, answer, explain}. answer har doim options ichida bo‘lsin.»
- **Amaliyot:** o‘z mavzusi bo‘yicha 1 kurs, 2 bo‘lim, 4–6 dars, har birida 5+ mashq.
- **Uy vazifasi:** ChatGPT javobida kamida bitta xato topish va yozib qo‘yish.

### 7-dars. Kurs xaritasi
- **Tushuntirish:** `forEach`/`map` bilan ma’lumotdan HTML yasash (template string). Dars holati: yopiq / ochiq / o‘tilgan — qanday hisoblanadi.
- **Ko‘rsatish:** `js/learn.js`: ilon izi (`Math.sin`), «BOSHLASH» pufakchasi, yopiq darsni bosganda xabar.
- **Prompt:** «Menda shunday data.js bor (…). learn.html’da har bir bo‘lim uchun rangli banner va darslarni doira-tugmalar ko‘rinishida chiz. Birinchi dars ochiq, keyingilari oldingisi tugaganda ochiladi.»
- **Amaliyot:** xarita + yuqori panel (🔥 seriya, ⚡ XP, ❤️ yurak — hozircha raqamlar).
- **Uy vazifasi:** «M tadan N tasi o‘tildi» yozuvi va kurslar orasida almashish tugmalari.

### 8-dars. Dars mexanizmi, 1-qism
- **Tushuntirish:** dars sikli: savol → javob → tekshirish → yashil/qizil → keyingisi. `?id=en-1` — URL parametri. Progress chizig‘i.
- **Ko‘rsatish:** `lesson.html`: «Tekshirish» tugmasi javob tanlanmaguncha o‘chiq; pastki panel yashil/qizil bo‘ladi.
- **Prompt:** «lesson.html uchun JS yoz: URL’dan dars id’sini ol, data.js’dan darsni top, mashqlarni birma-bir ko‘rsat. Hozircha 2 tur: choice va truefalse. Tekshirgandan keyin pastki panel yashil yoki qizil bo‘lsin, “Davom etish” tugmasi chiqsin.»
- **Amaliyot:** 5 ta mashqli ishlaydigan dars.
- **Uy vazifasi:** klaviatura: Enter — tekshirish, 1–4 — variant tanlash.

### 9-dars. Dars mexanizmi, 2-qism
- **Tushuntirish:** har bir tur uchun alohida funksiya (renderer) — yangi turni qo‘shish oson. Xato qilingan savol oxirga qaytadi.
- **Ko‘rsatish:** `fill`, `order` (so‘z-bloklardan gap), `match` (juftliklar), `input` (katta-kichik harf va probellarni hisobga olmay tekshirish). Natija ekrani.
- **Prompt:** «Mening dars dvigatelimga “order” turini qo‘sh: so‘zlar aralash chiqadi, bosilganda yuqoridagi qatorga o‘tadi, yana bosilsa qaytadi. Mavjud kodni buzma, faqat yangi funksiya qo‘sh.»
- **Amaliyot:** kamida 2 ta yangi tur + natija ekrani + xatolarni takrorlash.
- **Uy vazifasi:** `input` turini qo‘shish; o‘z darsidan 3 marta o‘tib, topilgan xatolarni yozish.

### 10-dars. Geymifikatsiya: XP, darajalar, yuraklar
- **Tushuntirish:** nega o‘yin elementlari ishlaydi va qachon bezovta qiladi. Qoidalar `CONFIG` obyektida — raqamni bitta joyda o‘zgartirish.
- **Ko‘rsatish:** `js/store.js`: to‘g‘ri +10 XP, takror +5, xatosiz bonus +5; xato −1 yurak; 0 yurak — dars to‘xtaydi; 30 daqiqada 1 yurak tiklanadi (`Date.now()` bilan).
- **Prompt:** «Menda state obyekti bor (…). Yuraklar tizimini qo‘sh: maksimum 5, xatoda −1, har 30 daqiqada +1 tiklanadi. Sahifa yopilib ochilganda ham to‘g‘ri hisoblansin.»
- **Amaliyot:** XP, daraja (jadval bo‘yicha), yuraklar, «Yuraklar tugadi» oynasi.
- **Uy vazifasi:** daraja formulasini o‘zgartirish va o‘yin qanday o‘zgarganini tasvirlash.

### 11-dars. Seriya, kunlik maqsad, yutuqlar
- **Tushuntirish:** sana bilan ishlash: «bugun», «kecha», seriya davom etdi / uzildi. Yutuq = shart + mukofot.
- **Ko‘rsatish:** `finishLesson()`; konfetti (div’lar + CSS animatsiya); tovush (Web Audio, fayl kerak emas); talaffuz (`speechSynthesis`).
- **Prompt:** «Kunlar seriyasi (streak) mantig‘ini yoz: agar oxirgi dars bugun bo‘lsa — o‘zgarmaydi, kecha bo‘lsa — +1, undan oldin — 1 ga tushadi. Sanani YYYY-MM-DD ko‘rinishida saqla.»
- **Amaliyot:** seriya, kunlik maqsad shkalasi, 3+ yutuq, natija ekranida konfetti va tovush.
- **Uy vazifasi:** localStorage’da sanani qo‘lda o‘zgartirib, seriyani 3 holatda tekshirish (davom etdi, uzildi, bir kunda 2 dars).

### 12-dars. Profil, grafik va reyting
- **Tushuntirish:** profilda nima ko‘rsatiladi; grafikni kutubxonasiz (div balandligi = XP) chizish. Reyting nega «soxta» — haqiqiysi uchun server kerak.
- **Ko‘rsatish:** `profile.html`, `leaderboard.html`, telefonda pastki menyu.
- **Prompt:** «Oxirgi 7 kun XP’sini ustunli grafik qilib chiz: faqat HTML va CSS, kutubxonasiz. Bugungi ustun boshqa rangda bo‘lsin. Ma’lumot state.history’dan olinsin.»
- **Amaliyot:** profil (statistika, grafik, yutuqlar), reyting (joriy foydalanuvchi ajratilgan), mobil menyu.
- **Uy vazifasi:** profilga «Progressni o‘chirish» tugmasi (tasdiqlash oynasi bilan).

### 13-dars. O‘qituvchi paneli + ChatGPT yordamchisi ⭐ (eng muhim dars)
- **Tushuntirish:** admin-panel — kod bilmaydigan o‘qituvchi uchun. JSON nima. **SI javobini tekshirmasdan qo‘shib bo‘lmaydi** — validatsiya.
- **Ko‘rsatish:** `admin.html`: dars qo‘shish → promptni nusxalash → ChatGPT → javobni joylash → «Tekshirish va qo‘shish» → xatolar ro‘yxati → darhol darsda paydo bo‘ladi.
- **Prompt (panel ichida tayyor):** mavzu va son kiritiladi, prompt avtomatik tuziladi.
- **Amaliyot:** panel: kurs/bo‘lim/dars qo‘shish, mashqlarni o‘chirish va tartiblash, ChatGPT import, JSON eksport.
- **Muhokama:** PIN `1234` JS kodida ko‘rinadi — bu himoya emasligini o‘quvchilar o‘zlari topsin.
- **Uy vazifasi:** panel orqali (kodga tegmasdan) 8 ta mashqli yangi dars yaratish; ChatGPT xatosini topib, qanday xato ekanini yozish.

### 14-dars. Testlash, xatolarni topish va «XP’ni aldash»
- **Tushuntirish:** xato qidirish algoritmi: Console → xato matni → qaysi fayl/qator → ChatGPT’ga to‘g‘ri formatda yuborish. Test-reja.
- **Ko‘rsatish:** o‘qituvchi loyihani ataylab 3 joyda buzadi (masalan, `getElementById` nomi xato, `data.js`da vergul tushib qolgan, CSS’da yopilmagan qavs) — birgalikda topamiz.
- **O‘yin:** juftlikda bir-birining saytida XP’ni «aldash»: Console’da `state.xp = 9999; saveState()`, yopiq darsni URL orqali ochish, to‘g‘ri javobni `data.js`dan o‘qish. Xulosa: «brauzerga ishonib bo‘lmaydi — shuning uchun backend kerak».
- **Amaliyot:** 10 ta stsenariyli test-reja (kirish, dars, yurak tugashi, seriya, panel…) va uni bajarish; Lighthouse (DevTools) bahosi.
- **Uy vazifasi:** topilgan 2–3 xatoni tuzatish, `README.md` yozish.

### 15-dars. Joylashtirish va himoya
- **Ko‘rsatish:** GitHub akkaunt → yangi repozitoriy → fayllarni yuklash → Settings → Pages → havola. Muqobil: app.netlify.com/drop — papkani sudrab tashlash.
- **Amaliyot (30 daq):** har kim o‘z saytini joylaydi va havolani telefonda ochadi.
- **Himoya (har biriga 3–5 daq):**
  1. Havolani ochib, bitta darsdan o‘tib ko‘rsatish.
  2. Panel orqali ChatGPT bilan jonli mashq qo‘shish.
  3. «Ma’lumotlar qayerda saqlanadi?», «Boshqa telefondan kirsam nima bo‘ladi?», «XP’ni qanday aldash mumkin va buni qanday to‘xtatish kerak?» savollariga javob.
- **Natija:** 3+ dars, 15+ mashqli, internetda ishlaydigan platforma havolasi.
- **Yakuniy uy vazifasi:** 2 ta tanish odamga darsdan o‘tkazish, 3 ta fikrini yozib olish.

---

## 5. Baholash (ixtiyoriy)
| Mezon | Ball |
|---|---|
| Lending (tuzilma, dizayn, telefonda ishlaydi) | 20 |
| Kurs xaritasi + kamida 3 ta mashq turi ishlaydi | 25 |
| Geymifikatsiya (XP, yurak, seriya, yutuq) | 20 |
| O‘qituvchi paneli + ChatGPT import | 15 |
| Joylangan havola + README | 10 |
| Himoyada tushuntira oladi (nusxa emas) | 10 |

---

## 6. «Umuman boshqa sayt» varianti
Dvigatel bir xil (kurs → dars → mashq, XP, yuraklar), faqat mavzu va dizayn boshqa. Har bir o‘quvchi/juftlik tanlashi mumkin:
- **So‘z yodlash kartochkalari** — ag‘dariladigan kartalar + takrorlash tizimi.
- **Matematik trener** — vaqtga qarshi misollar, tezlik bo‘yicha reyting.
- **Maktab fanlari viktorinasi** — tarix, geografiya, biologiya bo‘yicha testlar.
- **Tez yozish trenajyori** — klaviaturada yozish tezligi va aniqligi.
- **Futbol / kino / multfilm viktorinasi** — bolalar sevadigan mavzu, motivatsiya yuqori.
- **Dasturlash asoslari** — demo’dagi «Web asoslari» kursi kabi.

---

## 7. Keyingi bosqich (2-kurs)
PDF’dagi 5–8- va 11–12-mashg‘ulotlar: server (Express yoki FastAPI), baza, haqiqiy ro‘yxatdan o‘tish, javobni serverda tekshirish. Bu kursdagi barcha «cheklovlar» (soxta reyting, ochiq PIN, XP’ni aldash) — o‘sha kursga motivatsiya.
