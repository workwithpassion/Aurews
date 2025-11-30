function injectStyles() {
  if (document.getElementById("article-card-style")) return;

  const link = document.createElement("link");
  link.id = "article-card-style";
  link.href = "../components/Category/ArticleCard/articleCard.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
function truncateSimple(str, n = 30) {
  return str.length <= n ? str : str.slice(0, n) + "...";
}
export function createArticleCard(article) {
  injectStyles();

  const imageHTML = article.img
    ? `<img src="${article.img}" alt="${article.title}" class="post-card__image" />`
    : `<div style="width:100%;height:180px;background:#ddd"></div>`;

  return `
  <article class="article-card" data-id="${
    article.id
  }" onclick="window.location.href='post.html?id=${article.id}'">
  <div class="article-card__image">
    ${imageHTML}
  </div>

  <div class="article-card__content">
    <div>
      <div class="article-card__category">${article.type}</div>
      <h2 class="article-card__title">${article.description}</h2>
      <h3 class="article-card__excerpt">${truncateSimple(
        article.content,
        100
      )}</h3>
    </div>

    <div class="article-card__meta">
      <span>9:53 11-17-2025 </span>
      <span>by ${article.author}</span>
    </div>
  </div>
</article>
    `;
}
