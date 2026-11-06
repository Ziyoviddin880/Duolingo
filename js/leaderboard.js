// =====================================================
//  HAFTALIK REYTING
//  Backend yo'q — boshqa o'quvchilar "bot"lar (o'ylab topilgan).
//  Haqiqiy reyting uchun server va umumiy baza kerak (darsda muhokama).
// =====================================================

const BOTS = [
  ["Malika", "🐱", 1.0], ["Jasur", "🐻", 0.85], ["Dilnoza", "🦋", 0.72],
  ["Bekzod", "🐺", 0.6], ["Sevara", "🌸", 0.5], ["Otabek", "🦅", 0.4],
  ["Nilufar", "🐰", 0.3], ["Sardor", "🐲", 0.2], ["Kamola", "🐞", 0.1]
];

// Har hafta bir xil, lekin haftadan haftaga o'zgaradigan "tasodifiy" son
function seeded(n) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

if (requireUser()) {
  renderShell("board");
  const week = Math.floor(Date.now() / (7 * 864e5));
  const rows = BOTS.map(([name, avatar, f], i) => ({
    name, avatar, me: false,
    xp: Math.round((40 + 320 * f) * (0.7 + 0.6 * seeded(week * 31 + i)))
  }));
  rows.push({ name: state.user.name, avatar: state.user.avatar, xp: weeklyXp(), me: true });
  rows.sort((a, b) => b.xp - a.xp);
  const medals = ["🥇", "🥈", "🥉"];

  document.getElementById("content").innerHTML = `
    <h1 class="page-title">🏆 Haftalik reyting</h1>
    <p class="muted">Oxirgi 7 kunda to‘plangan XP bo‘yicha.</p>
    <div class="card lb">${rows.map((r, i) => `
      <div class="lb-row ${r.me ? "me" : ""}">
        <span class="rank">${medals[i] || i + 1}</span>
        <span class="ava">${r.avatar}</span>
        <span class="lb-name">${esc(r.name)}${r.me ? " (siz)" : ""}</span>
        <span class="lb-xp">${r.xp} XP</span>
      </div>`).join("")}</div>
    <p class="note">ℹ️ Demo: boshqa ishtirokchilar o‘ylab topilgan. Haqiqiy reyting uchun hamma o‘quvchilarning
    XP’si bitta serverda saqlanishi kerak — bu backend mavzusi.</p>`;
}
