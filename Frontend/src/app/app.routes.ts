import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { EventList } from './events/event-list/event-list';

export const routes: Routes = [
    { path: '', component: EventList }, 
    { path: 'login', component: Login },
    { path: 'register', component: Register }
];
