import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { RouterModule } from '@angular/router';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { PracticeComponent } from './practice/practice.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthenticationPageComponent,
    CsvUploadComponent,
    PracticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
