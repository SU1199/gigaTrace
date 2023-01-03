/*
 *  Document   : be_comp_charts.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Charts Page
 */

// Chart.js Charts, for more examples you can check out http://www.chartjs.org/docs
class pageCompCharts {
  /*
   * Init Charts
   *
   */
  static initChartsChartJS() {
    // Set Global Chart.js configuration
    Chart.defaults.color = '#818d96';
    Chart.defaults.font.weight = '600';
    Chart.defaults.scale.grid.color = "rgba(0, 0, 0, .05)";
    Chart.defaults.scale.grid.zeroLineColor = "rgba(0, 0, 0, .1)";
    Chart.defaults.scale.beginAtZero = true;
    Chart.defaults.elements.line.borderWidth = 2;
    Chart.defaults.elements.point.radius = 4;
    Chart.defaults.elements.point.hoverRadius = 6;
    Chart.defaults.plugins.tooltip.radius = 3;
    Chart.defaults.plugins.legend.labels.boxWidth = 15;

    // Get Chart Containers
    let chartLinesCon = document.getElementById('js-chartjs-lines');
    let chartBarsCon = document.getElementById('js-chartjs-bars');
    let chartRadarCon = document.getElementById('js-chartjs-radar');
    let chartPolarCon = document.getElementById('js-chartjs-polar');
    let chartPieCon = document.getElementById('js-chartjs-pie');
    let chartDonutCon = document.getElementById('js-chartjs-donut');

    // Set Chart and Chart Data variables
    let chartLines, chartBars, chartRadar, chartPolar, chartPie, chartDonut;
    let chartLinesBarsRadarData, chartPolarPieDonutData;

    // Lines/Bar/Radar Chart Data
    chartLinesBarsRadarData = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Last Week',
          fill: true,
          backgroundColor: 'rgba(171, 227, 125, .5)',
          borderColor: 'rgba(171, 227, 125, 1)',
          pointBackgroundColor: 'rgba(171, 227, 125, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(171, 227, 125, 1)',
          data: [15, 16, 20, 25, 23, 25, 32]
        },
        {
          label: 'This Week',
          fill: true,
          backgroundColor: 'rgba(0, 0, 0, .1)',
          borderColor: 'rgba(0, 0, 0, .3)',
          pointBackgroundColor: 'rgba(0, 0, 0, .3)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0, 0, 0, .3)',
          data: [30, 32, 40, 45, 43, 38, 55]
        }
      ]
    };

    // Polar/Pie/Donut Data
    chartPolarPieDonutData = {
      labels: [
        'Earnings',
        'Sales',
        'Tickets'
      ],
      datasets: [{
        data: [
          48,
          26,
          26
        ],
        backgroundColor: [
          'rgba(171, 227, 125, 1)',
          'rgba(250, 219, 125, 1)',
          'rgba(117, 176, 235, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(171, 227, 125, .75)',
          'rgba(250, 219, 125, .75)',
          'rgba(117, 176, 235, .75)'
        ]
      }]
    };

    // Init Charts
    if (chartLinesCon !== null) {
      chartLines = new Chart(chartLinesCon, { type: 'line', data: chartLinesBarsRadarData, options: { tension: .4 } },);
    }

    if (chartBarsCon !== null) {
      chartBars = new Chart(chartBarsCon, { type: 'bar', data: chartLinesBarsRadarData });
    }

    if (chartRadarCon !== null) {
      chartRadar = new Chart(chartRadarCon, { type: 'radar', data: chartLinesBarsRadarData });
    }

    if (chartPolarCon !== null) {
      chartPolar = new Chart(chartPolarCon, { type: 'polarArea', data: chartPolarPieDonutData });
    }

    if (chartPieCon !== null) {
      chartPie = new Chart(chartPieCon, { type: 'pie', data: chartPolarPieDonutData });
    }

    if (chartDonutCon !== null) {
      chartDonut = new Chart(chartDonutCon, { type: 'doughnut', data: chartPolarPieDonutData });
    }
  }

  /*
  * Randomize Easy Pie Chart values
  *
  */
  static initRandomEasyPieChart() {
    document.querySelectorAll('.js-pie-randomize').forEach(btn => {
      btn.addEventListener('click', e => {
        btn.closest('.block').querySelectorAll('.pie-chart').forEach(chart => {
          jQuery(chart).data('easyPieChart').update(Math.floor((Math.random() * 100) + 1));
        });
      });
    });
  }

  /*
  * Init functionality
  *
  */
  static init() {
    this.initChartsChartJS();
    this.initRandomEasyPieChart();
  }
}

// Initialize when page loads
One.onLoad(pageCompCharts.init());
