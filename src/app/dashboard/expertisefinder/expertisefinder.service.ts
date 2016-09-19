import { Injectable } from '@angular/core';

@Injectable()
export class ExpertiseFinderService {
  weekStart: number;
  weekEnd: number;
  availability: number;
  selectedExpertiseId: number;

  updateSelectedExpertise(expertiseId: number): void {
    this.selectedExpertiseId = expertiseId;
  }

  updateWeekStart(start: number):void  {
    console.log(start);
    this.weekStart = start;
  }

  updateWeekEnd(end: number):void  {
    this.weekEnd = end;
  }

  updateAvailability(days: number):void  {
    this.availability = days;
  }

  getAvailability(): number {
    return this.availability;
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