function copyEmailToClipboard() {
  const email = "luccaaafc@gmail.com";
  const icon = document.getElementById("copyEmailIcon");
  const button = document.getElementById("copyEmailBtn");
  const originalSrc = icon.src;

  navigator.clipboard
    .writeText(email)
    .then(() => {
      createExplosion(button);

      setTimeout(() => {
        icon.src = "./assets/check.png";
      }, 50);

      setTimeout(() => {
        icon.src = originalSrc;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy email: ", err);
    });
}

function createExplosion(button) {
  const lineCount = 8;
  const angleStep = 360 / lineCount;

  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement("div");
    line.className = "explosion-line";

    const angle = angleStep * i;
    line.style.setProperty("--angle", `${angle}deg`);
    line.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;

    button.appendChild(line);

    setTimeout(() => {
      line.remove();
    }, 600);
  }
}
