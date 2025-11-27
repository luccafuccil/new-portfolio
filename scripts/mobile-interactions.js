function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();

  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - rect.left - radius}px`;
  ripple.style.top = `${event.clientY - rect.top - radius}px`;
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  const interactiveElements = document.querySelectorAll(
    ".social-link, .lang-option, #copyEmailBtn"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("touchstart", createRipple);
  });
});

const avatarSection = document.querySelector(".avatar-section");
const avatar = document.querySelector(".avatar");

if (avatarSection && avatar) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  avatar.addEventListener(
    "touchstart",
    (e) => {
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      avatarSection.classList.add("dragging");
    },
    { passive: true }
  );

  avatar.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      avatarSection.style.setProperty("--smear-x", `${deltaX * 0.3}px`);
      avatarSection.style.setProperty("--smear-y", `${deltaY * 0.3}px`);
    },
    { passive: true }
  );

  avatar.addEventListener(
    "touchend",
    () => {
      isDragging = false;
      avatarSection.classList.remove("dragging");
      avatarSection.style.setProperty("--smear-x", "0px");
      avatarSection.style.setProperty("--smear-y", "0px");
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const techItems = document.querySelectorAll(".tech-item");

  techItems.forEach((item, index) => {
    const rotation =
      parseFloat(
        getComputedStyle(item).transform.split(",")[0]?.replace("matrix(", "")
      ) || 0;
    item.style.setProperty("--rotation", `${rotation}deg`);

    item.addEventListener(
      "touchstart",
      () => {
        item.style.transform = `scale(1.05) rotate(${rotation}deg)`;
      },
      { passive: true }
    );

    item.addEventListener(
      "touchend",
      () => {
        item.style.transform = "";
      },
      { passive: true }
    );
  });
});
