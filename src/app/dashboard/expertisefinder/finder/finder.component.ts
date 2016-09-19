import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import * as moment from 'moment';

import { ExpertiseFinderService } from './../expertisefinder.service';

@Component({
  selector: 'finder',
  templateUrl: 'finder.component.html',
})
export class FinderComponent implements OnInit {
  loading: boolean = false;
  
  constructor(private authHttp: AuthHttp, private expertiseFinderService: ExpertiseFinderService) { }

  findExpertises() {

    const concurrectRequests: any[] = [];
    const weekStart = this.expertiseFinderService.getWeekStart();
    const weekEnd = this.expertiseFinderService.getWeekEnd();

    console.log(weekStart, weekEnd)

    this.authHttp.get('https://teamplanner.efocus.nl/services/teams')
    .subscribe(
      response => {
        response.json()
          .map((team: any) => {
            concurrectRequests.push(
              this.authHttp.get(`https://teamplanner.efocus.nl/services/planning/${team.id}?offset=${weekStart}&limit=${weekEnd - weekStart}`)
                .map(res => res.json())
            );
          });

          Observable.forkJoin(concurrectRequests)
            .subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.log(error);
              }
          )
      });
    // const selectedTeams = this.insightsService.getSelectedTeams();
    // const selectedExpertise = this.insightsService.getSelectedExpertise();
    // const amountOfWeeks = this.insightsService.getAmountOfWeeks();

    // if (!selectedTeams.length || !selectedExpertise) {
    //   return;
    // }

    // this.loading = true;

    // const concurrectRequests = selectedTeams.map((team) => {
    //   return this.authHttp.get(`https://teamplanner.efocus.nl/services/planning/${team.id}?offset=0&limit=${amountOfWeeks}`)
    //     .map(res => res.json());
    // });
    
    // Observable.forkJoin(concurrectRequests)
    //   .subscribe(
    //     response => {
    //       const chartData = convertDataToChartAbleObject(
    //         convertDataToReadableObject(
    //           response, 
    //           selectedExpertise, 
    //           amountOfWeeks
    //         )
    //       );

    //       const labels = generateLabels(amountOfWeeks);

    //       this.chartInformation = {
    //         chartData,
    //         labels
    //       }

    //       this.loading = false;
    //     },
    //     error => {
    //       console.log(error);
    //       this.loading = false;
    //     }
    //   )
  }

  ngOnInit() { }
}


// function generateLabels(amountOfWeeks: number) {
//   const labels: Array<string> = [];

//   for (let i = 0; i < amountOfWeeks; i++) {
//     labels.push(`Week ${moment().add(i, 'weeks').isoWeek()}`);
//   };

//   return labels;
// }


// function convertDataToChartAbleObject (data: Array<any>) {
//   return [{
//     label: 'Availability',
//     lineTension: 0,
//     data: data.map(weeklyData => weeklyData.available)
//   }, {
//     label: 'Planned',
//     lineTension: 0,
//     data: data.map(weeklyData => weeklyData.planned)
//   }]
// }



// function convertDataToReadableObject(planning: Array<any>, selectedExpertise: number, amountOfWeeks: number) {

//   const readAbleObject: Array<Object> = [];


//   for (let i = 0; i < amountOfWeeks; i++) {

//     const calculatedTimeForWeek = {
//       available: 0,
//       planned: 0
//     };

//     planning.forEach(teamPlanning => {
    
//       const currentWeek = teamPlanning.teams[0].weeks[i];

//       const expertise: any = currentWeek.availability.find((expertise: any) => {
//         return expertise.expertiseId === selectedExpertise;
//       });

//       let totalHoursPlannedForThisWeek = 0;

//       currentWeek.projects.forEach((project: any) => {
//         project.planning.forEach((projectPlanning: any) => {
//           if (projectPlanning.expertiseId === selectedExpertise) {
//             totalHoursPlannedForThisWeek += projectPlanning.planning;
//           }
//         })
//       })

//       calculatedTimeForWeek.available += expertise ? expertise.availability : 0;
//       calculatedTimeForWeek.planned += totalHoursPlannedForThisWeek;

//     })

//     readAbleObject.push(calculatedTimeForWeek);

//   }

//   return readAbleObject;
// };