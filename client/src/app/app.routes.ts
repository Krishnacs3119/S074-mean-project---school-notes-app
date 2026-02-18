import { Routes } from '@angular/router';
// Notice we changed './login/login.component' to just './login/login'
import { LoginComponent } from './login/login'; 
import { NotesComponent } from './notes/notes';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'notes', component: NotesComponent }
];