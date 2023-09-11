import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.css']
})
export class AuthenticationPageComponent implements OnInit {
 userForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      // Modify the form fields as needed for user registration
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.authService.registerUser(this.userForm.value)
        .subscribe(
          (response: any) => {
            if (response && typeof response === 'object') {
              console.log('User registration successful:', response);
            } else {
              // Handle non-JSON response (e.g., success message)
              console.log('Non-JSON response:', response);
            }
            // Reset the form
            this.userForm.reset();
          },
          (error) => {
            console.error('Error during user registration:', error);
          }
        );
    }
  }
  
  
}
