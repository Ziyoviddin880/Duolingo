// =====================================================
//  ILOVA HOLATI (state)
//  Backend yo'q — hamma narsa brauzerning localStorage'ida saqlanadi.
//  DevTools → Application → Local Storage bo'limida ko'rish mumkin.
// =====================================================

const STORE_KEY = "bilimdon_state_v1";
const COURSES_KEY = "bilimdon_courses_v1";

// O'yin qoidalari — raqamlarni shu yerda o'zgartirish kifoya
const CONFIG = {
  xpPerCorrect: 10,      // to'g'ri javob uchun
  xpPerRepeat: 5,        // xatodan keyin qayta to'g'ri javob uchun
  perfectBonus: 5,       // darsni xatosiz tugatganlik uchun
  maxHearts: 5,
  heartRefillMinutes: 30,
  levels: [0, 50, 120, 220, 350, 500, 700, 950, 1250, 1600, 2000],
  goals: [10, 20, 30, 50]
};

const AVATARS = ["🦊", "🐼", "🐯", "🐸", "🐧", "🦁", "🐨", "🐙", "🦄", "🐝"];

const ACHIEVEMENTS = [
  { id: "first",   icon: "🎯", title: "Birinchi qadam", desc: "Birinchi darsni tugating",  test: s => Object.keys(s.done).length >= 1 },
  { id: "five",    icon: "📚", title: "Kitobxon",       desc: "5 ta darsni tugating",       test: s => Object.keys(s.done).length >= 5 },
  { id: "perfect", icon: "⭐", title: "Benuqson",       desc: "Darsni xatosiz tugating",    test: s => (s.perfectCount || 0) >= 1 },
  { id: "xp100",   icon: "⚡", title: "100 XP",         desc: "100 XP to‘plang",            test: s => s.xp >= 100 },
  { id: "xp500",   icon: "💎", title: "500 XP",         desc: "500 XP to‘plang",            test: s => s.xp >= 500 },
  { id: "goal",    icon: "🏁", title: "Maqsadli",       desc: "Kunlik maqsadni bajaring",   test: s => (s.history[dayKey()] || 0) >= (s.user ? s.user.goal : 20) },
  { id: "streak3", icon: "🔥", title: "3 kun ketma-ket", desc: "3 kunlik seriya",           test: s => s.streak.count >= 3 },
  { id: "streak7", icon: "🏆", title: "Bir hafta",      desc: "7 kunlik seriya",            test: s => s.streak.count >= 7 }
];

// ---------- Sana yordamchilari (mahalliy vaqt bo'yicha) ----------
function dayKey(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
function addDays(key, n) {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}

// ---------- Saqlash / yuklash ----------
function defaultState() {
  return {
    user: null, courseId: "en", xp: 0,
    hearts: CONFIG.maxHearts, heartsAt: Date.now(),
    done: {}, history: {}, streak: { count: 0, last: null },
    achievements: [], perfectCount: 0
  };
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { /* buzilgan ma'lumot — yangidan boshlaymiz */ }
  return defaultState();
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

let state = loadState();
refillHearts();

// ---------- Kurslar (o'qituvchi panelida o'zgartirilishi mumkin) ----------
function getCourses() {
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_COURSES)); // nusxa
}
function saveCourses(courses) {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}
function getCourse(id) {
  const all = getCourses();
  return all.find(c => c.id === id) || all[0];
}
function allLessons(course) {
  return course.units.flatMap(u => u.lessons);
}
function findLesson(id) {
  for (const course of getCourses())
    for (const unit of course.units)
      for (const lesson of unit.lessons)
        if (lesson.id === id) return { course, unit, lesson };
  return null;
}
// Dars holati: "done" (o'tilgan), "open" (ochiq), "locked" (yopiq)
function lessonStatus(course, lessonId) {
  if (state.done[lessonId]) return "done";
  const list = allLessons(course);
  const i = list.findIndex(l => l.id === lessonId);
  if (i === 0 || (i > 0 && state.done[list[i - 1].id])) return "open";
  return "locked";
}

// ---------- XP va darajalar ----------
function levelInfo(xp) {
  const L = CONFIG.levels;
  let level = 1;
  for (let i = 0; i < L.length; i++) if (xp >= L[i]) level = i + 1;
  const cur = L[level - 1];
  const next = L[level] !== undefined ? L[level] : null;
  const pct = next ? ((xp - cur) / (next - cur)) * 100 : 100;
  return { level, cur, next, pct };
}

