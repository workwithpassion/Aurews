// Types mapping - map text từ HTML đến type parameter
const typeMapping = {
  Home: null, // Home không có type
  Latest: "Latest",
  "Business News": "Business News",
  "Money & Markets": "Money and Markets",
  "Money and Markets": "Money and Markets",
  "Tech & Innovation": "Tech and Innovation",
  "Tech and Innovation": "Tech and Innovation",
  "A.I.": "A.I.",
  Lifestyle: "Lifestyle",
  Politics: "Politics",
  Email: "Email",
  Podcast: "Podcast",
  Contact: null, // Contact là trang riêng
};


export function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-menu-overlay");

  if (!mobileMenu || !overlay) return;

  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Set active class cho mobile menu dựa trên URL hiện tại (giống toggleNav)
function toggleMobileNav() {
  const params = new URLSearchParams(window.location.search);
  const param = params.get("type");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  const currentPath = window.location.pathname.toLocaleLowerCase();
  if (mobileNavLinks.length === 0) return;

  // Reset all active classes
  mobileNavLinks.forEach((link) => link.classList.remove("active"));
  if (currentPath.includes("search.html") || currentPath.includes("about.html")) {
    return;
  }
  // Set active cho Home nếu đang ở Index.html
  if (
    currentPath.endsWith("/") ||
    currentPath.includes("index.html") ||
    (!currentPath.includes("category.html") &&
      !currentPath.includes("post.html") &&
      !currentPath.includes("contact.html"))
  ) {
    const homeLink = Array.from(mobileNavLinks).find(
      (link) =>
        link.textContent.trim() === "Home" ||
        link.getAttribute("href")?.includes("index.html")
    );
    if (homeLink) {
      homeLink.classList.add("active");
    }
    return;
  }

  // Set active cho category dựa trên type parameter
  if (param) {
    mobileNavLinks.forEach((link) => {
      const linkText = link.textContent.trim();
      const mappedType = typeMapping[linkText];

      if (mappedType === param) {
        link.classList.add("active");
      }
    });
  }

  // Set active cho Contact nếu đang ở Contact.html
  if (currentPath.includes("contact.html")) {
    const contactLink = Array.from(mobileNavLinks).find(
      (link) => link.textContent.trim() === "Contact"
    );
    if (contactLink) {
      contactLink.classList.add("active");
    }
  }

}

// Khởi tạo URLs cho mobile menu links nếu chưa có
function initMobileMenuLinks() {
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  if (mobileNavLinks.length === 0) return;

  mobileNavLinks.forEach((link) => {
    const linkText = link.textContent.trim();
    const currentHref = link.getAttribute("href");

    // Set URL nếu href là "#" hoặc rỗng
    if (!currentHref || currentHref === "#" || currentHref.trim() === "") {
      if (linkText === "Home") {
        link.setAttribute("href", "./index.html");
      } else if (linkText === "Contact") {
        link.setAttribute("href", "./contact.html");
      } else {
        // Lấy type từ mapping - normalize "Money & Markets" to "Money and Markets"
        let mappedType = typeMapping[linkText];
        // Handle fallback for different text formats
        if (!mappedType && linkText === "Money & Markets") {
          mappedType = typeMapping["Money and Markets"];
        }
        if (mappedType) {
          link.setAttribute(
            "href",
            `./category.html?type=${encodeURIComponent(mappedType)}`
          );
        }
      }
    }
  });
}

// Khởi tạo mobile menu
function initMobileMenu() {
  // Khởi tạo URLs cho mobile menu - gọi multiple times để ensure component đã render
  initMobileMenuLinks();
  setTimeout(() => initMobileMenuLinks(), 50);
  setTimeout(() => initMobileMenuLinks(), 200);

  // Set active class ban đầu
  toggleMobileNav();

  // Handle click on mobile menu links - ensure proper navigation
  const setupLinkHandlers = () => {
    // Ensure URLs are set first
    initMobileMenuLinks();

    document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
      // Remove existing listeners by cloning node
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      newLink.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // If href is empty or just "#", don't navigate
        if (!href || href === "#" || href.trim() === "") {
          e.preventDefault();
          return;
        }

        // Prevent default link behavior
        e.preventDefault();

        // Close menu with animation
        const mobileMenu = document.querySelector(".mobile-menu");
        const overlay = document.querySelector(".mobile-menu-overlay");

        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          if (overlay) overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
        // Navigate after menu closes
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });
  };

  // Setup handlers immediately and again after delays to ensure they're attached
  setupLinkHandlers();
  setTimeout(setupLinkHandlers, 50);
  setTimeout(setupLinkHandlers, 200);
}

// Khởi tạo khi DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileMenu);
} else {
  // DOM đã sẵn sàng
  initMobileMenu();
}

// Close menu on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      toggleMenu();
    }
  }
});

// Make functions available globally
window.toggleMenu = toggleMenu;
window.toggleMobileNav = toggleMobileNav;
// window.initMobileMenu = initMobileMenu;
// window.toggleMobileNav = toggleMobileNav;
// Guard trước khi thêm event listener để tránh lỗi khi element không tồn tại
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

