import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './exams/exam-unit/questions/questions.component';
import { QuestionDetailComponent } from './exams/exam-unit/questions/question-detail/question-detail.component';
import { ExamDetailComponent } from './exams/exam-detail/exam-detail.component';
import { ExamReviewComponent } from './exams/exam-review/exam-review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './profile/profile.component';
import { ExamsComponent } from './exams/exams.component';
import { ExamUnitComponent } from './exams/exam-unit/exam-unit.component';
import { ExamListComponent } from './exams/exam-list/exam-list.component';

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
    ExamListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
