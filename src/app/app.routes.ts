import { Routes } from '@angular/router';
import {Circles} from './circles/circles';
import {Home} from './home/home';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'circles',
    component: Circles,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
