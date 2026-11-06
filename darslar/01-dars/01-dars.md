# 1-dars. Tanishuv, ChatGPT va HTML skeleti

**Davomiyligi:** 60 daqiqa
**Maqsad:** o'quvchi kurs oxirida nima yasashini ko'radi, ChatGPT'dan to'g'ri foydalanishni o'rganadi va o'z saytining birinchi (bezaksiz) sahifasini yasaydi.
**Darsdan keyin o'quvchida:** `mening-saytim/index.html` — 6 bo'limli sahifa, brauzerda ochiladi.

---

## O'qituvchi darsdan oldin tayyorlaydi (checklist)
- [ ] `demo/index.html` proyektorda ochilgan, demo'dagi progress tozalangan (Profil → «Progressni o'chirish»).
- [ ] O'qituvchi paneli (`admin.html`, PIN 1234) va ChatGPT boshqa tabda ochilgan.
- [ ] Hamma kompyuterlarda **VS Code** va **Chrome** o'rnatilgan.
- [ ] Windows'da fayl kengaytmalari ko'rinadigan qilingan: Explorer → «View/Вид» → «File name extensions» ✓ (aks holda `index.html.txt` muammosi chiqadi).
- [ ] Har bir o'quvchida ChatGPT akkaunti bor (chatgpt.com, Google orqali kirish mumkin). Akkaunti yo'qlar uchun: Gemini yoki Copilot.
- [ ] Doskaga yoki qog'ozga «ChatGPT qoidalari» va «Prompt shabloni» yozib qo'yilgan (pastda).
- [ ] Namuna natija: `darslar/01-dars/namuna/index.html` (bolalarga oxirida ko'rsatiladi, oldin emas).

---

## Dars rejasi

| Vaqt | Qism | Natija |
|---|---|---|
| 0–5 | Tanishuv va kurs maqsadi | Bolalar nima uchun kelganini biladi |
| 5–13 | Demo'ni ko'rsatish | «Men ham shuni xohlayman» motivatsiyasi |
| 13–20 | Sayt qanday tuzilgan: HTML, CSS, JS | 3 qism farqini tushunadi |
| 20–28 | ChatGPT bilan ishlash qoidalari | Yaxshi promptni yomonidan ajratadi |
| 28–35 | VS Code: papka va birinchi fayl | `index.html` brauzerda ochiladi |
| 35–55 | Amaliyot: o'z saytining skeleti | 6 bo'limli sahifa |
| 55–60 | Yakun va uy vazifasi | Har kim bo'limlarni ko'rsatib beradi |

---

## 1. Tanishuv (0–5 daqiqa)

**O'qituvchi aytadi:**
> «Salom! Bu kursda biz 15 dars davomida o'zimizning o'quv platformamizni yasaymiz. Unda darslar, ballar, yuraklar va reyting bo'ladi, xuddi o'yindagidek. Eng qizig'i: kodning katta qismini biz bilan birga sun'iy intellekt, ya'ni ChatGPT yozadi. Lekin rul sizning qo'lingizda bo'ladi. ChatGPT — yordamchi, sayt muallifi esa siz.»

Har bir o'quvchidan bir gapda so'rang: **«Qaysi ilova yoki o'yindan har kuni foydalanasan va unga nega qaytaverasan?»** Javoblardan (seriya, mukofot, daraja, do'stlar bilan musobaqa) keyinroq foydalanamiz: «Mana shu narsalarni biz ham saytimizga qo'shamiz».

---

## 2. Demo'ni ko'rsatish (5–13 daqiqa)

Proyektorda `demo/index.html`. Har qadamda bolalarga savol bering, shunda ular faqat tomoshabin bo'lib qolmaydi.

1. **Lending.** Pastga aylantiring. *«Bu sahifada qanday qismlar bor?»* — tepa menyu, katta yozuv, kartochkalar, savollar, pastki qism.
2. **«Bepul boshlash»** → bir o'quvchining ismini yozing, avatarni sinf tanlasin.
3. **Kurs xaritasi.** *«Nega boshqa darslar qulflangan?»*
4. **1-darsni o'ting.** Bitta savolga ataylab **xato** javob bering: *«Qarang, yurak kamaydi. Bu savol endi qayerda chiqadi?»* (oxirida qaytadi). 🔊 tugmasini bosib talaffuzni eshittiring.
5. **Natija ekrani:** XP, konfetti, yangi yutuq. Xaritaga qayting: keyingi dars ochilgan.
6. **«Wow» moment — o'qituvchi paneli:**
   - Yangi dars qo'shing, masalan «Hayvonlar».
   - «Promptni nusxalash» → ChatGPT'ga joylang → javobni panelga qo'ying → «Tekshirish va qo'shish».
   - Darsni oching: *«1 daqiqa oldin bu dars yo'q edi. Uni sun'iy intellekt tuzdi, biz esa tekshirdik.»*
