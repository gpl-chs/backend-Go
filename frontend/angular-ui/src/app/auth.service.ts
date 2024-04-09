import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './environment/environment.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  loggedInUser: any;
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.url + '/login', { email, password }).pipe(
      map(response => {
        if (response.success) {
          this.isLoggedIn = true;
          this.loggedInUser = response.user;
          return true;
        } else {
          this.isLoggedIn = false;
          return false;
        }
      }),
      catchError(error => {
        console.error('Error during login:', error);
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }

  isAdmin() {
    return this.loggedInUser.Admin;
  }

  logout() {
    this.isLoggedIn = false;
    this.loggedInUser = null;
  }
}




