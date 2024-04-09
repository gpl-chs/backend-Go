import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-student',
  template: `
    <h3 class="center">Edit student id n° {{ student?.ID }}</h3>
    <app-student-form [studentForm]="studentForm" ></app-student-form>
  `
})
export class EditStudentComponent implements OnInit {
  student: any;
  studentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadStudentData();
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',],
      dateOfJoining: ['', [Validators.required]],
      admin: ['',]
    });
  }

  loadStudentData() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sharedService.getStudentById(+id)
        .subscribe((response: any) => {
          const student = response.user;

          this.studentForm.patchValue({
            name: student.Name,
            email: student.Email,
            password: student.Password,
            dateOfJoining: student.DateOfJoining,
            admin: student.Admin
          });
          this.student = student;
        });
    } else {
      this.student = undefined;
    }
  }
}


