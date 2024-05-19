import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-addpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addpage.component.html',
  styleUrl: './addpage.component.css',
})
export class AddpageComponent {

  constructor(private uploadservice:UploadService,){
    
  }

  itemName:string = '';
  itemPrice:number  = 0;
  itemQuantity:number  = 0;
  itemDescription:string  = '';
  itemCategory:string  = '';
  itemLocation:string  = '';
  imageUrl: string = '';
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.imageUrl = URL.createObjectURL(this.selectedFile);
      console.log(this.imageUrl);
    }
  }
  changeImage() {
    this.selectedFile = null;
    this.imageUrl = '';
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('itemName', this.itemName);
    formData.append('itemPrice', this.itemPrice.toString());
    formData.append('itemQuantity', this.itemQuantity.toString());
    formData.append('itemCategory', this.itemCategory);
    formData.append('itemLocation',this.itemLocation);
    formData.append('itemDescription',this.itemDescription)


    this.uploadservice.uploadItem(formData).subscribe(
      (response) => {
        console.log('Item uploaded successfully:', response);
        // Reset form fields after successful upload
        this.itemName = '';
        this.itemPrice = 0;
        this.itemQuantity = 0;
        this.itemCategory = '';
        this.selectedFile = null;
        this.itemDescription= '';
        this.imageUrl = '';
        this.itemLocation = '';
      },
      (error) => {
        console.error('Error uploading item:', error);
      }
    );
  }


}
