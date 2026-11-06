// =====================================================
//  O'QITUVCHI PANELI
//  Kurs / bo'lim / dars qo'shish va ChatGPT'dan mashqlarni import qilish.
//  ⚠️ PIN kod JS ichida — bu haqiqiy himoya EMAS (backend bo'lmagani uchun).
// =====================================================

const ADMIN_PIN = "1234";
const UNIT_COLORS = ["#7c4dff", "#ff8a00", "#0ea5e9", "#22c55e", "#ec4899", "#14b8a6"];
const content = document.getElementById("content");

let courses = getCourses();
let selCourse = state.courseId;
let selLesson = null;

renderShell("admin");
if (sessionStorage.getItem("bilimdon_admin") === "1") renderAdmin(); else renderGate();

function uid(prefix) {
  return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}
function save() {
  saveCourses(courses);
}
function currentCourse() {
  return courses.find(c => c.id === selCourse) || courses[0];
}
function findSel() {
  for (const u of currentCourse().units) {
    const l = u.lessons.find(x => x.id === selLesson);
    if (l) return { unit: u, lesson: l };
  }
  return null;
}

// ---------- PIN ----------
function renderGate() {
  content.innerHTML = `
    <div class="card gate">
      <h2>🛠️ O‘qituvchi paneli</h2>
      <p class="muted">Demo PIN: <b>1234</b></p>
      <input class="inp" id="pin" type="password" inputmode="numeric" placeholder="PIN kod">
      <p class="err" id="pinErr"></p>
      <button class="btn btn-block" id="pinBtn">Kirish</button>
      <p class="note">⚠️ Bu PIN’ni JS kodida ko‘rish mumkin, ya’ni bu haqiqiy himoya emas.
      Haqiqiy himoya faqat serverda bo‘ladi — darsda muhokama qilish uchun yaxshi misol.</p>
    </div>`;
  const go = () => {
    if (document.getElementById("pin").value === ADMIN_PIN) {
      sessionStorage.setItem("bilimdon_admin", "1");
      renderAdmin();
    } else document.getElementById("pinErr").textContent = "PIN noto‘g‘ri";
  };
  document.getElementById("pinBtn").onclick = go;
  document.getElementById("pin").onkeydown = e => { if (e.key === "Enter") go(); };
  document.getElementById("pin").focus();
}

// ---------- Matn so'raydigan kichik oyna ----------
function askText(title, fields, onOk) {
  const modal = showModal({
    emoji: "✏️", title,
    html: fields.map((f, i) => `<input class="inp ask" data-i="${i}" placeholder="${esc(f.placeholder)}" value="${esc(f.value || "")}" style="margin-top:10px">`).join(""),
    buttons: [{ text: "Saqlash", cls: "btn-ok", onClick: () => onOk(values) }, { text: "Bekor qilish", cls: "btn-ghost" }]
  });
  let values = fields.map(f => f.value || "");
  modal.querySelectorAll(".ask").forEach(inp => inp.oninput = () => { values[inp.dataset.i] = inp.value.trim(); });
  modal.querySelector(".ask").focus();
}

