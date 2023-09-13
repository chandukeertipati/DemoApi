import { Component, OnInit } from '@angular/core';
import { ExpenseServiceService } from '../expense-service.service';
import {Expense}  from '../expense-input/expense-modal.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css']
})
export class ExpenseReportComponent implements OnInit {

  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseServiceService,private router:Router) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses as Expense[];
    });
  }
  goBack() {
    this.router.navigate(['/Navbar']); // Replace '/input' with the route to your input component
  }

}
