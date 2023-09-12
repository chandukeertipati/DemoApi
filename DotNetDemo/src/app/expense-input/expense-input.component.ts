import { Component, OnInit } from '@angular/core';
import { ExpenseServiceService } from '../expense-service.service';
import {Expense}  from '../expense-input/expense-modal.component'
@Component({
  selector: 'app-expense-input',
  templateUrl: './expense-input.component.html',
  styleUrls: ['./expense-input.component.css']
})
export class ExpenseInputComponent implements OnInit {

  

  
  expense: Expense = new Expense();

  constructor(private expenseService: ExpenseServiceService) {}
  ngOnInit(): void {
  }
  onSubmit() {
    this.expenseService.addExpense(this.expense).subscribe(() => {
      // Clear the form fields after adding an expense
      this.expense = new Expense();
    });
  }


}
