import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css']
})
export class EventList {

  constructor(private router: Router) {}

  searchText = '';
  selectedCategory = '';
  selectedDate = '';

  categories = [
    { label: 'Toate', value: '' },
    { label: 'Fotbal', value: 'football' },
    { label: 'Tenis', value: 'tennis' }
  ];

  dateOptions = [
    { label: 'Astăzi', value: 'today' },
    { label: 'Săptămâna asta', value: 'week' }
  ];

  filteredEvents = [
    {
      id: 1,
      title: 'Meci Fotbal',
      description: 'Meci amical studenți',
      image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
      date: '2026-05-03',
      location: 'Cluj',
      spaces: 10,
      host: 'Andrei',
      hostInitials: 'A',
      rating: 4.8,
      reviews: 32
    },
     {
      id: 2,
      title: 'Turneu de Baschet 3x3',
      category: 'Sport',
      description: 'Campionat prietenos de baschet 3 la 3. Nu contează nivelul de experiență, toată lumea este binevenită. Mingile sunt asigurate de noi!',
      date: '18 Martie 2026 la 17:30',
      location: 'Sala de Sport a Universității',
      spaces: 6,
      host: 'Mihai Radu',
      hostInitials: 'MR',
      rating: '4.9',
      reviews: 31,
      image: 'https://images.unsplash.com/photo-1519861531473-920026073fd6?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      title: 'Seară de Ping-Pong',
      category: 'Relaxare & Sport',
      description: 'Relaxează-te cu un meci ad-hoc de tenis de masă. Atmosferă lejeră, muzică bună și competiție prietenoasă. Avem palete, dar o poți aduce și pe a ta!',
      date: '25 Martie 2026 la 19:00',
      location: 'Zona de Recreere - Cămin',
      spaces: 4,
      host: 'Sorin Ionescu',
      hostInitials: 'SI',
      rating: '5.0',
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=600'
    }
  ];

  goHome() {
    console.log('home');
  }

  toggleLogin() {
    console.log('login/logout');
    this.router.navigate(['/login']);
  }

  toggleCreateForm() {
    console.log('create form');
  }

  openEventDetails(event: any) {
    console.log('open event', event);
  }
}