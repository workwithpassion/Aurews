// Import newsData
import { newsData } from "../data/newsData.js";
// toggleMenu is available globally from header.js
import { toggleMenu } from "./header.js";
// Hàm chuyển đổi dữ liệu từ newsData sang định dạng chuẩn
function convertNewsDataToArticles() {
    const articles = [];
    let idCounter = 1;

    // Helper function để tạo article object
    function createArticle(item, category, type = 'article') {
        return {
            id: item.id || idCounter++,
            title: item.title,
            excerpt: item.description || item.time || '',
            category: category,
            date: new Date(), // Có thể điều chỉnh nếu có thông tin ngày tháng
            readTime: '5 min',
            image: resolveImagePath(item.image),
            type: type,
            url: `post.html?id=${item.id}` // URL thực tế của bài viết
        };
    }

    // Resolve image path: keep absolute URLs, convert "img/..." to relative path from pages (../assets/img/...)
    function resolveImagePath(path) {
        const placeholder = 'https://via.placeholder.com/400x250/4a90e2/ffffff?text=News';
        if (!path) return placeholder;
        // absolute or protocol-relative urls
        if (/^(https?:)?\/\//.test(path)) return path;
        // local images referenced like "img/xxx.png" (as in newsData.js) -> pages expect ../assets/img/xxx.png
        if (path.startsWith('img/')) return `../assets/${path}`;
        return path;
    }

    // Featured
    if (newsData.featured) {
        articles.push(createArticle(newsData.featured, 'Featured'));
    }

    // Latest News
    if (newsData.latest) {
        newsData.latest.forEach(item => {
            articles.push(createArticle(item, 'Latest News'));
        });
    }

    // Three News
    if (newsData.threeNews) {
        newsData.threeNews.forEach(item => {
            articles.push(createArticle(item, 'Latest News'));
        });
    }

    // Lifestyle
    if (newsData.lifestyle) {
        if (newsData.lifestyle.big) {
            articles.push(createArticle(newsData.lifestyle.big, 'Lifestyle'));
        }
        if (newsData.lifestyle.small) {
            newsData.lifestyle.small.forEach(item => {
                articles.push(createArticle(item, 'Lifestyle'));
            });
        }
    }

    // Topics
    if (newsData.topics) {
        // Money & Markets
        if (newsData.topics.moneyMarkets?.news) {
            newsData.topics.moneyMarkets.news.forEach(item => {
                articles.push(createArticle(item, 'Money & Markets'));
            });
        }

        // Tech & Innovation
        if (newsData.topics.techInnovation?.news) {
            newsData.topics.techInnovation.news.forEach(item => {
                articles.push(createArticle(item, 'Tech & Innovation'));
            });
        }

        // Business News
        if (newsData.topics.businessNews?.news) {
            newsData.topics.businessNews.news.forEach(item => {
                articles.push(createArticle(item, 'Business News'));
            });
        }

        // Politics
        if (newsData.topics.politics?.news) {
            newsData.topics.politics.news.forEach(item => {
                articles.push(createArticle(item, 'Politics'));
            });
        }
    }

    // AI
    if (newsData.ai) {
        if (newsData.ai.main) {
            articles.push(createArticle(newsData.ai.main, 'A.I.'));
        }
        if (newsData.ai.sideNews) {
            newsData.ai.sideNews.forEach(item => {
                articles.push(createArticle(item, 'A.I.'));
            });
        }
    }

    // Most Popular
    if (newsData.popular) {
        if (newsData.popular.grid1) {
            newsData.popular.grid1.forEach(item => {
                articles.push(createArticle(item, item.category || 'Popular'));
            });
        }
        if (newsData.popular.businessMain) {
            articles.push(createArticle(newsData.popular.businessMain, newsData.popular.businessMain.category || 'Business News'));
        }
        if (newsData.popular.grid3) {
            newsData.popular.grid3.forEach(item => {
                articles.push(createArticle(item, item.category || 'Popular'));
            });
        }
    }

    return articles;
}

// Khởi tạo dữ liệu từ newsData
let allNews = convertNewsDataToArticles();
let filteredNews = [...allNews];
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
let topSuggestions = [];

// Tạo top suggestions từ các từ khóa phổ biến trong tiêu đề và mô tả
function generateTopSuggestions() {
    const keywordMap = new Map();
    const combinedTexts = allNews.map(article =>
        (article.title + ' ' + article.excerpt + ' ' + article.category).toLowerCase()
    );

    combinedTexts.forEach(text => {
        const words = text.split(/\W+/);
        words.forEach(word => {
            if (word.length > 2) {
                keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
            }
        });
    });

    topSuggestions = Array.from(keywordMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);
}

// Lưu tìm kiếm gần đây và cập nhật gợi ý
function saveRecentSearch(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') return;

    recentSearches = recentSearches.filter(term => term.toLowerCase() !== searchTerm.toLowerCase());
    recentSearches.unshift(searchTerm.trim());

    if (recentSearches.length > 5) {
        recentSearches = recentSearches.slice(0, 5);
    }

    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Xóa một tìm kiếm gần đây
function removeRecentSearch(term) {
    recentSearches = recentSearches.filter(t => t.toLowerCase() !== term.toLowerCase());
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displaySuggestions();
}

// Xóa tất cả tìm kiếm gần đây
function clearRecentSearches() {
    recentSearches = [];
    localStorage.removeItem('recentSearches');
    displaySuggestions();
}

// Đếm số lượng Filter đang hoạt động
function countActiveFilters() {
    let count = 0;
    const contentTypeFilter = document.getElementById('contentTypeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const searchInFilter = document.getElementById('searchInFilter');

    if (contentTypeFilter && contentTypeFilter.value) count++;
    if (categoryFilter && categoryFilter.value) count++;
    if (dateFilter && dateFilter.value) count++;
    if (searchInFilter && searchInFilter.value !== 'all') count++;
    return count;
}

// Cập nhật số lượng Filter đang hoạt động trên badge
function updateFilterCountBadge() {
    const count = countActiveFilters();
    const badge = document.getElementById('activeFiltersCount');
    if (!badge) return;

    if (count > 0) {
        badge.textContent = count;
        badge.classList.add('show');
    } else {
        badge.classList.remove('show');
    }
}

// Hàm lọc tin tức dựa trên các tiêu chí
function filterNews(searchTerm = '', category = '', dateRange = '', contentType = '', searchIn = 'all') {
    let results = [...allNews];

    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        if (searchIn === 'keyword') {
            results = results.filter(article =>
                article.title.toLowerCase().includes(lowerSearchTerm) ||
                article.excerpt.toLowerCase().includes(lowerSearchTerm)
            );
        } else if (searchIn === 'headline-body') {
            results = results.filter(article =>
                article.title.toLowerCase().includes(lowerSearchTerm) ||
                article.excerpt.toLowerCase().includes(lowerSearchTerm)
            );
        } else if (searchIn === 'author') {
            // Giữ nguyên cho tương lai nếu có thông tin tác giả
        } else {
            results = results.filter(article =>
                article.title.toLowerCase().includes(lowerSearchTerm) ||
                article.excerpt.toLowerCase().includes(lowerSearchTerm) ||
                article.category.toLowerCase().includes(lowerSearchTerm)
            );
        }
    }

    if (category) {
        results = results.filter(article => article.category === category);
    }

    if (dateRange) {
        const now = new Date();
        results = results.filter(article => {
            const articleDate = new Date(article.date);
            if (dateRange === 'today') {
                return articleDate.toDateString() === now.toDateString();
            } else if (dateRange === 'week') {
                const oneWeekAgo = new Date(now);
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return articleDate >= oneWeekAgo && articleDate <= now;
            } else if (dateRange === 'month') {
                const oneMonthAgo = new Date(now);
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                return articleDate >= oneMonthAgo && articleDate <= now;
            } else if (dateRange === 'year') {
                const oneYearAgo = new Date(now);
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                return articleDate >= oneYearAgo && articleDate <= now;
            }
            return true;
        });
    }

    if (contentType) {
        results = results.filter(article => article.type === contentType);
    }

    return results;
}

// Hàm sắp xếp tin tức dựa trên tiêu chí
function sortNews(news, sortBy) {
    const sortedNews = [...news];

    switch (sortBy) {
        case 'newest':
            sortedNews.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            sortedNews.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular':
            sortedNews.sort((a, b) => {
                const aScore = (new Date(a.date).getTime() / 1000) + (a.title.length * 0.1);
                const bScore = (new Date(b.date).getTime() / 1000) + (b.title.length * 0.1);
                return bScore - aScore;
            });
            break;
        case 'relevance':
        default:
            break;
    }
    return sortedNews;
}

// Hàm hiển thị kết quả tìm kiếm
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Hàm hiển thị kết quả tìm kiếm
function renderArticles(articles) {
    const grid = document.getElementById('articlesGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!grid) return;

    grid.innerHTML = '';

    if (articles.length === 0) {
        if (noResults) noResults.style.display = 'block';
        if (resultsCount) resultsCount.innerHTML = '<strong>0</strong> results';
        grid.style.display = 'none';
        return;
    }

    if (noResults) noResults.style.display = 'none';
    grid.style.display = 'grid';
    if (resultsCount) resultsCount.innerHTML = `<strong>${articles.length}</strong> results`;

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';

        // Click handler để mở liên kết bài viết
        card.onclick = function () {
            // Sử dụng URL từ article hoặc tạo URL dựa trên ID
            const articleUrl = article.url || `post.html?id=${article.id}`;
            window.location.href = articleUrl;
        };

        const imageDiv = document.createElement('div');
        imageDiv.className = 'article-image';
        const escapedImageUrl = escapeHtml(article.image);
        imageDiv.style.backgroundImage = `url('${escapedImageUrl}')`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'article-content';

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'article-category';
        categoryDiv.textContent = article.category;

        const titleH3 = document.createElement('h3');
        titleH3.className = 'article-title';
        titleH3.textContent = article.title;

        const excerptP = document.createElement('p');
        excerptP.className = 'article-excerpt';
        excerptP.textContent = article.excerpt;

        const metaDiv = document.createElement('div');
        metaDiv.className = 'article-meta';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'article-date';
        const dateIcon = document.createElement('i');
        dateIcon.className = 'far fa-calendar';
        dateDiv.appendChild(dateIcon);
        dateDiv.appendChild(document.createTextNode(' ' + article.date.toLocaleDateString()));

        const readTimeDiv = document.createElement('div');
        readTimeDiv.className = 'article-read-time';
        const timeIcon = document.createElement('i');
        timeIcon.className = 'far fa-clock';
        readTimeDiv.appendChild(timeIcon);
        readTimeDiv.appendChild(document.createTextNode(' ' + article.readTime));

        metaDiv.appendChild(dateDiv);
        metaDiv.appendChild(readTimeDiv);

        contentDiv.appendChild(categoryDiv);
        contentDiv.appendChild(titleH3);
        contentDiv.appendChild(excerptP);
        contentDiv.appendChild(metaDiv);

        card.appendChild(imageDiv);
        card.appendChild(contentDiv);

        grid.appendChild(card);
    });
}

// Hàm hiển thị gợi ý tìm kiếm
function displaySuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    const recentList = document.getElementById('recentSuggestionsList');
    const popularList = document.getElementById('popularSuggestionsList');

    if (!suggestionsContainer || !recentList || !popularList) return;

    recentList.innerHTML = '';
    popularList.innerHTML = '';

    if (topSuggestions.length > 0 || recentSearches.length > 0) {
        suggestionsContainer.classList.add('show');
    } else {
        suggestionsContainer.classList.remove('show');
        return;
    }

    recentSearches.forEach(term => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';

        const icon = document.createElement('i');
        icon.className = 'fas fa-search';

        const text = document.createTextNode(' ' + term + ' ');

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-search';
        removeBtn.textContent = '×';
        removeBtn.onclick = function (e) {
            e.stopPropagation();
            removeRecentSearch(term);
        };

        item.appendChild(icon);
        item.appendChild(text);
        item.appendChild(removeBtn);

        item.onclick = function (e) {
            if (!e.target.classList.contains('remove-search')) {
                document.getElementById('searchInput').value = term;
                performSearch();
                hideSuggestions();
            }
        };
        recentList.appendChild(item);
    });

    if (recentSearches.length > 0) {
        const clearAllButton = document.createElement('button');
        clearAllButton.className = 'clear-all-btn';
        clearAllButton.textContent = 'Clear all';
        clearAllButton.addEventListener('click', clearRecentSearches);
        recentList.appendChild(clearAllButton);
    }

    topSuggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';

        const icon = document.createElement('i');
        icon.className = 'fas fa-search';

        const text = document.createTextNode(' ' + suggestion);

        item.appendChild(icon);
        item.appendChild(text);

        item.onclick = function () {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = suggestion;
                performSearch();
                hideSuggestions();
            }
        };
        popularList.appendChild(item);
    });
}

