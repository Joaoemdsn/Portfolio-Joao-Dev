const siteData = {
  links: {
    github: "https://github.com/Joaoemdsn",
    instagram: "https://www.instagram.com/joao.emdsn",
    whatsapp: "https://wa.me/5586995063535",
  },
  skills: [
    { name: "Figma", icon: "assets/icons/real/figma.png" },
    { name: "JavaScript", icon: "assets/icons/real/javascript.png" },
    { name: "HTML", icon: "assets/icons/real/html.png" },
    { name: "CSS", icon: "assets/icons/real/css.png" },
    { name: "PostgreSQL", icon: "assets/icons/real/postgresql.png" },
    { name: "MySQL", icon: "assets/icons/real/mysql.png" },
    { name: "Vue", icon: "assets/icons/real/vue.png" },
    { name: "Java", icon: "assets/icons/real/java.png" },
    { name: "TypeScript", icon: "assets/icons/real/typescript.png" },
  ],
  projects: [
    {
      title: "Chá e Encantos",
      image: "assets/images/real/project-cha.png",
      url: "#",
    },
    {
      title: "Mentoria ITER - Site de Links",
      image: "assets/images/real/project-mentoria.png",
      url: "#",
    },
  ],
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hydrateLinks() {
  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    if (siteData.links[key]) {
      element.href = siteData.links[key];
    }
  });
}

function renderSkills() {
  const skillsList = document.querySelector("#skillsList");
  if (!skillsList) return;

  skillsList.innerHTML = siteData.skills
    .map(
      (skill) => `
        <span class="skill-badge" title="${skill.name}">
          <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
        </span>
      `
    )
    .join("");
}

function renderProjects() {
  const projectGrid = document.querySelector("#projectGrid");
  if (!projectGrid) return;

  projectGrid.innerHTML = siteData.projects
    .map(
      (project) => `
        <article class="project-card reveal">
          <a class="project-card__preview" href="${project.url}" target="_blank" rel="noreferrer" aria-label="Abrir ${project.title}">
            <img src="${project.image}" alt="Preview do projeto ${project.title}" loading="lazy" />
          </a>
          <a class="project-card__button" href="${project.url}" target="_blank" rel="noreferrer">Conferir</a>
        </article>
      `
    )
    .join("");
}

function updateHeaderTone() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const probe = document.elementFromPoint(window.innerWidth / 2, 92);
  const currentSection = probe?.closest(".section, .footer");
  const isDark = currentSection?.matches(".section--dark, .footer");

  header.classList.toggle("site-header--light", Boolean(isDark));
}

function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#mainNav");
  if (!header || !toggle || !nav) return;

  const closeMenu = () => {
    header.classList.remove("site-header--menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    header.classList.toggle("site-header--menu-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
}

function initAnimations() {
  if (prefersReducedMotion || !window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from("[data-animate='header']", { y: -26, opacity: 0, duration: 0.9 })
    .from(".hero__image", { scale: 1.13, filter: "blur(10px)", duration: 1.45 }, 0)
    .from("[data-animate='hero-copy'] > *", { y: 34, opacity: 0, stagger: 0.12, duration: 0.85 }, 0.5);

  gsap.to("[data-parallax='hero']", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.from(element, {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
      },
    });
  });

  gsap.utils.toArray("[data-parallax='soft']").forEach((image) => {
    gsap.to(image, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.from(".skill-badge", {
    scale: 0.72,
    opacity: 0,
    stagger: 0.055,
    duration: 0.55,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".skills-list",
      start: "top 80%",
    },
  });

}

hydrateLinks();
renderSkills();
renderProjects();
initMobileMenu();
initAnimations();
updateHeaderTone();
window.addEventListener("scroll", updateHeaderTone, { passive: true });
window.addEventListener("resize", updateHeaderTone);
