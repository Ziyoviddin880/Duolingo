// =====================================================
//  DARS MEXANIZMI
//  Sikl: savol → javob → tekshirish → yashil/qizil → keyingi savol
//  Xato qilingan mashq dars oxiriga qaytariladi.
// =====================================================

const KIND_TITLES = {
  choice: "To‘g‘ri javobni tanlang",
  truefalse: "To‘g‘rimi yoki noto‘g‘rimi?",
  fill: "Bo‘sh joyni to‘ldiring",
  order: "Gapni tuzing",
  match: "Juftliklarni toping",
  input: "Javobni yozing",
  listen: "Tinglang va tanlang"
};
const PRAISE = ["Barakalla!", "Zo‘r!", "Ajoyib!", "To‘ppa-to‘g‘ri!", "Qoyil!"];

const $ = sel => document.querySelector(sel);
const found = findLesson(new URLSearchParams(location.search).get("id"));

let queue = [];          // navbatdagi mashqlar
let pos = 0;             // hozirgi mashq raqami
let solved = new Set();  // to'g'ri yechilgan mashqlar
let mistakes = 0;
let xpEarned = 0;
let checked = false;
let getAnswer = () => null;     // har bir mashq turi o'zi belgilaydi
let markAnswer = () => {};      // javobni yashil/qizil qilish
const startedAt = Date.now();

// Ishga tushirish (fayl oxirida chaqiriladi — hamma funksiyalar e'lon qilingandan keyin)
function init() {
  if (!requireUser()) return;
  if (!found || !found.lesson.exercises.length) {
    $("#body").innerHTML = `<div class="result"><div class="big-emoji">🤔</div><h2>Dars topilmadi yoki unda mashq yo‘q</h2>
      <a class="btn" href="learn.html">Kursga qaytish</a></div>`;
    $("#foot").hidden = true;
  } else {
    document.title = found.lesson.title + " — Bilimdon";
    queue = found.lesson.exercises.map((ex, i) => ({ ex, i, repeat: false }));
    updateHearts();
    if (state.hearts <= 0) heartsOver(); else render();
  }
}

// ---------- Ekranni chizish ----------
function render() {
  updateProgress();
  if (pos >= queue.length) return showResult();

  const { ex, repeat } = queue[pos];
  checked = false;
  setFooter("idle");

  const speakBtn = ex.say ? `<button class="speak" id="speakBtn" title="Tinglash">🔊</button>` : "";
  $("#body").innerHTML = `
    <div class="ex-kind">${repeat ? '<span class="tag-repeat">Takrorlash</span>' : ""}${KIND_TITLES[ex.type]}</div>
    <h2 class="ex-q">${speakBtn}<span>${esc(ex.question || "")}</span></h2>
    <div id="area"></div>`;
  if (ex.say) {
    $("#speakBtn").onclick = () => speak(ex.say);
    if (ex.type === "listen") setTimeout(() => speak(ex.say), 300);
  }
  RENDERERS[ex.type](ex, $("#area"));
}

// ---------- Mashq turlari ----------
const RENDERERS = {
  choice: (ex, area) => renderOptions(area, shuffle(ex.options), ex.answer),
  listen: (ex, area) => renderOptions(area, shuffle(ex.options), ex.answer),

  truefalse(ex, area) {
    renderOptions(area, ["To‘g‘ri", "Noto‘g‘ri"], ex.answer ? "To‘g‘ri" : "Noto‘g‘ri", true);
  },

  fill(ex, area) {
    // Savoldagi "___" o'rniga tanlangan so'z qo'yiladi
    $(".ex-q span").innerHTML = esc(ex.question).replace("___", '<span class="blank" id="blank">&nbsp;</span>');
    renderOptions(area, shuffle(ex.options), ex.answer, false, v => { $("#blank").textContent = v; });
  },

  order(ex, area) {
    area.innerHTML = `<div class="answer-line" id="line"></div><div class="bank" id="bank"></div>`;
    shuffle(ex.words).forEach(word => {
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.textContent = word;
      chip.onclick = () => {
        if (checked || chip.classList.contains("used")) return;
        beep("tap");
        chip.classList.add("used");
        const copy = document.createElement("button");
        copy.className = "chip";
        copy.textContent = word;
        copy.onclick = () => { if (checked) return; copy.remove(); chip.classList.remove("used"); answerReady($("#line").children.length > 0); };
        $("#line").appendChild(copy);
        answerReady(true);
      };
      $("#bank").appendChild(chip);
    });
    getAnswer = () => [...$("#line").children].map(c => c.textContent).join(" ");
    markAnswer = ok => $("#line").classList.add(ok ? "right" : "wrong");
  },

  match(ex, area) {
    area.innerHTML = `<div class="match"><div class="col" id="colL"></div><div class="col" id="colR"></div></div>`;
    let pick = { L: null, R: null };
    let matched = 0;
    const make = (side, items) => items.forEach(({ text, i }) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = text;
      b.dataset.i = i;
      b.onclick = () => {
        if (b.classList.contains("matched")) return;
        document.querySelectorAll(`#col${side} .opt`).forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
        pick[side] = b;
        if (pick.L && pick.R) {
          const [l, r] = [pick.L, pick.R];
          if (l.dataset.i === r.dataset.i) {
            beep("tap");
            l.classList.replace("selected", "matched");
            r.classList.replace("selected", "matched");
            if (++matched === ex.pairs.length) setTimeout(() => check(true), 250);
          } else {
            beep("bad");
            [l, r].forEach(x => { x.classList.remove("selected"); x.classList.add("shake"); setTimeout(() => x.classList.remove("shake"), 400); });
          }
          pick = { L: null, R: null };
        }
      };
      $("#col" + side).appendChild(b);
    });
    make("L", shuffle(ex.pairs.map((p, i) => ({ text: p[0], i }))));
    make("R", shuffle(ex.pairs.map((p, i) => ({ text: p[1], i }))));
    $("#checkBtn").textContent = "Hammasini moslang";
  },

  input(ex, area) {
    area.innerHTML = `<input class="text-answer" id="txt" placeholder="Javobni shu yerga yozing..." autocomplete="off" autocapitalize="off" spellcheck="false">`;
    const input = $("#txt");
    input.oninput = () => answerReady(input.value.trim().length > 0);
    input.focus();
    getAnswer = () => input.value;
    markAnswer = ok => { input.classList.add(ok ? "right" : "wrong"); input.disabled = true; };
  }
};