7. Telefonda ko'rsating (DevTools → telefon belgisi 📱 yoki o'z telefoningizda).

**O'qituvchi aytadi:**
> «15-darsning oxirida har biringizda shunday sayt bo'ladi, faqat sizning mavzuingiz bilan: futbol, matematika, ingliz tili, multfilmlar — nimani xohlasangiz. Va u internetda bo'ladi: havolani do'stlaringizga yuborasiz.»

---

## 3. Sayt qanday tuzilgan (13–20 daqiqa)

Doskaga uy rasmini chizing va uch qismga ajrating:

| Qism | Uyda nima | Saytda nima |
|---|---|---|
| **HTML** | Devorlar, xonalar, eshiklar (skelet) | Sarlavha, matn, tugma, rasm — **nima** bor |
| **CSS** | Bo'yoq, mebel, bezak | Ranglar, shrift, joylashuv — **qanday** ko'rinadi |
| **JavaScript** | Elektr: chiroq yoqiladi, eshik qo'ng'irog'i | Bosilganda nima **sodir bo'ladi** |

**Demo'da ko'rsating:** sahifada o'ng tugma → «Просмотреть код / Inspect».
- Biror sarlavhani tanlang → bu **HTML**.
- O'ng panelda `color` ni o'zgartiring → bu **CSS** (sahifa darhol o'zgaradi, bolalarga juda yoqadi).
- Burger-menyu yoki demo-savolni bosing → bu **JavaScript**.

**Teg nima** (doskaga yozing):
```html
<h1>Salom!</h1>
```
- `<h1>` — ochuvchi teg, `</h1>` — yopuvchi teg (`/` belgisi bilan).
- O'rtadagi matn — mazmun.
- Teg — brauzerga beriladigan buyruq: «buni katta sarlavha qilib ko'rsat».

**Lending bo'limlari** — bugun yasaydiganimiz:
```
header   — tepa: logo + menyu
hero     — katta shior + asosiy tugma
features — «nega biz?» (imkoniyatlar)
courses  — kurslar ro'yxati
faq      — ko'p so'raladigan savollar
footer   — pastki qism: muallif, yil
```

---

## 4. ChatGPT bilan ishlash qoidalari (20–28 daqiqa)

### Jonli tajriba: yomon prompt va yaxshi prompt
ChatGPT'ga ekranda yuboring:

**❌ Yomon prompt:**
```
sayt qilib ber
```
Natijani ko'rsating: uzun, CSS va JS aralash, tushunarsiz kod. *«Buni tushundingizmi? Men ham yo'q.»*

**✅ Yaxshi prompt:**
```
Sen bolalarga dasturlashni o'rgatadigan o'qituvchisan.
Men o'quv sayti uchun lending sahifa yasayapman.
Menga faqat "hero" bo'limini HTML'da yozib ber: katta sarlavha, bitta gap va "Boshlash" tugmasi.
CSS va JavaScript ishlatma.
Kod 15 qatordan oshmasin. Har bir teg nima qilishini o'zbek tilida izohlab ber.
```
*«Farqni ko'ryapsizmi? Qisqa, tushunarli, tushuntirishi ham bor.»*

### Prompt shabloni (doskada butun kurs davomida turadi)
```
ROL:       Sen ... san.                     (kim bo'lib javob bersin)
KONTEKST:  Men ... qilyapman. Mana kodim:   (nima bor)
VAZIFA:    ... yozib ber / tuzat.           (nima kerak)
CHEKLOV:   Faqat HTML. 30 qatordan oshmasin. (nima mumkin emas)
FORMAT:    Har bir qatorni tushuntir.       (javob qanday bo'lsin)
```

### 7 qoida (doskaga yoki plakatga)
1. **Bitta so'rov — bitta vazifa.**
2. **Kontekst bering** — o'z kodingizni joylang.
3. **Kichik bo'laklar** — uzun kod kesilib qoladi, limit tez tugaydi.
4. **Tushuntirishni so'rang** — tushunmagan kodni qo'shmang.
5. **Xatoni to'liq yuboring:** nima qildim → nimani kutdim → nima bo'ldi.
6. **Nusxa ko'chirish ≠ o'rganish.** Har safar kamida bitta narsani o'zingiz o'zgartiring.
7. **Limit tugasa** — Gemini yoki Copilot, promptlar xuddi shunday ishlaydi.

**Muhim gap (bolalarga ayting):**
> «ChatGPT ba'zan xato qiladi va o'zini juda ishonchli ko'rsatadi. Shuning uchun biz har doim natijani brauzerda **tekshiramiz**. Himoyada sizdan "bu qator nima qiladi?" deb so'rayman: ChatGPT emas, siz javob berasiz.»

---

## 5. VS Code: birinchi fayl (28–35 daqiqa)

Bolalar sizdan keyin qadam-baqadam takrorlaydi. Har qadamdan keyin «bajarganlar qo'l ko'tarsin» deng.

1. Ish stolida `mening-saytim` papkasini yarating.
2. VS Code → **File → Open Folder** → `mening-saytim`.
3. Chap panelda «New File» belgisi → `index.html` (nomi aynan shunday, kichik harflar bilan).
4. Faylga `!` yozing va **Enter** bosing (Emmet tayyor skelet beradi).
5. `<body>` ichiga yozing: `<h1>Salom, men Aziz!</h1>`
6. **Ctrl + S** bilan saqlang (tab'dagi oq nuqta yo'qolishi kerak).
7. Papkada `index.html` ni ikki marta bosing → Chrome'da ochiladi.
8. Matnni o'zgartiring → Ctrl+S → brauzerda **F5** → o'zgarish ko'rinadi.

**Bolalarga ayting:** «Sikl doim bir xil: **o'zgartir → Ctrl+S → F5**. Bu kursda buni ming marta takrorlaysiz.»

> **Ixtiyoriy:** VS Code'ga «Live Server» kengaytmasini o'rnatsa, F5 bosmasa ham bo'ladi. Birinchi darsda shart emas.

---

## 6. Amaliyot: o'z saytimning skeleti (35–55 daqiqa)

### 1-qadam. Mavzu tanlash (3 daqiqa)
Har bir o'quvchi (yoki juftlik) tanlaydi va daftarga yozadi:
- **Platforma nomi** (masalan: «Bilimdon», «FutbolQuiz», «MathStar»).
- **Mavzu:** ingliz tili, matematika, tarix, geografiya, futbol, kino, multfilmlar, dasturlash…
- **Logotip-emoji:** 🦊 ⚽ 🚀 📚 🎮

*Mavzu tanlay olmaganlarga:* «Eng ko'p nimani bilasan? Do'stlaringga nimani o'rgata olasan?»

### 2-qadam. ChatGPT'ga prompt (5 daqiqa)
Bolalar shablonni o'z ma'lumotlari bilan to'ldiradi:
```
Sen bolalarga dasturlashni o'rgatadigan o'qituvchisan.
Men "[PLATFORMA NOMI]" nomli o'quv sayti yasayapman. Mavzusi: [MAVZU].
Menga faqat HTML'da oddiy lending sahifa yoz. Unda 6 ta bo'lim bo'lsin:
header (logo va menyu), hero (katta shior va tugma), imkoniyatlar (3 ta),
kurslar (2-3 ta), FAQ (2 ta savol-javob), footer.
CSS va JavaScript ishlatma. Matnlar o'zbek tilida bo'lsin.
Har bir bo'lim oldiga u nima ekanini izoh (<!-- -->) qilib yoz.
```

### 3-qadam. Kodni joylash (3 daqiqa)
- ChatGPT javobidagi **«Copy code»** tugmasini bosing.
- `index.html` dagi hamma narsani o'chirib (Ctrl+A → Delete), joylang (Ctrl+V).
- Ctrl+S → brauzerda F5.

### 4-qadam. Kodni o'qish (5 daqiqa): eng muhim qism!
O'qituvchi bitta o'quvchining kodini proyektorga chiqarib, birga o'qiydi:

| Teg | Nima qiladi |
|---|---|
| `<head>` | Brauzer uchun ma'lumot, sahifada ko'rinmaydi |
| `<title>` | Brauzer tab'idagi nom |
| `<body>` | Sahifada ko'rinadigan hamma narsa |
| `<header>`, `<footer>` | Sahifaning tepasi va pasti |
| `<section>` | Bitta bo'lim |
| `<h1>`, `<h2>`, `<h3>` | Sarlavhalar (h1 — eng katta, sahifada bitta) |
| `<p>` | Abzats (oddiy matn) |
| `<a href="">` | Havola |
| `<button>` | Tugma (hozircha hech narsa qilmaydi, JS 4-darsda) |
| `<ul>`, `<li>` | Ro'yxat va uning elementi |
| `<!-- ... -->` | Izoh: brauzer uni ko'rsatmaydi, odam uchun yozilgan |

**Tekshiruv o'yini:** o'quvchi brauzerda bo'limni ko'rsatadi, qo'shnisi kodda uni topadi. Keyin almashadi.

### 5-qadam. O'zim o'zgartiraman (4 daqiqa): ChatGPT'siz!
Har bir o'quvchi **qo'lda**:
1. Shiorni o'zgartiradi (hero'dagi `<h1>`).
2. Imkoniyatlarga 4-imkoniyatni qo'shadi (`<h3>` + `<p>` nusxasini olib, matnni o'zgartiradi).
3. Footer'ga o'z ismini yozadi.
4. `<title>` ni o'zgartiradi va tab'da o'zgarganini ko'radi.

