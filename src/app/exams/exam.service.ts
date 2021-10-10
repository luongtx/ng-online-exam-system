import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Answer } from "./exam-unit/questions/answer.model";
import { Question } from "./exam-unit/questions/question.model";
import { Exam } from "./exam.model";

@Injectable({ providedIn: 'root' })
export class ExamService {
  private exams: Exam[] = [
    new Exam(1, "OCAJP8", "Oracle Java Certificate Associate 8", "https://miro.medium.com/max/352/1*L8DJfg003QUh02WiAQLc7g.png", 20, 85, [
      new Question(1, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)], true),
      new Question(2, "Question 2", [new Answer(2, 2, "Answer 2.1", false), new Answer(2, 1, "Answer 2.2", false), new Answer(3, 1, "Answer 2.3", true)], false),
      new Question(3, "Question 3", [new Answer(3, 3, "Answer 3.1", false), new Answer(2, 1, "Answer 3.2", false), new Answer(3, 1, "Answer 3.3", true)], true)
    ]),
    new Exam(2, "OCPJP8", "Oracle Java Certificate Professional 8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBORrJDrMqEgkBc9OuhgX2a5qvwFm8Oxffj20HLl4cU2Qsgwe9U60L1lL0BqmNe6fiyo&usqp=CAU", 20, 85, [
      new Question(1, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)], false)
    ]),
    new Exam(3, "OCMDB", "Oracle Database Certificate Master", "https://1.bp.blogspot.com/-kps1_WxIkLo/XlyWuqmcC-I/AAAAAAAAKX8/wy-FWDZASWIpE2SGh7f8kOL3nHjJjjjLACLcBGAsYHQ/s280/Oracle-Certification-badge_OC-Master.png", 1, 85, [
      new Question(1, "Question 1", [new Answer(1, 1, "Answer 1.1", false), new Answer(2, 1, "Answer 1.2", false), new Answer(3, 1, "Answer 1.3", true)], true)
    ]),
  ]

  timer?: Subject<{ min: number, sec: number }> = new Subject();
  timeOut?: Subject<any> = new Subject();

  getExams() {
    return this.exams.slice()
  }

  getById(id: number) {
    return this.exams.slice()[id - 1];
  }

  getQuestionsById(id: number) {
    return this.getById(id).questions.slice();
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
