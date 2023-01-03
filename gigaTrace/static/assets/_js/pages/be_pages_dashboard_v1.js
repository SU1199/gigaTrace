/*
 *  Document   : be_pages_dashboard_v1.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Dashboard v1 Page
 */

// Chart.js Charts, for more examples you can check out http://www.chartjs.org/docs
class pageDashboardv1 {
  /*
   * Init Charts
   *
   */
  static initCharts() {
    // Set Global Chart.js configuration
    Chart.defaults.color = '#818d96';
    Chart.defaults.scale.display = false;
    Chart.defaults.scale.beginAtZero = true;
    Chart.defaults.elements.point.radius = 0;
    Chart.defaults.elements.point.hoverRadius = 0;
    Chart.defaults.plugins.tooltip.radius = 3;
    Chart.defaults.plugins.legend.labels.boxWidth = 12;

    // Get Chart Containers
    let chartEarningsCon = document.getElementById('js-chartjs-dashboard-earnings');
    let chartSalesCon = document.getElementById('js-chartjs-dashboard-sales');

    // Set Chart Variables
    let chartEarnings, chartEarningsOptions, chartEarningsData, chartSales, chartSalesOptions, chartSalesData;

    // Earnigns Chart Options
    chartEarningsOptions = {
      maintainAspectRatio: false,
      tension: .4,
      scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 3000
          }
      },
      interaction: {
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return ' $' + context.parsed.y;
            }
          }
        }
      }
    };

    // Earnigns Chart Options
    chartSalesOptions = {
      maintainAspectRatio: false,
      tension: .4,
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 260
        }
      },
      interaction: {
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.parsed.y + ' Sales';
            }
          }
        }
      }
    };

    // Earnings Chart Data
    chartEarningsData = {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          label: 'This Year',
          fill: true,
          backgroundColor: 'rgba(132, 94, 247, .3)',
          borderColor: 'transparent',
          pointBackgroundColor: 'rgba(132, 94, 247, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(132, 94, 247, 1)',
          data: [2150, 1350, 1560, 980, 1260, 1720, 1115, 1690, 1870, 2420, 2100, 2730]
        },
        {
          label: 'Last Year',
          fill: true,
          backgroundColor: 'rgba(33, 37, 41, .15)',
          borderColor: 'transparent',
          pointBackgroundColor: 'rgba(33, 37, 41, .3)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(33, 37, 41, .3)',
          data: [2200, 1700, 1100, 1900, 1680, 2560, 1340, 1450, 2000, 2500, 1550, 1880]
        }
      ]
    };

    // Sales Chart Data
    chartSalesData = {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          label: 'This Year',
          fill: true,
          backgroundColor: 'rgba(34, 184, 207, .3)',
          borderColor: 'transparent',
          pointBackgroundColor: 'rgba(34, 184, 207, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(34, 184, 207, 1)',
          data: [175, 120, 169, 82, 135, 169, 132, 130, 192, 230, 215, 260]
        },
        {
          label: 'Last Year',
          fill: true,
          backgroundColor: 'rgba(33, 37, 41, .15)',
          borderColor: 'transparent',
          pointBackgroundColor: 'rgba(33, 37, 41, .3)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(33, 37, 41, .3)',
          data: [220, 170, 110, 215, 168, 227, 154, 135, 210, 240, 145, 178]
        }
      ]
    };

    // Init Earnings Chart
    if (chartEarningsCon !== null) {
      chartEarnings = new Chart(chartEarningsCon, {
        type: 'line',
        data: chartEarningsData,
        options: chartEarningsOptions
      });
    }

    // Init Sales Chart
    if (chartSalesCon !== null) {
      chartSales = new Chart(chartSalesCon, {
        type: 'line',
        data: chartSalesData,
        options: chartSalesOptions
      });
    }
  }

  /*
   * Init functionality
   *
   */
  static init() {
    this.initCharts();
  }
}

// Initialize when page loads
One.onLoad(pageDashboardv1.init());