### Tez bitirganlar uchun qo'shimcha
- FAQ'ga yana 3 ta savol qo'shish (jami 5 ta).
- ChatGPT'dan so'rash: *«`<details>` va `<summary>` teglari nima? Mening FAQ'imni shu teglar bilan qayta yoz»* — savol bosilganda javob ochiladi (CSS'siz ham ishlaydi!).
- Rasm qo'shish: `<img src="logo.png" alt="Logo">` (rasm faylini papkaga qo'yish kerak).

---

## 7. Yakun (55–60 daqiqa)

**3–4 o'quvchi o'z sahifasini ko'rsatadi** va javob beradi:
- «Header qayerda? Kodda-chi?»
- «Hero nima uchun kerak? Saytga kirgan odam nimani birinchi ko'radi?»

Endi namuna natijani (`darslar/01-dars/namuna/index.html`) ko'rsating va demo bilan solishtiring:
> «Ikkalasida ham bir xil bo'limlar bor. Farqi nima? Faqat bezak, ya'ni CSS. Keyingi darslarda sizning sahifangiz ham demo kabi chiroyli bo'ladi.»

**Yakuniy savol (har kim bir so'z bilan):** HTML — bu ... ? (skelet / tuzilma / suyak)

---

## Uy vazifasi
1. Sevimli saytni (masalan, istalgan do'kon yoki o'yin sayti) ochib, uni bo'limlarga ajrating va daftarga yozing: header, hero, ... (kamida 5 ta).
2. O'z saytingiz uchun **3 ta rang** tanlang (asosiy, urg'u, fon). coolors.co saytidan foydalansa bo'ladi. Ranglarning kodini yozib keling (masalan `#7c4dff`). Bu 3-darsda kerak bo'ladi.
3. ChatGPT'dan so'rang: *«HTML'da `<section>` va `<div>` ning farqi nima? 12 yoshli bolaga tushuntirgandek, 3 gapda.»* Javobni o'z so'zlaringiz bilan daftarga yozing.
4. *(Ixtiyoriy)* Saytingizga «Biz haqimizda» bo'limini o'zingiz qo'shing.

