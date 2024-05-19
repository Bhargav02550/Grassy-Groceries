import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadItem(formData: FormData) {
    return this.http.post<any>('http://localhost:5000/upload', formData);
  }
  getItemsbycat(catname: string) {
    return this.http.get<any>(`http://localhost:5000/getcat/${catname}`)
  }
  // login(username: string, password: string): Observable<boolean> {
  //   if (username === 'kumarpenke460@gmail.com' && password === 'Bhargav@025') {
  //     return of(true);
  //   } else {
  //     return of(false);
  //   }
  // }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/login', { email, password }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  setUsername(username: string) {
    this.username = username;
    document.cookie = `username=${username};`;
  }

  setLoginStatus(isLoggedIn: boolean) {
    this.isloggedin = isLoggedIn;
    document.cookie = `isloggedin=${isLoggedIn};`;
  }

  // Function to retrieve cookie value by name
  private getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  // Properties to hold username and login status
  isloggedin: boolean = false;
  username: string = '';

}
