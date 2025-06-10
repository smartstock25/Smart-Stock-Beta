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
