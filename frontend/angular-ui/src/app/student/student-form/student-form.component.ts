import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  @Input() studentForm: FormGroup;
  student: any = {};
  isAddForm: Boolean;
  id: string | null;

  constructor(private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.isAddForm = this.router.url.includes('add');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  updateAdminStatus(checked: boolean) {
    this.studentForm.get('admin')?.setValue(checked);
    console.log("Updated admin status:", checked);
  }

  isCurrentUser(student: any): boolean {
    return this.authService.loggedInUser.Email === this.studentForm.value.email;
  }


  onSubmit() {
    //debugger
    this.student = this.studentForm.value;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        if (this.isAddForm) {
          this.sharedService.addStudent(this.student)
            .subscribe(() => {
              // debugger
              this.router.navigate(['/students'])
            });
        } else {
          if (this.id) {
            this.sharedService.updateStudent(+(this.id), this.student)
              .subscribe(() => this.router.navigate(['/students']));
          }
        }
      }
    })
  }
}



