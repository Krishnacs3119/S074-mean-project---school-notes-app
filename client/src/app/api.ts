import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Yeh aapka live Render backend URL hai
  private baseUrl = 'https://school-notes-api.onrender.com/api';

  constructor(private http: HttpClient) { }

  // Register function ko live URL par bhejne ke liye
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // Login function ko live URL par bhejne ke liye
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}