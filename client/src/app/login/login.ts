import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api';   // 👈 IMPORT THIS

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  role = 'student';
  isRegistering = false;

  constructor(private apiService: ApiService, private router: Router) {}

  authenticate() {

    if (this.isRegistering) {
      const user = {
        email: this.email,
        password: this.password,
        role: this.role
      };

      this.apiService.register(user).subscribe({
        next: () => {
          alert('Registered! Now please login.');
          this.isRegistering = false;
        },
        error: () => alert('Error registering')
      });

    } else {
      const credentials = {
        email: this.email,
        password: this.password
      };

      this.apiService.login(credentials).subscribe({
        next: (res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/notes']);
        },
        error: () => alert('Invalid credentials')
      });
    }
  }
}
