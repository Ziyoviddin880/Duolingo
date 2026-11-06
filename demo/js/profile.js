// =====================================================
//  PROFIL: statistika, 7 kunlik grafik, yutuqlar
// =====================================================

const WEEKDAYS = ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"];

if (requireUser()) {
  renderShell("profile");
  renderProfile();
}

function renderProfile() {
  const lv = levelInfo(state.xp);
  const lessonsDone = Object.keys(state.done).length;

  // Oxirgi 7 kun XP
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const key = addDays(dayKey(), -i);
    const [y, m, d] = key.split("-").map(Number);
    days.push({ key, xp: state.history[key] || 0, label: WEEKDAYS[new Date(y, m - 1, d).getDay()], today: i === 0 });
  }
  const max = Math.max(state.user.goal, ...days.map(d => d.xp));

  document.getElementById("content").innerHTML = `
    <div class="card profile-head">
      <div class="ava big">${state.user.avatar}</div>
      <div class="grow">
        <h1>${esc(state.user.name)}</h1>
        <p class="muted">${esc(state.user.since)} dan beri o‘qiydi · ${lv.level}-daraja</p>
        <div class="goal-bar lvl"><div style="width:${lv.pct}%"></div></div>
        <p class="muted small">${lv.next ? `${state.xp} / ${lv.next} XP` : "Eng yuqori daraja"}</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="card stat-card"><span>🔥</span><b>${currentStreak()}</b><small>kunlik seriya</small></div>
      <div class="card stat-card"><span>⚡</span><b>${state.xp}</b><small>jami XP</small></div>
      <div class="card stat-card"><span>📚</span><b>${lessonsDone}</b><small>o‘tilgan dars</small></div>
      <div class="card stat-card"><span>🏅</span><b>${state.achievements.length}/${ACHIEVEMENTS.length}</b><small>yutuqlar</small></div>
    </div>

    <div class="card">
      <h3>Oxirgi 7 kun</h3>
      <div class="chart">${days.map(d => `
        <div class="bar ${d.today ? "today" : ""}">
          <span class="v">${d.xp}</span>
          <div class="b" style="height:${(d.xp / max) * 100}%"></div>
          <span class="d">${d.label}</span>
        </div>`).join("")}</div>
    </div>

    <div class="card">
      <h3>Yutuqlar</h3>
      <div class="ach-grid">${ACHIEVEMENTS.map(a => `
        <div class="ach ${state.achievements.includes(a.id) ? "" : "locked"}">
          <div class="i">${a.icon}</div><b>${a.title}</b><small class="muted">${a.desc}</small>
        </div>`).join("")}</div>
    </div>

    <div class="card">
      <h3>Sozlamalar</h3>
      <div class="btn-row">
        <a class="btn btn-ghost" href="start.html">✏️ Profilni tahrirlash</a>
        <button class="btn btn-bad" id="resetBtn">Progressni o‘chirish</button>
      </div>
    </div>`;

  document.getElementById("resetBtn").onclick = () => showModal({
    emoji: "⚠️",
    title: "Hammasi o‘chirilsinmi?",
    html: "<p>XP, seriya va o‘tilgan darslar o‘chib ketadi.</p>",
    buttons: [
      { text: "Ha, o‘chirish", cls: "btn-bad", onClick: () => { localStorage.removeItem(STORE_KEY); location.href = "index.html"; } },
      { text: "Bekor qilish", cls: "btn-ghost" }
    ]
  });
}
