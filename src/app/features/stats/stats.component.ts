import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { catchError } from 'rxjs';
import {
  GetStatisticsQuery,
  StatisticsDto,
  StatsService,
  TotalStatisticsResponse,
} from 'src/app/core/services/stats.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
})
export class StatsComponent implements OnInit {
  constructor(private statsService: StatsService) {}

  protected actionsCountData!: ChartData;
  protected actionsTotalTimeData!: ChartData;
  protected actionsAvgTimeData!: ChartData;

  protected detailsData!: ChartData;

  protected showTotal: boolean = false;

  protected totalActionsCountData!: ChartData;
  protected totalActionsTotalTimeData!: ChartData;
  protected totalActionsAvgTimeData!: ChartData;

  protected totalDetailsData!: ChartData;

  protected paginationArgs: GetStatisticsQuery = this.getFromLocalStorage(
    'statsArgs'
  ) ?? {
    page: 0,
    pageSize: 100000,
    sortingOrders: 'dateCreated asc',
    start: null,
    end: null,
  };

  public statsDateRange = new FormGroup({
    start: new FormControl<Date | null>(this.paginationArgs.start),
    end: new FormControl<Date | null>(this.paginationArgs.end),
  });

  saveToLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  clearDateRange() {
    this.statsDateRange.setValue({ start: null, end: null });
    this.paginationArgs.start = null;
    this.paginationArgs.end = null;

    this.saveToLocalStorage('statsArgs', this.paginationArgs);
    this.fetchStats();
  }

  toggleTotalView() {
    this.saveToLocalStorage('showTotal', this.showTotal);

    this.fetchStats();
  }

  fetchStats() {
    this.paginationArgs =
      this.getFromLocalStorage('statsArgs') ?? this.paginationArgs;

    this.showTotal = this.getFromLocalStorage('showTotal') ?? this.showTotal;

    if (this.showTotal) {
      this.statsService
        .getTotals({
          start: this.paginationArgs.start,
          end: this.paginationArgs.end,
        })
        .pipe(
          catchError((error) => {
            console.error('Failed to fetch statistics:', error);
            return [];
          })
        )
        .subscribe((response: any) => {
          let res: TotalStatisticsResponse = response;
          this.initializeTotalsData(res);
        });
    } else {
      this.statsService
        .getPage(this.paginationArgs)
        .pipe(
          catchError((error) => {
            console.error('Failed to fetch statistics:', error);
            return [];
          })
        )
        .subscribe((response: any) => {
          let res: StatisticsDto[] = response.result;
          this.initializeChartData(res);
        });
    }
  }

  ngOnInit() {
    this.statsDateRange.valueChanges.subscribe((value) => {
      if (value.start && value.end && this.statsDateRange.valid) {
        this.paginationArgs.start = value.start;
        this.paginationArgs.end = value.end;

        this.saveToLocalStorage('statsArgs', this.paginationArgs);
        this.fetchStats();
      }
    });

    this.fetchStats();
  }

  private roundToTwoDecimalPlaces(value: number): number {
    return Number(value.toFixed(2));
  }

  private formatDate(date: Date): string {
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  private initializeTotalsData(response: TotalStatisticsResponse) {
    let res = response.result;
    const dateLabel =
      this.formatDate(new Date(response.startDate)) +
      ' - ' +
      this.formatDate(new Date(response.endDate));

    this.totalActionsCountData = {
      labels: [dateLabel],
      datasets: [
        {
          label: 'Uploaded',
          data: [res.invoicesUploaded],
        },
        {
          label: 'Scanned',
          data: [res.invoicesScanned],
        },
        {
          label: 'Parsed',
          data: [res.invoicesParsed],
        },
      ],
    };

    this.totalActionsTotalTimeData = {
      labels: [dateLabel],
      datasets: [
        {
          label: 'Uploading',
          data: [res.totalUploadTime],
        },
        {
          label: 'Scanning',
          data: [res.totalScanTime],
        },
        {
          label: 'Parsing',
          data: [res.totalParsingTime],
        },
      ],
    };

    this.totalActionsAvgTimeData = {
      labels: [dateLabel],
      datasets: [
        {
          label: 'Uploading',
          data: [res.averageUploadTime],
        },
        {
          label: 'Scanning',
          data: [res.averageScanTime],
        },
        {
          label: 'Parsing',
          data: [res.averageParsingTime],
        },
      ],
    };

    this.totalDetailsData = {
      labels: [dateLabel],
      datasets: [
        {
          label: 'Parsed',
          data: [res.detailsParsed],
        },
        {
          label: 'Approved',
          data: [res.detailsApproved],
        },
        {
          label: 'Guessed',
          data: [res.detailsGuessed],
        },
        {
          label: 'Corrected',
          data: [res.detailsCorrected],
        },
      ],
    };
  }

  private initializeChartData(res: StatisticsDto[]) {
    const dateLabels = res.map((x) => this.formatDate(new Date(x.dateCreated)));

    const createDataset = (
      label: string,
      dataMapper: (x: StatisticsDto) => any,
      styles?: any
    ) => ({
      label,
      data: res.map(dataMapper),
      ...styles,
    });

    const rounded =
      (func: (x: StatisticsDto) => number) => (x: StatisticsDto) =>
        this.roundToTwoDecimalPlaces(func(x));

    const commonStyle: any = {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    };
    const chartStyles: any[] = [
      {
        ...commonStyle,
      },
      {
        ...commonStyle,
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
      },
      {
        ...commonStyle,
        backgroundColor: 'rgba(0,255,0,0.3)',
        borderColor: 'green',
      },
      {
        ...commonStyle,
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
      },
    ];

    this.actionsCountData = {
      labels: dateLabels,
      datasets: [
        createDataset('Uploaded', (x) => x.invoicesUploaded),
        createDataset('Scanned', (x) => x.invoicesScanned),
        createDataset('Parsed', (x) => x.invoicesParsed),
      ],
    };

    this.actionsTotalTimeData = {
      labels: dateLabels,
      datasets: [
        createDataset(
          'Uploading',
          rounded((x) => x.totalUploadTime)
        ),
        createDataset(
          'Scanning',
          rounded((x) => x.totalScanTime)
        ),
        createDataset(
          'Parsing',
          rounded((x) => x.totalParsingTime)
        ),
      ],
    };

    this.actionsAvgTimeData = {
      labels: dateLabels,
      datasets: [
        createDataset(
          'Uploading',
          rounded((x) => x.averageUploadTime)
        ),
        createDataset(
          'Scanning',
          rounded((x) => x.averageScanTime)
        ),
        createDataset(
          'Parsing',
          rounded((x) => x.averageParsingTime)
        ),
      ],
    };

    const detailsMapper = [
      {
        func: (x: StatisticsDto) => x.detailsParsed,
        label: 'Parsed',
        styles: chartStyles[0],
      },
      {
        func: (x: StatisticsDto) => x.detailsApproved,
        label: 'Approved',
        styles: chartStyles[1],
      },
      {
        func: (x: StatisticsDto) => x.detailsGuessed,
        label: 'Guessed',
        styles: chartStyles[2],
      },
      {
        func: (x: StatisticsDto) => x.detailsCorrected,
        label: 'Corrected',
        styles: chartStyles[3],
      },
    ];

    this.detailsData = {
      labels: dateLabels,
      datasets: detailsMapper.map(({ func, label, styles }) =>
        createDataset(label, func, styles)
      ),
    };
  }
}
