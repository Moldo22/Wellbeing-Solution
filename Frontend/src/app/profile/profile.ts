import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
ngAfterViewInit(): void {
  fetch('http://127.0.0.1:8000/api/profile')
    .then(raspuns => raspuns.json())
    .then(date => {
      console.log('Date aduse cu succes din Django:', date);
    })
    .catch(err => console.error('Serverul Django este oprit sau are erori:', err));
}

}