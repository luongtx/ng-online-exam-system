import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionReviewComponent } from './question-review/question-review.component';
import { ExamExplorerComponent } from './exam-explorer/exam-explorer.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { ExamReviewComponent } from './exam-review/exam-review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    QuestionReviewComponent,
    ExamExplorerComponent,
    ExamDetailComponent,
    ExamReviewComponent
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
