import { fullNews } from "./addPost.js";
import { createArticleCard } from "../../components/Category/ArticleCard/articleCard.js";
// import { createTrendingCard } from "../../components/Category/trendingCard.js";
import { createRelatedCard } from "../../components/Category/RelatedCard/relatedCard.js";
import { toggleMenu } from "./header.js";
const subtitle = {
  latest: "Breaking stories, updated live.",
  "business news": "Corporate headlines and economic updates.",
  "money and markets": "Financial flows and market movements.",
  "tech and innovation": "Breakthroughs and emerging trends.",
  "a.i.": "The future of Artificial Intelligence.",
  lifestyle: "Culture, wellness, and modern living.",
  politics: "The global and national political landscape.",
};

export function getType() {
  const params = new URLSearchParams(window.location.search);
  const param = params.get("type");
  return param;
}

export function toggleNav() {
  const param = getType();
  const navContainer = document.querySelectorAll(".nav__categories a");
  const currentPath = window.location.pathname.toLocaleLowerCase();
  navContainer.forEach((link) => {
    link.classList.remove("active"); // Xóa active từ tất cả
    const href = link.getAttribute("href");

    // Kiểm tra xem href có chứa type param không
    if (href.includes(`type=${param}`)) {
      link.classList.add("active");
    }

    if (
      !param &&
      (href.includes("Index.html") ||
        href.endsWith("/") ||
        href.includes("index.html"))
    ) {
      link.classList.add("active");
    }
    //xet cho trang contact.html
    if (currentPath.includes("contact.html") || currentPath.includes("post.html") || currentPath.includes("search.html") || currentPath.includes("about.html")) {
      link.classList.remove("active"); // Xóa active từ tất cả
    }
  });
}

class CategoryPage {
  constructor() {
    // State
    this.category = getType();
    this.currentPage = 1;
    this.perPage = 4;

    this.allArticles = [];
    this.displayedArticles = [];

    this.init();
  }

  /* -----------------------
        INIT LOGIC
    ------------------------ */
  async init() {
    // Show loading states
    this.showTrendingLoading();
    this.showRelatedLoading();

    // Fetch all data
    await Promise.all([
      this.fetchArticles(),

      //   this.renderTrending(),
      this.loadRelatedArticles(),
    ]);

    this.attachEvents();
  }

  /* -----------------------
        UPDATE CATEGORY HEADER
    ------------------------ */
  updateHeader() {
    if (!this.category) return; // Exit if category is null

    const titleContainer = document.querySelector("#category-title");
    if (titleContainer) titleContainer.innerHTML = this.category.toUpperCase();

    const subtitleContainer = document.querySelector("#category-subtitle");
    if (subtitleContainer) {
      const categoryKey = this.category.toLocaleLowerCase();
      subtitleContainer.innerHTML = subtitle[categoryKey] || "";
    }
  }
  /* -----------------------
  LOAD ARTICLES
------------------------ */
  async fetchArticles() {
    try {
      // Check if category is null
      if (!this.category) {
        this.showEmptyState();
        return;
      }

      console.log("called: ", this.category.toLocaleLowerCase());
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 700));

