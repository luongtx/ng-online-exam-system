import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exam } from 'src/app/exams/shared/exam.model';
import { ExamService } from 'src/app/exams/shared/exam.service';
import { FileUtils } from 'src/app/utils/file.util.service';

@Component({
  selector: 'app-exam-edit-overall',
  templateUrl: './exam-edit-overall.component.html',
  styleUrls: ['./exam-edit-overall.component.css']
})
export class ExamEditOverallComponent implements OnInit {
  @Input() exam: Exam = new Exam()
  @Output() closed = new EventEmitter<boolean>();
  serverErr?: string;
  bannerImage?: File;
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    // console.log(this.exam?.id);
  }

  async onFileChanged(event: any) {
    let file = event.target.files[0];
    this.exam.bannerImageSource = await FileUtils.toBase64(file) as string;
  }

  onUploadFile(fileInput: HTMLInputElement) {
    let file = fileInput.files?.item(0)
    if (!file || !file.type.startsWith("image")) {
      alert("Please upload an image")
      return;
    }
    this.examService.uploadBanner(file, this.exam.id).subscribe(
      (data) => {
        this.exam.id = data
        console.log(data);
        alert("Upload file successfully!")
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    )

  }

  onSubmit() {
    this.examService.saveExam(this.exam).subscribe(
      () => {
        this.examService.onExamSaved(this.exam);
        alert("Save exam successfully!")
        this.onClosed()
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  onClosed() {
    this.closed.emit(true);
  }
}
