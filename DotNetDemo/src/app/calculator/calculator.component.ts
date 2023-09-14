import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  display: string = '';
  ngOnInit(): void {
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
   
    // Handle numeric keys, operators, and Enter for calculation
    if (/[\d.+\-*/%=]/.test(key)) {
      this.addToDisplay(key);
    } else if (key === 'Enter') {
      this.calculate();
    } else if (key === 'Escape') {
      this.clear();
    }
  }

  addToDisplay(value: string) {
    this.display += value;
  }

  calculate() {
    try {
      this.display = eval(this.display);
    } catch (error) {
      this.display = 'Error';
    }
  }

  clear() {
    this.display = '';
  }

}
