import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  // OnPush: aquest component no té Inputs ni signals reactius, però seguim
  // la mateixa estratègia a tot l'app per coherència i bons hàbits.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  router = inject(Router);

    goBack() {
    this.router.navigate(['/books']);
  }
}
