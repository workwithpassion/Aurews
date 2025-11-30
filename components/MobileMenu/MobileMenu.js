function injectStyle() {
  if (document.getElementById("mobile-menu-style")) return;

  const link = document.createElement("link");
  link.id = "mobile-menu-style";
  link.href = "../components/MobileMenu/MobileMenu.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
function createMobileMenu() {
  injectStyle();
  return `
    <!-- Mobile Menu Overlay -->
    <div
      class="mobile-menu-overlay"
      onclick="toggleMenu(); return false;"
    ></div>

    <!-- Mobile Menu Sidebar -->
    <div class="mobile-menu">
      <div class="mobile-menu-header">
        <p class="mobile-menu-header__logo">Aurews</p>
        <button
          class="close-menu"
          onclick="toggleMenu()"
          aria-label="Close menu"
        >
          ×
        </button>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="#" class="active">Home</a></li>
        <li><a href="#">Latest</a></li>
        <li><a href="#">Business News</a></li>
        <li><a href="#">Money & Markets</a></li>
        <li><a href="#">Tech & Innovation</a></li>
        <li><a href="#">A.I.</a></li>
        <li><a href="#">Lifestyle</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Email</a></li>
        <li><a href="#">Podcast</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div class="mobile-menu-footer">
        <div
          id="login-button"
          class="mobile-menu-footer-item"
          onclick="openPopup('login');"
        >
          Login
        </div>
        <div class="mobile-menu-footer-item">Languages</div>
        <div class="mobile-menu-footer-item js-search">Search</div>
        <div class="mobile-menu-footer-item">Newsletter</div>
        <div class="mobile-menu-footer-item js-about">About</div>
      </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("mobile-menu__placeholder");
  if (container) {
    container.innerHTML = createMobileMenu();
    userLoginHTML();
    clickAddPostButton();
    toggleMobileNav();
    const jsSearchEl = document.querySelector(".js-search");
    if (jsSearchEl) {
      jsSearchEl.addEventListener("click", () => {
        window.location.href = "./search.html";
      });
    }

    const jsAboutEl = document.querySelector(".js-about");
    if (jsAboutEl) {
      jsAboutEl.addEventListener("click", () => {
        window.location.href = "./about.html";
      });
    }
  }
});
