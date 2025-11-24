

document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page-root");
  const heroNext = document.getElementById("hero-next");
  const navClose = document.getElementById("nav-close");
  const navPanel = document.getElementById("nav-panel");

  
  heroNext?.addEventListener("click", () => {
    page?.classList.add("page--nav-open");
    navPanel?.setAttribute("aria-hidden", "false");
  });

  
  navClose?.addEventListener("click", () => {
    page?.classList.remove("page--nav-open");
    navPanel?.setAttribute("aria-hidden", "true");
  });

  
  document.querySelectorAll(".nav-panel__item").forEach((btn) => {
    const link = btn.dataset.link;        
    if (!link) return;                    

    btn.addEventListener("click", () => {
      
      

      
      window.location.href = link;
    });
  });
});
