import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'users';
  isLoggedIn = signal(false);

  setLoggedIn(value: boolean) {
    this.isLoggedIn.set(value);
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  registerUser(user: User): boolean {
    const users = this.getUsers();
    const exists = users.find((u) => u.email === user.email);
    if (exists) {
      return false;
    }
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const verifiedUser = users.some(
      (user) => user.email === email && user.password === password
    );
    this.isLoggedIn.set(verifiedUser);
    return verifiedUser;
  }

  logOut(){
    this.isLoggedIn.set(false);
  }
}
