// --- DỮ LIỆU BAN ĐẦU ---
const stockData = [
  { symbol: "COF", percent: -2.61, price: 211.15, change: -5.65 },
  { symbol: "COIN", percent: 0.3, price: 284.0, change: 0.86 },
  { symbol: "RDFN", percent: 0.0, price: 11.19, change: 0.0 },
  { symbol: "CMCSA", percent: -1.64, price: 27.51, change: -0.46 },
  { symbol: "NWS", percent: -0.4, price: 29.56, change: -0.12 },
  { symbol: "DOOO", percent: -0.02, price: 64.11, change: -0.01 },
  { symbol: "HOG", percent: -0.4, price: 24.71, change: -0.1 },
];

// --- CÁC HÀM TIỆN ÍCH VÀ BIỂU ĐỒ (TỪ CẢ HAI PHIÊN BẢN) ---

// Hàm tạo biểu đồ nhỏ (lấy từ phiên bản mới, logic tốt hơn)
function generateMiniChart(trend) {
  const points = 20;
  let path = "M 0 12";
  let trendFactor = 0;
  if (trend > 0) trendFactor = -1; // Tăng giá thì y giảm
  if (trend < 0) trendFactor = 1; // Giảm giá thì y tăng

  for (let i = 1; i < points; i++) {
    const x = (i / (points - 1)) * 60;
    const variance = (Math.random() - 0.5) * 8;
    const trendValue = trendFactor * Math.abs(trend) * i * 0.1; // Dùng trend factor
    const y = 12 + trendValue + variance;
    path += ` L ${x} ${Math.max(2, Math.min(22, y))}`;
  }
  return path;
}

// Hàm tạo biểu đồ lớn cho modal (lấy từ phiên bản cũ)
function generateLargeChart(trend) {
  const points = 50;
  let path = "M 0 90";
  let trendFactor = 0;
  if (trend > 0) trendFactor = -1;
  if (trend < 0) trendFactor = 1;

  for (let i = 1; i < points; i++) {
    const x = (i / (points - 1)) * 500;
    const variance = (Math.random() - 0.5) * 30;
    const trendValue = trendFactor * Math.abs(trend) * i * 0.5;
    const y = 90 + trendValue + variance;
    path += ` L ${x} ${Math.max(10, Math.min(170, y))}`;
  }
  return path;
}

