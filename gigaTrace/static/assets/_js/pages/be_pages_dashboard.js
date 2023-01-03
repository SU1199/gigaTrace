/*
 *  Document   : be_pages_dashboard.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Dashboard Page
 */

// Chart.js Charts, for more examples you can check out http://www.chartjs.org/docs
class pageDashboard {
  /*
   * Init Charts
   *
   */
  static initCharts() {
    // Set Global Chart.js configuration
    Chart.defaults.color = '#818d96';
    Chart.defaults.scale.grid.lineWidth = 0;
    Chart.defaults.scale.beginAtZero = true;
    Chart.defaults.datasets.bar.maxBarThickness = 45;
    Chart.defaults.elements.bar.borderRadius = 4;
    Chart.defaults.elements.bar.borderSkipped = false;
    Chart.defaults.elements.point.radius = 0;
    Chart.defaults.elements.point.hoverRadius = 0;
    Chart.defaults.plugins.tooltip.radius = 3;
    Chart.defaults.plugins.legend.labels.boxWidth = 10;

    // Get Chart Containers
    let chartEarningsCon = document.getElementById('js-chartjs-earnings');
    let chartTotalOrdersCon = document.getElementById('js-chartjs-total-orders');
    let chartTotalEarningsCon = document.getElementById('js-chartjs-total-earnings');
    let chartNewCustomersCon = document.getElementById('js-chartjs-new-customers');

    // Set Chart and Chart Data variables
    let chartEarnings, chartTotalOrders, chartTotalEarnings, chartNewCustomers;

    // Init Chart Earnings
    if (chartEarningsCon !== null) {
      chartEarnings = new Chart(chartEarningsCon, {
        type: 'bar',
        data: {
          labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          datasets: [
            {
              label: 'This Week',
              fill: true,
              backgroundColor: 'rgba(100, 116, 139, .7)',
              borderColor: 'transparent',
              pointBackgroundColor: 'rgba(100, 116, 139, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(100, 116, 139, 1)',
              data: [716, 628, 1056, 560, 956, 890, 790]
            },
            {
              label: 'Last Week',
              fill: true,
              backgroundColor: 'rgba(100, 116, 139, .15)',
              borderColor: 'transparent',
              pointBackgroundColor: 'rgba(100, 116, 139, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(100, 116, 139, 1)',
              data: [1160, 923, 1052, 1300, 880, 926, 963]
            }
          ]
        },
        options: {
          scales: {
            x: {
              display: false,
              grid: {
                drawBorder: false
              }
            },
            y: {
              display: false,
              grid: {
                drawBorder: false
              }
            }
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: {
              labels: {
                boxHeight: 10,
                font: {
                  size: 14
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': $' + context.parsed.y;
                }
              }
            }
          }
        }
      });
    }

    // Init Chart Total Orders
    if (chartTotalOrdersCon !== null) {
      chartTotalOrders = new Chart(chartTotalOrdersCon, {
        type: 'line',
        data: {
          labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          datasets: [
            {
              label: 'Total Orders',
              fill: true,
              backgroundColor: 'rgba(220, 38, 38, .15)',
              borderColor: 'transparent',
              pointBackgroundColor: 'rgba(220, 38, 38, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(220, 38, 38, 1)',
              data: [33, 29, 32, 37, 38, 30, 34, 28, 43, 45, 26, 45, 49, 39],
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tension: .4,
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ' ' + context.parsed.y + ' Orders';
                }
              }
            }
          }
        }
      });
    }

    // Init Chart Total Earnings
    if (chartTotalEarningsCon !== null) {
      chartTotalEarnings = new Chart(chartTotalEarningsCon, {
        type: 'line',
        data: {
          labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          datasets: [
            {
              label: 'Total Earnings',
              fill: true,
              backgroundColor: 'rgba(101, 163, 13, .15)',
              borderColor: 'transparent',
              pointBackgroundColor: 'rgba(101, 163, 13, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(101, 163, 13, 1)',
              data: [716, 1185, 750, 1365, 956, 890, 1200, 968, 1158, 1025, 920, 1190, 720, 1352],
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tension: .4,
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ' $' + context.parsed.y;
                }
              }
            }
          }
        }
      });
    }

    // Init Chart New Customers
    if (chartNewCustomersCon !== null) {
      chartNewCustomers = new Chart(chartNewCustomersCon, {
        type: 'line',
        data: {
          labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          datasets: [
            {
              label: 'Total Orders',
              fill: true,
              backgroundColor: 'rgba(101, 163, 13, .15)',
              borderColor: 'transparent',
              pointBackgroundColor: 'rgba(101, 163, 13, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(101, 163, 13, 1)',
              data: [25, 15, 36, 14, 29, 19, 36, 41, 28, 26, 29, 33, 23, 41],
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tension: .4,
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ' ' + context.parsed.y + ' Customers';
                }
              }
            }
          }
        }
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
One.onLoad(pageDashboard.init());
