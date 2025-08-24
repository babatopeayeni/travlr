import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],   // <-- REMOVE TripListingComponent here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Travlr Getaways Admin';
}
