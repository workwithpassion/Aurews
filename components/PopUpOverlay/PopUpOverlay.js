function injectStyle() {
  if (document.getElementById("pop-up-overlay-style")) return;

  const link = document.createElement("link");
  link.id = "pop-up-overlay-style";
  link.href = "../components/PopUpOverlay/login.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
function createPopUpOverlay() {
  injectStyle();
  return `
    <div class="popup-overlay" id="popupOverlay" onclick="closePopupOnOverlay(event)">
        <div class="popup-content" onclick="event.stopPropagation()">
            <button class="close-btn" onclick="closePopup()">&times;</button>

            <!-- Tabs -->
            <div class="tabs">
                <div class="tab active" id="loginTab" onclick="switchTab('login')">Login</div>
                <div class="tab" id="registerTab" onclick="switchTab('register')">Sign up</div>
            </div>

            <!-- Form Đăng Nhập -->
            <div class="tab-content active" id="loginContent">
                <h2>Login</h2>
                <form id="loginForm" onsubmit="">
                    <div class="login__form-group">
                        <label>Email</label>
                        <input type="text" class="email-login" placeholder="Type your email" required>
                    </div>
                    <div class="login__form-group">
                        <label>Password</label>
                        <input type="password" class="password-login" placeholder="Password" required>
                    </div>
                    <button type="submit" class="login__submit-btn">Login</button>
                </form>
                <div class="form-footer">
                    Don't have an account? <a href="#" onclick="switchTab('register'); return false;">Sign up
                        now!</a>
                </div>
            </div>

            <!-- Form Đăng Ký -->
            <div class="tab-content" id="registerContent">
                <h2>Sign up</h2>
                <form id="signUpForm" >
                    <div class="sign-up__form-group">
                        <label>Full name</label>
                        <input type="text" placeholder="Type your name here" required class="full-name-sign-up">
                    </div>
                    <div class="sign-up__form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Type your email here" required class="email-sign-up">
                    </div>
                    <div class="sign-up__form-group">
                        <label>Password</label>
                        <input type="password" placeholder="8-15 letters required" required class="password-sign-up">
                    </div>
                    <div class="sign-up__form-group">
                        <label>Confirm password</label>
                        <input type="password" placeholder="Re-enter your password" required class="confirm-sign-up">
                    </div>
                    <button type="submit" class="sign-up__submit-btn">Sign up</button>
                </form>
                <div class="form-footer">
                    Have an account? <a href="#" onclick="switchTab('login'); return false;">Login</a>
                </div>
            </div>
        </div>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pop-up-overlay__placeholder");
  if (container) {
    container.innerHTML = createPopUpOverlay();
    saveSignUp();
    Login();
  }
});
