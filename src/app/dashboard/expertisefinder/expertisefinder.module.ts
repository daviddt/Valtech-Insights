import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ExpertiseFinderComponent }   from './expertisefinder.component';
// import { TeamsComponent } from './teams/teams.component';
import { ExpertisesComponent } from './expertises/expertises.component';
import { WeeksComponent } from './weeks/weeks.component';
// import { GraphComponent } from './graph/graph.component';
// import { LineChartComponent } from './graph/linechart/linechart.component';

import { ExpertiseFinderService } from './expertisefinder.service';

// import { SortPipe } from './../../common/pipes/sort';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [],
  declarations: [
    ExpertiseFinderComponent,
    WeeksComponent,
    // SortPipe,
    // InsightsComponent,
    // TeamsComponent,
    ExpertisesComponent,
    // GraphComponent,
    // LineChartComponent,
    // WeeksComponent
  ],
  providers: [
    ExpertiseFinderService
  ],
})
export class ExpertiseFinderModule { }
