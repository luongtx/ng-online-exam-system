import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsComponent } from './exams/exams.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'exams', component: ExamsComponent},
  {path: 'recent-exams', component: ExamsComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
