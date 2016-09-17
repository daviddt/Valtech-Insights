import { Component, OnInit } from '@angular/core';

import { InsightsService } from './../insights.service';

@Component({
  selector: 'weeks',
  templateUrl: 'weeks.component.html'
})
export class WeeksComponent implements OnInit {
  weeks: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  constructor(private insightsService: InsightsService) { }

  updateAmountOfWeeks(selectedWeek: String) {
    this.insightsService.updateAmountOfWeeks(Number(selectedWeek));
  }

  ngOnInit() {}
}