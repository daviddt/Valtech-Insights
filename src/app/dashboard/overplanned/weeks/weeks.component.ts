import { Component, OnInit } from '@angular/core';

import { OverPlannedService } from './../overplanned.service';

@Component({
  selector: 'weeks',
  templateUrl: 'weeks.component.html'
})
export class WeeksComponent implements OnInit {
  weeks: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private overplannedService: OverPlannedService) { }

  updateAmountOfWeeks(selectedWeek: String) {
    this.overplannedService.updateAmountOfWeeks(Number(selectedWeek));
  }

  ngOnInit() {}
}