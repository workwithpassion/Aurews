// ===== POPUP MANAGEMENT =====

// Mở popup và chuyển tab (login/register)
function openPopup(tab) {
  const popupOverlay = document.getElementById("popupOverlay");
  const mainContent = document.getElementById("mainContent");

  if (popupOverlay) popupOverlay.classList.add("active");
  if (mainContent) mainContent.classList.add("blur");
  const mobileMenu = document.querySelector('.mobile-menu.active');
  mobileMenu.style.top = `-100%`;

  // Lưu vị trí scroll hiện tại
}

// Đóng popup và xóa blur
function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  const mainContent = document.getElementById("mainContent");

  if (popupOverlay) popupOverlay.classList.remove("active");
  if (mainContent) mainContent.classList.remove("blur");
  const mobileMenu = document.querySelector('.mobile-menu.active');
  mobileMenu.style.top = `0`;
}

// Đóng popup khi click vào overlay
function closePopupOnOverlay(event) {
  if (event.target === document.getElementById("popupOverlay")) {
    closePopup();
  }
}

// Chuyển đổi giữa tab login và register
function switchTab(tab) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

  if (tab === "login") {
    document.getElementById("loginTab")?.classList.add("active");
    document.getElementById("loginContent")?.classList.add("active");
  } else {
    document.getElementById("registerTab")?.classList.add("active");
    document.getElementById("registerContent")?.classList.add("active");
  }
}

// Đóng popup khi nhấn ESC
function handlePopupEscape(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

// ===== USER REGISTRATION =====

// Khởi tạo danh sách user từ localStorage
let allSignUp;
try {
  const stored = localStorage.getItem("userInfo");
  allSignUp = stored ? JSON.parse(stored) : [];

  if (!Array.isArray(allSignUp)) {
    allSignUp = [];
  }
} catch (error) {
  console.error("Error parsing localStorage:", error);
  allSignUp = [];
}

// Xử lý đăng ký user mới
function saveSignUp() {
  const signUpForm = document.getElementById("signUpForm");
  if (!signUpForm) return;

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.querySelector(".full-name-sign-up")?.value.trim();
    const email = document.querySelector(".email-sign-up")?.value.trim();
    const password = document.querySelector(".password-sign-up")?.value.trim();
    const confirmPass = document.querySelector(".confirm-sign-up")?.value.trim();

    // Validate password match
    if (password !== confirmPass) {
      alert("Password must be same as confirm password!");
      return;
    }

    const thongTin = { fullName, email, password };

    // Kiểm tra user đã tồn tại
    const isExisted = allSignUp.some(
      (user) =>
        user.fullName === thongTin.fullName &&
        user.email === thongTin.email &&
        user.password === thongTin.password
    );

    if (isExisted) {
      alert("Account existed!");
      return;
    }

    // Lưu user mới
    allSignUp.push(thongTin);
    localStorage.setItem("userInfo", JSON.stringify(allSignUp));
    alert("Sign up succeed");
    signUpForm.reset();
  });
}

// ===== USER LOGIN =====

// Generate random access token
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Xử lý đăng nhập
function Login() {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("userInfo")) || [];
    const emailSignIn = document.querySelector(".email-login")?.value.trim();
    const passSignIn = document.querySelector(".password-login")?.value.trim();

    // Kiểm tra thông tin đăng nhập
    const isExisted = storedUser.some(
      (user) => user.email === emailSignIn && user.password === passSignIn
    );

    if (isExisted) {
      const thongTinDangNhap = {
        emailSignIn,
        passSignIn,
        accessToken: generateToken(),
      };

      localStorage.setItem("userLogin", JSON.stringify(thongTinDangNhap));
      alert("Login Succeed!");
      window.location.reload();
    } else {
      alert("Login Fail!");
    }
  });
}

// ===== USER INTERFACE BASED ON ROLE =====

// Render UI dựa trên role của user (admin/author/reader)
function userLoginHTML() {
  const tokenn = JSON.parse(localStorage.getItem("userLogin"));
  let role = "reader";

  // Xác định role dựa trên token
  if (tokenn && tokenn.accessToken) {
    if (tokenn.accessToken === 123) {
      role = "admin";
    } else {
      role = "author";
    }
  }

  const container = document.querySelector(".mobile-menu-footer");
  const loginContainer = document.getElementById("login-button");

  // UI cho Author
  if (role === "author") {
    if (loginContainer) {
      loginContainer.outerHTML = `<div id="logout-button" class="mobile-menu-footer-item">Log out</div>`;
    }
    if (container) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div id="addpost-button" class="mobile-menu-footer-item">Add post</div>`
      );
    }
  }
  // UI cho Admin
  else if (role === "admin") {
    if (loginContainer) {
      loginContainer.outerHTML = `<div id="logout-button" class="mobile-menu-footer-item">Log out</div>`;
    }
    if (container) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div id="dashboard-button" class="mobile-menu-footer-item">Dashboard</div>`
      );
    }

    // Setup dashboard button
    const dashboardBtn = document.getElementById("dashboard-button");
    if (dashboardBtn) {
      dashboardBtn.addEventListener("click", handleDashboardClick);
    }
  }

  // Setup logout button
  setupLogoutButton();
}

