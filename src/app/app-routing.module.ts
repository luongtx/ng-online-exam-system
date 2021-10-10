import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamDetailComponent } from './exams/exam-detail/exam-detail.component';
import { ExamListComponent } from './exams/exam-list/exam-list.component';
import { QuestionsComponent } from './exams/exam-unit/questions/questions.component';
import { ExamsComponent } from './exams/exams.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'exams', component: ExamsComponent, children: [
    {path: '', component: ExamListComponent},
    {path: ':id', component: ExamDetailComponent},
    {path: ':id/start', component: QuestionsComponent}
  ]},
  {path: 'recent-exams', component: ExamsComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
