function copyEmailToClipboard() {
  const email = "luccaaafc@gmail.com";
  const icon = document.getElementById("copyEmailIcon");
  const button = document.getElementById("copyEmailBtn");
  const originalSrc = icon.src;

  // Fallback para dispositivos móveis que não suportam navigator.clipboard
  if (!navigator.clipboard) {
    // Método alternativo usando textarea
    const textArea = document.createElement("textarea");
    textArea.value = email;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      textArea.remove();

      if (successful) {
        createExplosion(button);

        setTimeout(() => {
          icon.src = "./assets/check.png";
        }, 50);

        setTimeout(() => {
          icon.src = originalSrc;
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy email: ", err);
      textArea.remove();
      alert("Email: " + email);
    }
    return;
  }

  // Método moderno para navegadores que suportam clipboard API
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
      // Fallback caso falhe
      alert("Email: " + email);
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
