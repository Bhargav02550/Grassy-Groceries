import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UploadService } from '../upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationBuilder } from '@angular/animations';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogActions, MatDialogModule],
  selector: 'app-login-dialog',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(
    private loginService: UploadService,
    public dialogRef: MatDialogRef<LoginPageComponent>
  ) {}

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (result) => {
        if (result) {
          this.dialogRef.close();
          this.loginService.isloggedin = true;
          this.loginService.username = result.data;
          this.loginService.setUsername(result.data);
          this.loginService.setLoginStatus(true);
        } else {
          console.log('Login failed');
        }
      },
      (error) => {
        // Handle error
        console.error('Error occurred during login:', error);
        // Optionally, display an error message to the user
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
