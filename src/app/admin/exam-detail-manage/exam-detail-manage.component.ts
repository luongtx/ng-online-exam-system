import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Exam } from 'src/app/exams/shared/exam.model';
import { ExamService } from 'src/app/exams/shared/exam.service';
import { FileUtils } from 'src/app/utils/file.util.service';

@Component({
  selector: 'app-exam-detail-manage',
  templateUrl: './exam-detail-manage.component.html',
  styleUrls: ['./exam-detail-manage.component.css']
})
export class ExamDetailManageComponent implements OnInit {
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
                this.exam.questions = data;
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

  onFormClosed() {
    this.editable = false
  }

}
