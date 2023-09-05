  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoginPageServiceService {
  
    private baseUrl = 'https://localhost:7232/api';
  
    constructor(private http: HttpClient) { }
  
    login(credentials: any): Observable<any[]> {
      const url = `${this.baseUrl}/Login/credentials/all`; // Assuming API endpoint for all users
      return this.http.post<any[]>(url, credentials);
    }
  }
  

