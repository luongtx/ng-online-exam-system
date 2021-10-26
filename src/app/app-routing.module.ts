import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguesManageComponent } from './admin/catalogues-manage/catalogues-manage.component';
import { ExamUnitManageComponent } from './admin/exam-unit-manage/exam-unit-manage.component';
import { ExamsManageComponent } from './admin/exams-manange/exams-manange.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ExamDetailComponent } from './exams/exam-detail/exam-detail.component';
import { ExamListComponent } from './exams/exam-list/exam-list.component';
import { ExamRecentsComponent } from './exams/exam-recents/exam-recents.component';
import { ExamReviewComponent } from './exams/exam-review/exam-review.component';
import { QuestionsComponent } from './exams/exam-unit/questions/questions.component';
import { ExamsComponent } from './exams/exams.component';
import { CanDeactivateGuard } from './exams/shared/can-deactivate-guard.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  {
    path: 'exams', component: ExamsComponent, children: [
      { path: 'recent', component: ExamRecentsComponent },
      { path: '', component: ExamListComponent },
      { path: ':id', component: ExamDetailComponent },
      { path: ':id/start', component: QuestionsComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
      { path: ':id/review', component: ExamReviewComponent },
    ]
  },

  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-exams', component: ExamsManageComponent },
  { path: 'manage-exams/:id', component: ExamUnitManageComponent },
  { path: 'catalogues', component: CataloguesManageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
