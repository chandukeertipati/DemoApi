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

  constructor(private fb: FormBuilder, private userService: AuthenticationService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value)
        .subscribe(
          response => {
            // Check if the response is valid JSON
            if (response && typeof response === 'object') {
              console.log('User created:', response);
            } else {
              // Handle non-JSON response (e.g., success message)
              console.log('Non-JSON response:', response);
            }
            // Reset the form
            this.userForm.reset();
          },
          error => {
            console.error('Error creating user:', error);
          }
        );
    }
  }
  
}
