function injectStyle() {
  if (document.getElementById("footer-style")) return;

  const link = document.createElement("link");
  link.id = "footer-style";
  link.href = "../components/Footer/Footer.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
function createFooter() {
  injectStyle();
  return `
    <footer>
            <div class="footer__container">
                <div class="footer__newsletter">
                    <h2 class="newsletter__title">Get updates delivered directly to your inbox.</h2>
                    <!-- đổi div thành form -->
                    <form class="newsletter__formbox">
                        <input type="text" placeholder="Enter your email">
                        <button type="submit">Subscribe</button>
                    </form>
                    <p class="siteinfo__description">By subcribing you agree to our <a href="/">Privacy Policy</a> and
                        provide
                        consent
                        to receive updates from our company
                    </p>
                </div>
                <div class="siteinfo__right">
                    <div class="icon__container">
                        <!-- <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                    <i class="fa-brands fa-youtube"></i> -->
                        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                    </div>
                    <div class="contact">
                        <i class="fa-solid fa-phone-volume"></i>
                        <a href="tel:012312308721398">012312308721398</a>
                    </div>
                    <div class="email">
                        <i class="fa-solid fa-envelope"></i>
                        <a href="mailto:aurews@gmail.com">aurews@gmail.com</p>
                    </div>
                    <div class="end">
                        <p>© 2025 Nhóm 13, Inc. All rights reserved.</p>
                    </div>
                    <div class="options__container">
                        <ul class="option">
                            <li>Terms</li>
                            <li>Privacy</li>
                            <li>Cookie Policy</li>
                            <li>Support</li>
                            <li>Sitemap</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    `;
}
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("footer__placeholder");
  console.log(container);
  if (container) {
    console.log("Loaded");
    container.innerHTML = createFooter();
    // toggleNav();
    // document.querySelector(".nav__search").addEventListener("click", () => {
    //   window.location.href = "./Search.html";
    // });
    // document.querySelector(".nav__about").addEventListener("click", () => {
    //   window.location.href = "./about.html";
    // });
  }
});
