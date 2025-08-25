import { CanMatchFn, Router, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpPageComponent } from './signUp/signUp-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BookmarkedMediaPageComponent } from './bookmarked-media-page/bookmarked-media-page.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { TvSeriesPageComponent } from './tv-series-page/tv-series-page.component';
import { computed, inject } from '@angular/core';
import { UserService } from './user.service';
import { LogOutComponent } from './log-out/log-out.component';

export const loginSignupGuard: CanMatchFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  const isLoggedIn = computed(() => userService.isLoggedIn());

  if (isLoggedIn()) {
    router.navigate(['/movies']);
    return false;
  } else return true;
};

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  const isLoggedIn = computed(() => userService.isLoggedIn());

  if (!isLoggedIn()) {
    router.navigate(['/']);
    return false;
  } else return true;
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'signUp',
    component: SignUpPageComponent,
    canMatch: [loginSignupGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canMatch: [loginSignupGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canMatch: [authGuard],
  },
  {
    path: 'bookmarked',
    component: BookmarkedMediaPageComponent,
    canMatch: [authGuard],
  },
  {
    path: 'movies',
    component: MoviesPageComponent,
    canMatch: [authGuard],
  },
  {
    path: 'tvSeries',
    component: TvSeriesPageComponent,
    canMatch: [authGuard],
  },
  {
    path: 'logout',
    component: LogOutComponent,
    canMatch: [authGuard],
  },
];
