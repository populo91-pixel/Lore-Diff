(() => {
  const modes = {
    free: { label: "LIBRE", max: Infinity, blind: false },
    ranked: { label: "CLASSÉ", max: 8, blind: false },
    nightmare: { label: "CAUCHEMAR", max: 5, blind: true }
  };
  const buttons = [...document.querySelectorAll(".difficulty-button")];
  const modifier = document.querySelector("#challengeModifier");
  const attempts = document.querySelector("#challengeAttempts");
  let modeName = localStorage.getItem("lorediff-difficulty") || "ranked";
  if (!modes[modeName]) modeName = "ranked";

  function paint() {
    buttons.forEach(button => {
      const active = button.dataset.difficulty === modeName;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.body.classList.toggle("nightmare-mode", modes[modeName].blind);
  }

  function update(count = 0) {
    if (!attempts) return;
    const mode = modes[modeName];
    const remaining = Math.max(0, mode.max - count);
    attempts.textContent = Number.isFinite(mode.max)
      ? `${remaining} ESSAI${remaining === 1 ? "" : "S"} RESTANT${remaining === 1 ? "" : "S"}`
      : "ESSAIS ILLIMITÉS";
  }

  window.LoreChallenge = {
    bind(onChange) {
      paint();
      buttons.forEach(button => button.addEventListener("click", () => {
        const next = button.dataset.difficulty;
        if (!modes[next] || next === modeName) return;
        modeName = next;
        localStorage.setItem("lorediff-difficulty", modeName);
        paint();
        onChange?.();
      }));
    },
    reset(label) {
      if (modifier) modifier.textContent = label;
      update(0);
    },
    update,
    exhausted(count) { return Number.isFinite(modes[modeName].max) && count >= modes[modeName].max; },
    label() { return modes[modeName].label; },
    pick(contracts, previous) {
      const choices = contracts.filter(item => item !== previous);
      return choices[Math.floor(Math.random() * choices.length)] || contracts[0];
    }
  };
})();
