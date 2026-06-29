import { Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home' ,component: HomeComponent},
    { path: 'questions', component: QuestionsComponent},
];
