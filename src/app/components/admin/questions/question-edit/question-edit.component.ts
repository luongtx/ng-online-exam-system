import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.model';
import { WindowUtils } from 'src/app/utils/window.util';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnChanges {

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
      'answers': formArrayAnswers,
      'examId': new FormControl(this.question?.examId),
      'catalogId': new FormControl(this.question?.catalogId)
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
    WindowUtils.scrollToElement("#qEdit");
  }

  onDeleteAnswer(index: number) {
    this.formArrayAnswers.removeAt(index)
  }

  onSubmit() {
    this.saved.next(this.formQuestion?.value);
    this.onClose();
  }

  onClose() {
    this.closed.next(true)
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("on changes");
    this.loadForm()
  }

}
