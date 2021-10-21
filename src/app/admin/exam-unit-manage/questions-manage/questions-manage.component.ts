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
  editable: boolean = false
  questionCopy: Question = {
    content: "",
    answers: []
  }
  examId!: number;
  constructor(private examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = +this.route.snapshot.params['id']
  }

  onQuestionSaved(event: any) {

  }

  onQuestionClicked(question: Question) {
    // console.log(question.answers);
    this.editable = true
    this.questionCopy = { ...question }
  }

  onQuestionFormClosed() {
    this.editable = false
  }

  onAddQuestionClicked() {
    this.editable = true
    this.questionCopy = {
      answers: [{}]
    }
  }

  onDeleteClicked(index: number) {
    if (confirm("Delete this question?")) {
      this.questions?.splice(index, 1)
      this.examService.saveExamQuestions(this.questions!, this.examId).subscribe(
        () => {
          alert("Delete question successfully!")
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

}
