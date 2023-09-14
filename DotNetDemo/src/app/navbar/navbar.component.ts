import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showCalculator: boolean = false; // Initialize as hidden

  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  toggleCalculator() {
    this.showCalculator = !this.showCalculator; // Toggle the flag
  }
}
