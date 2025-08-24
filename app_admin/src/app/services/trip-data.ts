import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  // If you use an Angular proxy, set this to '/api/trips'
  private readonly url = 'http://localhost:3000/api/trips';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) {}

  // Build Authorization header when a token exists
  private authHeaders(): { headers?: HttpHeaders } {
    const token = this.auth.getToken();            // uses localStorage key from your service
    if (!token) return {};
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url, this.authHeaders());
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData, this.authHeaders());
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/${tripCode}`, this.authHeaders());
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData, this.authHeaders());
  }
}
