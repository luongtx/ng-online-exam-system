import { Component, OnInit } from '@angular/core';
import { Exam } from './exam.model';
import { ExamService } from './exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  exams?: Exam[]
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.exams = this.examService.getExams();
  }

}
