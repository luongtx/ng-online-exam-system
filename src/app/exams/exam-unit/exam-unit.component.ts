import { Component, Input, OnInit } from '@angular/core';
import { Exam } from '../shared/exam.model';

@Component({
  selector: 'app-exam-unit',
  templateUrl: './exam-unit.component.html',
  styleUrls: ['./exam-unit.component.css']
})
export class ExamUnitComponent implements OnInit {
  @Input() exam?: Exam
  constructor() { }

  ngOnInit(): void {
  }

}