// ---------- Yuraklar ----------
function refillHearts() {
  const step = CONFIG.heartRefillMinutes * 60000;
  if (state.hearts >= CONFIG.maxHearts) { state.heartsAt = Date.now(); return; }
  const gained = Math.floor((Date.now() - state.heartsAt) / step);
  if (gained > 0) {
    state.hearts = Math.min(CONFIG.maxHearts, state.hearts + gained);
    state.heartsAt += gained * step;
    saveState();
  }
}
function loseHeart() {
  if (state.hearts === CONFIG.maxHearts) state.heartsAt = Date.now();
  state.hearts = Math.max(0, state.hearts - 1);
  saveState();
}
function minutesToNextHeart() {
  const step = CONFIG.heartRefillMinutes * 60000;
  return Math.max(1, Math.ceil((state.heartsAt + step - Date.now()) / 60000));
}

// ---------- Seriya (streak) ----------
function currentStreak() {
  const today = dayKey();
  const s = state.streak;
  if (s.last === today || s.last === addDays(today, -1)) return s.count;
  return 0; // seriya uzilgan
}
function weeklyXp() {
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += state.history[addDays(dayKey(), -i)] || 0;
  return sum;
}

// ---------- Yutuqlar ----------
function checkAchievements() {
  const fresh = [];
  for (const a of ACHIEVEMENTS) {
    if (!state.achievements.includes(a.id) && a.test(state)) {
      state.achievements.push(a.id);
      fresh.push(a);
    }
  }
  return fresh;
}

// ---------- Dars tugaganda ----------
function finishLesson(lessonId, result) {
  const levelBefore = levelInfo(state.xp).level;
  const today = dayKey();

  state.xp += result.xp;
  state.history[today] = (state.history[today] || 0) + result.xp;

  const prev = state.done[lessonId];
  state.done[lessonId] = {
    times: (prev ? prev.times : 0) + 1,
    best: Math.max(prev ? prev.best : 0, result.accuracy),
    at: Date.now()
  };
  if (result.perfect) state.perfectCount = (state.perfectCount || 0) + 1;

  let streakUp = false;
  if (state.streak.last !== today) {
    state.streak.count = state.streak.last === addDays(today, -1) ? state.streak.count + 1 : 1;
    state.streak.last = today;
    streakUp = true;
  }

  const newAchievements = checkAchievements();
  saveState();
  return { levelUp: levelInfo(state.xp).level > levelBefore, streakUp, newAchievements };
}

// ---------- Mashqni tekshirish (ChatGPT javoblarini ham tekshiradi) ----------
const EXERCISE_TYPES = ["choice", "truefalse", "fill", "order", "match", "input", "listen"];

function validateExercise(ex) {
  if (!ex || typeof ex !== "object") return "mashq obyekt emas";
  if (!EXERCISE_TYPES.includes(ex.type)) return `noma’lum tur: "${ex.type}"`;
  if (!ex.question && ex.type !== "listen") return "question (savol) yo‘q";

  if (["choice", "fill", "listen"].includes(ex.type)) {
    if (!Array.isArray(ex.options) || ex.options.length < 2) return "kamida 2 ta variant (options) kerak";
    if (new Set(ex.options).size !== ex.options.length) return "variantlar takrorlanmoqda";
    if (!ex.options.includes(ex.answer)) return "answer variantlar ichida yo‘q";
  }
  if (ex.type === "listen" && !ex.say) return "say (aytiladigan matn) yo‘q";
  if (ex.type === "truefalse" && typeof ex.answer !== "boolean") return "answer true yoki false bo‘lishi kerak (qo‘shtirnoqsiz)";
  if (ex.type === "order") {
    if (!Array.isArray(ex.words) || !ex.answer) return "words yoki answer yo‘q";
    const pool = [...ex.words];
    for (const w of String(ex.answer).split(/\s+/)) {
      const k = pool.indexOf(w);
      if (k < 0) return `"${w}" so‘zi words ichida yo‘q`;
      pool.splice(k, 1);
    }
  }
  if (ex.type === "match") {
    if (!Array.isArray(ex.pairs) || ex.pairs.length < 2) return "kamida 2 ta juftlik (pairs) kerak";
    if (ex.pairs.some(p => !Array.isArray(p) || p.length !== 2)) return "juftlik formati xato: [\"a\", \"b\"] bo‘lishi kerak";
  }
  if (ex.type === "input" && !ex.answer) return "answer yo‘q";
  return null; // xato yo'q
}
