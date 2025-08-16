import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTripComponent implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required]],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.addForm.invalid) return;

    this.tripService.addTrip(this.addForm.value).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => console.log('Error:', err)
    });
  }
}
