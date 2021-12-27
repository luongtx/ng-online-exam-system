import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogueEditComponent } from './components/admin/catalogues/catalogue-edit/catalogue-edit.component';
import { CatalogueQuestionsEditComponent } from './components/admin/catalogues/catalogue-questions-edit/catalogue-questions-edit.component';
import { CatalogueListEditComponent } from './components/admin/catalogues/catalogue-list-edit/catalogue-list-edit.component';
import { ExamEditComponent } from './components/admin/exams/exam-edit/exam-edit.component';
import { ExamItemEditComponent } from './components/admin/exams/exam-item-edit/exam-item-edit.component';
import { ExamQuestionEditComponent } from './components/admin/exams/exam-item-edit/exam-question-edit/exam-question-edit.component';
import { ExamQuestionsEditComponent } from './components/admin/exams/exam-item-edit/exam-questions-edit/exam-questions-edit.component';
import { ExamsManageComponent } from './components/admin/exams/exam-list-edit/exam-list-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicAuthInterceptorService } from './auth/auth-interceptor.service';
import { ExamDetailComponent } from './components/exams/exam-detail/exam-detail.component';
import { ExamListComponent } from './components/exams/exam-list/exam-list.component';
import { ExamListRecentsComponent } from './components/exams/exam-list-recents/exam-list-recents.component';
import { ExamReviewComponent } from './components/exams/exam-review/exam-review.component';
import { ExamUnitComponent } from './components/exams/exam-unit/exam-unit.component';
import { QuestionDetailComponent } from './components/exams/exam-unit/question-detail/question-detail.component';
import { QuestionListComponent } from './components/exams/exam-unit/question-list/question-list.component';
import { ExamsComponent } from './components/exams/exams.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogueImportComponent } from './components/admin/catalogues/catalogue-import/catalogue-import.component';
import { CatalogueQuestionEditComponent } from './components/admin/catalogues/catalogue-question-edit/catalogue-question-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    QuestionListComponent,
    ExamDetailComponent,
    ExamReviewComponent,
    ProfileComponent,
    ExamsComponent,
    ExamUnitComponent,
    ExamListComponent,
    LoginComponent,
    RegisterComponent,
    ExamListRecentsComponent,
    ExamsManageComponent,
    ExamItemEditComponent,
    ExamEditComponent,
    ExamQuestionEditComponent,
    ExamQuestionsEditComponent,
    CatalogueListEditComponent,
    CatalogueEditComponent,
    CatalogueQuestionsEditComponent,
    CatalogueImportComponent,
    CatalogueQuestionEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
