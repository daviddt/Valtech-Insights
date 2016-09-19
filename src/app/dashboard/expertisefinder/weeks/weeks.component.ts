import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { ExpertiseFinderService } from './../expertisefinder.service';

@Component({
  selector: 'weeks',
  templateUrl: 'weeks.component.html'
})
export class WeeksComponent implements OnInit {
  weeks: Array<Object> = generateLabels(20);

  constructor(private expertiseFinderService: ExpertiseFinderService) { }

  updateWeekStart(week: String) {
    this.expertiseFinderService.updateWeekStart(Number(week));
  }

  updateWeekEnd(week: String) {
    this.expertiseFinderService.updateWeekStart(Number(week));
  }

  ngOnInit() {}
}

function generateLabels(amountOfWeeks: number): Object[] {
  const labels: Array<Object> = [];

  for (let i = 0; i < amountOfWeeks; i++) {
    labels.push({
      label: `Week ${moment().add(i, 'weeks').isoWeek()}`,
      value: i
    });
  };

  return labels;
}