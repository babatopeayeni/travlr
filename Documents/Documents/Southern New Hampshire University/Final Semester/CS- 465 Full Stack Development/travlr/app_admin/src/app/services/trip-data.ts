import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  // If you use an Angular proxy, set this to '/api/trips'
  private readonly url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${encodeURIComponent(tripCode)}`);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  updateTrip(formData: Trip): Observable<{ message: string; data: Trip }> {
    // server updates by code in URL; keep body as full trip
    return this.http.put<{ message: string; data: Trip }>(
      `${this.url}/${encodeURIComponent(formData.code)}`,
      formData
    );
  }
}