---

## Ko'p uchraydigan muammolar va yechimlar

| Muammo | Sabab | Yechim |
|---|---|---|
| Fayl brauzerda emas, Bloknotda ochiladi | Fayl `index.html.txt` bo'lib qolgan | Kengaytmalarni ko'rinadigan qilib, `.txt` ni o'chirish |
| O'zgarish brauzerda ko'rinmayapti | Saqlanmagan | VS Code tab'idagi oq nuqta → Ctrl+S, keyin F5 |
| O'zbekcha harflar `Ð¾Ê»` bo'lib chiqadi | `<meta charset="UTF-8">` yo'q | `<head>` ichiga qo'shish |
| ChatGPT CSS ham yozib yubordi | Promptda cheklov yo'q yoki e'tiborsiz qoldirildi | «CSS'ni olib tashla, faqat HTML qoldir» deb qayta so'rash |
| ChatGPT javobi inglizcha | Til ko'rsatilmagan | «Matnlar va izohlar o'zbek tilida bo'lsin» qo'shish |
| Sahifa butunlay bo'sh | Kod `<head>` ichiga joylangan yoki teg yopilmagan | Kodni `<body>` ichiga ko'chirish; VS Code'da qizil chiziqlarni tekshirish |
| ChatGPT limiti tugadi | Bepul versiya cheklovi | Gemini (gemini.google.com) yoki Copilot, xuddi shu prompt bilan |

---

## Baholash (shu dars uchun, ixtiyoriy)
- ✅ `index.html` brauzerda ochiladi — 1 ball
- ✅ 6 ta bo'lim bor — 2 ball
- ✅ Kamida 2 ta o'zgarishni o'zi qo'lda kiritgan — 1 ball
- ✅ Kodda va brauzerda bo'limlarni ko'rsatib bera oladi — 1 ball
