document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".navbar__link");
  const contactForm = document.getElementById("contactForm");

  // Create overlay element for mobile menu
  const overlay = document.createElement("div");
  overlay.classList.add("nav-overlay");
  document.body.appendChild(overlay);

  // Navbar scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    updateActiveLink();
  }

  // Mobile menu toggle
  function toggleMenu() {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
    overlay.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("open")
      ? "hidden"
      : "";
  }

  function closeMenu() {
    navToggle.classList.remove("active");
    navMenu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Update active nav link based on scroll position
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Smooth scroll for anchor links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const top = target.offsetTop - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      closeMenu();
    });
  });

  // Scroll-triggered fade-in animation
  function initScrollAnimations() {
    const elements = document.querySelectorAll(
      ".course-card, .feature-card, .testimonial-card, .contact__info-item"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("fade-in-up");
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      observer.observe(el);
    });
  }

  // Contact form handler
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button[type='submit']");
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = "linear-gradient(135deg, #00cec9, #00b894)";

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
        contactForm.reset();
      }, 3000);
    });
  }

  // Event listeners
  window.addEventListener("scroll", handleScroll, { passive: true });
  navToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Initialize
  handleScroll();
  initScrollAnimations();
});
