const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || "0");
  const suffix = el.dataset.suffix || "";
  if (!Number.isFinite(target)) return;
  const start = performance.now();
  const duration = 700;
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    el.textContent = `${(target * eased).toLocaleString("nl-NL", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
    if (now - start < duration) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

if (!reduce) {
  const reveals = document.querySelectorAll<HTMLElement>("main section:not(:first-of-type), main article");
  reveals.forEach((node) => node.classList.add("ap-reveal"));

  const viewTimeline = typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
  if (!viewTimeline && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          entry.target.classList.add("ap-in");
        }
      },
      { threshold: 0.18 },
    );
    reveals.forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.2) node.classList.add("ap-shown");
      else observer.observe(node);
    });
    document.querySelectorAll<HTMLElement>(".ap-timeline").forEach((node) => {
      node.classList.add("ap-armed");
      if (node.getBoundingClientRect().top < window.innerHeight * 0.2) node.classList.add("ap-in");
      else observer.observe(node);
    });
  }

  const counters = document.querySelectorAll<HTMLElement>("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          countUp(entry.target as HTMLElement);
        }
      },
      { threshold: 0.5 },
    );
    counters.forEach((node) => observer.observe(node));
  }
}
