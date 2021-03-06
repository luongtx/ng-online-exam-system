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
import { CatalogueEditComponent } from './admin/catalogues/catalogue-edit/catalogue-edit.component';
import { CatalogueQuestionsComponent } from './admin/catalogues/catalogue-questions/catalogue-questions.component';
import { CataloguesManageComponent } from './admin/catalogues/catalogues-manage/catalogues-manage.component';
import { ExamEditComponent } from './admin/exams/exam-edit/exam-edit.component';
import { ExamUnitManageComponent } from './admin/exams/exam-unit-manage/exam-unit-manage.component';
import { QuestionManageComponent } from './admin/exams/exam-unit-manage/question-manage/question-manage.component';
import { QuestionsManageComponent } from './admin/exams/exam-unit-manage/questions-manage/questions-manage.component';
import { ExamsManageComponent } from './admin/exams/exams-manange/exams-manange.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicAuthInterceptorService } from './auth/auth-interceptor.service';
import { ExamDetailComponent } from './exams/exam-detail/exam-detail.component';
import { ExamListComponent } from './exams/exam-list/exam-list.component';
import { ExamRecentsComponent } from './exams/exam-recents/exam-recents.component';
import { ExamReviewComponent } from './exams/exam-review/exam-review.component';
import { ExamUnitComponent } from './exams/exam-unit/exam-unit.component';
import { QuestionDetailComponent } from './exams/exam-unit/questions/question-detail/question-detail.component';
import { QuestionsComponent } from './exams/exam-unit/questions/questions.component';
import { ExamsComponent } from './exams/exams.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    QuestionsComponent,
    ExamDetailComponent,
    ExamReviewComponent,
    ProfileComponent,
    ExamsComponent,
    ExamUnitComponent,
    ExamListComponent,
    LoginComponent,
    RegisterComponent,
    ExamRecentsComponent,
    ExamsManageComponent,
    ExamUnitManageComponent,
    ExamEditComponent,
    QuestionManageComponent,
    QuestionsManageComponent,
    CataloguesManageComponent,
    CatalogueEditComponent,
    CatalogueQuestionsComponent
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
