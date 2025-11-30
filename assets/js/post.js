import { newsPort } from "../data/newsPost.js";
import { fullNews } from "./addPost.js";
// Lấy ID từ URL parameter
function getPostIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id ? parseInt(id) : 1; // Default to post 1 if no ID provided
}

export function renderNewsPortTitle() {
  const container = document.querySelector(".js-title-container");
  const postId = getPostIdFromURL();

  // Tìm article theo ID
  const article = fullNews.find((item) => item.id === postId) || fullNews[0]; // Default to first if not found

  container.innerHTML = `
     <p>${article.type} • 2 min read</p>
            <h1>${article.description}</h1>
            <p>12 hr ago</p>
            <p>&nbsp;&nbsp;|&nbsp; PUBLISHED Sep 10, 2025, 12:00 PM ET</p>
            <p class="author-info">By <span class="logo"></span><span class="author-name"><u>${article.author}</u></span>
            </p>`;
}

export function renderNewsPortContent() {
  const container = document.querySelector(".js-new-content-container");
  const postId = getPostIdFromURL();

  // Tìm article theo ID
  const article = fullNews.find((item) => item.id === postId) || newsPort[0]; // Default to first if not found

  container.innerHTML = `
        <figure>
            <div class="news__content-img">
                <img src="${article.img}" alt="" height="420px" width="670px">
            </div>
            <figcaption class="img-caption">
               ${article.imgCaption}
            </figcaption>
        </figure>
            ${article.content}
            <div class="comment-section">
                <div class="comment-header">
                    <div class="header-left">
                        <div class="black-bar">
                        </div>
                        <h2>COMMENTS</h2>
                    </div>
                    <div class="social-icons">
                        <a href="#"><i class="fas fa-envelope"></i></a>
                        <a href="#"><i class="fas fa-link"></i></a>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div class="comment-list">
                    <div class="comment">
                        <div class="avatar"></div>
                        <div class="comment-bubble">
                            <div class="comment-content">
                                <span class="author">John Doe</span>
                                <p>Amazing good job iem</p>
                            </div>
                            <div class="comment-timestamp">12:00, 11-09-2025</div>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="avatar"></div>
                        <div class="comment-bubble">
                            <div class="comment-content">
                                <span class="author">Jây 97</span>
                                <p>Thiên lý ơi</p>
                            </div>
                            <div class="comment-timestamp">12:00, 11-09-2025</div>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="avatar"></div>
                        <div class="comment-bubble">
                            <div class="comment-content">
                                <span class="author">Dé Soltuné Montepré</span>
                                <p>Cet endroit vous a</p>
                            </div>
                            <div class="comment-timestamp">12:00, 11-09-2025</div>
                        </div>
                    </div>
                </div>

                <div class="comment-form">
                    <button class="comment-button">Leave your comment here</button>
                </div>
            </div>
    `;
}

function renderContentWrapper() {
  const first = fullNews.slice(0, fullNews.length / 2);
  const second = fullNews.slice(fullNews.length / 2, fullNews.length);
  const container = document.querySelector(".articles-grid");
  const skipIndex = Math.floor(Math.random() * first.length);

  // 2. Mảng chứa 4 bài
  const selected = [];

  // 3. Duyệt bằng some() (dừng khi có 4 bài)
  first.some((item, index) => {
    if (index === skipIndex) return false; // bỏ bài random
    selected.push(item);
    return selected.length === 4; // đủ 4 bài → dừng
  });
  container.innerHTML = selected
    .map(
      (article) => `
    <div class="article-card">
        <div class="article-image" style="background-image: url('${article.img}')"></div>
        <h3 class="article-title">${article.description}</h3>
        <p class="article-meta">2 min read</p>
    </div>
`
    )
    .join("");

  // Thêm onclick handlers cho các article-card vừa render
  const articleCards = container.querySelectorAll(".article-card");
  articleCards.forEach((card, idx) => {
    const art = selected[idx];
    if (!art) return;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      // Chuyển tới trang bài viết tương ứng
      window.location.href = `./post.html?id=${art.id}`;
    });
  });

  const containerTwo = document.querySelector(".most-read-list");
  const skipIndex2 = Math.floor(Math.random() * second.length);
  // 2. Mảng chứa 4 bài
  const selected2 = [];

  // 3. Duyệt bằng some() (dừng khi có 4 bài)
  second.some((item2, index2) => {
    if (index2 === skipIndex2) return false; // bỏ bài random
    selected2.push(item2);
    return selected2.length === 6; // đủ 4 bài → dừng
  });
  containerTwo.innerHTML = selected2
    .map(
      (article, index) => `
         <li class="most-read-item">
            <span class="most-read-number">${index + 1}</span>
                <p class="most-read-title">${article.description}
                </p>
        </li>
    `
    )
    .join("");

  // Thêm onclick handlers cho danh sách most-read
  const mostReadItems = containerTwo.querySelectorAll(".most-read-item");
  mostReadItems.forEach((li, idx) => {
    const art = selected2[idx];
    if (!art) return;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      window.location.href = `./post.html?id=${art.id}`;
    });
  });
  console.log(selected, selected2);
}
// Chạy khi DOM đã load
document.addEventListener("DOMContentLoaded", () => {
  renderNewsPortTitle();
  renderNewsPortContent();
  renderContentWrapper();
});
