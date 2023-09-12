import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private apiUrl = 'https://localhost:7232/api/Register';

  constructor(private http: HttpClient) {}

  registerUser(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
