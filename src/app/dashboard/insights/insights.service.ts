import { Injectable } from '@angular/core';

import { Team } from './team/team';

@Injectable()
export class InsightsService {
  teams: Array<Team> = [];
  selectedExpertiseId: number;

  updateSelectedExpertise(expertiseId: number) {
    this.selectedExpertiseId = expertiseId;
    console.log(this);
  }

  getSelectedExpertise(): number {
    return this.selectedExpertiseId;
  }

  getSelectedTeams(): Array<Team> {
    return this.teams.filter(team => team.selected);
  }
}