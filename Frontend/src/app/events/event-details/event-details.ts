import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TitleCasePipe, UpperCasePipe, DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-event-details',
  imports: [TitleCasePipe, UpperCasePipe, DatePipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnInit{
  eventId!: string | null;

  token!: string | null;

  // 2. Injectează serviciul în constructor
  constructor(private route: ActivatedRoute , private cdr: ChangeDetectorRef, private router:Router) {}


  event = {
  title: '',
  description: '',
  sport: 'tennis',
  start_time: '',
  street_address: '',
  city: '',
  country: 'Romania',
  max_participants: 1,
  skill_level: 'beginner',
  creator: 'Hardcoded name',
  participants: []
};
  
  
  ngOnInit(){
    this.eventId = this.route.snapshot.paramMap.get('id');
    
    console.log('ID-ul extras este:', this.eventId);

    this.loadEvent();
  }


  loadEvent() {
  fetch('http://127.0.0.1:8000/api/events/' + this.eventId)
    .then(res => {
      console.log('📥 Response status from event details:', res.status);
      return res.json();
    })
    .then(data => {
      console.log('✅ Raw events from backend:', data);
      
      this.event = data;
      this.cdr.detectChanges();
    })}


  toastMessage: string = '';
  showToastVisible = false;

  showToast(message: string) {
    console.log("show toast");
    this.toastMessage = message;
    this.showToastVisible = true;

    setTimeout(() => {
        this.showToastVisible=false;
      }, 2000);
  }
  
  onJoinMatch() {
   console.log(`User joined the match for event: ${this.event.title}`);
   this.token = localStorage.getItem('accessToken');
    fetch(`http://127.0.0.1:8000/api/events/${this.eventId}/join/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(() => {

      this.showToast("🎉 You successfully joined the event!");
      this.cdr.detectChanges();
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    });
}
}

