import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
  isCreatingEvent = false;

  // --- FILTER VARIABLES ---
  searchText = '';
  selectedCategory = 'Toate Categoriile';
  selectedDate = 'Toate Datele';

  // --- NEW EVENT FORM DATA ---
  newEvent = {
    title: '',
    description: '',
    category: 'Sport / Echipă',
    dateInput: '',
    timeInput: '',
    spaces: 1,
    location: '',
    imageUrl: ''
  };

  // --- OUR DATA ---
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
      hostInitials: 'A',
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
      hostInitials: 'M',
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
      hostInitials: 'S',
      rating: '5.0',
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=600'
    }
  ];

  // --- METHODS ---

  // Toggles the view between the grid and the form
  toggleCreateForm() {
    this.isCreatingEvent = !this.isCreatingEvent;
  }

  // Saves the form data as a new card
  submitEvent() {
    // 1. Find the highest ID so we can make a new one
    const nextId = this.events.length > 0 ? Math.max(...this.events.map(e => e.id)) + 1 : 1;

    // 2. Add the new event to the top of our list
    this.events.unshift({
      id: nextId,
      title: this.newEvent.title,
      category: this.newEvent.category,
      description: this.newEvent.description,
      date: `${this.newEvent.dateInput} la ${this.newEvent.timeInput}`, // Combine date and time
      location: this.newEvent.location,
      spaces: this.newEvent.spaces,
      host: 'Sarah Johnson', // We'll hardcode the current user for now
      hostInitials: 'S',
      rating: 'Nou', // No ratings yet!
      reviews: 0,
      // If they didn't provide an image, give them a default sporty one
      image: this.newEvent.imageUrl || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600'
    });

    // 3. Go back to the main screen
    this.toggleCreateForm();

    // 4. Clear the form for next time
    this.newEvent = { title: '', description: '', category: 'Sport / Echipă', dateInput: '', timeInput: '', spaces: 1, location: '', imageUrl: '' };
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
