import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vegetables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vegetables.component.html',
  styleUrl: './vegetables.component.css',
})
export class VegetablesComponent {
  constructor(private loaditems: UploadService) {}

  items: any;

  ngOnInit(): void {
    // Call the service method to fetch items when the component initializes
    this.fetchItemsByCategory('Vegetables');
    // const imageData = this.getImageData(itemId);
  }

  fetchItemsByCategory(categoryName: string) {
    this.loaditems.getItemsbycat(categoryName).subscribe(
      (response) => {
        // Handle the response here
        this.items = response;
        console.log('Items:', response);
      },
      (error) => {
        console.error('Error fetching items:', error);
        // Optionally handle the error
      }
    );
  }

  decodeImage(imageData: any) {
    // Convert base64 encoded string to data URL
    return `data:image/jpeg;base64,${imageData}`;
  }

  getImageData(itemId: any) {
    const binaryData = [];
    binaryData.push(...itemId.data);
    console.log('binaryData', binaryData);
    const base64Image = btoa(String.fromCharCode.apply(null, binaryData));
    return 'data:image/jpeg;base64,' + base64Image;
  }
}
