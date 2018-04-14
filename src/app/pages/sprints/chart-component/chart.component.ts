import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

const backgroundColor = ['#66cdaa', '#c0eadc'];
const hoverBackgroundColor = ['#9cdfc8', '#d0faec'];
const chartLabels = ['Sugaištas laikas', 'Estimuotas laikas'];

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() data: Number[];
  public chart;

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: chartLabels,
        datasets: [{
          data: [10, 20],
          backgroundColor,
          hoverBackgroundColor
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const meta = dataset._meta[Object.keys(dataset._meta)[0]];
              const total = meta.total;
              const currentValue = dataset.data[tooltipItem.index];
              const percentage = parseFloat((currentValue / total * 100).toFixed(1));
              return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
      }
    });
  }
}
