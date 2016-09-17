import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';

import { InsightsService } from './../insights.service';

@Component({
  selector: 'graph',
  templateUrl: 'graph.component.html',
  styleUrls: [
    './graph.component.css'
  ]
})
export class GraphComponent implements OnInit {
  chartData: Array<any>;
  loading: boolean = false;
  
  constructor(private authHttp: AuthHttp, private insightsService: InsightsService) { }

  generateGraph() {
    this.loading = true;
    const selectedTeams = this.insightsService.getSelectedTeams();
    const selectedExpertise = this.insightsService.getSelectedExpertise();

    const concurrectRequests = selectedTeams.map((team) => {
      return this.authHttp.get(`https://teamplanner.efocus.nl/services/planning/${team.id}?offset=0&limit=12`).map(res => res.json());
    });
    
    Observable.forkJoin(concurrectRequests)
      .subscribe(
        response => {
          const readAbleObject = convertDataToReadableObject(response, this.insightsService.selectedExpertiseId);
          const chartAbleObject = convertDataToChartAbleObject(readAbleObject);
          this.chartData = chartAbleObject;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      )
  }

  ngOnInit() { }
}



function convertDataToChartAbleObject (data: Array<any>) {
  return [{
    label: 'Availability',
    lineTension: 0,
    data: data.map(weeklyData => weeklyData.available)
  }, {
    label: 'Planned',
    lineTension: 0,
    data: data.map(weeklyData => weeklyData.planned)
  }]
}



function convertDataToReadableObject(planning: Array<any>, selectedExpertise: number) {

  const readAbleObject: Array<Object> = [];


  for (let i = 0; i < 12; i++) {

    const calculatedTimeForWeek = {
      available: 0,
      planned: 0
    };

    planning.forEach(teamPlanning => {
    
      const currentWeek = teamPlanning.teams[0].weeks[i];

      const expertise: any = currentWeek.availability.find((expertise: any) => {
        return expertise.expertiseId === selectedExpertise;
      });

      let totalHoursPlannedForThisWeek = 0;

      currentWeek.projects.forEach((project: any) => {
        project.planning.forEach((projectPlanning: any) => {
          if (projectPlanning.expertiseId === selectedExpertise) {
            totalHoursPlannedForThisWeek += projectPlanning.planning;
          }
        })
      })

      calculatedTimeForWeek.available += expertise ? expertise.availability : 0;
      calculatedTimeForWeek.planned += totalHoursPlannedForThisWeek;

    })

    readAbleObject.push(calculatedTimeForWeek);

  }

  return readAbleObject;
};