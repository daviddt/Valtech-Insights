import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { InsightsService } from './../insights.service';

import { Team } from './../team/team';

@Component({
  selector: 'teams',
  templateUrl: 'teams.component.html',
  styleUrls: [
    './teams.css'
  ]
})
export class TeamsComponent implements OnInit {
  teams: Object;

  constructor(private authHttp: AuthHttp, private insightsService: InsightsService) {}

  toggleSelected(team: Team): void {
    team.selected = !team.selected;
  }

  selectAllTeams(): void {
    this.insightsService.teams.forEach(team => {
      team.selected = true;
    });
  }

  deSelectAllTeams(): void {
    this.insightsService.teams.forEach(team => {
      team.selected = false;
    });
  }

  ngOnInit() {
    this.authHttp.get('https://teamplanner.efocus.nl/services/teams')
      .subscribe(
        response => {
          this.insightsService.teams = response
            .json()
            .map((team: any) => {
              return new Team(team.id, team.name);
            });
        },
        error => {
          console.log(error);
        }
      )
  }
}