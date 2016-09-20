import { Component, OnInit, Input } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'teamview',
  templateUrl: 'team.component.html',
  styleUrls: [
    './team.component.css'
  ]
})
export class TeamViewComponent implements OnInit {
  @Input() team: any = {};
  selectedTeam: any;
  matchingPeopleFromTeam: any[];
  chartData: Array<any> = [];

  private labels = [1,2,3,4,5];

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

  constructor(private authHttp: AuthHttp) { }

  ngOnInit() {
    
    const chartData = convertDataToChartAbleObject(this.team.planningPerWeek, this.team.requiredAvailability);
    const labels = generateLabels(this.team.planningPerWeek.length);

    Object.assign(this, {
      chartData,
      labels
    })

    this.authHttp.get(`https://teamplanner.efocus.nl/services/teams/${this.team.teamId}`)
      .subscribe(response => {
        this.selectedTeam = response.json();
        this.matchingPeopleFromTeam = this.selectedTeam.members.filter((member: any) => {
          return member.person.expertise.id === this.team.requiredExpertise;
        })
        console.log(this.matchingPeopleFromTeam);
      })
  }

}

function convertDataToChartAbleObject (data: Array<any>, requiredAvailability: number) {
  const requiredAvailabilityArray: number[] = [];

  for (let i = 0; i < data.length; i++) {
    requiredAvailabilityArray.push(requiredAvailability);
  }

  return [{
    label: 'Required Availability',
    lineTension: 0,
    data: requiredAvailabilityArray
  }, {
    label: 'Time available',
    lineTension: 0,
    data: data
  }]
}

function generateLabels(amountOfWeeks: number) {
  const labels: Array<string> = [];

  for (let i = 0; i < amountOfWeeks; i++) {
    labels.push(`week ${i}`);
  };

  return labels;
}
