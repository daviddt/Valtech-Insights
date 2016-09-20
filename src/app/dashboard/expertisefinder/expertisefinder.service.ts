import { Injectable } from '@angular/core';

@Injectable()
export class ExpertiseFinderService {
  weekStart: number = 0;
  weekEnd: number = 1;
  availability: number = 0.5;
  selectedExpertiseId: number;

  updateSelectedExpertise(expertiseId: number): void {
    this.selectedExpertiseId = expertiseId;
  }

  updateWeekStart(start: number):void  {
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