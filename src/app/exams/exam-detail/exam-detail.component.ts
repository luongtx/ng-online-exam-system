import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Exam } from '../shared/exam.model';
import { ExamService } from '../shared/exam.service';
@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  exam?: Exam;
  constructor(private activateRoute: ActivatedRoute, private examService: ExamService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (params: Params) => {
        let id = +params['id'];
        this.examService.getById(id).subscribe(
          (exam) => this.exam = exam
        );
      }
    )
  }

}
