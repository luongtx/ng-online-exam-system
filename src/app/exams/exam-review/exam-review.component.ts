import { Component, OnInit } from '@angular/core';
import { ExamResult } from '../shared/exam-result.model';
import { ExamService } from '../shared/exam.service';

@Component({
  selector: 'app-exam-review',
  templateUrl: './exam-review.component.html',
  styleUrls: ['./exam-review.component.css']
})
export class ExamReviewComponent implements OnInit {
  examResult?: ExamResult
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.examResult = history.state;
    if (this.examResult?.examId) {
      console.log(this.examResult);
      this.animateProgress(this.examResult?.score, this.examResult?.status, 10)
    }
    this.examService.examResult.subscribe(
      (result) => {
        this.examResult = result
        this.animateProgress(this.examResult.score, this.examResult.status, 30)
      }
    )
  }

  animateProgress(progressValue: number, progressStatus: boolean, runningPace: number) {
    let timeOut = runningPace * progressValue / 1000;
    const FULL_STROKE_VALUE = 472;
    const SCORE_LITERAL = "Score: ";
    var animatedCircleStyle = document.createElement('style');
    let strokeDashOffset = (FULL_STROKE_VALUE - FULL_STROKE_VALUE * progressValue / 100);
    animatedCircleStyle.innerHTML = `@keyframes anim {\
      100% {\
        stroke-dashoffset: ${strokeDashOffset};\
      }\
    }`;
    const circleElement = document.getElementsByTagName('circle')[0];
    circleElement.appendChild(animatedCircleStyle);
    circleElement.style.animation = `anim ${timeOut}s linear forwards`
    let scoreDiv = document.getElementById("score") as HTMLDivElement;
    let statusDiv = document.getElementById("status") as HTMLDivElement
    let counter = 0;
    let interval = setInterval(
      () => {
        if (counter >= progressValue) {
          clearInterval(interval);
          if (progressStatus) {
            statusDiv.innerHTML = "Passed!";
            statusDiv.classList.add("text-success");
          } else {
            statusDiv.innerHTML = "Failed!";
            statusDiv.classList.add("text-danger");
          }
          return;
        }
        counter++;
        scoreDiv.innerHTML = SCORE_LITERAL + counter + "%"
      }, runningPace);
  }
}
