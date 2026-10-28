"use strict";

const architectureSource = document.querySelector("[data-architecture-source]");
const architectureTarget = document.querySelector("[data-architecture-target]");

if (architectureSource && architectureTarget) {
  architectureTarget.append(architectureSource);
}

document.querySelectorAll("[data-ai-touchpoint-map]").forEach((map) => {
  const triggers = Array.from(map.querySelectorAll("[data-touchpoint]"));
  const panels = Array.from(map.querySelectorAll("[data-touchpoint-panel]"));

  const selectTouchpoint = (key) => {
    triggers.forEach((trigger) => {
      const selected = trigger.dataset.touchpoint === key;
      trigger.classList.toggle("is-selected", selected);
      trigger.setAttribute("aria-selected", String(selected));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.touchpointPanel !== key;
    });
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => selectTouchpoint(trigger.dataset.touchpoint));
    trigger.addEventListener("focus", () => selectTouchpoint(trigger.dataset.touchpoint));
    trigger.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") {
        selectTouchpoint(trigger.dataset.touchpoint);
      }
    });
    trigger.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + triggers.length) % triggers.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % triggers.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = triggers.length - 1;
      triggers[nextIndex].focus();
    });
  });
});
