import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signUp-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signUp-page.component.html',
  styleUrl: './signUp-page.component.css',
})
export class SignUpPageComponent {
  userService = inject(UserService);
  router = inject(Router);
  enteredEmail = signal('');
  enteredPassword = signal('');
  enteredRepeatPassword = signal('');
  errorMsg = signal<string>('');
  passwordErrorMsg = signal<string>('');
  emailErrorMsg = signal<string>('');
  emailExistsMsg = signal<string>('');

  clearInput() {
    this.enteredEmail.set('');
    this.enteredPassword.set('');
    this.enteredRepeatPassword.set('');
  }

  clearErrors() {
    this.errorMsg.set('');
    this.passwordErrorMsg.set('');
    this.emailErrorMsg.set('');
    this.emailExistsMsg.set('');
  }

  onSignUp() {
    const email = this.enteredEmail();
    const password = this.enteredPassword();
    const repeatPassword = this.enteredRepeatPassword();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === '' || password === '' || repeatPassword === '') {
      this.errorMsg.set('All fields are required.');
      this.clearInput();
      return;
    }

    if (email === password) {
      this.errorMsg.set('Email and password must be different.');
      this.clearInput();
      return;
    }

    if (!emailRegex.test(email)) {
      this.emailErrorMsg.set('Must enter valid email.');
      this.clearInput();
      return;
    }

    if (password !== repeatPassword) {
      this.passwordErrorMsg.set('Passwords must match.');
      this.clearInput();
      return;
    }

    const approved = this.userService.registerUser({ email, password });

    if (!approved) {
      this.emailExistsMsg.set('User with this email already exists.');
      this.clearInput();
    } else {
      alert('User registered successfully!');
      this.router.navigate(['/login']);
      return;
    }
  }
}
