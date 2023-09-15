import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';
import { LandingComponent } from './features/landing/landing.component';
import { SidenavButtonComponent } from './core/layout/sidenav-button/sidenav-button.component';
import { UploadComponent } from './features/upload/upload.component';
import { SendComponent } from './features/send/send.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InvoiceListComponent } from './shared/invoice-list/invoice-list.component';
import { UploadFormComponent } from './features/upload/upload-form/upload-form.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './features/details/details.component';
import { SnackBarComponent } from './core/layout/loading-snackbar/loading-snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StatsComponent } from './features/stats/stats.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './features/stats/bar-chart/bar-chart.component';
import { PieChartComponent } from './features/stats/pie-chart/pie-chart.component';
import { LineChartComponent } from './features/stats/line-chart/line-chart.component';
import { ChartDialogComponent } from './features/stats/chart-dialog/chart-dialog.component';
import { ChartFrameComponent } from './features/stats/chart-frame/chart-frame.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoginDialogComponent } from './features/account/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './features/account/registration-dialog/registration-dialog.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SidenavButtonComponent,
    UploadComponent,
    SendComponent,
    SnackBarComponent,
    UploadFormComponent,
    LoginDialogComponent,
    RegistrationDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
