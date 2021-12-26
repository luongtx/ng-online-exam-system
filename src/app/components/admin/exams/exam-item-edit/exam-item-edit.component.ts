import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-item-edit',
  templateUrl: './exam-item-edit.component.html',
  styleUrls: ['./exam-item-edit.component.css']
})
export class ExamItemEditComponent implements OnInit {
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
