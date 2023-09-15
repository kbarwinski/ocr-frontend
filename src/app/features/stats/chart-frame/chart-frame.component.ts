import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDialogComponent } from '../chart-dialog/chart-dialog.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

const chartsMap = {
  bar: BarChartComponent,
  line: LineChartComponent,
  pie: PieChartComponent,
};

@Component({
  selector: 'app-chart-frame',
  templateUrl: './chart-frame.component.html',
  styleUrls: ['./chart-frame.component.sass'],
})
export class ChartFrameComponent implements OnInit {
  @Input() title!: string;
  @Input() chartData!: any;
  @Input() chartType!: 'bar' | 'line' | 'pie';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openFullScreen() {
    this.dialog.closeAll();

    this.dialog.open(ChartDialogComponent, {
      panelClass: 'chart-dialog',
      hasBackdrop: false,
      data: {
        component: chartsMap[this.chartType],
        chartData: this.chartData,
      },
    });
  }
}
