  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, map } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoginPageServiceService {
  
    // private baseUrl = 'https://localhost:7232/api';
  
    // constructor(private http: HttpClient) { }
  
    // login(credentials: any): Observable<any[]> {
    //   const url = `${this.baseUrl}/Login/credentials/all`; // Assuming API endpoint for all users
    //   return this.http.post<any[]>(url, credentials);
    // }
    private apiUrl = 'https://localhost:7232/api/Register';

  constructor(private http: HttpClient) {}

  // Create a method to get all login credentials
  getAllLogins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Create a method to check if the provided email and password are valid
  validateLogin(email: string, password: string): Observable<boolean> {
    return this.getAllLogins().pipe(
      map((users: any[]) => {
        // Check if there is a user with the provided email and password in the API response
        return users.some(user => user.email === email && user.password === password);
      })
    );
  }

  }
  

