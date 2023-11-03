import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';
import { SidenavButtonComponent } from './core/layout/sidenav-button/sidenav-button.component';
import { UploadComponent } from './features/upload/upload.component';
import { SendComponent } from './features/send/send.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UploadFormComponent } from './features/upload/upload-form/upload-form.component';
import { SnackBarComponent } from './core/layout/loading-snackbar/loading-snackbar.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoginDialogComponent } from './features/account/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './features/account/registration-dialog/registration-dialog.component';
import { SharedModule } from './shared/shared.module';
import { RngInvoiceButtonComponent } from './features/upload/rng-invoice-button/rng-invoice-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SidenavButtonComponent,
    UploadComponent,
    RngInvoiceButtonComponent,
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
