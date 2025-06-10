
const ctx = document.getElementById('predictionChart').getContext('2d');
const predictionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Now', '+2h', '+4h', '+6h', '+8h', '+10h', '+12h'],
        datasets: [{
            label: 'TSLA Forecast ($)',
            data: [308, 310, 307, 311, 314, 312, 310],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
});
