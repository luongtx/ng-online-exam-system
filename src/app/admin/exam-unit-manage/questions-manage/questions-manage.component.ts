import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/exams/exam-unit/questions/question.model';
import { ExamService } from 'src/app/exams/shared/exam.service';

@Component({
  selector: 'app-questions-manage',
  templateUrl: './questions-manage.component.html',
  styleUrls: ['./questions-manage.component.css']
})
export class QuestionsManageComponent implements OnInit {
  @Input() questions?: Question[] = []
  editable: boolean = true
  questionCopy: Question = {
    answers: [{}]
  }
  examId!: number;
  constructor(private examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = +this.route.snapshot.params['id']
  }

  onQuestionSaved(question: Question) {
    console.log(question);
    this.examService.saveQuestion(question, this.examId).subscribe(
      () => {
        this.loadQuestions()
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  loadQuestions() {
    this.examService.getQuestionsByExamId(this.examId).subscribe(
      (data) => {
        this.questions = data
      }
    )
  }

  onEditClicked(question: Question) {
    // console.log(question.answers);
    this.editable = true
    this.questionCopy = { ...question }
  }

  onFormClosed() {
    this.editable = false
  }

  onAddClicked() {
    this.editable = true
    this.questionCopy = {
      answers: [{}]
    }
  }

  onDeleteClicked(question: Question) {
    if (confirm("Delete this question?")) {
      this.examService.deleteQuestion(question.id!).subscribe(
        () => {
          this.loadQuestions()
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

}
