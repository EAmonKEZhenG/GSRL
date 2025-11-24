// js/home.js

document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page-root");
  const heroNext = document.getElementById("hero-next");
  const navClose = document.getElementById("nav-close");
  const navPanel = document.getElementById("nav-panel");

  // 打开导航面板
  heroNext?.addEventListener("click", () => {
    page?.classList.add("page--nav-open");
    navPanel?.setAttribute("aria-hidden", "false");
  });

  // 关闭导航面板
  navClose?.addEventListener("click", () => {
    page?.classList.remove("page--nav-open");
    navPanel?.setAttribute("aria-hidden", "true");
  });

  // ===== 关键：给每个 nav-panel__item 绑定跳转 =====
  document.querySelectorAll(".nav-panel__item").forEach((btn) => {
    const link = btn.dataset.link;        // 读 data-link
    if (!link) return;                    // 没写 data-link 的先忽略

    btn.addEventListener("click", () => {
      // 这里可以先把导航收起来（可选）
      // page?.classList.remove("page--nav-open");

      // 真正跳转到对应页面
      window.location.href = link;
    });
  });
});
