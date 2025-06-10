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
