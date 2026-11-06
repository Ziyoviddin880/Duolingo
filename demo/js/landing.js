// =====================================================
//  LENDING: burger-menyu, skroll animatsiyalari, kurslar vitrinasi
// =====================================================

// Burger-menyu (telefonda)
const burger = document.getElementById("burger");
const links = document.getElementById("navLinks");
burger.onclick = () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
  burger.textContent = open ? "✕" : "☰";
};
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open");
  burger.textContent = "☰";
}));

// Foydalanuvchi oldin kirgan bo'lsa — tugmalar to'g'ridan-to'g'ri darslarga olib boradi
const startHref = state.user ? "learn.html" : "start.html";
document.querySelectorAll("[data-start]").forEach(a => {
  a.href = startHref;
  if (state.user && a.dataset.start === "main") a.textContent = "Davom etish →";
});

// Kurslar vitrinasi — data.js'dagi (yoki o'qituvchi qo'shgan) kurslardan
document.getElementById("courseList").innerHTML = getCourses().map(c => {
  const lessons = allLessons(c);
  const exercises = lessons.reduce((n, l) => n + l.exercises.length, 0);
  return `<article class="card course-card reveal">
      <div class="course-em">${c.emoji}</div>
      <h3>${esc(c.title)}</h3>
      <p class="muted small">${esc(c.level || "")}</p>
      <p>${esc(c.desc || "")}</p>
      <p class="course-meta">📚 ${lessons.length} dars · ✏️ ${exercises} mashq</p>
      <a class="btn btn-block" href="${startHref}">Boshlash</a>
    </article>`;
}).join("");

// Skroll qilganda bloklar paydo bo'ladi
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// "Yuqoriga" tugmasi
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600));
toTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Hero'dagi demo variantlar — bosib ko'rish mumkin
document.querySelectorAll(".demo-opt").forEach(b => b.onclick = () => {
  document.querySelectorAll(".demo-opt").forEach(x => x.classList.remove("right", "wrong"));
  b.classList.add(b.dataset.ok ? "right" : "wrong");
  beep(b.dataset.ok ? "ok" : "bad");
});
