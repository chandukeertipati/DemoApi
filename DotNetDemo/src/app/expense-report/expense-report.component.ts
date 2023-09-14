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

  // expenses: Expense[] = [];
  // selectedExpenseId: number | null = null;
  // selectedExpense: Expense | null = null; // Used for editing
  // isNewExpense: boolean = false;
  // constructor(private expenseService: ExpenseServiceService,private router:Router) {}

  // ngOnInit() {
  //   this.getExpenses();
  // }

  // getExpenses() {
  //   this.expenseService.getExpenses().subscribe((expenses) => {
  //     this.expenses = expenses as Expense[];
  //   });
  // }
  
  // goBack() {
  //   this.router.navigate(['/Navbar']); // Replace '/input' with the route to your input component
  // }
  expenses: Expense[] = [];
  selectedExpenseId: number | null = null;
  selectedExpense: Expense = new Expense(); // Initialize as an empty object
  isNewExpense: boolean = false;

  constructor(private expenseService: ExpenseServiceService,private router:Router) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses as Expense[];
    });
  }

  editExpense(expense: Expense) {
    this.selectedExpense = { ...expense };
    this.isNewExpense = false;
  }

  saveExpense() {
    if (this.isNewExpense) {
      this.expenseService.addExpense(this.selectedExpense).subscribe(() => {
        this.getExpenses();
        this.selectedExpense = new Expense(); // Reset to a new empty expense
        this.isNewExpense = false; // Reset to edit mode
      });
    } else {
      this.expenseService.updateExpense(this.selectedExpense).subscribe(() => {
        this.getExpenses();
        this.selectedExpense = new Expense(); // Reset to a new empty expense
      });
    }
  }

  cancelEdit() {
    this.selectedExpense = new Expense(); // Reset to a new empty expense
    this.isNewExpense = false;
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.getExpenses();
    });
  }

  getExpenseById() {
    if (this.selectedExpenseId !== null) {
      this.expenseService.getExpenseById(this.selectedExpenseId).subscribe((expense) => {
        this.selectedExpense = expense as Expense;
        this.isNewExpense = false;
      });
    }
  }

  createNewExpense() {
    this.selectedExpense = new Expense(); // Initialize a new empty expense
    this.isNewExpense = true;
  }

  goBack() {
      this.router.navigate(['/Navbar']); // Replace '/input' with the route to your input component
    }

  }
