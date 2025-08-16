import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message = value.length > 0
          ? `There are ${value.length} trips available.`
          : 'There were no trips retrieved from the database';
        console.log(this.message);
      },
      error: (error: unknown) => {
        console.log('Error: ' + error);
      }
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
