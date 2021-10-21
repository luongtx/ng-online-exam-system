import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Question } from "../exam-unit/questions/question.model";
import { ExamResult } from "./exam-result.model";
import { Exam } from "./exam.model";

@Injectable({ providedIn: 'root' })
export class ExamService {

  API_END_POINT = "http://localhost:8080/exams/"
  constructor(private http: HttpClient) { }

  timer?: Subject<{ min: number, sec: number }> = new Subject();
  timeOut?: Subject<any> = new Subject();
  examSaved: Subject<Exam> = new Subject();

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.API_END_POINT);
  }

  getRecentExams(): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>(this.API_END_POINT + "recent");
  }

  getById(id: number): Observable<Exam> {
    return this.http.get<Exam>(this.API_END_POINT + id);
  }

  getQuestionsByExamId(id?: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.API_END_POINT + id + '/questions')
  }

  saveExam(exam: Exam): Observable<any> {
    return this.http.post<Exam>(this.API_END_POINT + "save", exam)
  }

  saveExamQuestions(questions: Question[], examId: number) {
    return this.http.post(this.API_END_POINT + examId + "/questions/save", questions);
  }

  saveQuestion(question: Question, examId: number) {
    return this.http.post(this.API_END_POINT + examId + "/question/save", question);
  }

  deleteExam(id: number): Observable<any> {
    return this.http.delete(this.API_END_POINT + "delete/" + id)
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(this.API_END_POINT + "question/" + id + "/delete");
  }

  uploadBanner(file: File, examId?: number): Observable<number> {
    let formData = new FormData()
    formData.append('file', file)
    let reqParams = new HttpParams();
    if (examId) {
      reqParams = reqParams.append('id', examId) // set doesn't work so use append
      console.log(reqParams)
    }
    return this.http.post<number>(this.API_END_POINT + "upload", formData, { params: reqParams });
  }

  onExamSaved(exam: Exam) {
    this.examSaved.next(exam)
  }

  filterUnAnsweredQuestion(questions?: Question[]): Question[] {
    if (!questions) return [];
    const list = questions.filter(
      question => {
        const answersChecked = question.answers.filter(ans => ans.checked)
        return !answersChecked || !answersChecked.length;
      }
    );
    return list ? list : [];
  }

  filterMarkForReviews(questions?: Question[]): Question[] {
    if (!questions) return [];
    const list = questions.filter(
      question => question.markedForReview
    );
    return list ? list : [];
  }

  clearAllUserProgress(exam: Exam) {
    exam.questions?.forEach(
      (question) => {
        question.markedForReview = false;
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

  examResult: Subject<ExamResult> = new Subject()
  submitExam(exam: Exam) {
    this.shutdownTimer();
    return this.http.post<ExamResult>(this.API_END_POINT + exam.id + "/submit",
      this.createRequestForSubmittedAns(exam)
    ).subscribe(
      result => this.examResult.next(result)
    )
  }

  createRequestForSubmittedAns(exam: Exam): number[][] {
    let listAns: number[][] = [];
    exam.questions?.forEach(
      question => {
        let ans = question.answers.filter(ans => ans.checked).map(ans => ans.id!)
        if (!ans) ans = []
        listAns.push(ans)
      }
    )
    return listAns
  }

  minInterval: any;
  secInterval: any;
  timeOutInterval: any;
  startTimerForExam(duration?: number) {
    if (!duration) return
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
