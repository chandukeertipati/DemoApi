import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
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
  uploadedData: any[] = [];

  constructor(private csvUploadService: CsvUploadServiceService, private router: Router, private renderer: Renderer2) { }
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
        this.showAlertAndReset();
        // alert("CSV Uploaded Successfully")
        console.log("successfully submitted")
      },
      (error) => {
        this.uploadSuccess = false;
        this.uploadMessage = 'Error uploading CSV file.';
      }
    );
  }
  showAlertAndReset(): void {
    alert('CSV Uploaded Successfully');
    // Reset the form fields and message
    this.selectedFile = null;
    this.uploadSuccess = false;
    this.uploadMessage = '';

    // Reset the file input field (if needed)
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      this.renderer.setProperty(fileInput, 'value', '');
    }
  }

  // getAllUploadedData(): void {
  //   this.csvUploadService.getAllExpenses().subscribe(
  //     (data) => {
  //       this.uploadedData = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching uploaded data:', error);
  //     }
  //   );
  // }

  getAllData(): void {
    this.csvUploadService.getAllExpenses().subscribe(
      (data) => {
        console.log('API response data:', data);
        this.uploadedData = data;
      },
      (error) => {
        console.error('Error fetching uploaded data:', error);
      }
    );
  }
  


  

  goBack() {
    this.router.navigate(['/Navbar']); // Replace '/input' with the route to your input component
  }
}
