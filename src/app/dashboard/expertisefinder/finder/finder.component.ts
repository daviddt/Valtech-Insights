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
  teams: Array<any> = [];
  
  constructor(private authHttp: AuthHttp, private expertiseFinderService: ExpertiseFinderService) { }

  findExpertises() {

    const concurrectRequests: any[] = [];
    const weekStart = this.expertiseFinderService.getWeekStart();
    const weekEnd = this.expertiseFinderService.getWeekEnd();
    const selectedExpertise = this.expertiseFinderService.getSelectedExpertise();
    const requiredAvailability = this.expertiseFinderService.getAvailability();

    this.loading = true;

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
                this.loading = false;
                const teamsWithAvailability = getTeamsWithAvailability(response, selectedExpertise, requiredAvailability);
                const teamWithRequiredAvailability = teamsWithAvailability.filter((team: any) => {
                  let meetsRequirement = true;

                  team.planningPerWeek.forEach((weeklyPlanning: number) => {
                    if (weeklyPlanning < team.requiredAvailability) meetsRequirement = false;
                  })

                  return meetsRequirement;
                });

                this.teams = teamWithRequiredAvailability;
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

function getTeamsWithAvailability(teams: Array<Object>, expertiseId: number, availability: number) {
  const returnObj: any[] = [];

  teams.forEach((team: any) => {

    const planningPerWeek: Array<any> = [];
    const teamObj = { teamId: team.teams[0].teamId, requiredExpertise: expertiseId, requiredAvailability: availability, planningPerWeek };

    const meetRequirements = true;
    const currentTeam: any = team.teams[0];

    for (let i = 0; i < currentTeam.weeks.length; i++) {

      const weekObj: any = {};

      let totalExpertiseAvailability = 0;
      let totalHoursPlanendForExpertise = 0;

      let selectedExpertisesInTeam = currentTeam.weeks[i].availability.filter((expertise: any) => {
        return expertise.expertiseId === expertiseId
      });

      currentTeam.weeks[i].projects.forEach((project: any) => {
        project.planning.forEach((planning: any) => {
          if (planning.expertiseId === expertiseId) totalHoursPlanendForExpertise += planning.planning;
        });
      });

      if (selectedExpertisesInTeam.length) {
        selectedExpertisesInTeam.forEach((expertise: any) => {
          totalExpertiseAvailability += expertise.availability;
        })
      };

      teamObj.planningPerWeek.push(totalExpertiseAvailability - totalHoursPlanendForExpertise);

    }

    returnObj.push(teamObj);

  });

  return returnObj;
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