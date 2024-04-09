import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-student',
  template: `
    <h2 class="center" >Add a student</h2>
    <app-student-form [studentForm]="studentForm" ></app-student-form>
  `
})
export class AddstudentComponent {

  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
    dateOfJoining: new FormControl(Date.now(), [Validators.required]),
    admin: new FormControl(false, []),

  });

}

