let currentLang = localStorage.getItem("lang");
if (!currentLang) {
  const userLang = navigator.language || navigator.userLanguage;
  currentLang = userLang.startsWith("pt") ? "pt-BR" : "en";
}

function updateContent(data) {
  document.title = data.meta.title;
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-lang]").forEach((element) => {
    const keys = element.getAttribute("data-lang").split(".");
    let value = data;

    for (const key of keys) {
      value = value[key];
    }

    element.textContent = value;
  });

  document.querySelectorAll(".lang-option").forEach((btn) => {
    if (btn.getAttribute("data-lang-option") === currentLang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function loadLanguage(lang) {
  fetch(`./dic/${lang}.json`)
    .then((response) => response.json())
    .then(updateContent)
    .catch((error) => {
      console.error("Error loading language:", error);
      if (lang !== "pt-BR") {
        return fetch(`./dic/pt-BR.json`)
          .then((response) => response.json())
          .then(updateContent);
      }
    });
}

loadLanguage(currentLang);

document.addEventListener("DOMContentLoaded", () => {
  const langOptions = document.querySelectorAll(".lang-option");
  langOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedLang = option.getAttribute("data-lang-option");
      if (selectedLang !== currentLang) {
        currentLang = selectedLang;
        localStorage.setItem("lang", currentLang);
        loadLanguage(currentLang);
      }
    });
  });
});
