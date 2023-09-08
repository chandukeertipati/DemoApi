import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageServiceService } from '../login-page-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: LoginPageServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password)
        .subscribe(
          (response: any) => {
            if (response && response.length > 0) {
              console.log('Login successful:', response);
              this.users = response;
              this.loginForm.reset();
              this.errorMessage = '';
              // Redirect to another page or perform actions after successful login
              // this.router.navigate(['/dashboard']); // Example: Navigate to the dashboard page
            } else {
              console.error('Login failed: No users found');
              this.errorMessage = 'Invalid email or password. Please try again.';
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
