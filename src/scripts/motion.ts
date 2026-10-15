const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce) {
  /* De tekst staat al op de eindwaarde. Geen animatie. */
} else {
  document.querySelectorAll("main section:not(:first-of-type), main article").forEach((node) => {
    node.classList.add("ap-reveal");
  });

  const counters = document.querySelectorAll<HTMLElement>("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals || "0");
          const suffix = el.dataset.suffix || "";
          if (!Number.isFinite(target)) continue;
          const start = performance.now();
          const duration = 700;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - (1 - t) ** 3;
            const value = target * eased;
            el.textContent = `${value.toLocaleString("nl-NL", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}${suffix}`;
          };
          const frame = (now: number) => {
            tick(now);
            if (now - start < duration) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.5 },
    );
    counters.forEach((node) => observer.observe(node));
  }
}
