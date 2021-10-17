import { Component, OnInit } from '@angular/core';
import { ExamService } from '../exam.service';
import { ExamResult } from './exam-result.model';

@Component({
  selector: 'app-exam-review',
  templateUrl: './exam-review.component.html',
  styleUrls: ['./exam-review.component.css']
})
export class ExamReviewComponent implements OnInit {
  examResult?: ExamResult
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.examService.examResult.subscribe(
      (result) => {
        this.examResult = result
        this.animateProgress(this.examResult.score, this.examResult.status)
      }
    )
  }

  animateProgress(progressValue: number, progressStatus: boolean) {
    const STROKE_DASH_VALUE = 472;
    const SCORE = "Score: ";
    var animatedCircleStyle = document.createElement('style');
    var keyFrame =
      '@keyframes anim {\
        100% {\
          stroke-dashoffset: OFFSET;\
        }\
      }';
    animatedCircleStyle.innerHTML = keyFrame.replace(/OFFSET/g, (STROKE_DASH_VALUE - STROKE_DASH_VALUE * progressValue / 100) + '');
    document.getElementsByTagName('circle')[0].appendChild(animatedCircleStyle);

    let score = document.getElementById("score") as HTMLDivElement;
    let status = document.getElementById("status") as HTMLDivElement
    let counter = 0;
    setInterval(
      () => {
        if (counter >= progressValue) {
          clearInterval();
          if (progressStatus) {
            status.innerHTML = "Passed!";
            status.classList.add("text-success");
          } else {
            status.innerHTML = "Failed!";
            status.classList.add("text-danger");
          }
          return;
        }
        counter++;
        score.innerHTML = SCORE + counter + "%"
      }, 20);
  }
}
