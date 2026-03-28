document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("contact-success-modal");
  const closeBtn = document.getElementById("close-contact-modal");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (modal) {
        modal.classList.add("show");
      }

      form.reset();
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("show");
    });
  }
});