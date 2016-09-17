import { Component, Input } from '@angular/core';


@Component({
  selector: 'linechart',
  templateUrl: 'linechart.component.html'
})
export class LineChartComponent {
  @Input() chartData: Array<any> = [];
  @Input() labels: Array<any> = [];

  private options = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    
                beginAtZero: true  
            }
        }]
    }
  }
}