import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private apiUrl = 'https://localhost:7232/api/Auth';

  // constructor(private http: HttpClient) { }

  // postLoginData(data: any) {
  //   return this.http.post(`${this.apiUrl}`, data);
  // }

  // postRegistrationData(data: any) {
  //   return this.http.post(`${this.apiUrl}`, data);
  // }

  private apiUrl = 'https://localhost:7232/api/Register'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    // Set up headers if needed
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Make the POST request to register a new user
    return this.http.post(this.apiUrl, userData, httpOptions);
  }
}
