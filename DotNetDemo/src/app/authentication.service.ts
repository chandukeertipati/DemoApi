import { HttpClient } from '@angular/common/http';
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

  private baseUrl = 'https://localhost:7232/api';

  constructor(private http: HttpClient) { }

  createUser(userDetails: any): Observable<any> {
    const url = `${this.baseUrl}/Login`;
    return this.http.post(url, userDetails);
  }
}