// ---------- Asosiy ekran ----------
function renderAdmin() {
  const course = currentCourse();
  selCourse = course.id;
  const sel = findSel();

  content.innerHTML = `
    <h1 class="page-title">🛠️ O‘qituvchi paneli</h1>
    <div class="admin-grid">
      <div>
        <div class="card">
          <label class="f" for="courseSel" style="margin-top:0">Kurs</label>
          <select class="inp" id="courseSel">${courses.map(c => `<option value="${esc(c.id)}" ${c.id === course.id ? "selected" : ""}>${c.emoji} ${esc(c.title)}</option>`).join("")}</select>
          <div class="btn-row"><button class="btn btn-ghost mini" id="newCourse">+ Kurs</button><button class="btn btn-ghost mini" id="newUnit">+ Bo‘lim</button></div>
        </div>
        <div class="card tree">${course.units.map((u, ui) => `
          <div class="unit">
            <div class="unit-h"><b style="color:${u.color}">${ui + 1}. ${esc(u.title)}</b><button class="link-btn" data-add="${ui}">+ dars</button></div>
            ${u.lessons.map(l => `
              <div class="row ${l.id === selLesson ? "sel" : ""}" data-l="${esc(l.id)}" tabindex="0">
                <span>${l.icon || "★"}</span><span class="grow">${esc(l.title)}</span><span class="muted small">${l.exercises.length} mashq</span>
              </div>`).join("") || '<p class="muted small">Darslar yo‘q</p>'}
          </div>`).join("") || '<p class="muted">Bo‘lim qo‘shing</p>'}</div>
        <div class="card">
          <h4>Ma’lumotlar</h4>
          <div class="btn-row"><button class="btn btn-ghost mini" id="exportBtn">⬇️ Eksport (JSON)</button><button class="btn btn-ghost mini" id="resetBtn">↺ Asl holat</button></div>
        </div>
      </div>
      <div>${sel ? editorHtml(course, sel.lesson) : '<div class="card muted">← Chapdan darsni tanlang yoki «+ dars» tugmasi bilan yangisini qo‘shing.</div>'}</div>
    </div>`;

  // Hodisalar
  document.getElementById("courseSel").onchange = e => { selCourse = e.target.value; selLesson = null; renderAdmin(); };
  document.getElementById("newCourse").onclick = () => askText("Yangi kurs",
    [{ placeholder: "Kurs nomi, masalan: Matematika" }, { placeholder: "Emoji, masalan: ➗", value: "📘" }],
    ([title, emoji]) => {
      if (!title) return toast("Nom kiriting");
      const c = { id: uid("c"), title, emoji: emoji || "📘", level: "", desc: "", units: [{ id: uid("u"), title: "1-bo‘lim", color: UNIT_COLORS[0], lessons: [] }] };
      courses.push(c); selCourse = c.id; selLesson = null; save(); renderAdmin();
    });
  document.getElementById("newUnit").onclick = () => askText("Yangi bo‘lim", [{ placeholder: "Bo‘lim nomi" }], ([title]) => {
    if (!title) return toast("Nom kiriting");
    course.units.push({ id: uid("u"), title, color: UNIT_COLORS[course.units.length % UNIT_COLORS.length], lessons: [] });
    save(); renderAdmin();
  });
  content.querySelectorAll("[data-add]").forEach(b => b.onclick = () => askText("Yangi dars", [{ placeholder: "Dars nomi" }, { placeholder: "Emoji", value: "⭐" }], ([title, icon]) => {
    if (!title) return toast("Nom kiriting");
    const l = { id: uid("l"), title, icon: icon || "⭐", exercises: [] };
    course.units[b.dataset.add].lessons.push(l);
    selLesson = l.id; save(); renderAdmin();
  }));
  content.querySelectorAll("[data-l]").forEach(r => {
    r.onclick = () => { selLesson = r.dataset.l; renderAdmin(); };
    r.onkeydown = e => { if (e.key === "Enter") r.click(); };
  });
  document.getElementById("exportBtn").onclick = exportJson;
  document.getElementById("resetBtn").onclick = () => showModal({
    emoji: "↺", title: "Asl kurslarga qaytarilsinmi?", html: "<p>Siz qo‘shgan barcha darslar o‘chadi.</p>",
    buttons: [{ text: "Ha, qaytarish", cls: "btn-bad", onClick: () => { localStorage.removeItem(COURSES_KEY); courses = getCourses(); selLesson = null; renderAdmin(); } }, { text: "Bekor qilish", cls: "btn-ghost" }]
  });
  if (sel) bindEditor(course, sel.unit, sel.lesson);
}

// ---------- Dars muharriri ----------
function exText(ex) {
  if (ex.type === "match") return ex.pairs.map(p => p.join(" = ")).join(", ");
  return (ex.question || "") + (ex.say ? ` 🔊 “${ex.say}”` : "");
}
function answerText(ex) {
  if (ex.type === "match") return "";
  if (ex.type === "truefalse") return ex.answer ? "To‘g‘ri" : "Noto‘g‘ri";
  return ex.answer;
}

