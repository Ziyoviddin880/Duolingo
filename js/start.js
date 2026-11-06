// =====================================================
//  KIRISH: ism, avatar, kurs, kunlik maqsad
//  Backend yo'q, shuning uchun "ro'yxatdan o'tish" = localStorage'ga yozish
// =====================================================

const pick = {
  avatar: state.user ? state.user.avatar : AVATARS[0],
  course: state.courseId,
  goal: state.user ? state.user.goal : 20
};
const GOAL_NAMES = { 10: "Oson", 20: "O‘rtacha", 30: "Jiddiy", 50: "Kuchli" };

function renderStart() {
  const courses = getCourses();
  document.getElementById("startForm").innerHTML = `
    <label class="f" for="name">Ismingiz</label>
    <input class="inp" id="name" maxlength="20" placeholder="Masalan: Aziz" value="${esc(state.user ? state.user.name : "")}">
    <p class="err" id="nameErr"></p>

    <label class="f">Avatar tanlang</label>
    <div class="avatar-pick">${AVATARS.map(a => `<button type="button" data-a="${a}" class="${a === pick.avatar ? "sel" : ""}">${a}</button>`).join("")}</div>

    <label class="f">Qaysi kursni o‘rganasiz?</label>
    <div class="pick-list">${courses.map(c => `
      <button type="button" class="pick ${c.id === pick.course ? "sel" : ""}" data-c="${esc(c.id)}">
        <span class="pick-em">${c.emoji}</span><span><b>${esc(c.title)}</b><br><small class="muted">${esc(c.level || "")}</small></span>
      </button>`).join("")}</div>

    <label class="f">Kunlik maqsad</label>
    <div class="pick-list two">${CONFIG.goals.map(g => `
      <button type="button" class="pick ${g === pick.goal ? "sel" : ""}" data-g="${g}">
        <span><b>${GOAL_NAMES[g] || ""}</b><br><small class="muted">kuniga ${g} XP</small></span>
      </button>`).join("")}</div>

    <button class="btn btn-block" type="submit" style="margin-top:28px">${state.user ? "Saqlash" : "Boshlash 🚀"}</button>`;

  const form = document.getElementById("startForm");
  form.querySelectorAll("[data-a]").forEach(b => b.onclick = () => { pick.avatar = b.dataset.a; renderKeepName(); });
  form.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { pick.course = b.dataset.c; renderKeepName(); });
  form.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { pick.goal = Number(b.dataset.g); renderKeepName(); });
}

// Qayta chizganda yozilgan ism yo'qolmasligi uchun
function renderKeepName() {
  const name = document.getElementById("name").value;
  renderStart();
  document.getElementById("name").value = name;
}

document.getElementById("startForm").onsubmit = e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  if (name.length < 2) {
    document.getElementById("nameErr").textContent = "Ism kamida 2 ta harfdan iborat bo‘lsin";
    document.getElementById("name").focus();
    return;
  }
  state.user = {
    name,
    avatar: pick.avatar,
    goal: pick.goal,
    since: state.user ? state.user.since : dayKey()
  };
  state.courseId = pick.course;
  saveState();
  location.href = "learn.html";
};

renderStart();
