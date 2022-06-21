import { Component } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartData: ChartData<'pie'> = {
    labels: [
      'Đã hoàn tất',
      'Quá hạn',
    ],
    datasets: [{
      label: 'Biểu đồ tròn',
      data: [28.4, 71.6],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
      ],
      hoverOffset: 4
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Thống kê báo cáo',
      },
    },
  };
  constructor() { }
}
