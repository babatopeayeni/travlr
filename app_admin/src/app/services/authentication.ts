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
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(tap(r => this.saveToken(r.token)));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, { name, email, password })
      .pipe(tap(r => this.saveToken(r.token)));
  }

  saveToken(token: string) { localStorage.setItem(this.key, token); }
  getToken(): string | null { return localStorage.getItem(this.key); }
  logout(): void { localStorage.removeItem(this.key); }
  isLoggedIn(): boolean { return !!this.getToken(); }
}
