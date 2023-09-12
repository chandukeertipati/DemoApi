import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseServiceService {

   private apiUrl = 'https://localhost:7232/api/Expense';

  constructor(private http: HttpClient) {}

  addExpense(expenseData: any) {
    return this.http.post(this.apiUrl, expenseData);
  }

  getExpenses() {
    return this.http.get(this.apiUrl);
  }

}
