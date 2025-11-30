import { toggleNav } from "../../assets/js/category.js";

function injectStyle() {
  if (document.getElementById("navbar-style")) return;

  const link = document.createElement("link");
  link.id = "navbar-style";
  link.href = "../components/Navbar/Navbar.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
function createNavbar() {
  injectStyle();
  return `
    <nav class="nav__container">
        <div class="nav__top">
            <div class="nav-item-wrapper">
                <div class="nav__search">
                    <a href="search.html">
                        Search
                    </a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__newsletter">
                    <p>News letter</p>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__logo">
                    <a href="index.html">
                        AUREWS
                    </a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__about">
                    <a href="about.html">
                        About
                    </a>
                </div>
            </div>
            <div class="nav-item-wrapper">
                <div class="nav__hamburgermenu" onclick="toggleMenu(); return false;" aria-label="Toggle menu">
                    <div class="nav__hamburgermenu__icon menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav__bottom">
            <ul class="nav__categories">
                <li><a href="index.html">Home</a></li>
                <li><a href="./category.html?type=Latest">Latest</a></li>
                <li><a href="./category.html?type=Business News">Business News</a></li>
                <li><a href="./category.html?type=Money and Markets">Money & Markets</a></li>
                <li><a href="./category.html?type=Tech and Innovation">Tech & Innovation</a></li>
                <li><a href="./category.html?type=A.I.">A.I.</a></li>
                <li><a href="./category.html?type=Lifestyle">Lifestyle</a></li>
                <li><a href="./category.html?type=Politics">politics</a></li>
                <li><a href="./category.html?type=Email">email</a></li>
                <li><a href="./category.html?type=Podcast">podcast</a></li>
            </ul>
        </div>
    </nav>
    `;
}
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar__placeholder");
  console.log(container);
  if (container) {
    console.log("Loaded");
    container.innerHTML = createNavbar();
    toggleNav();

    document.querySelector(".nav__search").addEventListener("click", () => {
      window.location.href = "./search.html";
    });
    document.querySelector(".nav__about").addEventListener("click", () => {
      window.location.href = "./about.html";
    });
  }
});
