// js/rules.js
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".rules-tab");
  const sections = document.querySelectorAll(".rules-section");
  const closeBtn = document.getElementById("rules-close");

  function showSection(id) {
    sections.forEach((sec) => {
      sec.classList.toggle("rules-section--active", sec.id === id);
    });
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;

      tabs.forEach((b) =>
        b.classList.toggle("rules-tab--active", b === btn)
      );

      showSection(targetId);
    });
  });

  const first = tabs[0];
  if (first) {
    showSection(first.dataset.target);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }
});
