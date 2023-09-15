import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './constants/baseurl';

const url = baseUrl + '/statistics';
const headers = new HttpHeaders().set('Accept', 'text/plain');

export interface GetStatisticsQuery {
  page: number;
  pageSize: number;
  sortingOrders: string;
  start: Date | null;
  end: Date | null;
}

export interface GetTotalStatisticsQuery {
  start: Date | null;
  end: Date | null;
}

export interface TotalStatisticsResponse {
  result: StatisticsDto;
  startDate: Date;
  endDate: Date;
}

export interface StatisticsDto {
  dateCreated: string;
  invoicesUploaded: number;
  totalUploadTime: number;
  averageUploadTime: number;
  invoicesScanned: number;
  totalScanTime: number;
  averageScanTime: number;
  totalScanCertainty: number;
  averageScanCertainty: number;
  invoicesParsed: number;
  detailsParsed: number;
  totalParsingTime: number;
  averageParsingTime: number;
  totalParsingCertainty: number;
  averageParsingCertainty: number;
  invoicesApproved: number;
  detailsApproved: number;
  detailsGuessed: number;
  detailsCorrected: number;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  constructor(private readonly http: HttpClient) {}

  getPage(request: GetStatisticsQuery): Observable<any> {
    return this.http.get(url, {
      headers: headers,
      params: new HttpParams()
        .set('page', request.page.toString())
        .set('pageSize', request.pageSize.toString())
        .set('sortingOrders', request.sortingOrders)
        .set('start', request.start ? request.start.toString() : '')
        .set('end', request.end ? request.end.toString() : ''),
    });
  }

  getTotals(request: GetTotalStatisticsQuery): Observable<any> {
    return this.http.get(url + '/total', {
      headers: headers,
      params: new HttpParams()
        .set('start', request.start ? request.start.toString() : '')
        .set('end', request.end ? request.end.toString() : ''),
    });
  }
}
