import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './environment/environment.component';

@Injectable()
export class SharedService {

  constructor(private http: HttpClient) { }
  readonly url = environment.apiUrl


  getStudentList(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/login/users').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(this.url + `/login/user/${id}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updateStudent(id: number, student: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.url + `/login/user/${id}`, student, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  addStudent(Student: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.url + '/signup', Student, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteStudentById(id: number): Observable<any> {

    return this.http.delete(this.url + `/login/user/${id}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }



}
