import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UploadService } from './upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CarouselSliderComponent } from './carousel-slider/carousel-slider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    RouterOutlet,
    CommonModule,
    CarouselSliderComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cartItemCount: number = 5;

  title = 'Grocery-App';
  itemName: string = '';
  itemPrice: number = 0;
  itemQuantity: number = 0;
  itemCategory: string = '';
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  user:string = '';
  // login: boolean = this.uploadService.isloggedin;

  constructor(
    private uploadService: UploadService,
    private dialog: MatDialog
  ) {}

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
  showlogin() {}
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginPageComponent, {
      width: '1000px',
      height: '500px',
      panelClass: '',
    });

    dialogRef.afterClosed().subscribe(() => {
      // console.log(this.login);
      // console.log('The login dialog was closed');
    });
  }

  login(): any {
    this.user = this.uploadService.username;
    // console.log(this.uploadService.username);
    return this.uploadService.isloggedin;
  }

}
