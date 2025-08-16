import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Attach Authorization only for protected calls
  private authHeaders(): { headers?: HttpHeaders } {
    const token = this.storage.getItem('travlr-token');
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  // ---- Trips ----
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }

  addTrip(body: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, body, this.authHeaders());
  }

  // ✅ One-argument version used by your component
  updateTrip(payload: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.baseUrl}/trips/${payload.code}`,
      payload,
      this.authHeaders()
    );
  }
}
