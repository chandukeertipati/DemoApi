import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CsvUploadServiceService } from '../csv-upload-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent implements OnInit {
  selectedFile: File | null = null;
  uploadSuccess = false;
  uploadMessage = '';

  constructor(private csvUploadService: CsvUploadServiceService,private router:Router) {}
  ngOnInit(): void {
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    this.csvUploadService.uploadFile(this.selectedFile).subscribe(
      (response) => {
        this.uploadSuccess = true;
        this.uploadMessage = 'CSV file uploaded successfully.';
      },
      (error) => {
        this.uploadSuccess = false;
        this.uploadMessage = 'Error uploading CSV file.';
      }
    );
  }
  goBack() {
    this.router.navigate(['/Navbar']); // Replace '/input' with the route to your input component
  }
}
