import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowStudentComponent } from './student/show-student/show-student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { AddstudentComponent } from './student/add-student/add-student.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'student/add', component: AddstudentComponent, canActivate: [AuthGuard] },
  { path: 'student/edit/:id', component: EditStudentComponent, canActivate: [AuthGuard] },
  { path: 'students', component: ShowStudentComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
