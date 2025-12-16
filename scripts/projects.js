// Projects loader with fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  observeProjectsSection();
});

async function loadProjects() {
  const container = document.getElementById("projectsContainer");
  const currentLang = localStorage.getItem("lang") || "pt-BR";

  try {
    const response = await fetch(`./dic/${currentLang}.json`);
    const data = await response.json();
    const projects = data.projectList || [];

    container.innerHTML = "";

    projects.forEach((project, index) => {
      const projectCard = createProjectCard(project, index, data.projects);
      container.appendChild(projectCard);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

function createProjectCard(project, index, translations) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.style.animationDelay = `${index * 0.15}s`;

  // Handle single picture or array of pictures
  const pictures = Array.isArray(project.picture)
    ? project.picture
    : [project.picture];
  const hasMultiplePictures = pictures.length > 1;

  card.innerHTML = `
    <div class="project-image-wrapper">
      <div class="project-carousel" data-carousel-index="0">
        ${pictures
          .map(
            (pic, idx) => `
          <img 
            src="${pic}" 
            alt="${project.name} - Image ${idx + 1}"
            class="project-image ${idx === 0 ? "active" : ""}"
            loading="lazy"
          />
        `
          )
          .join("")}
      </div>
      ${
        hasMultiplePictures
          ? `
        <button class="carousel-btn carousel-btn-prev" aria-label="Previous image">
          <span class="carousel-arrow">←</span>
        </button>
        <button class="carousel-btn carousel-btn-next" aria-label="Next image">
          <span class="carousel-arrow">→</span>
        </button>
        <div class="carousel-indicators">
          ${pictures
            .map(
              (_, idx) => `
            <span class="carousel-indicator ${
              idx === 0 ? "active" : ""
            }" data-index="${idx}"></span>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }
    </div>
    <div class="project-info">
      <h3 class="project-name">${project.name}</h3>
      <p class="project-description">${project.description}</p>
      ${
        project.link || project.github
          ? `
        <div class="project-links">
          ${
            project.link
              ? `
            <a href="${project.link}" target="_blank" class="project-link">
              <span class="project-link-text">${
                project.linkLabel || translations?.viewProject || "View Project"
              }</span>
              <span class="link-arrow">→</span>
            </a>
          `
              : ""
          }
          ${
            project.github
              ? `
            <a href="${
              project.github
            }" target="_blank" class="project-link project-link-secondary">
              <span class="project-link-text">${
                project.githubLabel || translations?.sourceCode || "Source Code"
              }</span>
              <span class="link-arrow">→</span>
            </a>
          `
              : ""
          }
        </div>
      `
          : ""
      }
    </div>
  `;

  // Add carousel event listeners if there are multiple pictures
  if (hasMultiplePictures) {
    setTimeout(() => {
      initCarousel(card, pictures.length);
    }, 0);
  }

  return card;
}

function observeProjectsSection() {
  const projectsSection = document.getElementById("projects");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          projectsSection.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(projectsSection);
}

// Reload projects when language changes
window.addEventListener("languageChanged", () => {
  loadProjects();
});

// Carousel functionality
function initCarousel(card, totalImages) {
  const carousel = card.querySelector(".project-carousel");
  const prevBtn = card.querySelector(".carousel-btn-prev");
  const nextBtn = card.querySelector(".carousel-btn-next");
  const indicators = card.querySelectorAll(".carousel-indicator");
  const images = card.querySelectorAll(".project-image");

  let currentIndex = 0;

  function updateCarousel(newIndex) {
    // Remove active class from current
    images[currentIndex].classList.remove("active");
    indicators[currentIndex].classList.remove("active");

    // Add active class to new
    currentIndex = newIndex;
    images[currentIndex].classList.add("active");
    indicators[currentIndex].classList.add("active");

    carousel.setAttribute("data-carousel-index", currentIndex);
  }

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    updateCarousel(newIndex);
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    updateCarousel(newIndex);
  });

  indicators.forEach((indicator, idx) => {
    indicator.addEventListener("click", (e) => {
      e.preventDefault();
      updateCarousel(idx);
    });
  });
}
