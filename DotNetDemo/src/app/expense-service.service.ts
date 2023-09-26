import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from './expense-input/expense-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ExpenseServiceService {
  // [x: string]: any;
  

  //  private apiUrl = 'https://localhost:7232/api/Expense';

  // constructor(private http: HttpClient) {}

  // addExpense(expenseData: any) {
  //   return this.http.post(this.apiUrl, expenseData);
  // }

  // getExpenses() {
  //   return this.http.get(this.apiUrl);
  // }
  private apiUrl = 'https://localhost:7232/api/expenses';

  constructor(private http: HttpClient) {}

  // Create a new expense
  addExpense(expenseData: Expense): Observable<any> {
    return this.http.post(this.apiUrl, expenseData);
  }

  // Get all expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Get an expense by ID
  getExpenseById(id: number): Observable<Expense> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Expense>(url);
  }

  // Update an expense
  updateExpense(expenseData: Expense): Observable<any> {
    const url = `${this.apiUrl}/${expenseData.id}`;
    return this.http.put(url, expenseData);
  }

  // Delete an expense by ID
  deleteExpense(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
