(() => {
  const selectors = [
    ".hbb-section:not(.blox-dev-hero) article",
    ".hbb-section:not(.blox-dev-hero) .card",
    ".hbb-section:not(.blox-dev-hero) .resume-item",
    ".hbb-section:not(.blox-dev-hero) .experience-item",
    ".hbb-section:not(.blox-dev-hero) .education-item",
    ".hbb-section:not(.blox-dev-hero) .teaching-item",
    ".hbb-section:not(.blox-dev-hero) .award-item",
    ".hbb-section:not(.blox-dev-hero) [class*=\"rounded-2xl\"]",
    ".blox-resume-experience .group.relative.pl-12",
    ".blox-resume-education .group.relative.pl-12",
    ".blox-resume-experience .rounded-xl",
    ".blox-resume-education .rounded-xl"
  ];

  const nodes = Array.from(
    new Set(selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector))))
  );

  if (!nodes.length) return;

  nodes.forEach((el, index) => {
    el.classList.add("float-in-reveal");
    el.style.transitionDelay = `${Math.min(index % 8, 6) * 45}ms`;
  });

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  nodes.forEach((el) => observer.observe(el));
})();
