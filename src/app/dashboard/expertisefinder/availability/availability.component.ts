import { Component, OnInit } from '@angular/core';

import { ExpertiseFinderService } from './../expertisefinder.service';

@Component({
  selector: 'availability',
  templateUrl: 'availability.component.html'
})
export class AvailabilityComponent implements OnInit {
  availability: number[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

  constructor(private expertiseFinderService: ExpertiseFinderService) { }

  updateAvailability(days: String) {
    this.expertiseFinderService.updateAvailability(Number(days));
  }

  ngOnInit() {}
}
