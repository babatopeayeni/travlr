import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse { token: string }

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly key = 'travlr-token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(tap(r => this.saveToken(r.token)));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, { name, email, password })
      .pipe(tap(r => this.saveToken(r.token)));
  }

  saveToken(token: string) { localStorage.setItem(this.key, token); }
  getToken(): string | null { return localStorage.getItem(this.key); }
  logout(): void { localStorage.removeItem(this.key); }

  // More robust than presence-only: verify token hasn't expired
  isLoggedIn(): boolean {
    const t = this.getToken();
    if (!t) return false;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      return typeof payload.exp === 'number' && payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Optional convenience if you want to show the user's name/email in the navbar
  getUser(): { name?: string; email?: string } | null {
    const t = this.getToken();
    if (!t) return null;
    try {
      const { name, email } = JSON.parse(atob(t.split('.')[1]));
      return { name, email };
    } catch {
      return null;
    }
  }
}
