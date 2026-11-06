# Kontekst: yangi chatda davom ettirish uchun

## Men kimman va nima qilyapman
Men o'qituvchiman. Yangi boshlangan guruhga **AI yordamida web-dasturlash** kursini o'tyapman.
Bolalar ChatGPT'ning **bepul** versiyasidan foydalanadi (obuna yo'q).
**15 dars** (har biri ~60 daqiqa) davomida Duolingo'ga o'xshash o'quv platformasini yasaymiz.

## Qabul qilingan qarorlar
- Texnologiya: faqat **HTML + CSS + oddiy JavaScript**, kutubxonasiz.
- **Backend yo'q.** Ma'lumotlar `localStorage`da saqlanadi. Cheklovlar (boshqa kompyuterda progress yo'q, reyting soxta, PIN kodda ochiq, XP'ni Console orqali aldash mumkin) darsda "muammo" sifatida ko'rsatiladi va keyingi, backendli kursga ko'prik bo'ladi.
- Joylashtirish: GitHub Pages yoki Netlify Drop (bepul).
- Asos: 24 darslik backendli metodika ("saytdan Duolingo kabi platformagacha") 15 darsga va backendsiz variantga moslashtirilgan.
- Har bir o'quvchi o'z mavzusini tanlaydi (ingliz tili, matematika, futbol va h.k.).

## Tayyor demo loyiha: "Bilimdon"
Bolalarga ko'rsatish uchun tayyor, ishlaydigan sayt (`demo/` papka):

| Fayl | Vazifasi |
|---|---|
| `index.html`, `js/landing.js` | Lending: hero, imkoniyatlar, kurslar, FAQ, burger-menyu, skroll animatsiyasi |
| `start.html`, `js/start.js` | "Kirish": ism, avatar, kurs, kunlik maqsad (localStorage) |
| `js/data.js` | Kurslar: kurs → bo'lim → dars → mashq. 2 kurs (Ingliz tili, Web asoslari), 9 dars, 49 mashq |
| `js/store.js` | Holat, XP, darajalar, yuraklar (30 daqiqada +1), seriya, yutuqlar, mashq validatsiyasi |
| `learn.html`, `js/learn.js` | Kurs xaritasi: yopiq / ochiq / o'tilgan darslar |
| `lesson.html`, `js/lesson.js` | Dars mexanizmi, 7 mashq turi: choice, truefalse, fill, order, match, input, listen. Xato savol oxirida qaytadi. Natija ekrani, konfetti, tovush |
| `profile.html`, `leaderboard.html` | Profil + 7 kunlik grafik + yutuqlar; haftalik reyting (botlar bilan) |
| `admin.html`, `js/admin.js` | O'qituvchi paneli (PIN 1234): kurs/bo'lim/dars qo'shish, ChatGPT promptini nusxalash, ChatGPT javobini (JSON) joylab import qilish, xatolarni ko'rsatish |
| `js/ui.js`, `css/style.css` | Umumiy menyu, modal, toast, konfetti, tovush, dizayn |

Mashq formati (JSON):
```json
{"type":"choice","question":"...","options":["...","..."],"answer":"...","explain":"..."}
```

## 15 darslik reja (ketma-ketlik)
| # | Mavzu | Natija |
|---|---|---|
| 1 | Tanishuv, ChatGPT qoidalari, HTML skeleti | 6 bo'limli bezaksiz sahifa |
| 2 | HTML: lending bo'limlari, FAQ, SEO | To'liq lending tuzilmasi |
| 3 | CSS: ranglar, 3D tugmalar, flex/grid, telefonga moslash | Chiroyli lending |
| 4 | JS asoslari: burger-menyu, animatsiyalar | "Jonli" lending ✅ 1-nazorat nuqtasi |
| 5 | Forma + localStorage: kirish sahifasi | Ism/avatar eslab qolinadi |
| 6 | Ma'lumotlar: ChatGPT bilan kurs mazmuni (data.js) | O'z mavzusidagi kurs |
| 7 | Kurs xaritasi (ma'lumotdan HTML yasash) | Darslar yo'lakchasi |
| 8 | Dars mexanizmi 1: choice, truefalse | Ishlaydigan dars |
| 9 | Dars mexanizmi 2: fill, order, match, input, natija ekrani | To'liq dars ✅ 2-nazorat nuqtasi |
| 10 | XP, darajalar, yuraklar | O'yin qoidalari |
| 11 | Seriya, kunlik maqsad, yutuqlar, konfetti, tovush | Motivatsiya tizimi |
| 12 | Profil, grafik, reyting, mobil menyu | Profil va reyting |
| 13 | O'qituvchi paneli + ChatGPT'dan mashq import ⭐ | SI-yordamchili panel |
| 14 | Testlash, xato topish, "XP'ni aldash" o'yini | Tekshirilgan loyiha |
| 15 | GitHub Pages'ga joylash va himoya | Ishlaydigan havola ✅ 3-nazorat nuqtasi |

Guruh orqada qolsa, ixtiyoriy qismlar: 11-darsdagi tovush va konfetti, 12-darsdagi reyting, 9-darsdagi match va listen turlari.

## Bepul ChatGPT qoidalari (bolalar uchun)
1. Bitta so'rov — bitta vazifa. 2. Kontekst bering (o'z kodingizni joylang). 3. Kichik bo'laklar (fayl 200–300 qatordan oshmasin). 4. Tushuntirishni so'rang. 5. Xatoni to'liq yuboring: nima qildim → nimani kutdim → nima bo'ldi. 6. Har safar kamida bitta narsani o'zingiz o'zgartiring. 7. Limit tugasa: Gemini yoki Copilot.

Prompt shabloni: **ROL → KONTEKST → VAZIFA → CHEKLOV → FORMAT**.

## Tayyor bo'lgan darslar
- **1-dars** to'liq tayyor (`01-dars.md` fayli). Dars formati (keyingi darslar ham shunday bo'lsin):
  1. Darsdan oldingi o'qituvchi checklisti.
  2. Vaqt bo'yicha jadval (60 daqiqa: tushuntirish, ko'rsatish, amaliyot, yakun).
  3. O'qituvchi aytadigan tayyor gaplar.
  4. Demo'dan nimani ko'rsatish.
  5. Tayyor promptlar (bolalar nusxalaydi).
  6. Amaliyot qadam-baqadam + "o'zim qo'lda o'zgartiraman" qismi.
  7. Tez bitirganlar uchun qo'shimcha.
  8. Uy vazifasi.
  9. Ko'p uchraydigan muammolar va yechimlar jadvali.
  10. Baholash (5 ball).
  11. Namuna natija fayli (bolalar darsda yetib kelishi kerak bo'lgan kod).

## Keyingi qadam
**2-darsni** xuddi 1-dars formatida tayyorlash: HTML lending bo'limlari, FAQ (`details/summary`), SEO (`title`, `description`, `alt`).
1-dars uy vazifasi: bolalar sevimli saytni bo'limlarga ajratib keladi va o'z saytlari uchun 3 ta rang tanlaydi.

Suhbat o'zbek tilida (lotin yozuvida) bo'lsin.
