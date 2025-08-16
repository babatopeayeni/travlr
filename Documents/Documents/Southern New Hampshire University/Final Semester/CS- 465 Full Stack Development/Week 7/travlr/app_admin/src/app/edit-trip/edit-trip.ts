import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';   // keep your current filename
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
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

    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert('Something went wrong. Could not find tripCode.');
      this.router.navigate(['']);
      return;
    }
    this.editForm.patchValue({ code: tripCode });

    this.tripService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        const rec: Trip = Array.isArray(value) ? value[0] : value;
        if (!rec) { this.message = 'No trip retrieved.'; return; }
        const normalizedStart = this.toDateInput(rec.start);
        this.editForm.patchValue({ ...rec, start: normalizedStart });
        this.message = `Trip ${tripCode} retrieved`;
      },
      error: err => {
        console.log('Error loading trip:', err);
        this.message = 'Error loading trip';
      }
    });
  }

  private toDateInput(value: unknown): string | null {
    if (!value) return null;
    const d = new Date(value as any);
    if (isNaN(d.getTime())) return null;
    return formatDate(d, 'yyyy-MM-dd', 'en-US');
  }

  private toIsoUtc(dateStr: string): string {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, 0, 0, 0)).toISOString();
  }

  get f() { return this.editForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) return;

    const v = this.editForm.value as any;
    const payload: Trip = {
      ...v,
      start: typeof v.start === 'string' && v.start.length === 10
        ? this.toIsoUtc(v.start)
        : v.start,
      perPerson: typeof v.perPerson === 'string' ? Number(v.perPerson) : v.perPerson
    };

    // ✅ matches one-argument service method
    this.tripService.updateTrip(payload).subscribe({
      next: _ => this.router.navigate(['']),
      error: err => console.log('Error updating trip:', err)
    });
  }
}
