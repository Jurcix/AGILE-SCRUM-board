import { filter } from 'ramda';
import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';

const backgroundColor = ['#66cdaa', '#c0eadc'];
const hoverBackgroundColor = ['#9cdfc8', '#d0faec'];
const chartLabels = ['Sugaištas laikas', 'Estimuotas laikas'];

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @Input() data: Number[];
  @Input() visualData: {
    backgroundColor: String[],
    hoverBackgroundColor: String[],
    chartLabels: String[]
  };
  @Input() sprintIndex;
  public chart;
  public dataExists = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
      this.chart = new Chart(`${this.sprintIndex}`, {
        type: 'doughnut',
        data: {
          labels: this.visualData.chartLabels,
          datasets: [{
            data: this.data,
            backgroundColor: this.visualData.backgroundColor,
            hoverBackgroundColor: this.visualData.hoverBackgroundColor
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
                return ' (' + percentage + '%)';
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          },
        }
      });
      this.dataExists = !!this.data.length;
      this.cdr.detectChanges();
  }
}
