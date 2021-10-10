import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';

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
        this.exam = this.examService.getById(id);
      }
    )
  }

}
