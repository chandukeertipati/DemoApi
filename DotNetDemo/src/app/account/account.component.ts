import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {accountEnterLeaveAnimation} from './account.animations'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // animations:['accountEnterLeaveAnimation']
})
export class AccountComponent implements OnInit {
  constructor(private router:Router){}

  ngOnInit(): void {
  }

  editProfile() {
    // Implement edit profile logic here
  }

  changePassword() {
    // Implement change password logic here
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
