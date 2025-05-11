import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:5038/api";

  get authHeader(): string {
    return localStorage["headerValue"];
  }

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('UserService error:', error);
    const errorMessage = error.error?.message || error.message;
    const customError = new Error(errorMessage);
    (customError as any).status = error.status; 
    return throwError(() => customError);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`, {
      headers: {
        "Authorization": this.authHeader
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`, {
      headers: {
        "Authorization": this.authHeader
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, user).pipe(
      catchError(this.handleError)
    );
  }
  
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/user`, user, {
      headers: {
        "Authorization": this.authHeader,
        "Content-Type": "application/json"
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`, {
      headers: {
        "Authorization": this.authHeader
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
}