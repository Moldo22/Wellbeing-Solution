import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { NavigationService } from '../navigation-service';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(protected _nav: NavigationService) {}
}
