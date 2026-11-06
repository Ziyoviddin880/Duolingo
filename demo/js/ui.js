// =====================================================
//  UMUMIY UI: menyu, yuqori panel, modal, toast, konfetti, ovoz
// =====================================================

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function requireUser() {
  if (!state.user) { location.href = "start.html"; return false; }
  return true;
}

// ---------- Menyu va yuqori panel ----------
function renderShell(active) {
  const nav = [
    { key: "learn",   href: "learn.html",       ico: "🏠", label: "O‘rganish" },
    { key: "board",   href: "leaderboard.html", ico: "🏆", label: "Reyting" },
    { key: "profile", href: "profile.html",     ico: state.user ? state.user.avatar : "👤", label: "Profil" },
    { key: "admin",   href: "admin.html",       ico: "🛠️", label: "O‘qituvchi" }
  ];
  document.getElementById("sidebar").innerHTML =
    `<a class="logo" href="index.html"><span class="mark">B</span>bilimdon</a>` +
    nav.map(n => `<a class="nav-item ${n.key === active ? "active" : ""}" href="${n.href}">
        <span class="ico">${n.ico}</span><span class="label">${n.label}</span></a>`).join("");
  renderTopbar();
}

function renderTopbar() {
  const bar = document.getElementById("topbar");
  if (!bar) return;
  const course = getCourse(state.courseId);
  const streak = currentStreak();
  bar.innerHTML = `
    <span class="stat" title="${esc(course.title)}">${course.emoji}</span>
    <span class="stat fire ${streak ? "" : "dim"}" title="Kunlar seriyasi">🔥 ${streak}</span>
    <span class="stat xp" title="Jami XP">⚡ ${state.xp}</span>
    <span class="stat heart" title="Yuraklar">❤️ ${state.hearts}</span>`;
}

// ---------- Modal oyna ----------
function showModal({ emoji = "", title = "", html = "", buttons = [] }) {
  const bg = document.createElement("div");
  bg.className = "modal-bg";
  bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
      <div class="em">${emoji}</div><h3>${title}</h3><div class="modal-text">${html}</div>
      <div class="btns"></div></div>`;
  buttons.forEach(b => {
    const btn = document.createElement("button");
    btn.className = "btn " + (b.cls || "");
    btn.textContent = b.text;
    btn.onclick = () => { bg.remove(); if (b.onClick) b.onClick(); };
    bg.querySelector(".btns").appendChild(btn);
  });
  document.body.appendChild(bg);
  const first = bg.querySelector(".btn");
  if (first) first.focus();
  return bg;
}

// ---------- Qisqa xabar ----------
function toast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// ---------- Konfetti ----------
function confetti(count = 90) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#7c4dff", "#ff9f1c", "#22c55e", "#ffc53d", "#ef4444", "#38bdf8"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "confetti";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = 2 + Math.random() * 2 + "s";
    p.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }
}

// ---------- Tovushlar (fayl kerak emas — Web Audio API) ----------
let audioCtx = null;
function beep(kind) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = { ok: [660, 880], bad: [260, 180], win: [523, 659, 784, 1047], tap: [520] }[kind] || [600];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = kind === "bad" ? "triangle" : "sine";
      osc.frequency.value = freq;
      const t = audioCtx.currentTime + i * 0.11;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.22);
    });
  } catch (e) {}
}

// ---------- Talaffuz (brauzerning o'zida bor) ----------
function speak(text, lang = "en-US") {
  if (!("speechSynthesis" in window)) { toast("Brauzeringiz ovozni qo‘llab-quvvatlamaydi"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.85;
  speechSynthesis.speak(u);
}
