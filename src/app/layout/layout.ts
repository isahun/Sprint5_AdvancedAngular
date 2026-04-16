import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  // OnPush al Layout: tot i que és un component estàtic (sense Inputs ni signals),
  // aplicar OnPush globalment és una bona pràctica que millora el rendiment general.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}
