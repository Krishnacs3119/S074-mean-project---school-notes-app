import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username = '';
  password = '';
  role = 'student';
  isRegistering = false;

  constructor(private apiService: ApiService, private router: Router) {}

  authenticate() {

    if (this.isRegistering) {

      const user = {
        username: this.username,
        password: this.password,
        role: this.role
      };

      this.apiService.register(user).subscribe({
        next: () => {
          alert('Registered! Now login.');
          this.isRegistering = false;
        },
        error: () => alert('Error registering')
      });

    } else {

      const credentials = {
        username: this.username,
        password: this.password
      };

      this.apiService.login(credentials).subscribe({
        next: (res: any) => {

          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(res));

          this.router.navigate(['/notes']);
        },
        error: () => alert('Invalid credentials')
      });
    }
  }
}
