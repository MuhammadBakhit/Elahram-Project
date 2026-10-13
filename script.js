
/* 1. Mobile Menu */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


/* 2. Scroll Reveal */
const revealElements = document.querySelectorAll(
  ".hero-content, .section-heading, .department-card, " +
  ".stat-item, .project-card, .contact-section"
);

revealElements.forEach(function (element, index) {
  element.classList.add("reveal");

  // تأخير بسيط للكروت عشان تظهر واحدة ورا التانية
  if (element.classList.contains("department-card") ||
      element.classList.contains("project-card")) {
    element.style.transitionDelay = (index % 5) * 0.1 + "s";
  }
});

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});


/* 3. Contact Modal */
const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");
const contactForm = document.getElementById("contactForm");
const contactFormArea = document.getElementById("contactFormArea");
const successMessage = document.getElementById("successMessage");

function openContactForm() {
  contactModal.classList.add("open");
  contactModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeContactForm() {
  contactModal.classList.remove("open");
  contactModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".open-contact").forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    openContactForm();
  });
});

closeModal.addEventListener("click", closeContactForm);

document.getElementById("successClose").addEventListener(
  "click",
  closeContactForm
);

// إغلاق الفورم لما نضغط على الخلفية
contactModal.addEventListener("click", function (event) {
  if (event.target === contactModal) {
    closeContactForm();
  }
});

// إغلاق الفورم بزر Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeContactForm();
  }
});


/* 4. Form Validation */
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // لو البيانات مش صحيحة، المتصفح هيعرض رسالة الخطأ
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  // إخفاء الفورم وإظهار رسالة النجاح
  contactFormArea.hidden = true;
  successMessage.hidden = false;

  contactForm.reset();
});

// تجهيز الفورم لحالة الفتح التالية
function resetContactForm() {
  contactFormArea.hidden = false;
  successMessage.hidden = true;
  contactForm.reset();
}

closeModal.addEventListener("click", resetContactForm);
document.getElementById("successClose").addEventListener(
  "click",
  resetContactForm
);

contactModal.addEventListener("click", function (event) {
  if (event.target === contactModal) {
    resetContactForm();
  }
});


/* 5. Back To Top */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* 6. Current Year */
document.getElementById("currentYear").textContent =
  new Date().getFullYear();
