import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamResult } from '../shared/exam-result.model';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-exam-recents',
  templateUrl: './exam-recents.component.html',
  styleUrls: ['./exam-recents.component.css']
})
export class ExamRecentsComponent implements OnInit {
  exams?: ExamResult[]
  constructor(private examService: ExamService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.examService.getRecentExams().subscribe(
      (data) => {
        this.exams = data
      }
    )
  }

  onClickExam(exam: ExamResult) {
    // this.router.navigate(['..', exam.examId, 'review'], { relativeTo: this.route })
    this.router.navigateByUrl("/exams/" + exam.examId + "/review", { state: exam });
  }

}