// Hàm ẩn gợi ý tìm kiếm
function hideSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
    }
}


// Hàm hiển thị hoặc ẩn nút xóa input
function toggleClearButton() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearInputButton');
    if (!input || !clearBtn) return;

    if (input.value.length > 0) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
}


// Hàm xóa nội dung input tìm kiếm
function clearSearchInput() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    input.value = '';
    input.focus();
    toggleClearButton();
    hideSuggestions();

    const articlesGrid = document.getElementById('articlesGrid');
    if (articlesGrid) {
        articlesGrid.innerHTML = '';
    }
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.innerHTML = '<strong>0</strong> results';
    }
}


// Hàm thực hiện tìm kiếm
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const contentTypeFilter = document.getElementById('contentTypeFilter');
    const searchInFilter = document.getElementById('searchInFilter');
    const sortDropdown = document.getElementById('sortDropdown');
    const loadingState = document.getElementById('loadingState');
    const articlesGrid = document.getElementById('articlesGrid');
    const noResults = document.getElementById('noResults');

    if (!searchInput || !categoryFilter || !dateFilter || !contentTypeFilter ||
        !searchInFilter || !sortDropdown || !loadingState || !articlesGrid || !noResults) {
        return;
    }

    const searchTerm = searchInput.value;
    const category = categoryFilter.value;
    const dateRange = dateFilter.value;
    const contentType = contentTypeFilter.value;
    const searchIn = searchInFilter.value;
    const sortBy = sortDropdown.value;

    loadingState.style.display = 'block';
    articlesGrid.style.display = 'none';
    noResults.style.display = 'none';

    setTimeout(() => {
        filteredNews = filterNews(searchTerm, category, dateRange, contentType, searchIn);
        const sortedNews = sortNews(filteredNews, sortBy);
        renderArticles(sortedNews);

        loadingState.style.display = 'none';

        if (searchTerm.trim() !== '') {
            saveRecentSearch(searchTerm);
            displaySuggestions();
        }
    }, 300);
}


