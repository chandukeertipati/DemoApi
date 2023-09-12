import { Component, OnInit } from '@angular/core';
import { ExpenseServiceService } from '../expense-service.service';
import {Expense}  from '../expense-input/expense-modal.component'
@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {

  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseServiceService) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses as Expense[];
    });
  }

}
