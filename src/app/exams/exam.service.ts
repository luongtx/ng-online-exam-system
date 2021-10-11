import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Answer } from "./exam-unit/questions/answer.model";
import { Question } from "./exam-unit/questions/question.model";
import { Exam } from "./exam.model";

@Injectable({ providedIn: 'root' })
export class ExamService {

  API_END_POINT = "http://localhost:8080/exams/"
  constructor(private http: HttpClient) { }

  timer?: Subject<{ min: number, sec: number }> = new Subject();
  timeOut?: Subject<any> = new Subject();

  getExams() {
    return this.http.get<Exam[]>(this.API_END_POINT);
  }

  getById(id: number) {
    return this.http.get<Exam>(this.API_END_POINT + id);
  }

  getQuestionsByExamId(id: number) {
    return this.http.get<Question[]>(this.API_END_POINT + id + '/questions')
  }

  filterUnAnsweredQuestion(exam: Exam): Question[] {
    const questions = exam.questions.filter(
      question => {
        const answersChecked = question.answers.filter(ans => ans.checked)
        return !answersChecked || !answersChecked.length;
      }
    );
    return questions ? questions : [];
  }

  filterMarkForReviews(exam: Exam): Question[] {
    const questions = exam.questions.filter(
      question => question.isMarkedForReview
    );
    return questions ? questions : [];
  }

  clearAllUserProgress(exam: Exam) {
    exam.questions.forEach(
      (question) => {
        question.isMarkedForReview = false;
        question.answers.forEach(
          (ans) => {
            ans.checked = false
          }
        )
      }
    )
  }

  exitExam(exam: Exam) {
    this.clearAllUserProgress(exam)
    this.shutdownTimer();
  }

  submitExam() {
    this.shutdownTimer();
  }

  minInterval: any;
  secInterval: any;
  timeOutInterval: any;
  startTimerForExam(duration: number) {
    let minLeft = duration - 1;
    let secondLeft = 59;
    this.timer?.next({ min: minLeft, sec: secondLeft });
    this.secInterval = setInterval(
      () => {
        this.timer?.next({ min: minLeft, sec: --secondLeft })
      }, 1000
    )
    this.minInterval = setInterval(
      () => {
        secondLeft = 59;
        this.timer?.next({ min: --minLeft, sec: secondLeft })
      }, 60 * 1000 - 1
    )
    this.timeOutInterval = setInterval(
      () => {
        this.timeOut?.next(true)
      }, duration * 60 * 1000
    )
  }

  shutdownTimer() {
    clearInterval(this.timeOutInterval);
    clearInterval(this.minInterval);
    clearInterval(this.secInterval)
  }
}
