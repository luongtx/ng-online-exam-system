import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Exam } from 'src/app/exams/shared/exam.model';
import { ExamService } from 'src/app/exams/shared/exam.service';

@Component({
  selector: 'app-exam-unit-manage',
  templateUrl: './exam-unit-manage.component.html',
  styleUrls: ['./exam-unit-manage.component.css']
})
export class ExamUnitManageComponent implements OnInit {
  exam: Exam = new Exam();
  examCopy: Exam = new Exam();
  editable: boolean = false;

  constructor(private route: ActivatedRoute, private examService: ExamService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id']
        this.examService.getById(id).subscribe(
          (data) => {
            this.exam = data
            this.examService.getQuestionsByExamId(this.exam.id).subscribe(
              (data) => {
                this.exam.questions = data
                // this.questionCopy = data[0]
              }
            )
          }
        )
      }
    )
    this.examService.examSaved.subscribe(
      (data) => {
        this.exam = data
      }
    )
  }

  onClickUpdate() {
    this.editable = true
    this.examCopy = { ... this.exam }
  }

  onFormExamClosed() {
    this.editable = false
  }

}
