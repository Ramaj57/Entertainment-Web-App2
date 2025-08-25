import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  userService = inject(UserService);
  router = inject(Router);
  enteredEmail = signal('');
  enteredPassword = signal('');
  requiredErrorMsg = signal<string>('');
  emailErrorMsg = signal<string>('');
  invalidErrorMsg = signal<string>('');

  clearInput() {
    this.enteredEmail.set('');
    this.enteredPassword.set('');
  }

  clearErrors() {
    this.requiredErrorMsg.set('');
    this.emailErrorMsg.set('');
    this.invalidErrorMsg.set('');
  }

  onLogin() {
    const email = this.enteredEmail();
    const password = this.enteredPassword();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '' || password === '') {
      this.requiredErrorMsg.set('All fields are required.');
      this.clearInput();
      return;
    }

    if (!emailRegex.test(email)) {
      this.emailErrorMsg.set('Must enter valid email.');
      this.clearInput();
      return;
    }

    const verified = this.userService.login(email, password);

    if (verified) {
      this.clearInput();
      this.clearErrors();
      alert('User Verified!');
      this.router.navigate(['/home']);
    } else {
      this.clearInput();
      this.invalidErrorMsg.set('Invalid email or password.');
    }
  }
}
