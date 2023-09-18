import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.sass'],
})
export class ChartDialogComponent implements OnInit {
  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef,
    static: true,
  })
  private container!: ViewContainerRef;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { component: Component; chartData: any }
  ) {}

  ngOnInit() {
    this.loadComponent(this.data.component, this.data.chartData);
  }

  closeDialog() {}

  loadComponent(component: any, chartData: ChartData) {
    this.container.clear();

    const componentRef = this.container.createComponent(component);
    (componentRef.instance as any).shownData = chartData;
  }
}
