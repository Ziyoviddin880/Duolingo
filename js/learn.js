// =====================================================
//  KURS XARITASI: darslar "yo'lakchasi"
// =====================================================

if (requireUser()) {
  renderShell("learn");
  renderLearn();
}

function renderLearn() {
  const courses = getCourses();
  const course = getCourse(state.courseId);
  const lessons = allLessons(course);
  const doneCount = lessons.filter(l => state.done[l.id]).length;

  let html = `<div class="course-tabs">` +
    courses.map(c => `<button class="ctab ${c.id === course.id ? "active" : ""}" data-id="${esc(c.id)}">${c.emoji} ${esc(c.title)}</button>`).join("") +
    `</div><p class="muted center">${doneCount} / ${lessons.length} dars o‘tildi</p>`;

  let index = 0;
  let currentFound = false;
  course.units.forEach((unit, ui) => {
    html += `<div class="unit-banner" style="--unit:${unit.color}">
        <small>${ui + 1}-bo‘lim</small><h3>${esc(unit.title)}</h3>${unit.desc ? `<p>${esc(unit.desc)}</p>` : ""}
      </div><div class="path" style="--unit:${unit.color}">`;
    unit.lessons.forEach(lesson => {
      const status = lessonStatus(course, lesson.id);
      const isCurrent = status === "open" && !currentFound;
      if (isCurrent) currentFound = true;
      const x = Math.round(Math.sin(index * 1.15) * 70); // ilon izi
      const icon = status === "locked" ? "🔒" : lesson.icon || "★";
      html += `<div class="node-wrap ${isCurrent ? "has-bubble" : ""}" style="--x:${x}px;--d:${index * 70}ms">
          ${isCurrent ? '<div class="bubble">BOSHLASH</div>' : ""}
          <button class="node ${status} ${isCurrent ? "current" : ""}" data-id="${esc(lesson.id)}" data-status="${status}" aria-label="${esc(lesson.title)}">
            ${icon}${status === "done" ? '<span class="badge">✓</span>' : ""}
          </button>
          <div class="node-title">${esc(lesson.title)}</div>
        </div>`;
      index++;
    });
    if (!unit.lessons.length) html += `<p class="muted">Bu bo‘limda hali dars yo‘q</p>`;
    html += `</div>`;
  });

  const content = document.getElementById("content");
  content.innerHTML = html;

  content.querySelectorAll(".ctab").forEach(btn => btn.onclick = () => {
    state.courseId = btn.dataset.id;
    saveState();
    renderLearn();
    renderTopbar();
  });
  content.querySelectorAll(".node").forEach(btn => btn.onclick = () => {
    if (btn.dataset.status === "locked") { beep("bad"); toast("🔒 Avval oldingi darsni tugating"); return; }
    location.href = "lesson.html?id=" + encodeURIComponent(btn.dataset.id);
  });
  renderSide();
}

function renderSide() {
  const goal = state.user.goal;
  const today = state.history[dayKey()] || 0;
  const lv = levelInfo(state.xp);
  document.getElementById("side").innerHTML = `
    <div class="card">
      <h4>🎯 Kunlik maqsad</h4>
      <div class="goal-row"><div class="goal-bar"><div style="width:${Math.min(100, (today / goal) * 100)}%"></div></div><b>${today}/${goal}</b></div>
      <p class="${today >= goal ? "okmsg" : "muted"}">${today >= goal ? "Bugungi maqsad bajarildi! 🎉" : `Yana ${goal - today} XP to‘plang`}</p>
    </div>
    <div class="card">
      <h4>⭐ ${lv.level}-daraja</h4>
      <div class="goal-bar lvl"><div style="width:${lv.pct}%"></div></div>
      <p class="muted">${lv.next ? `Keyingi darajagacha ${lv.next - state.xp} XP` : "Eng yuqori daraja!"}</p>
    </div>
    <div class="card">
      <h4>❤️ Yuraklar</h4>
      <div class="hearts">${"❤️".repeat(state.hearts)}${"🤍".repeat(CONFIG.maxHearts - state.hearts)}</div>
      <p class="muted">${state.hearts < CONFIG.maxHearts ? `Keyingi yurak ${minutesToNextHeart()} daqiqada` : "Yuraklar to‘la"}</p>
    </div>`;
}