function getStatusClass(value) {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

function formatNumber(num) {
  return num >= 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
}

// Các hàm định dạng cho modal (lấy từ phiên bản cũ)
function formatVolume(price) {
  const vol = Math.floor(Math.random() * 10000000) + 1000000;
  return (vol / 1000000).toFixed(2) + "M";
}

function formatMarketCap(price) {
  const cap = price * (Math.random() * 500 + 100) * 1000000;
  return "$" + (cap / 1000000000).toFixed(2) + "B";
}

// --- CHỨC NĂNG MODAL (LẤY TỪ PHIÊN BẢN CŨ) ---

function openModal(stock) {
  const modal = document.getElementById("stockModal");
  const statusClass = getStatusClass(stock.percent);

  document.getElementById("modalSymbol").textContent = stock.symbol;
  document.getElementById("modalBigPrice").textContent =
    "$" + stock.price.toFixed(2);
  document.getElementById("modalBigPrice").className = "big-price"; // reset class

  const changeText = `${formatNumber(stock.change)} (${formatNumber(
    stock.percent
  ).slice(0, -1)}%)`;
  document.getElementById("modalBigChange").textContent = changeText;
  document.getElementById("modalBigChange").className =
    "big-change " + statusClass;

  const chartPath = generateLargeChart(stock.percent);
  const pathElement = document.getElementById("largeChartPath");
  pathElement.setAttribute("d", chartPath);
  const strokeColor =
    statusClass === "positive"
      ? "#16a34a"
      : statusClass === "negative"
      ? "#dc2626"
      : "#666";
  pathElement.setAttribute("stroke", strokeColor);

  const openPrice = stock.price - stock.change;
  const high =
    Math.max(stock.price, openPrice) + Math.random() * (stock.price / 100);
  const low =
    Math.min(stock.price, openPrice) - Math.random() * (stock.price / 100);

  document.getElementById("modalOpen").textContent = "$" + openPrice.toFixed(2);
  document.getElementById("modalHigh").textContent = "$" + high.toFixed(2);
  document.getElementById("modalLow").textContent = "$" + low.toFixed(2);
  document.getElementById("modalVolume").textContent = formatVolume(
    stock.price
  );
  document.getElementById("modalMarketCap").textContent = formatMarketCap(
    stock.price
  );
  document.getElementById("modalPE").textContent = (
    15 +
    Math.random() * 20
  ).toFixed(2);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("stockModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// --- CÁC HÀM RENDER VÀ CẬP NHẬT HIỆU QUẢ (TỪ PHIÊN BẢN MỚI) ---

// Hàm render ban đầu (chỉ chạy 1 lần)
function initialRenderTicker() {
  const wrapper = document.getElementById("tickerWrapper");
  if (!wrapper) return;

  wrapper.innerHTML = "";

  // Render 2-3 lần để tạo hiệu ứng cuộn vòng lặp
  for (let repeat = 0; repeat < 3; repeat++) {
    stockData.forEach((stock) => {
      const statusClass = getStatusClass(stock.percent);
      const chartPath = generateMiniChart(stock.percent);

      const stockItem = document.createElement("div");
      stockItem.className = "stock-item";
      // Thêm data-symbol để định danh cho việc cập nhật
      stockItem.setAttribute("data-symbol", stock.symbol);
      // **QUAN TRỌNG: Thêm lại sự kiện onclick để mở modal**
      stockItem.onclick = () => openModal(stock);

      stockItem.innerHTML = `
                <svg class="mini-chart ${statusClass}" viewBox="0 0 60 24">
                    <path d="${chartPath}"/>
                </svg>
                <span class="stock-symbol">${stock.symbol}</span>
                <span class="stock-change ${statusClass}">${formatNumber(
        stock.percent
      )}%</span>
                <span class="stock-price">$${stock.price.toFixed(2)}</span>
                <span class="price-change ${statusClass}">${formatNumber(
        stock.change
      )}</span>
            `;

      wrapper.appendChild(stockItem);
    });
  }
}

// Hàm cập nhật giá trị hiệu quả
function updateTickerValues() {
  // Cập nhật dữ liệu stock
  stockData.forEach((stock) => {
    const changeFactor = (Math.random() - 0.5) * 0.02; // Thay đổi ngẫu nhiên tối đa 2%
    const change = stock.price * changeFactor;
    const oldPrice = stock.price;

    stock.price += change;
    // Tính lại mức thay đổi so với giá mở cửa (giá ban đầu của phiên)
    const openPrice = oldPrice - stock.change;
    stock.change = stock.price - openPrice;
    stock.percent = (stock.change / openPrice) * 100;
  });

  // Cập nhật tất cả các stock items trong DOM
  const allItems = document.querySelectorAll(".stock-item");
  if (allItems.length === 0) return; // Nếu không tìm thấy items, thoát sớm

  allItems.forEach((item) => {
    const symbol = item.getAttribute("data-symbol");
    const stock = stockData.find((s) => s.symbol === symbol);
    if (!stock) return;

    const statusClass = getStatusClass(stock.percent);
    const chartPath = generateMiniChart(stock.percent);

    const chart = item.querySelector(".mini-chart");
    const chartPathEl = chart?.querySelector("path");
    const percentEl = item.querySelector(".stock-change");
    const priceEl = item.querySelector(".stock-price");
    const changeEl = item.querySelector(".price-change");

    // Kiểm tra nếu các elements tồn tại
    if (!chart || !chartPathEl || !percentEl || !priceEl || !changeEl) return;

    // Cập nhật class màu sắc
    // SVG elements cần dùng setAttribute thay vì className
    chart.setAttribute("class", `mini-chart ${statusClass}`);
    percentEl.className = `stock-change ${statusClass}`;
    changeEl.className = `price-change ${statusClass}`;

    // Cập nhật nội dung
    chartPathEl.setAttribute("d", chartPath);
    percentEl.textContent = `${formatNumber(stock.percent)}%`;
    priceEl.textContent = `$${stock.price.toFixed(2)}`;
    changeEl.textContent = formatNumber(stock.change);

    // Cập nhật lại onclick handler với stock mới
    item.onclick = () => openModal(stock);
  });
}

// --- COMPONENT PATTERN ---

function injectStyle() {
  if (document.getElementById("banner-style")) return;

  const link = document.createElement("link");
  link.id = "banner-style";
  link.href = "../components/Banner/Banner.css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

function createBanner() {
  injectStyle();
  return `
        <div class="ticker-container">
            <div class="ticker-wrapper" id="tickerWrapper"></div>
        </div>
        <!-- Modal -->
        <div class="modal" id="stockModal">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <div class="modal-title" id="modalSymbol"></div>
                    </div>
                    <button class="modal-close-btn" onclick="closeModal()">×</button>
                </div>

                <div class="detail-section">
                    <div class="big-price" id="modalBigPrice"></div>
                    <div class="big-change" id="modalBigChange"></div>
                </div>

                <div class="chart-container">
                    <svg class="large-chart" id="largeChart" viewBox="0 0 500 180">
                        <path id="largeChartPath" d="M0,0"></path>
                    </svg>
                </div>

                <div class="detail-section">
                    <div class="detail-row">
                        <span class="detail-label">Opening Price</span>
                        <span class="detail-value" id="modalOpen"></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Highest Price</span>
                        <span class="detail-value" id="modalHigh"></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Lowest Price</span>
                        <span class="detail-value" id="modalLow"></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Volume</span>
                        <span class="detail-value" id="modalVolume"></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Market Cap</span>
                        <span class="detail-value" id="modalMarketCap"></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">P/E Ratio</span>
                        <span class="detail-value" id="modalPE"></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Make closeModal available globally
window.closeModal = closeModal;

// Biến để lưu interval ID
let tickerUpdateInterval = null;

function initBanner() {
  const container = document.getElementById("banner__placeholder");
  if (!container) return;

  container.innerHTML = createBanner();

  // Đợi một chút để đảm bảo DOM đã được render
  setTimeout(() => {
    // Gán sự kiện đóng modal
    const modal = document.getElementById("stockModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target.id === "stockModal") {
          closeModal();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    // Khởi chạy banner
    initialRenderTicker();

    // Đảm bảo ticker đã được render trước khi bắt đầu update
    const checkAndStartInterval = () => {
      const wrapper = document.getElementById("tickerWrapper");
      if (wrapper && wrapper.children.length > 0) {
        // Cập nhật giá trị mỗi 3 giây mà không vẽ lại toàn bộ banner
        if (tickerUpdateInterval) {
          clearInterval(tickerUpdateInterval);
        }
        tickerUpdateInterval = setInterval(() => {
          updateTickerValues();
        }, 3000);
      } else {
        // Nếu chưa render xong, thử lại sau 50ms
        setTimeout(checkAndStartInterval, 50);
      }
    };

    checkAndStartInterval();
  }, 100);
}

// Khởi tạo banner
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBanner);
} else {
  initBanner();
}
