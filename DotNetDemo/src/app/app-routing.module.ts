import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

const routes: Routes = [
  { path: '', component: AuthenticationPageComponent },
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: 'login', component: LoginPageComponent },
  {path:'csvUpload',component:CsvUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
