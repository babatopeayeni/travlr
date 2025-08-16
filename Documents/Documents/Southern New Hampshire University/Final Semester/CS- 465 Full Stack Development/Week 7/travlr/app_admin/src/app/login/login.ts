import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  formError = '';
  submitted = false;

  // bound to template via [(ngModel)]
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onLoginSubmit(): void {
    this.submitted = true;
    this.formError = '';

    const { name, email, password } = this.credentials;
    if (!name || !email || !password) {
      this.formError = 'All fields are required, please try again';
      return;
    }

    // service: login(email, password) -> Observable<{ token: string }>
    this.authenticationService.login(email, password).subscribe({
      next: () => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['/']); // go home after login
        }
      },
      error: (err) => {
        this.formError = 'Login failed. Please check your credentials.';
        console.error(err);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onLogout(): void {
    this.authenticationService.logout();
  }
}
