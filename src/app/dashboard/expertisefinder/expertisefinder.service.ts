import { Injectable } from '@angular/core';

@Injectable()
export class ExpertiseFinderService {
  weekStart: number;
  weekEnd: number;
  selectedExpertiseId: number;

  updateSelectedExpertise(expertiseId: number): void {
    this.selectedExpertiseId = expertiseId;
  }

  updateWeekStart(start: number):void  {
    this.weekStart = start;
  }

  updateWeeksEnd(end: number):void  {
    this.weekEnd = end;
  }

  getWeekEnd(): number {
    return this.weekEnd;
  }

  getWeekStart(): number {
    return this.weekStart;
  }

  getSelectedExpertise(): number {
    return this.selectedExpertiseId;
  }
}