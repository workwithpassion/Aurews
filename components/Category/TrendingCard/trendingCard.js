function injectStyles() {
  if (document.getElementById("trending-card-style")) return;
  const link = document.createElement("style");
  link.id = "trending-card-style";
  link.href = "../components/Category/TrendingCard/trendingCard.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
export function createTrendingCard(article, rank) {
  injectStyles();
  return `
  <a href="post.html?id=${article.id}" class="trending__item">
  <div class="trending__left">
    <div class="trending__number">${rank}</div>
  </div>

  <div class="trending__image">
    ${article.img ? `<img src="${article.img}"/>` : ""}
  </div>

  <div class="trending__content">
    <h4 class="trending__title">${article.description}</h4>
    <div class="trending__meta">${article.views} views today</div>
  </div>
</a>
    `;
}
