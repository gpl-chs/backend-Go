import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../environment/environment.component';


@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
})
export class SignupComponent {
  message: string;
  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
    dateOfJoining: new FormControl(Date.now(), [Validators.required]),
    admin: new FormControl(false)
  });

  constructor(private sharedService: SharedService, private router: Router,
    private dialog: MatDialog) { }

  setAdminValue() {
    const emailControl = this.studentForm.get('email');
    if (emailControl && emailControl.value === environment.superAdmin) {
      this.studentForm.get('admin')?.setValue(true);
    }
  }



  onSubmit() {
    this.setAdminValue()
    if (this.studentForm.valid) {
      this.sharedService.addStudent(this.studentForm.value)
        .subscribe((response) => {
          if (response.success) {
            this.message = "You have been registered successfully. Now you'll be redirected to the login page.";
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000); //redirect after 3s
          } else {
            this.message = "We’re sorry. This login email already exists…";
          }
        });
    }
  }
}
