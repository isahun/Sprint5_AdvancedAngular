import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  // OnPush: Angular només comprova canvis quan un Input canvia, es dispara un event
  // del component o es fa un detectChanges() manual. Millora el rendiment evitant
  // comprovacions innecessàries del template.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
