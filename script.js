// Add the WhatsApp number with country code before publishing, e.g. 5511999999999.
const WHATSAPP_NUMBER = "5515997880361";
document.documentElement.classList.add("js-ready");
const revealItems = document.querySelectorAll(".intro-kicker, .intro-main, .section-heading, .property-photo, .gallery-caption, .statement-content, .contact-heading, .contact-form, .contact-detail");
revealItems.forEach((item, index) => {
  item.setAttribute("data-reveal", "");
  if (item.classList.contains("property-photo")) item.style.transitionDelay = `${(index % 3) * 100}ms`;
});
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
  nav.classList.toggle("is-open", !open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const status = document.querySelector("#form-status");
  const name = document.querySelector("#name").value.trim();
  const message = document.querySelector("#message").value.trim();
  const text = encodeURIComponent(`Olá, Luciana! Meu nome é ${name}. ${message}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
});
