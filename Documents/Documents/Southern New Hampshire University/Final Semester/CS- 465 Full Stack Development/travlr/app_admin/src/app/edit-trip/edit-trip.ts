// src/app/edit-trip/edit-trip.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data'; // use '../services/trip-data.service' if that's your filename
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  trip!: Trip;
  message = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    // build form
    this.editForm = this.fb.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    // get stashed code and load record
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something went wrong. Could not find tripCode.");
      this.router.navigate(['']);
      return;
    }

    // preset code field before fetch
    this.editForm.patchValue({ code: tripCode });

    this.tripService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        // supports either Trip or Trip[]
        const rec: Trip = Array.isArray(value) ? value[0] : value;
        if (!rec) {
          this.message = 'No trip retrieved.';
          return;
        }
        this.trip = rec;
        this.editForm.patchValue(rec);
        this.message = `Trip ${tripCode} retrieved`;
      },
      error: err => {
        console.log('Error loading trip:', err);
        this.message = 'Error loading trip';
      }
    });
  }

  get f() { return this.editForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) return;

    this.tripService.updateTrip(this.editForm.value as Trip).subscribe({
      next: _ => this.router.navigate(['']),
      error: err => console.log('Error updating trip:', err)
    });
  }
}
