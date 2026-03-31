import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private _router: Router) {}

  public goHome() {
    this._router.navigateByUrl('/home').catch((error) => console.log(error));
  }
}
