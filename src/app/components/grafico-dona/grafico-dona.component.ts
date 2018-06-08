import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input('chartData') public doughnutChartData: number[];
  @Input('chartLabels') public doughnutChartLabels: string[];
  @Input('chartType') public doughnutChartType: string;
  @Input() leyenda: string;
  // Doughnut
  /*public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';*/

  constructor() { }

  ngOnInit() {

  }

}