      // Filter theo category
      this.allArticles = fullNews.filter(
        (a) =>
          a.type === this.category ||
          a.type1 === this.category ||
          a.type2 === this.category
      );
      this.updateHeader();
      this.renderArticles();
    } catch (err) {
      console.error(err);
      this.showEmptyState();
    }
  }
  /* -----------------------
        RENDER ARTICLE LIST
    ------------------------ */
  renderArticles() {
    const loading = document.getElementById("loading-state");
    const grid = document.getElementById("articles-grid");
    const empty = document.getElementById("empty-state");
    const loadMoreContainer = document.getElementById("load-more-container");

    if (loading) loading.style.display = "none";

    // Không có bài nào
    if (this.allArticles.length === 0) {
      if (empty) empty.style.display = "flex";
      return;
    }

    // Lấy bài theo page
    const end = this.currentPage * this.perPage;
    this.displayedArticles = this.allArticles.slice(0, end);

    // Render HTML
    if (grid) {
      grid.innerHTML = this.displayedArticles
        .map((a) => createArticleCard(a))
        .join("");

      grid.style.display = "flex";
      grid.style.flexDirection = "column"; // ép xếp dọc
      grid.style.gap = "20px";
    }

    // Ẩn hiện nút load more
    if (loadMoreContainer) {
      loadMoreContainer.style.display =
        this.displayedArticles.length < this.allArticles.length
          ? "block"
          : "none";
    }
  }
  renderCategory() {
    const newsTitle = document.querySelector(".js-title-container");
    const newsContainer = document.querySelector(".js-news-container");
    const data = fullNews; // Sử dụng fullNews đã bao gồm bài mới
    const param = getType();

    // Lọc tin phù hợp (logic này vẫn đúng)
    const filtered = data.filter(
      (news) =>
        news.type === param || news.type1 === param || news.type2 === param
    );

    // SỬA LỖI LOGIC TẠI ĐÂY: Thêm data-id vào thẻ div
    const html = filtered
      .map((newsShow) => createArticleCard(newsShow))
      .join("");

    if (newsTitle) {
      newsTitle.innerHTML = `
                    <h1>${param}</h1>
                    <p>${subtitle[param]}</p>
               `;
    }

    if (newsContainer) {
      newsContainer.innerHTML = html || "<p>No articles found.</p>";
    }
  }

  /* -----------------------
    TRENDING - WITH LOADING
  ------------------------ */
  showTrendingLoading() {
    const list = document.getElementById("trending-list");
    if (!list) return; // Exit if element doesn't exist
    list.innerHTML = `
    <div class="section-loading">
      <div class="loading__spinner"></div>
      <p>Loading trending...</p>
    </div>
  `;
  }

  async renderTrending() {
    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 800));

      const list = document.getElementById("trending-list");
      if (!list) return; // Exit if element doesn't exist

      const data = this.getMockTrendingArticles();

      list.innerHTML = data
        .map((a, i) => createTrendingCard(a, i + 1))
        .join("");
    } catch (err) {
      console.error("Error loading trending:", err);
      const list = document.getElementById("trending-list");
      if (!list) return; // Exit if element doesn't exist
      list.innerHTML = `
        <div class="section-error">
          <p>Failed to load trending articles</p>
        </div>
      `;
    }
  }

  /* -----------------------
    RELATED CARD - WITH LOADING
  ------------------------ */
  showRelatedLoading() {
    const relatedGrid = document.getElementById("you-may-like-grid");
    if (!relatedGrid) return; // Exit if element doesn't exist
    relatedGrid.innerHTML = `
    <div class="section-loading section-loading--wide">
      <div class="loading__spinner"></div>
      <p>Loading recommendations...</p>
    </div>
  `;
  }
  getOrtherNews() {
    const filtered = fullNews.filter((a) => !this.allArticles.includes(a));
    const relatedArticles = filtered
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return relatedArticles;
  }
  async loadRelatedArticles() {
    try {
      if (!this.category) return; // Exit if category is null

      if (this.category.toLocaleLowerCase() === "latest") {
        const relatedSection = document.getElementById("you-may-like");
        if (relatedSection) relatedSection.classList.add("hidden");
        return;
      }
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1000));

      const relatedGrid = document.getElementById("you-may-like-grid");
      if (!relatedGrid) return; // Exit if element doesn't exist

      const relatedArticles = this.getOrtherNews();
      //   console.log("Related Articles:", relatedArticles);
      relatedGrid.innerHTML = relatedArticles
        .map((a) => createRelatedCard(a))
        .join("");
    } catch (err) {
      console.error("Error loading related articles:", err);
      const relatedGrid = document.getElementById("you-may-like-grid");
      if (!relatedGrid) return; // Exit if element doesn't exist
      relatedGrid.innerHTML = `
      <div class="section-error section-loading--wide">
        <p>Failed to load recommendations</p>
      </div>
    `;
    }
  }

  getOtherCategories() {
    const allCategories = [
      "Business News",
      "Money and Markets",
      "Tech and Innovation",
      "A.I.",
      "Lifestyle",
      "Politics",
    ];
    const others = allCategories.filter(
      (cat) => cat.toLowerCase() !== this.category.toLowerCase()
    );

    return others.slice(0, 3);
  }
  /* -------------  ----------
        EVENTS
    ------------------------ */
  attachEvents() {
    const btn = document.getElementById("load-more-btn");

    if (!btn) return;

    btn.addEventListener("click", () => {
      this.currentPage++;
      this.renderArticles();

      // Scroll mượt xuống vùng content mới
      setTimeout(() => {
        const cards = document.querySelectorAll(".article__card");
        const anchorIndex = this.displayedArticles.length - this.perPage;

        if (cards[anchorIndex]) {
          cards[anchorIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 120);
    });
  }

  /* -----------------------
        EMPTY STATE
    ------------------------ */
  showEmptyState() {
    const loadingState = document.getElementById("loading-state");
    if (loadingState) loadingState.style.display = "none";

    const emptyState = document.getElementById("empty-state");
    if (emptyState) emptyState.style.display = "flex";
  }

  onClickHandler() {
    // SỬA LỖI LOGIC TẠI ĐÂY: Đơn giản hóa hoàn toàn
    const newsContainer = document.querySelector(".js-news-container");
    if (!newsContainer) return; // Nếu không có container, thoát an toàn

    newsContainer.addEventListener("click", function (event) {
      // Tìm phần tử .new__box gần nhất với phần tử được click
      const clickedBox = event.target.closest(".new__box");

      if (clickedBox) {
        const newsId = clickedBox.dataset.id; // Lấy id từ data-id
        if (newsId) {
          // Kiểm tra xem ID có phải là của bài viết local hay không
          if (String(newsId).startsWith("local-")) {
            // Nếu là bài viết local, ta cần xử lý khác hoặc lưu ID vào session/local storage để trang Post.html đọc
            localStorage.setItem("selectedPostId", newsId);
            window.location.href = `./post.html?type=local`;
          } else {
            window.location.href = `./post.html?id=${newsId}`;
          }
        }
      }
    });
  }
}

/* -----------------------
      INIT CLASS
  ------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  new CategoryPage();
  toggleNav();
});
window.toggleMenu = toggleMenu;