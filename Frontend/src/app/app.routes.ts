import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { EventList } from './events/event-list/event-list';
import { EventCreate} from './events/event-create/event-create';
import { Profile } from './profile/profile';

export const routes: Routes = [
    { path: '', component: EventList }, 
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'profile', component: Profile},
    { path: 'event/create', component: EventCreate}

];
