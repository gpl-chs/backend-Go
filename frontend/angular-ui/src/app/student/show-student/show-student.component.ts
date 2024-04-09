import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { environment } from '../../environment/environment.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styles: `.highlighted {
    background-color: DodgerBlue
; 
}`
})
export class ShowStudentComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Password', 'DateOfJoining', 'Admin', 'Actions'];
  studentForm: MatTableDataSource<any>;
  student: any = {};
  message: string;
  admin: boolean;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getStudentList();
  }

  getStudentList() {
    this.sharedService.getStudentList().subscribe((response: any) => {
      let studentList = response.users.map((user: { ID: number; Name: string; Email: string; Password: any; DateOfJoining: any; Admin: boolean }) => {
        const student = {
          id: user.ID,
          name: user.Name,
          email: user.Email,
          password: user.Password,
          dateOfJoining: user.DateOfJoining,
          admin: user.Admin
        };
        return student;
      });
      console.log("Processed Student List:", studentList);
      this.studentForm = new MatTableDataSource(studentList);
    });
  }

  deleteStudentById(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.sharedService.deleteStudentById(id)
          .subscribe(() => {
            this.getStudentList();
          });
      }
    })
  }

  isCurrentUser(student: any): boolean {
    return this.authService.loggedInUser.Email === student.email;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  canEditStudent(student: any): boolean {
    if (this.isAdmin()) {
      // can edit all execpt the superadmin
      return student.email !== environment.superAdmin;
    } else {
      // if not admin, can edit or delete only his infos.
      return this.isCurrentUser(student);
    }
  }

  canDeleteStudent(student: any): boolean {
    if (this.isAdmin()) {
      return student.email !== environment.superAdmin;
    } else {
      return this.isCurrentUser(student);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goTologout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {

        this.authService.logout();
        this.router.navigate(['/login']);
      }
    })
  }
}
