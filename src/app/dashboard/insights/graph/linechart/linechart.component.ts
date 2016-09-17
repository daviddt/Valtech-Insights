import { Component, Input } from '@angular/core';


@Component({
  selector: 'linechart',
  templateUrl: 'linechart.component.html'
})
export class LineChartComponent {
  @Input() chartData: Array<any> = [];

  private labels = [
    'Week 1',
    'Week 2',
    'Week 3',
    'Week 4',
    'Week 5',
    'Week 6',
    'Week 7',
    'Week 8',
    'Week 9',
    'Week 10',
    'Week 11',
    'Week 12'
  ];

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