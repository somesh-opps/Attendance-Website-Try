document.addEventListener("DOMContentLoaded", async () => {
  // 1. Load Navbar HTML
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) {
    try {
      const response = await fetch("navbar.html");
      const html = await response.text();
      navbarPlaceholder.innerHTML = html;

      // 2. Highlight Active Link
      const currentPath =
        window.location.pathname.split("/").pop() || "student_home.html";

      // Desktop Links
      const desktopLinks = document.querySelectorAll(".nav-link");
      desktopLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
          // Add active class for underline effect
          link.classList.add("active");
        }
      });

      // Mobile Links
      const mobileLinks = document.querySelectorAll(".mobile-nav-link");
      mobileLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
          // Add active class for underline effect
          link.classList.add("active");
        }
      });

      // 3. Initialize Mobile Menu Logic (moved inside here because elements now exist)
      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          mobileMenu.classList.toggle("hidden");
          mobileMenu.classList.toggle("flex");

          const icon = mobileMenuBtn.querySelector(
            ".material-symbols-outlined"
          );
          if (icon) {
            icon.textContent = mobileMenu.classList.contains("hidden")
              ? "menu"
              : "close";
          }
        });

        document.addEventListener("click", (e) => {
          if (
            !mobileMenu.classList.contains("hidden") &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)
          ) {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            const icon = mobileMenuBtn.querySelector(
              ".material-symbols-outlined"
            );
            if (icon) icon.textContent = "menu";
          }
        });
      }
    } catch (error) {
      console.error("Error loading navbar:", error);
    }
  }
});
