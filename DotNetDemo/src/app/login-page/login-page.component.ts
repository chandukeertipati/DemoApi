import { Component, OnInit } from '@angular/core';
import { LoginPageServiceService } from '../login-page-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  users: any[] = []; // Array to store user information

  constructor(private fb: FormBuilder, private authService: LoginPageServiceService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(
          users => {
            if (users && users.length > 0) {
              console.log('Login successful:', users);
              this.users = users; // Store the user information
              this.loginForm.reset();
              this.errorMessage = ''; // Clear any previous error messages
            } else {
              console.error('Login failed: No users found');
              this.errorMessage = 'Invalid email or password. Please try again.'; // Display error message
            }
          },
          error => {
            console.error('Login failed:', error);
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        );
    }
  }
}

  