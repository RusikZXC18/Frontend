import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(): void {
    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        alert('Реєстрація успішна!');
        this.router.navigate(['/login']);
      },
      error: () => alert('Помилка реєстрації')
    });
  }
}
