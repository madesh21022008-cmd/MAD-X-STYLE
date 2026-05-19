const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const newsletterForm = document.querySelector("#newsletter-form");
const formMessage = document.querySelector("#form-message");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open");
  });
}

if (newsletterForm && formMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector("#email");
    const email = (emailInput?.value || "").trim();

    if (!email) {
      formMessage.textContent = "Please enter an email address.";
      return;
    }

    if (emailInput && !emailInput.checkValidity()) {
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }

    formMessage.textContent = "Thanks for subscribing to MAD X STYLE!";
    newsletterForm.reset();
  });
}
