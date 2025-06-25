import { Component, computed, inject } from '@angular/core';
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [NavigationBarComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Entertainment-Web-App2';
  userService = inject(UserService);
  isLoggedIn = computed(()=>this.userService.isLoggedIn());
}
