// =====================================================
//  KURSLAR MA'LUMOTI
//  Tuzilma: kurs → bo'lim (unit) → dars (lesson) → mashq (exercise)
//  Mashq turlari: choice, truefalse, fill, order, match, input, listen
//  Bu faylni ChatGPT yordamida to'ldirish mumkin (REJA.md, 5-dars).
// =====================================================

const DEFAULT_COURSES = [
  {
    id: "en",
    title: "Ingliz tili",
    emoji: "🔤",
    level: "A1 · Boshlang‘ich",
    desc: "Salomlashish, raqamlar, oila, ranglar va ovqatlar. Talaffuzni tinglab o‘rganing.",
    units: [
      {
        id: "en-u1",
        title: "Salomlashish va tanishuv",
        desc: "Birinchi so‘zlar va gaplar",
        color: "#7c4dff",
        lessons: [
          {
            id: "en-1", title: "Salom!", icon: "👋",
            exercises: [
              { type: "choice", question: "“Salom” inglizcha qanday bo‘ladi?", options: ["Hello", "Goodbye", "Thank you"], answer: "Hello" },
              { type: "listen", say: "Good morning", question: "Nima deyildi?", options: ["Xayrli tong", "Xayrli kech", "Xayr"], answer: "Xayrli tong" },
              { type: "match", question: "Juftliklarni toping", pairs: [["Hello", "Salom"], ["Goodbye", "Xayr"], ["Good morning", "Xayrli tong"], ["Good night", "Xayrli tun"]] },
              { type: "truefalse", question: "“Goodbye” — “Xayr” degani.", answer: true },
              { type: "order", question: "Tarjima qiling: “Salom, qalaysan?”", words: ["Hello,", "how", "are", "you?", "is", "am"], answer: "Hello, how are you?" },
              { type: "input", question: "“Xayr” so‘zini inglizcha yozing", answer: "goodbye", accept: ["bye", "good bye"] }
            ]
          },
          {
            id: "en-2", title: "Tanishuv", icon: "🙋",
            exercises: [
              { type: "fill", question: "My ___ is Aziz.", options: ["name", "names", "is"], answer: "name", explain: "My name is ... — Mening ismim ..." },
              { type: "choice", question: "“I am 10 years old” qanday tarjima qilinadi?", options: ["Men 10 yoshdaman", "Mening 10 ta olmam bor", "U 10 yoshda"], answer: "Men 10 yoshdaman" },
              { type: "order", question: "Tarjima qiling: “Tanishganimdan xursandman”", words: ["Nice", "to", "meet", "you", "me", "good"], answer: "Nice to meet you" },
              { type: "fill", question: "I ___ a student.", options: ["am", "is", "are"], answer: "am", explain: "“I” bilan doim “am” ishlatiladi." },
              { type: "truefalse", question: "“She is my friend” — “U mening do‘stim” degani.", answer: true },
              { type: "input", question: "Tarjima qiling: “Mening ismim Ali”", answer: "My name is Ali", accept: ["my name's ali"] }
            ]
          },
          {
            id: "en-3", title: "Raqamlar 1–10", icon: "🔢",
            exercises: [
              { type: "match", question: "Juftliklarni toping", pairs: [["one", "bir"], ["two", "ikki"], ["three", "uch"], ["four", "to‘rt"], ["five", "besh"]] },
              { type: "listen", say: "seven", question: "Qaysi raqam aytildi?", options: ["7", "6", "9", "10"], answer: "7" },
              { type: "choice", question: "“Sakkiz” inglizcha?", options: ["eight", "eighteen", "nine"], answer: "eight" },
              { type: "truefalse", question: "“ten” — “o‘n” degani.", answer: true },
              { type: "input", question: "3 + 2 = ? (inglizcha so‘z bilan yozing)", answer: "five" },
              { type: "fill", question: "I have ___ hands.", options: ["two", "one", "six"], answer: "two", explain: "Odamning ikkita qo‘li bor — two hands." }
            ]
          }
        ]
      },
      {
        id: "en-u2",
        title: "Kundalik hayot",
        desc: "Oila, ranglar, ovqatlar",
        color: "#ff8a00",
        lessons: [
          {
            id: "en-4", title: "Oila", icon: "👨‍👩‍👧",
            exercises: [
              { type: "match", question: "Juftliklarni toping", pairs: [["mother", "ona"], ["father", "ota"], ["sister", "opa/singil"], ["brother", "aka/uka"]] },
              { type: "choice", question: "“Grandmother” kim?", options: ["buvi", "bobo", "xola"], answer: "buvi" },
              { type: "fill", question: "This is my ___. He is a doctor.", options: ["father", "mother", "sister"], answer: "father", explain: "“He” — erkak kishi, shuning uchun “father”." },
              { type: "order", question: "Tarjima qiling: “Mening oilam katta”", words: ["My", "family", "is", "big", "small", "are"], answer: "My family is big" },
              { type: "truefalse", question: "“Brother” — “opa” degani.", answer: false, explain: "Brother — aka yoki uka. Opa/singil — sister." }
            ]
          },
          {
            id: "en-5", title: "Ranglar", icon: "🎨",
            exercises: [
              { type: "match", question: "Juftliklarni toping", pairs: [["red", "qizil"], ["blue", "ko‘k"], ["green", "yashil"], ["yellow", "sariq"]] },
              { type: "fill", question: "The sky is ___.", options: ["blue", "red", "black"], answer: "blue" },
              { type: "listen", say: "white", question: "Qaysi rang aytildi?", options: ["oq", "qora", "kulrang"], answer: "oq" },
              { type: "choice", question: "“Qora” inglizcha?", options: ["black", "brown", "pink"], answer: "black" },
              { type: "input", question: "“Sariq” so‘zini inglizcha yozing", answer: "yellow" }
            ]
          },
          {
            id: "en-6", title: "Ovqatlar", icon: "🍎",
            exercises: [
              { type: "match", question: "Juftliklarni toping", pairs: [["apple", "olma"], ["bread", "non"], ["water", "suv"], ["milk", "sut"]] },
              { type: "fill", question: "I drink ___ every morning.", options: ["milk", "bread", "apple"], answer: "milk", explain: "drink — ichmoq. Nonni ichib bo‘lmaydi 🙂" },
              { type: "order", question: "Tarjima qiling: “Men olmalarni yaxshi ko‘raman”", words: ["I", "like", "apples", "is", "you", "eat"], answer: "I like apples" },
              { type: "truefalse", question: "“Bread” — “non” degani.", answer: true },
              { type: "listen", say: "water", question: "Nima deyildi?", options: ["suv", "sut", "choy"], answer: "suv" },
              { type: "choice", question: "Qaysi biri ichimlik?", options: ["tea", "bread", "egg"], answer: "tea" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "web",
    title: "Web asoslari",
    emoji: "💻",
    level: "Yangi boshlovchilar",
    desc: "HTML teglari va CSS bilan bezash. O‘z saytingizni yaratishga birinchi qadam.",
    units: [
      {
        id: "web-u1",
        title: "HTML va CSS",
        desc: "Sahifa skeleti va bezagi",
        color: "#0ea5e9",
        lessons: [
          {
            id: "web-1", title: "HTML nima?", icon: "📄",
            exercises: [
              { type: "choice", question: "HTML nima uchun kerak?", options: ["Sahifa tuzilmasini yaratish", "Rasm chizish", "Internetni tezlashtirish"], answer: "Sahifa tuzilmasini yaratish" },
              { type: "truefalse", question: "HTML — dasturlash tili.", answer: false, explain: "HTML — belgilash (markup) tili. U sahifa skeletini yaratadi." },
              { type: "match", question: "Teg va vazifasini moslang", pairs: [["<h1>", "Sarlavha"], ["<p>", "Abzats"], ["<img>", "Rasm"], ["<a>", "Havola"]] },
              { type: "fill", question: "Eng katta sarlavha: <___>Salom</h1>", options: ["h1", "p", "title"], answer: "h1" },
              { type: "choice", question: "Brauzerda qaysi teg ichidagi narsa ko‘rinadi?", options: ["<body>", "<head>", "<meta>"], answer: "<body>" }
            ]
          },
          {
            id: "web-2", title: "Teglar va atributlar", icon: "🏷️",
            exercises: [
              { type: "fill", question: "Havola: <a ___=\"https://google.com\">Google</a>", options: ["href", "src", "link"], answer: "href" },
              { type: "fill", question: "Rasm: <img ___=\"cat.jpg\" alt=\"Mushuk\">", options: ["src", "href", "img"], answer: "src" },
              { type: "order", question: "Kod qatorini tuzing: abzatsda “Salom dunyo”", words: ["<p>", "Salom", "dunyo", "</p>", "<h1>"], answer: "<p> Salom dunyo </p>" },
              { type: "truefalse", question: "<img> tegiga yopuvchi </img> teg kerak emas.", answer: true },
              { type: "input", question: "Abzats yaratuvchi teg nomini yozing (qavslarsiz)", answer: "p", accept: ["<p>"] }
            ]
          },
          {
            id: "web-3", title: "CSS bilan bezash", icon: "🎨",
            exercises: [
              { type: "choice", question: "CSS nima qiladi?", options: ["Sahifani bezaydi", "Ma’lumotni saqlaydi", "Kompyuterni yoqadi"], answer: "Sahifani bezaydi" },
              { type: "fill", question: "Matnni qizil qilish:  color: ___;", options: ["red", "big", "bold"], answer: "red" },
              { type: "match", question: "Xususiyat va vazifasini moslang", pairs: [["color", "Matn rangi"], ["background", "Fon"], ["font-size", "Shrift o‘lchami"], ["margin", "Tashqi oraliq"]] },
              { type: "truefalse", question: "display: flex elementlarni bir qatorga joylashtiradi.", answer: true },
              { type: "input", question: "Fon rangi xususiyati: ___-color (bo‘sh joyni yozing)", answer: "background" }
            ]
          }
        ]
      }
    ]
  }
];
