import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvUploadServiceService {

  private apiUrl = 'https://localhost:7232/api/ExpenseCsvUpload/UploadFile';
  private apiUrl1 = 'https://localhost:7232/api/ExpenseCsvUpload/GetExpenses';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData);
  }
  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl1);
  }

}
