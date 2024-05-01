import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadService } from './upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CarouselSliderComponent } from './carousel-slider/carousel-slider.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, FormsModule, RouterOutlet, CommonModule, CarouselSliderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Grocery-App';
  itemName: string = '';
  itemPrice: number = 0;
  itemQuantity: number = 0;
  itemCategory: string = '';
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('itemName', this.itemName);
    formData.append('itemPrice', this.itemPrice.toString());
    formData.append('itemQuantity', this.itemQuantity.toString());
    formData.append('itemCategory', this.itemCategory);

    this.uploadService.uploadItem(formData).subscribe(
      (response) => {
        console.log('Item uploaded successfully:', response);
        // Reset form fields after successful upload
        this.itemName = '';
        this.itemPrice = 0;
        this.itemQuantity = 0;
        this.itemCategory = '';
        this.selectedFile = null;
        this.imageUrl = null;
        const fileInput = document.getElementById(
          'fileInput'
        ) as HTMLInputElement;
        fileInput.value = '';
      },
      (error) => {
        console.error('Error uploading item:', error);
      }
    );
  }
}
