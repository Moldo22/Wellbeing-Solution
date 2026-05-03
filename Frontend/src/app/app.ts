import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { Login } from "./login/login";
import { Router } from '@angular/router';
// import { RouterOutlet } from "../../node_modules/@angular/router/types/_router_module-chunk"; // <-- NEW IMPORT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    CardModule,
    TagModule,
    AvatarModule,
    TextareaModule,
    InputNumberModule,
    DatePickerModule,
    DividerModule // <-- ADDED HERE
    ,
    Login,
    RouterModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
  
  showLogin = false;

  constructor(private router: Router) {}

  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.router.navigate(['/login']);
  }
  
  
  // --- STATE VARIABLES ---
  isCreatingEvent = false;
  selectedEvent: any = null; // Tracks the currently viewed event

  // --- FILTER VARIABLES ---
  searchText = '';
  selectedCategory = 'Toate Categoriile';
  selectedDate = 'Toate Datele';

  categories = ['Toate Categoriile', 'Sport / Echipă', 'Sport', 'Relaxare & Sport'];
  categoryOptions = [
    { label: 'Sport / Echipă', value: 'Sport / Echipă' },
    { label: 'Sport individual', value: 'Sport' },
    { label: 'Relaxare & Sport', value: 'Relaxare & Sport' }
  ];
  dateOptions = ['Toate Datele', 'Săptămâna aceasta', 'Luna aceasta'];

  newEvent = {
    title: '', description: '', category: 'Sport / Echipă', fullDate: new Date(), location: '', spaces: 1, imageUrl: ''
  };

  events = [
    {
      id: 1,
      title: 'Meci de Fotbal Amical',
      category: 'Sport / Echipă',
      description: 'Hai la un meci amical de fotbal! Vino cu prietenii sau singur, formăm echipele la fața locului. Perfect pentru a face mișcare și a te relaxa după cursuri.',
      date: '20 Martie 2026 la 18:00',
      location: 'Terenul Sintetic - Campus',
      spaces: 10,
      host: 'Andrei Popescu',
      hostInitials: 'AP',
      rating: '4.8',
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600'
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

  // --- METHODS ---
  toggleCreateForm() {
    this.isCreatingEvent = !this.isCreatingEvent;
    this.selectedEvent = null; // Close details if open
  }

  // NEW: Open detailed view
  openEventDetails(event: any) {
    this.selectedEvent = event;
    this.isCreatingEvent = false;
  }

  // NEW: Close detailed view
  closeEventDetails() {
    this.selectedEvent = null;
  }

  // Reset to home view when clicking the logo
  goHome() {
    this.isCreatingEvent = false;
    this.selectedEvent = null;
  }

  submitEvent() {
    const nextId = this.events.length > 0 ? Math.max(...this.events.map(e => e.id)) + 1 : 1;
    const formattedDate = this.newEvent.fullDate.toLocaleString('ro-RO', { 
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    this.events.unshift({
      id: nextId,
      title: this.newEvent.title,
      category: this.newEvent.category,
      description: this.newEvent.description,
      date: formattedDate,
      location: this.newEvent.location,
      spaces: this.newEvent.spaces,
      host: 'Sarah Johnson',
      hostInitials: 'SJ',
      rating: 'Nou',
      reviews: 0,
      image: this.newEvent.imageUrl || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600'
    });

    this.toggleCreateForm();
    this.newEvent = { title: '', description: '', category: 'Sport / Echipă', fullDate: new Date(), spaces: 1, location: '', imageUrl: '' };
  }

  get filteredEvents() {
    return this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Toate Categoriile' || event.category === this.selectedCategory;
      
      let matchesDate = true;
      if (this.selectedDate === 'Săptămâna aceasta') matchesDate = event.date.includes('18') || event.date.includes('20');
      else if (this.selectedDate === 'Luna aceasta') matchesDate = event.date.includes('Martie');
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  }
}