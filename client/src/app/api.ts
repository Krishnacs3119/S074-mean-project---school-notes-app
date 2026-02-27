import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://school-notes-api.onrender.com/api';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  getNotes(role: string, email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes?role=${role}&email=${email}`);
  }

  addNote(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes`, data);
  }

  updateNote(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/notes/${id}`, data);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notes/${id}`);
  }
}