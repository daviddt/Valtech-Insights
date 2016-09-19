import { Injectable } from '@angular/core';

import { Team } from './team/team';

@Injectable()
export class OverPlannedService {
  teams: Array<Team> = [];
  amountOfWeeks: number;
  selectedExpertiseId: number;

  updateSelectedExpertise(expertiseId: number): void {
    this.selectedExpertiseId = expertiseId;
  }

  updateAmountOfWeeks(amountOfWeeks: number):void  {
    this.amountOfWeeks = amountOfWeeks;
  }

  getAmountOfWeeks(): number {
    return this.amountOfWeeks;
  }

  getSelectedExpertise(): number {
    return this.selectedExpertiseId;
  }

  getSelectedTeams(): Array<Team> {
    return this.teams.filter(team => team.selected);
  }
}