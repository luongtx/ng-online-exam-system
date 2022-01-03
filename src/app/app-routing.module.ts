import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueImportComponent } from './components/admin/catalogues/catalogue-import/catalogue-import.component';
import { CatalogueListEditComponent } from './components/admin/catalogues/catalogue-list-edit/catalogue-list-edit.component';
import { ExamItemEditComponent } from './components/admin/exams/exam-item-edit/exam-item-edit.component';
import { ExamsManageComponent } from './components/admin/exams/exam-list-edit/exam-list-edit.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ExamDetailComponent } from './components/exams/exam-detail/exam-detail.component';
import { ExamListComponent } from './components/exams/exam-list/exam-list.component';
import { ExamListRecentsComponent } from './components/exams/exam-list-recents/exam-list-recents.component';
import { ExamReviewComponent } from './components/exams/exam-review/exam-review.component';
import { QuestionListComponent } from './components/exams/exam-unit/question-list/question-list.component';
import { ExamsComponent } from './components/exams/exams.component';
import { CanDeactivateGuard } from './guards/can-deactivate-guard.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { QuestionsEditComponent } from './components/admin/questions/questions-edit.component';

const routes: Routes = [
  {
    path: 'exams', component: ExamsComponent, children: [
      { path: 'recent', component: ExamListRecentsComponent },
      { path: '', component: ExamListComponent },
      { path: ':id', component: ExamDetailComponent },
      { path: ':id/start', component: QuestionListComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
      { path: ':id/review', component: ExamReviewComponent },
    ]
  },

  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', redirectTo: '/admin/exams', pathMatch: 'full' },
  { path: 'admin/exams', component: ExamsManageComponent, canActivate: [AuthGuard] },
  { path: 'admin/exams/:id', component: ExamItemEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/catalogues', component: CatalogueListEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/catalogues/:id/import', component: CatalogueImportComponent, canActivate: [AuthGuard] },
  { path: 'admin/questions', component: QuestionsEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
