import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.css']
})
export class AuthenticationPageComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: AuthenticationService,private router:Router
  ) {}
  ngOnInit(): void {
    
 
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.passwordMatchValidator // Add the custom validator
    });

  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.registrationService.registerUser(formData)
        .subscribe(
          (response) => {
            console.log('Registration successful', response);
            alert("login successfull!")
            this.userForm.reset();
            this.router.navigate(['login']);
          },
          (error) => {
            console.error('Registration error', error);
          }
        );
    }
  }
  passwordMatchValidator(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword || password.value === confirmPassword.value) {
      return null; // Passwords match
    } else {
      return { passwordMismatch: true }; // Passwords don't match
    }
  }
  }

