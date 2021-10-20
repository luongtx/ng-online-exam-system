import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/exams/shared/exam.model';
import { ExamService } from 'src/app/exams/shared/exam.service';

@Component({
  selector: 'app-exams-manange',
  templateUrl: './exams-manange.component.html',
  styleUrls: ['./exams-manange.component.css']
})
export class ExamsManageComponent implements OnInit {
  exams: Exam[] = [];
  isNew: boolean = false;
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.loadData()
    this.examService.examSaved.subscribe(
      () => this.loadData()
    )
  }

  loadData() {
    this.examService.getExams().subscribe(
      (data) => {
        this.exams = data;
      }
    )
  }

  onDeleteExam(id: number) {
    if (confirm("Are you sure to delete this exam")) {
      this.examService.deleteExam(id).subscribe(
        () => {
          alert("Delete exam successfully!")
          this.loadData()
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    }
  }

}