// Hàm debounce để tối ưu hóa việc gọi hàm performSearch
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// Khởi tạo các sự kiện
function initializeEventListeners() {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', toggleClearButton);
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        searchInput.addEventListener('focus', function () {
            if (this.value.trim() === '') {
                displaySuggestions();
            }
        });
    }

    const clearInputButton = document.getElementById('clearInputButton');
    if (clearInputButton) {
        clearInputButton.addEventListener('click', clearSearchInput);
    }

    const contentTypeFilter = document.getElementById('contentTypeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const searchInFilter = document.getElementById('searchInFilter');
    const sortDropdown = document.getElementById('sortDropdown');

    if (contentTypeFilter) {
        contentTypeFilter.addEventListener('change', performSearch);
        contentTypeFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', performSearch);
        categoryFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (dateFilter) {
        dateFilter.addEventListener('change', performSearch);
        dateFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (searchInFilter) {
        searchInFilter.addEventListener('change', performSearch);
        searchInFilter.addEventListener('change', updateFilterCountBadge);
    }
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function () {
            const sortBy = this.value;
            const sortedNews = sortNews(filteredNews, sortBy);
            renderArticles(sortedNews);
        });
    }

    const clearAllFiltersBtn = document.getElementById('clearAllFiltersBtn');
    if (clearAllFiltersBtn) {
        clearAllFiltersBtn.addEventListener('click', function () {
            if (contentTypeFilter) contentTypeFilter.value = '';
            if (categoryFilter) categoryFilter.value = '';
            if (dateFilter) dateFilter.value = '';
            if (searchInFilter) searchInFilter.value = 'all';
            if (sortDropdown) sortDropdown.value = 'relevance';

            filteredNews = [...allNews];
            renderArticles(allNews);
            hideSuggestions();
            toggleClearButton();
            updateFilterCountBadge();

            const filtersDropdown = document.getElementById('filtersDropdown');
            if (filtersDropdown) {
                filtersDropdown.classList.remove('show');
            }
        });
    }

    const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
    const filtersDropdown = document.getElementById('filtersDropdown');

    if (toggleFiltersBtn && filtersDropdown) {
        toggleFiltersBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filtersDropdown.classList.toggle('show');
        });
    }

    const suggestionsContainer = document.getElementById('searchSuggestions');
    const searchInputWrapper = document.querySelector('.search-input-wrapper');
    document.addEventListener('click', function (event) {
        if (searchInput && suggestionsContainer && searchInputWrapper &&
            !searchInputWrapper.contains(event.target) &&
            !suggestionsContainer.contains(event.target)) {
            hideSuggestions();
        }

        if (toggleFiltersBtn && filtersDropdown &&
            !toggleFiltersBtn.contains(event.target) &&
            !filtersDropdown.contains(event.target)) {
            filtersDropdown.classList.remove('show');
        }
    });
}

// Khởi chạy khi trang loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        generateTopSuggestions();
        initializeEventListeners();
        displaySuggestions();
        toggleClearButton();
        updateFilterCountBadge();
    });
} else {
    generateTopSuggestions();
    initializeEventListeners();
    displaySuggestions();
    toggleClearButton();
    updateFilterCountBadge();
}

// Expose toggleMenu to global scope so inline onclick attributes in the HTML can call it
window.toggleMenu = toggleMenu;