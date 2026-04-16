import { Component, inject, ChangeDetectionStrategy  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFound {
  router = inject(Router);

    goBack() {
    this.router.navigate(['/books']);
  }
}
