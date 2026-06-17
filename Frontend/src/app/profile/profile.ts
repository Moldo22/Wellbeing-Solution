import { Component,ChangeDetectorRef  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(private cdr: ChangeDetectorRef, private router:Router) {}

  token = localStorage.getItem('accessToken');

  user = {
  id: "",
  first_name:"",
  last_name:"",
  email:"",
  city: "",
  country: "",
  bio: "",
  date_of_birth: "",
  phone_number: "",
  favorite_sports: [],
  skill_level: "",
  events_created: 0,
  events_joined: 0,
  feedback: [] as any[],
  upcoming_events: [] as any[],
  past_events: [] as any[]
};

participants: {
  id: number;
  name: string;
  rating?: number;
  comment?: string;
}[] = [];

selectedEvent: any = null;
showReviewDialog = false;

 toastMessage: string = '';
showToastVisible = false; 

ngOnInit(): void {
  this.loadUserProfile();
  this.loadUserEvents();
  
  
}

  loadUserProfile() {
      fetch('http://127.0.0.1:8000/api/users/profile/', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(' User profile:', data);
          this.user.id = data.id,
          this.user.first_name = data.first_name;
          this.user.last_name = data.last_name;
          this.user.email = data.email;
          this.user.city = data.city;
          this.user.country = data.country;
          this.user.bio = data.bio;
          this.user.date_of_birth = data.date_of_birth;
          this.user.phone_number = data.phone_number;
          this.user.favorite_sports = data.favorite_sports;
          this.user.skill_level = data.skill_level;
          this.cdr.detectChanges();

        });
    }

    loadUserEvents() {
  fetch('http://127.0.0.1:8000/api/events/profile/', {
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  })
    .then(res => res.json())
    .then(data => {

      this.user.events_created = data.events_created;
      this.user.events_joined = data.events_joined;

      this.user.upcoming_events = data.upcoming_events;
      this.user.past_events = data.past_events;

      this.user.upcoming_events = this.user.upcoming_events.map((event: any) => {
        return {
          ...event,
          start_time: new Date(event.start_time).toISOString().slice(0, 16).replace('T', ' ')
        };
      });
      this.cdr.detectChanges();

    });
}

openReviewDialog(event: any) {
  this.selectedEvent = event;

  fetch(`http://127.0.0.1:8000/api/events/${event.id}/participants/`, {
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      this.participants = data;
      this.showReviewDialog = true;
      this.cdr.detectChanges();
    });
}

  showToast(message: string) {
    console.log("show toast");
    this.toastMessage = message;
    this.showToastVisible = true;

    setTimeout(() => {
        this.showToastVisible=false;
      }, 2000);
  }

submitReviews() {

  const requests = this.participants
    .filter(u => u.rating) // doar cei cu rating
    .map(u => {

      return fetch(`http://127.0.0.1:8000/api/feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        },
        body: JSON.stringify({
          reviewer: this.user.id,
          reviewed_user: u.id,
          event: this.selectedEvent.id,
          rating: u.rating,
          comment: u.comment || ""
        })
      });
    });

  Promise.all(requests)
    .then(() => {
      this.showReviewDialog = false;
      this.showToast("Feedback submitted successfully!");
    });
}

goToSubscriptions() {
  this.router.navigate(['/subscriptions']);
}

}
