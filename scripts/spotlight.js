const spotlight = document.querySelector(".spotlight-overlay");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  document.documentElement.style.setProperty("--mouse-x", `${x}%`);
  document.documentElement.style.setProperty("--mouse-y", `${y}%`);
});

window.addEventListener("resize", () => {
  spotlight.style.opacity = "0.999";
  setTimeout(() => {
    spotlight.style.opacity = "1";
  }, 10);
});
