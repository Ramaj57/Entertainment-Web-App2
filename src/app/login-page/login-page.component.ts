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
  errorMsg = signal<string>('');
  emailErrorMsg = signal<string>('');

  clearInput() {
    this.enteredEmail.set('');
    this.enteredPassword.set('');
  }

  clearErrors() {
    this.errorMsg.set('');
    this.emailErrorMsg.set('');
  }

  onLogin() {
    const email = this.enteredEmail();
    const password = this.enteredPassword();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '' || password === '') {
      this.errorMsg.set('All fields are required.');
      this.clearInput();
      return;
    }

    if (email === password) {
      this.errorMsg.set('email and password must be different.');
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
      this.errorMsg.set('Invalid email or password.');
    }
  }
}