function editorHtml(course, lesson) {
  return `
    <div class="card">
      <div class="editor-h">
        <input class="inp icon-inp" id="lIcon" value="${esc(lesson.icon || "")}" maxlength="4" aria-label="Emoji">
        <input class="inp" id="lTitle" value="${esc(lesson.title)}" aria-label="Dars nomi">
        <button class="btn mini" id="saveTitle">Saqlash</button>
      </div>
      <div class="btn-row">
        <a class="btn btn-ghost mini" href="lesson.html?id=${encodeURIComponent(lesson.id)}" target="_blank">▶ O‘quvchi ko‘zi bilan</a>
        <button class="btn btn-bad mini" id="delLesson">Darsni o‘chirish</button>
      </div>
      <h4>Mashqlar (${lesson.exercises.length})</h4>
      ${lesson.exercises.map((ex, i) => `
        <div class="ex-item">
          <span class="type-tag">${ex.type}</span>
          <div class="grow"><div>${esc(exText(ex))}</div>${answerText(ex) !== "" ? `<small class="muted">Javob: ${esc(answerText(ex))}</small>` : ""}</div>
          <button class="icon-btn" data-up="${i}" title="Yuqoriga" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="icon-btn" data-down="${i}" title="Pastga" ${i === lesson.exercises.length - 1 ? "disabled" : ""}>↓</button>
          <button class="icon-btn danger" data-del="${i}" title="O‘chirish">✕</button>
        </div>`).join("") || '<p class="muted">Hali mashq yo‘q. Pastdagi ChatGPT yordamchisidan foydalaning 👇</p>'}
    </div>

    <div class="card">
      <h4>🤖 ChatGPT yordamchisi</h4>
      <ol class="muted small steps-list">
        <li>Mavzu va mashqlar sonini yozing.</li>
        <li>Promptni nusxalab, ChatGPT’ga yuboring (bepul versiya yetadi).</li>
        <li>ChatGPT javobini pastga joylang va «Tekshirish va qo‘shish»ni bosing.</li>
      </ol>
      <div class="row2">
        <input class="inp" id="topic" value="${esc(course.title + ": " + lesson.title)}" placeholder="Mavzu">
        <input class="inp" id="count" type="number" value="6" min="1" max="15" aria-label="Mashqlar soni">
      </div>
      <pre class="prompt" id="promptBox"></pre>
      <button class="btn btn-ghost mini" id="copyPrompt">📋 Promptni nusxalash</button>
      <textarea class="inp" id="jsonIn" rows="7" placeholder='ChatGPT javobini shu yerga joylang: [ {"type": "choice", ...} ]' style="margin-top:14px"></textarea>
      <div id="importMsg"></div>
      <button class="btn btn-ok" id="importBtn" style="margin-top:10px">Tekshirish va qo‘shish</button>
    </div>`;
}

function buildPrompt(topic, n) {
  return `Sen bolalar uchun o‘qituvchi-metodistsan. Mavzu: "${topic}".
Shu mavzu bo‘yicha ${n} ta qisqa mashq tuz. Turli turlardan foydalan.
Faqat JSON massiv qaytar, hech qanday izoh yozma.

Mumkin bo‘lgan turlar (aynan shu formatda):
{"type":"choice","question":"...","options":["...","...","..."],"answer":"...","explain":"..."}
{"type":"truefalse","question":"...","answer":true,"explain":"..."}
{"type":"fill","question":"I ___ a student.","options":["am","is","are"],"answer":"am"}
{"type":"order","question":"Tarjima qiling: ...","words":["...","..."],"answer":"..."}
{"type":"match","question":"Juftliklarni toping","pairs":[["cat","mushuk"],["dog","it"]]}
{"type":"input","question":"...","answer":"...","accept":["..."]}
{"type":"listen","say":"inglizcha matn","question":"Nima deyildi?","options":["...","..."],"answer":"..."}

Qoidalar:
- "answer" har doim "options" ichidagi variantlardan biri bilan harfma-harf bir xil bo‘lsin.
- "order" turida "answer" dagi har bir so‘z "words" ichida bo‘lsin (1-2 ta ortiqcha so‘z qo‘sh).
- truefalse uchun answer: true yoki false (qo‘shtirnoqsiz).
- Savollar o‘zbek tilida, oddiy va qiziqarli bo‘lsin.`;
}

