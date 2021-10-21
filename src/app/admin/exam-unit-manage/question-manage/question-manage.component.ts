import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/exams/exam-unit/questions/question.model';
import { ExamService } from 'src/app/exams/shared/exam.service';

@Component({
  selector: 'app-question-manage',
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.css']
})
export class QuestionManageComponent implements OnInit, OnChanges {
  formQuestion?: FormGroup;
  @Input() question?: Question;
  @Output() saved = new EventEmitter();
  @Output() closed = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.loadForm()
  }

  loadForm() {
    let formArrayAnswers = new FormArray([])
    if (this.question?.answers) {
      for (let answer of this.question?.answers) {
        formArrayAnswers.push(
          new FormGroup({
            'id': new FormControl(answer?.id),
            'content': new FormControl(answer.content, Validators.required),
            'correct': new FormControl(answer?.correct)
          })
        )
      }
    }
    this.formQuestion = new FormGroup({
      'id': new FormControl(this.question?.id),
      'content': new FormControl(this.question?.content, Validators.required),
      'answers': formArrayAnswers
    })
  }

  get formArrayAnswers() {
    return this.formQuestion?.get("answers") as FormArray;
  }

  onAddAnswer() {
    this.formArrayAnswers.push(
      new FormGroup({
        'content': new FormControl(null, Validators.required),
        'correct': new FormControl(false)
      })
    )
  }

  onDeleteAnswer(index: number) {
    this.formArrayAnswers.removeAt(index)
  }

  onSubmit() {
    this.saved.next(this.formQuestion?.value)
  }

  onCancel() {
    this.closed.next(true)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadForm()
  }

}
