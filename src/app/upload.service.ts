import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadItem(formData: FormData) {
    return this.http.post<any>('http://localhost:5000/upload', formData);
  }
}
