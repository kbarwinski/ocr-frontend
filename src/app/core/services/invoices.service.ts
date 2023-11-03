import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { baseUrl } from './constants/baseurl';

const url = baseUrl + '/invoices';
const headers = new HttpHeaders().set('Accept', 'text/plain');

export interface GetInvoicesListQuery {
  [key: string]: any;
  page: number;
  pageSize: number;
  sortingOrders: string;
  totalCount: number;
  startDate: Date | null;
  endDate: Date | null;
  isScanned: boolean | null;
  isParsed: boolean | null;
  isApproved: boolean | null;
}

export interface InvoiceDto {
  id: string;
  name: string;
  details: Details[];

  isScanned: boolean;
  isParsed: boolean;
  isApproved: boolean;
}

export interface FullInvoiceDto {
  id: string;
  name: string;
  details: Details[];
  fileData: any[] | null;
  fileType: number;

  isScanned: boolean;
  isParsed: boolean;
  isApproved: boolean;
}

export interface Details {
  name: string;
  value: string;
  certainty: number;
}

export interface InvoiceUpdateModel {
  name: string;
  isScanned: boolean;
  isParsed: boolean;
  isApproved: boolean;
}

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  constructor(
    private readonly http: HttpClient,
    private readonly authInterceptor: AuthInterceptor
  ) {}

  getPage(request: GetInvoicesListQuery): Observable<any> {
    return this.http.get(url, {
      headers: headers,
      params: new HttpParams()
        .set('page', request.page.toString())
        .set('pageSize', request.pageSize.toString())
        .set('sortingOrders', request.sortingOrders)
        .set('start', request.startDate ? request.startDate.toString() : '')
        .set('end', request.endDate ? request.endDate.toString() : '')
        .set('isScanned', request.isScanned ?? '')
        .set('isParsed', request.isParsed ?? '')
        .set('isApproved', request.isApproved ?? ''),
    });
  }

  get(id: string): Observable<any> {
    return this.http.get(url + '/' + id, { headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(url + '/' + id, { headers });
  }

  batchDelete(ids: string[]): Observable<any> {
    return this.http.request('DELETE', url, {
      body: ids,
      headers: headers,
    });
  }

  upload(files: FileList): Observable<any> {
    const formData = new FormData();
    if (files[0].name.includes('pdf')) formData.append('type', '1');
    else formData.append('type', '2');

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const headers = new HttpHeaders();
    headers.append('Accept', 'text/plain');

    return this.http.post(url, formData, { headers });
  }

  scan(id: string): Observable<any> {
    return this.http.post(url + '/' + id + '/scan', id, { headers });
  }

  batchScan(ids: string[]): Observable<any> {
    return this.http.post(url + '/batchscan', ids, { headers });
  }

  analyze(id: string): Observable<any> {
    return this.http.post(url + '/' + id + '/analyze', id, { headers });
  }

  batchAnalyze(ids: string[]): Observable<any> {
    return this.http.post(url + '/batchanalyze', ids, { headers });
  }

  update(id: string, model: InvoiceUpdateModel) {
    return this.http.put(url + '/' + id, model, { headers });
  }

  updateDetails(id: string, details: Details[]) {
    return this.http.put(url + '/' + id + '/details', details, { headers });
  }

  generateRandomInvoicePdf(): Observable<any> {
    return this.http.post(url + '/generate', null, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json',
    });
  }
}
