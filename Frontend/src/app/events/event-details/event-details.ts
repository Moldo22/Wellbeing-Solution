import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TitleCasePipe, UpperCasePipe, DatePipe} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports: [TitleCasePipe, UpperCasePipe, DatePipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnInit{
  eventId!: string | null;

  // 2. Injectează serviciul în constructor
  constructor(private route: ActivatedRoute , private cdr: ChangeDetectorRef) {
    
  }

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
  no_of_joined_participants: 1,
};
  
  
  ngOnInit(){
    this.eventId = this.route.snapshot.paramMap.get('id');
    
    console.log('ID-ul extras este:', this.eventId);

    this.loadEvents();
  }

  loadEvents() {
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

  onJoinMatch(): void {
   console.log(`User joined the match for event: ${this.event.title}`);
    // Aici rulezi logica ta de fetch/POST pentru înscriere
}
}
