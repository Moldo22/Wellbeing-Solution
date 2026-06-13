import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  imports: [FormsModule],
  templateUrl: './event-create.html',
  styleUrl: './event-create.css',
})
export class EventCreate {

  constructor(private router: Router) {}

  event = {
  title: '',
  description: '',
  sport: 'tennis',
  start_time: '',
  street_address: '',
  city: '',
  country: 'Romania',
  max_participants: 1,
  skill_level: 'beginner'
};

userName = '';

  async onSubmit(): Promise<void> {
  // 1. Pregătim payload-ul final (formatăm data în ISO string și ne asigurăm că participanții sunt număr)
  const payload = {
    ...this.event,
    title: this.event.title,
    description: this.event.description,
    sport: this.event.sport,
    start_time: this.event.start_time,
    street_address: this.event.street_address,
    city: this.event.city,
    country: this.event.country,
    max_participants: this.event.max_participants,
    skill_level: this.event.skill_level,

    //start_time: this.event.start_time ? new Date(this.event.start_time).toISOString() : '',
    
    //max_participants: Number(this.event.max_participants)
  };

  try {
    // 2. Apelul fetch către endpoint-ul tău (înlocuiește URL-ul de mai jos cu cel real)
    const response = await fetch('http://127.0.0.1:8000/api/events/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // dacă ai nevoie de autentificare
      },
      body: JSON.stringify(payload)
    });

    // 3. Verificăm dacă răspunsul este ok (status 200-299)
    if (!response.ok) {
      throw new Error(`Eroare HTTP! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Eveniment creat cu succes:', data);
    alert('Evenimentul a fost publicat!');
    this.router.navigate(['/home']);

  } catch (error) {
    console.error('A apărut o eroare la trimiterea fetch:', error);
    alert('A eșuat publicarea evenimentului.');
  }
}
}

