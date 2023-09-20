import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { ExpenseInputComponent } from './expense-input/expense-input.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', component: AuthenticationPageComponent },
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'csvUpload', component: CsvUploadComponent },
  { path: 'expenseInput', component: ExpenseInputComponent },
  { path: 'expenseReport', component: ExpenseReportComponent },
  { path: 'Navbar', component: NavbarComponent },
  { path: 'Calculator', component: CalculatorComponent },
  { path: 'Account', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
