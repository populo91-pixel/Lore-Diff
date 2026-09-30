(() => {
  const carousel = document.querySelector("[data-runs-carousel]");
  if (!carousel) return;
  const track = carousel.querySelector("[data-runs-track]");
  const slides = [...track.children];
  const dots = carousel.querySelector("[data-runs-dots]");
  const previous = carousel.querySelector("[data-runs-prev]");
  const next = carousel.querySelector("[data-runs-next]");
  let index = 0;
  let timer = 0;
  let startX = null;
  let suppressClick = false;

  dots.innerHTML = slides.map((_, slideIndex) => `<button type="button" aria-label="Afficher le run ${slideIndex + 1}" data-run-dot="${slideIndex}"></button>`).join("");
  const dotButtons = [...dots.querySelectorAll("button")];

  function show(nextIndex, restart = true) {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", String(slideIndex !== index));
      slide.tabIndex = slideIndex === index ? 0 : -1;
    });
    dotButtons.forEach((dot, dotIndex) => dot.setAttribute("aria-current", dotIndex === index ? "true" : "false"));
    if (restart) start();
  }

  function start() {
    window.clearInterval(timer);
    timer = window.setInterval(() => show(index + 1, false), 4000);
  }

  previous.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  dotButtons.forEach((dot, dotIndex) => dot.addEventListener("click", () => show(dotIndex)));
  carousel.addEventListener("pointerdown", event => { startX = event.clientX; });
  carousel.addEventListener("pointerup", event => {
    if (startX === null) return;
    const distance = event.clientX - startX;
    startX = null;
    if (Math.abs(distance) > 45) {
      suppressClick = true;
      show(index + (distance < 0 ? 1 : -1));
      window.setTimeout(() => { suppressClick = false; }, 250);
    }
  });
  carousel.addEventListener("click", event => {
    if (suppressClick && event.target.closest(".mini-run")) event.preventDefault();
  });
  carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", () => window.clearInterval(timer));
  carousel.addEventListener("focusout", event => { if (!carousel.contains(event.relatedTarget)) start(); });
  show(0);
})();
