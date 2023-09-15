import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { ChartFrameComponent } from './chart-frame/chart-frame.component';

@NgModule({
  declarations: [
    StatsComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    ChartDialogComponent,
    ChartFrameComponent,
  ],
  imports: [SharedModule, NgChartsModule, StatsRoutingModule],
})
export class StatsModule {}