// Variantli mashqlar uchun umumiy funksiya (choice, listen, fill, truefalse)
function renderOptions(area, options, correct, twoCols = false, onPick = null) {
  area.innerHTML = `<div class="options ${twoCols ? "two" : ""}">` +
    options.map((o, i) => `<button class="opt" data-v="${esc(o)}"><span class="key">${i + 1}</span><span>${esc(o)}</span></button>`).join("") +
    `</div>`;
  let chosen = null;
  area.querySelectorAll(".opt").forEach(btn => {
    btn.onclick = () => {
      if (checked) return;
      area.querySelectorAll(".opt").forEach(x => x.classList.remove("selected"));
      btn.classList.add("selected");
      chosen = btn.dataset.v;
      if (onPick) onPick(chosen);
      answerReady(true);
    };
  });
  getAnswer = () => chosen;
  markAnswer = ok => {
    area.querySelectorAll(".opt").forEach(btn => {
      if (btn.dataset.v === correct) btn.classList.add("right");
      else if (btn.dataset.v === chosen && !ok) btn.classList.add("wrong");
      btn.classList.remove("selected");
    });
  };
}

// ---------- Tekshirish ----------
function normalize(s) {
  return String(s).toLowerCase().replace(/[’`‘]/g, "'").replace(/\s+/g, " ").trim().replace(/[.!?,;:]+$/, "");
}
function isCorrect(ex, ans) {
  if (ans === null || ans === undefined) return false;
  if (ex.type === "truefalse") return (ans === "To‘g‘ri") === ex.answer;
  if (ex.type === "input") return [ex.answer, ...(ex.accept || [])].some(a => normalize(a) === normalize(ans));
  return normalize(ans) === normalize(ex.answer);
}
function correctText(ex) {
  if (ex.type === "truefalse") return ex.answer ? "To‘g‘ri" : "Noto‘g‘ri";
  return ex.answer;
}

function check(forced) {
  if (checked) return;
  const item = queue[pos];
  const ok = forced === true ? true : isCorrect(item.ex, getAnswer());
  checked = true;
  if (item.ex.type !== "match") markAnswer(ok);

  if (ok) {
    beep("ok");
    if (!solved.has(item.i)) {
      solved.add(item.i);
      xpEarned += item.repeat ? CONFIG.xpPerRepeat : CONFIG.xpPerCorrect;
    }
    setFooter("ok", PRAISE[Math.floor(Math.random() * PRAISE.length)], item.ex.explain || "");
  } else {
    beep("bad");
    mistakes++;
    loseHeart();
    updateHearts();
    queue.push({ ex: item.ex, i: item.i, repeat: true }); // oxirida takrorlanadi
    const expl = item.ex.explain ? `<br>${esc(item.ex.explain)}` : "";
    setFooter("bad", "Noto‘g‘ri", `To‘g‘ri javob: <b>${esc(correctText(item.ex))}</b>${expl}`);
  }
  updateProgress();
}

function next() {
  if (state.hearts <= 0) return heartsOver();
  pos++;
  render();
}

// ---------- Pastki panel ----------
function setFooter(mode, title = "", text = "") {
  const foot = $("#foot");
  const btn = $("#checkBtn");
  foot.className = "lesson-foot " + (mode === "idle" ? "" : mode);
  if (mode === "idle") {
    $("#feedback").innerHTML = `<button class="btn btn-ghost" id="skipBtn">O‘tkazib yuborish</button>`;
    $("#skipBtn").onclick = () => { if (!checked) check(false); };
    btn.textContent = "Tekshirish";
    btn.className = "btn";
    btn.disabled = true;
    btn.onclick = () => check(false);
  } else {
    $("#feedback").innerHTML = `<div class="feedback"><div class="big">${mode === "ok" ? "✅" : "❌"}</div>
      <div><h3>${title}</h3><p>${text}</p></div></div>`;
    btn.textContent = "Davom etish";
    btn.className = "btn " + (mode === "ok" ? "btn-ok" : "btn-bad");
    btn.disabled = false;
    btn.onclick = next;
    btn.focus();
  }
}
function answerReady(ready) {
  if (!checked) $("#checkBtn").disabled = !ready;
}
function updateProgress() {
  const total = found ? found.lesson.exercises.length : 1;
  $("#bar").style.width = (solved.size / total) * 100 + "%";
}
function updateHearts() {
  $("#hearts").textContent = "❤️ " + state.hearts;
}

// ---------- Klaviatura: Enter — tekshirish/davom, 1-4 — variant ----------
document.addEventListener("keydown", e => {
  if (document.querySelector(".modal-bg") || $("#foot").hidden) return;
  const btn = $("#checkBtn");
  if (e.key === "Enter" && btn && !btn.disabled) { e.preventDefault(); btn.click(); return; }
  if (/^[1-9]$/.test(e.key) && document.activeElement.tagName !== "INPUT") {
    const opts = document.querySelectorAll(".options .opt");
    if (opts[e.key - 1]) opts[e.key - 1].click();
  }
});

// ---------- Yuraklar tugadi ----------
function heartsOver() {
  showModal({
    emoji: "💔",
    title: "Yuraklar tugadi",
    html: `<p>Yangi yurak ${minutesToNextHeart()} daqiqada tiklanadi. Bu darsdagi natija saqlanmaydi.</p>`,
    buttons: [
      { text: "Kursga qaytish", onClick: () => (location.href = "learn.html") },
      { text: "Demo: yuraklarni to‘ldirish", cls: "btn-ghost", onClick: () => {
          state.hearts = CONFIG.maxHearts; saveState(); updateHearts();
          if (pos >= queue.length || checked) { pos++; }
          render();
        } }
    ]
  });
}

// ---------- Natija ekrani ----------
function showResult() {
  const total = found.lesson.exercises.length;
  const perfect = mistakes === 0;
  if (perfect) xpEarned += CONFIG.perfectBonus;
  const accuracy = Math.round((total / (total + mistakes)) * 100);
  const seconds = Math.round((Date.now() - startedAt) / 1000);
  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const res = finishLesson(found.lesson.id, { xp: xpEarned, accuracy, perfect });

  $("#foot").hidden = true;
  $(".lesson-top").style.visibility = "hidden";
  const ach = res.newAchievements.map(a => `<div class="new-ach">${a.icon} Yangi yutuq: <b>${esc(a.title)}</b></div>`).join("");
  $("#body").innerHTML = `
    <div class="result">
      <div class="big-emoji">${perfect ? "🏆" : "🎉"}</div>
      <h2>${perfect ? "Benuqson dars!" : "Dars tugadi!"}</h2>
      <div class="result-stats">
        <div class="rstat" style="--c:var(--gold)"><div class="t">Jami XP</div><div class="v">⚡ ${xpEarned}</div></div>
        <div class="rstat" style="--c:var(--ok)"><div class="t">Aniqlik</div><div class="v">🎯 ${accuracy}%</div></div>
        <div class="rstat" style="--c:var(--primary)"><div class="t">Vaqt</div><div class="v">⏱️ ${time}</div></div>
      </div>
      ${res.levelUp ? `<div class="new-ach">⭐ Yangi daraja: <b>${levelInfo(state.xp).level}</b></div>` : ""}
      ${res.streakUp ? `<div class="new-ach">🔥 Seriya: <b>${state.streak.count} kun</b></div>` : ""}
      ${ach}
      <div class="result-btns">
        <a class="btn btn-ghost" href="lesson.html?id=${encodeURIComponent(found.lesson.id)}">Qayta o‘tish</a>
        <a class="btn" href="learn.html" id="contBtn">Davom etish</a>
      </div>
    </div>`;
  $("#contBtn").focus();
  beep("win");
  confetti();
}

init();
