import { Component,inject, signal } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent {
userService = inject(UserService);
router = inject(Router);
isLoggedIn = signal(this.userService.isLoggedIn());

logOut(){
  this.userService.logOut();
this.router.navigate(['/login']);
}

}
