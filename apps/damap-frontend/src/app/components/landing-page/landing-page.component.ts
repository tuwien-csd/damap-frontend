import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatAnchor, MatIcon],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
