document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.confidence-bar').forEach(bar => {
    const confidence = parseInt(bar.getAttribute('data-confidence'));
    bar.style.width = `${confidence}%`;
  });

  // Load Breaking News (stub example)
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = `
    <li>TSLA hits new highs amid AI news 📢</li>
    <li>NVDA earnings expected this week 💰</li>
    <li>DIS announces new streaming bundle 📺</li>
  `;
});
function saveSettings() {
  const notifType = document.querySelector('input[name="notifType"]:checked').value;
  const alerts = {
    price: document.getElementById('priceAlerts').checked,
    news: document.getElementById('newsAlerts').checked,
    earnings: document.getElementById('earningsAlerts').checked
  };

  localStorage.setItem('notifType', notifType);
  localStorage.setItem('alerts', JSON.stringify(alerts));

  document.getElementById('saveMsg').style.display = 'block';
  setTimeout(() => document.getElementById('saveMsg').style.display = 'none', 2000);
}

function loadSettings() {
  const notifType = localStorage.getItem('notifType');
  const alerts = JSON.parse(localStorage.getItem('alerts'));

  if (notifType) {
    document.querySelector(`input[name="notifType"][value="${notifType}"]`).checked = true;
  }

  if (alerts) {
    document.getElementById('priceAlerts').checked = alerts.price;
    document.getElementById('newsAlerts').checked = alerts.news;
    document.getElementById('earningsAlerts').checked = alerts.earnings;
  }
}

document.addEventListener('DOMContentLoaded', loadSettings);
async function fetchNews() {
  const newsList = document.getElementById('newsList');
  newsList.innerHTML = 'Loading news...';

  try {
    const res = await fetch('https://newsapi.org/v2/everything?q=Tesla OR Nvidia OR Netflix OR Disney&sortBy=publishedAt&apiKey=YOUR_NEWSAPI_KEY');
    const data = await res.json();

    newsList.innerHTML = '';
    data.articles.slice(0, 5).forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      newsList.appendChild(li);
    });
  } catch (err) {
    newsList.innerHTML = '⚠️ Failed to load news.';
  }
}

document.addEventListener('DOMContentLoaded', fetchNews);
const earningsDates = {
  TSLA: '2025-07-23',
  NVDA: '2025-08-15',
  NFLX: '2025-07-17',
  DIS:  '2025-08-01'
};

function updateEarningsCountdown() {
  const list = document.getElementById('earningsList');
  list.innerHTML = '';

  Object.entries(earningsDates).forEach(([symbol, date]) => {
    const daysLeft = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
    const li = document.createElement('li');
    li.innerHTML = `📊 ${symbol}: ${daysLeft > 0 ? `${daysLeft} days` : 'Today'} until earnings`;
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', updateEarningsCountdown);
function addFavorite() {
  const input = document.getElementById('stockInput');
  const symbol = input.value.trim().toUpperCase();
  if (!symbol) return;

  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favorites.includes(symbol)) {
    favorites.push(symbol);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
    input.value = '';
  }
}

function removeFavorite(symbol) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites = favorites.filter(s => s !== symbol);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const list = document.getElementById('favoritesList');
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  list.innerHTML = '';
  favorites.forEach(symbol => {
    const li = document.createElement('li');
    li.innerHTML = `${symbol} <button onclick="removeFavorite('${symbol}')">❌ Remove</button>`;
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', renderFavorites);
