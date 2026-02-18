import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Fixes *ngIf
import { FormsModule } from '@angular/forms';   // Fixes [(ngModel)]
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- This line is the KEY FIX!
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  role = 'student'; 
  isRegistering = false; 

  constructor(private http: HttpClient, private router: Router) {}

  authenticate() {
    if (this.isRegistering) {
      // REGISTER LOGIC
      const user = { username: this.username, password: this.password, role: this.role };
      this.http.post('http://localhost:3000/api/register', user).subscribe({
        next: (res) => {
          alert('Registered! Now please login.');
          this.isRegistering = false; 
        },
        error: (err) => alert('Error registering')
      });
    } else {
      // LOGIN LOGIC
      const credentials = { username: this.username, password: this.password };
      this.http.post('http://localhost:3000/api/login', credentials).subscribe({
        next: (res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/notes']);
        },
        error: (err) => alert('Invalid credentials')
      });
    }
  }
}