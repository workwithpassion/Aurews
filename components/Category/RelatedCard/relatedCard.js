function injectStyle() {
  if (document.getElementById("related-card-style")) return;
  const link = document.createElement("link");
  link.id = "related-card-style";
  link.href = "../components/Category/RelatedCard/relatedCard.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

export function createRelatedCard(article) {
  injectStyle();
  const imageHtml = article.img
    ? `<img src="${article.img}" alt="${article.description}" />`
    : "";
  const category = article.type
    ? article.type
    : article.type1
    ? article.type1
    : article.type2
    ? article.type2
    : "Undefined";
  return `
    <a href="post.html?id=${article.id}" class="related-card" data-id="${article.id}">
        <div class="related-card__image">${imageHtml}</div>
        <div class="related-card__category">${category}</div>
        <h3 class="related-card__title">${article.description}</h3>
        <div class="related-card__meta">
        <span><i class="far fa-clock"></i> ${article.time}</span>
        <span>by ${article.author}</span>
        </div>
    </a>    
    `;
}