function parseAiJson(text) {
  const a = text.indexOf("[");
  const b = text.lastIndexOf("]");
  if (a < 0 || b < a) throw new Error("JSON massiv topilmadi — javob [ bilan boshlanib ] bilan tugashi kerak");
  const arr = JSON.parse(text.slice(a, b + 1));
  if (!Array.isArray(arr)) throw new Error("Bu massiv emas");
  return arr;
}

function bindEditor(course, unit, lesson) {
  const refreshPrompt = () => {
    document.getElementById("promptBox").textContent = buildPrompt(document.getElementById("topic").value, document.getElementById("count").value);
  };
  refreshPrompt();
  document.getElementById("topic").oninput = refreshPrompt;
  document.getElementById("count").oninput = refreshPrompt;

  document.getElementById("copyPrompt").onclick = () => {
    const text = document.getElementById("promptBox").textContent;
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast("📋 Nusxalandi! Endi ChatGPT’ga joylang"), () => toast("Nusxalab bo‘lmadi — qo‘lda belgilang"));
    else toast("Matnni qo‘lda belgilab nusxalang");
  };

  document.getElementById("saveTitle").onclick = () => {
    lesson.title = document.getElementById("lTitle").value.trim() || lesson.title;
    lesson.icon = document.getElementById("lIcon").value.trim() || "⭐";
    save(); renderAdmin(); toast("Saqlandi ✅");
  };
  document.getElementById("delLesson").onclick = () => showModal({
    emoji: "🗑️", title: "Dars o‘chirilsinmi?", html: `<p>«${esc(lesson.title)}» va undagi ${lesson.exercises.length} ta mashq o‘chadi.</p>`,
    buttons: [{ text: "Ha, o‘chirish", cls: "btn-bad", onClick: () => { unit.lessons = unit.lessons.filter(l => l.id !== lesson.id); selLesson = null; save(); renderAdmin(); } }, { text: "Bekor qilish", cls: "btn-ghost" }]
  });

  const list = lesson.exercises;
  content.querySelectorAll("[data-up]").forEach(b => b.onclick = () => { const i = +b.dataset.up; [list[i - 1], list[i]] = [list[i], list[i - 1]]; save(); renderAdmin(); });
  content.querySelectorAll("[data-down]").forEach(b => b.onclick = () => { const i = +b.dataset.down; [list[i + 1], list[i]] = [list[i], list[i + 1]]; save(); renderAdmin(); });
  content.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { list.splice(+b.dataset.del, 1); save(); renderAdmin(); });

  document.getElementById("importBtn").onclick = () => {
    const msg = document.getElementById("importMsg");
    let arr;
    try {
      arr = parseAiJson(document.getElementById("jsonIn").value);
    } catch (err) {
      msg.innerHTML = `<p class="err">❌ JSON o‘qilmadi: ${esc(err.message)}</p>`;
      return;
    }
    const errors = [];
    let added = 0;
    arr.forEach((ex, i) => {
      const problem = validateExercise(ex);
      if (problem) errors.push(`${i + 1}-mashq: ${problem}`);
      else { list.push(ex); added++; }
    });
    save();
    renderAdmin();
    document.getElementById("importMsg").innerHTML =
      `<p class="okmsg">✅ ${added} ta mashq qo‘shildi.</p>` +
      (errors.length ? `<p class="err">❌ ${errors.length} tasida xato bor (qo‘shilmadi):</p><ul class="err small">${errors.map(e => `<li>${esc(e)}</li>`).join("")}</ul>
        <p class="muted small">Maslahat: xato matnini ChatGPT’ga yuborib, tuzatishni so‘rang.</p>` : "");
  };
}

function exportJson() {
  const blob = new Blob([JSON.stringify(courses, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bilimdon-kurslar.json";
  a.click();
  URL.revokeObjectURL(a.href);
}