// Navigate to dashboard page
function handleDashboardClick() {
  window.location.href = "./adminDashboard.html";
}

// Navigate to add post page
function handleAddPostClick() {
  window.location.href = "./addpost.html";
}

// Xử lý logout
function setupLogoutButton() {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userLogin");
      alert("You have been logged out!");

      const pathname = window.location.pathname || window.location.href;
      if (pathname.includes("addpost.html")) {
        window.location.href = "index.html";
      } else {
        window.location.reload();
      }
    });
  }
}

// Setup Add Post button sau khi render UI
function clickAddPostButton() {
  const addBtn = document.getElementById("addpost-button");
  if (addBtn) {
    addBtn.addEventListener("click", handleAddPostClick);
  }
}

//backend
//         const res = await fetch('http://localhost:6666/api/auth/login',
//             {
//                 method: 'POST',
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(thongTin),
//             }
//         )
//         if (res.ok) {
//             alert("Sign up succeed!");
//         }
//         else {
//             alert("Sign up failed!");
//         }
//     }
// })

//backend
// if (!username || !passSignIn) {
//     alert("Please enter email and password!");
//     return;
// }

// try {
//     console.log(username, passSignIn);
//     const res = await fetch('http://localhost:1234/api/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             password: passSignIn
//         }),
//         credentials: "include",
//     })

//     const data = await res.json();

//     if (res.ok && data.success) {
//         alert("Login Succeed!");
//         console.log(data);
//         console.log(res);
//         localStorage.setItem('saveToken', data.accessToken);
//         window.location.reload();
//         // Nếu backend trả token hoặc user info
//         // localStorage.setItem('token', data.token);
//         // localStorage.setItem('user', JSON.stringify(data.user));

//     } else {
//         alert(data.message || "Login failed!");
//     }
// } catch (err) {
//     console.log("Login error:", err);
//     alert("Login failed due to network or server error!");
// }
// });

//backend
// Hàm 1: Lấy thông tin user từ backend
// async function getUser() {
//     // const token = JSON.parse(localStorage.getItem('accessToken'));
//     // if (!token) return null;

//     try {

//         const result = await fetch('http://localhost:1234/api/me/get', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: "include"
//         })

//         const user = await result.json();
//         console.log(user);

//         // if (!res.ok) {
//         //     console.warn('Token không hợp lệ hoặc hết hạn');
//         //     localStorage.removeItem('accessToken');
//         //     return null;
//         // }

//         // const user = await res.json(); // ví dụ { name, email, role }
//         // console.log(user);
//         // return user;

//     } catch (error) {
//         console.error('Lỗi khi fetch user:', error);
//         return null;
//     }
// }

// // Hàm 2: Render UI dựa theo role
// async function userLoginHTML() {
//     const container = document.querySelector('.mobile-menu-footer');
//     const loginContainer = document.getElementById('login-button');

//     const user = await getUser();
//     if (!user) {
//         console.log('Chưa đăng nhập → hiển thị nút login mặc định');
//         return;
//     }

//     const role = user.role;
//     loginContainer.outerHTML = `
//         <div id="logout-button" class="mobile-menu-footer-item">Log out</div>
//     `;

//     if (role === 'author') {
//         container.innerHTML += `
//             <div id="addpost-button" class="mobile-menu-footer-item">Add Post</div>
//         `;
//         document.getElementById('addpost-button').addEventListener('click', () => {
//             window.location.href = './addpost.html';
//         });
//     }

//     if (role === 'admin') {
//         container.innerHTML += `
//             <div id="dashboard-button" class="mobile-menu-footer-item">Dashboard</div>
//         `;
//         document.getElementById('dashboard-button').addEventListener('click', () => {
//             window.location.href = './adminDashboard.html';
//         });
//     }

//     // Logout
//     document.getElementById('logout-button').addEventListener('click', () => {
//         localStorage.removeItem('accessToken');
//         alert('You have been logged out!');
//         window.location.reload();
//     });
// }
