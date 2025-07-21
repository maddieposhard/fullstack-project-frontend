import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'books',
    loadComponent: () => import('./pages/book-list/book-list.component').then(m => m.BookListComponent),
    canActivate: [authGuard]
  }
];
