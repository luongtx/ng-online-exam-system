import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamResult } from 'src/app/models/exam-result.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-list-recents',
  templateUrl: './exam-list-recents.component.html',
  styleUrls: ['./exam-list-recents.component.css']
})
export class ExamListRecentsComponent implements OnInit {
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
