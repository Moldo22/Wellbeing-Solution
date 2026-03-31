import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { NavigationService } from './navigation-service';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
