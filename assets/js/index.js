import { newsData } from "../data/newsData.js";
import { toggleMenu } from "./header.js";

// 1. Render Featured News
function renderFeatured() {
  const { title, description, image } = newsData.featured;
  document.querySelector('.boxupperleft__img img').src = `../assets/${image}`;
  document.querySelector('.boxupperleft__description h1').textContent = title;
  document.querySelector('.boxupperleft__description p').textContent = description;
}

// 2. Render Latest News
function renderLatest() {
  const container = document.querySelector('.latestnews');
  container.innerHTML = newsData.latest.map(item => `
  <div class = 'latest-new'>
    <h2>${item.title}</h2>
    <p>${item.time}</p>
  </div>
    `).join('');
}

// 3. Render Three News
function renderThreeNews() {
  const container = document.querySelector('.threenews');
  container.innerHTML = newsData.threeNews.map(item => `
    <div class="threenews__oii">
      <div class="threenews__img">
        <img src="../assets/${item.image}" alt="">
      </div>
      <div class="threenews__description">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

// 4. Render Lifestyle
function renderLifestyle() {
  const { big, small } = newsData.lifestyle;

  // Big news
  document.querySelector('.bignews__img img').src = `../assets/${big.image}`;
  document.querySelector('.bignews__description p').textContent = big.title;

  // Small news
  const containers = document.querySelectorAll('.smallnews > div');
  small.forEach((item, i) => {
    containers[i].querySelector('.smallnews__img img').src = `../assets/${item.image}`;
    containers[i].querySelector('.smallnews__description p').textContent = item.title;
  });
}

// 5. Render Topics (Money, Tech, Business, Politics)
function renderTopics() {
  const topicContainers = document.querySelectorAll('.topic');
  const topics = Object.values(newsData.topics);

  topics.forEach((topic, index) => {
    const container = topicContainers[index];
    container.querySelector('h2').textContent = topic.title;

    const newsHTML = topic.news.map(item => `
      <div class="news">
        <div class="news__img">
          <img src="../assets/${item.image}" alt="">
        </div>
        <div class="news__description">
          <p>${item.title}</p>
        </div>
      </div>
    `).join('');

    const blockHTML = container.querySelector('.block').outerHTML;
    container.innerHTML = `<h2>${topic.title}</h2>${newsHTML}${blockHTML}`;
  });
}

// 6. Render AI Section
function renderAI() {
  const { main, sideNews } = newsData.ai;

  // Main AI news
  document.querySelector('.AI_maintopic .AI__img img').src = `../assets/${main.image}`;
  document.querySelector('.AI_maintopic .AI__description h3').textContent = main.title;
  document.querySelector('.AI_maintopic .AI__description p').textContent = main.description;

  // Side news
  const newsContainers = document.querySelectorAll('.AI__right > div:not(.block)');
  sideNews.forEach((item, i) => {
    if (newsContainers[i]) {
      newsContainers[i].querySelector('.img__container img').src = `../assets/${item.image}`;
      newsContainers[i].querySelector('.AI__title p').textContent = item.title;
    }
  });
}

// 7. Render Popular Section
function renderPopular() {
  const { grid1, businessMain, grid3 } = newsData.popular;

  // Grid 1 - Most Popular
  const grid1Contents = document.querySelectorAll('.grid__box1 > div:not(.grid1__title)');
  grid1.forEach((item, i) => {
    grid1Contents[i].querySelector('img').src = `../assets/${item.image}`;
    grid1Contents[i].querySelector('h2').textContent = item.category;
    grid1Contents[i].querySelector('p').textContent = item.title;
  });

  // Grid 2 - Business Main
  document.querySelector('.business__news-img img').src = `../assets/${businessMain.image}`;
  document.querySelector('.business__title').textContent = businessMain.category;
  document.querySelector('.p2').textContent = businessMain.title;
  document.querySelector('.business__news-description p').textContent = businessMain.description;

  // Grid 3
  const grid3Containers = [document.querySelector('.lifestyle'), document.querySelector('.politics')];
  grid3.forEach((item, i) => {
    grid3Containers[i].querySelector('img').src = `../assets/${item.image}`;
    grid3Containers[i].querySelector('h2').textContent = item.category;
    grid3Containers[i].querySelector('p').textContent = item.title;
  });
}
// Setup click handlers cho các bài báo
function setupClickHandlers() {
  // Featured news
  const featuredBox = document.querySelector('.boxupperleft');
  if (featuredBox && newsData.featured.id) {
    featuredBox.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.featured.id}`;
    });
  }

  // Latest news
  const latestNewsItems = document.querySelectorAll('.latest-new');
  latestNewsItems.forEach((item, index) => {
    const newsItem1 = newsData.latest[index];
    if (newsItem1 && newsItem1.id) {
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem1.id}`;
      });
    }
  });
  // Three news
  const threeNewsItems = document.querySelectorAll('.threenews__oii');
  threeNewsItems.forEach((item, index) => {
    const newsItem = newsData.threeNews[index];
    if (newsItem && newsItem.id) {
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem.id}`;
      });
    }
  });

  // Lifestyle big
  const lifestyleBig = document.querySelector('.bignews');
  if (lifestyleBig && newsData.lifestyle.big.id) {
    lifestyleBig.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.lifestyle.big.id}`;
    });
  }

  // Lifestyle small
  const lifestyleSmall = document.querySelectorAll('.smallnews > div');
  lifestyleSmall.forEach((item, index) => {
    const newsItem = newsData.lifestyle.small[index];
    if (newsItem && newsItem.id) {
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem.id}`;
      });
    }
  });

  // Topics news
  const topicContainers = document.querySelectorAll('.topic');
  const topics = Object.values(newsData.topics);
  topics.forEach((topic, topicIndex) => {
    const newsItems = topicContainers[topicIndex].querySelectorAll('.news');
    newsItems.forEach((item, newsIndex) => {
      const newsItem = topic.news[newsIndex];
      if (newsItem && newsItem.id) {
        item.addEventListener('click', () => {
          window.location.href = `./post.html?id=${newsItem.id}`;
        });
      }
    });
  });

  // AI main
  const aiMain = document.querySelector('.AI_maintopic');
  if (aiMain && newsData.ai.main.id) {
    aiMain.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.ai.main.id}`;
    });
  }

  // AI side news
  const aiNews = document.querySelectorAll('.AI__right > div:not(.block)');
  aiNews.forEach((item, index) => {
    const newsItem = newsData.ai.sideNews[index];
    if (newsItem && newsItem.id) {
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem.id}`;
      });
    }
  });

  // Popular grid1
  const popularGrid1 = document.querySelectorAll('.grid__box1 > div:not(.grid1__title)');
  popularGrid1.forEach((item, index) => {
    const newsItem = newsData.popular.grid1[index];
    if (newsItem && newsItem.id) {
      item.addEventListener('click', () => {
        window.location.href = `./post.html?id=${newsItem.id}`;
      });
    }
  });

  // Popular businessMain
  const businessMain = document.querySelector('.bussiness__news');
  if (businessMain && newsData.popular.businessMain.id) {
    businessMain.addEventListener('click', () => {
      window.location.href = `./post.html?id=${newsData.popular.businessMain.id}`;
    });
  }

  // Popular grid3
  const popularGrid3 = [document.querySelector('.lifestyle'), document.querySelector('.politics')];
  popularGrid3.forEach((item, index) => {
    if (item) {
      const newsItem = newsData.popular.grid3[index];
      if (newsItem && newsItem.id) {
        item.addEventListener('click', () => {
          window.location.href = `./post.html?id=${newsItem.id}`;
        });
      }
    }
  });
}
// ===== KHỞI ĐỘNG =====
function initNews() {
  renderFeatured();
  renderLatest();
  renderThreeNews();
  renderLifestyle();
  renderTopics();
  renderAI();
  renderPopular();
  setupClickHandlers();
}
// Chạy khi DOM đã load
document.addEventListener('DOMContentLoaded', initNews);
window.toggleMenu = toggleMenu;

