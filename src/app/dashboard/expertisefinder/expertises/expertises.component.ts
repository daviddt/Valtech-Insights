import { Component, OnInit } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { ExpertiseFinderService } from './../expertisefinder.service';

@Component({
  selector: 'expertises',
  templateUrl: 'expertises.component.html',
  styleUrls: [
    './expertises.component.css'
  ]
})
export class ExpertisesComponent implements OnInit {
  expertises: Array<Object>;

  constructor(private authHttp: AuthHttp, private expertiseFinderService: ExpertiseFinderService) { }

  updateSelectedExpertise(selectedExpertise: String) {
    this.expertiseFinderService.updateSelectedExpertise(Number(selectedExpertise));
  }

  ngOnInit() {
    this.authHttp.get('https://teamplanner.efocus.nl/services/expertises')
      .subscribe(
        response => {
          this.expertises = response.json();
        },
        error => {
          console.log(error);
        }
      )
  }
}