import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListComponent } from './components/ReactiveForm/list-reactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink,
    ListComponent
  ],
  template: `
    <nav>
      <ul style="list-style: none; padding: 20px; display: flex; gap: 20px; background-color: #f5f5f5; margin: 0;">
        <li><a routerLink="/template-driven" routerLinkActive="active">Template-Driven Form</a></li>
        <li><a routerLink="/reactive" routerLinkActive="active">Reactive Form</a></li>
        <li><a routerLink="/signal" routerLinkActive="active">Signal Form</a></li>
      </ul>
    </nav>
    <router-outlet />
  `,
  styles: [`
    .active {
      color: #4CAF50;
      font-weight: bold;
      text-decoration: none;
    }
    a {
      color: #333;
      text-decoration: none;
    }
    a:hover {
      color: #4CAF50;
    }
  `]
})
export class AppComponent {
  title = 'Angular18-Forms';
}
