import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { ClocksComponent } from './clocks';
import { SettingsComponent } from './settings';
import { AboutComponent } from './about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clocks', component: ClocksComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
