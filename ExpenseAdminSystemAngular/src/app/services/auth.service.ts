import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:5038/api";

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, {
      username,
      password
    }).pipe(
      catchError((error) => {
        // Optional: log error or transform it
        console.error('AuthService error:', error);

        // Re-throw the error so component can still handle it
        return throwError(() => error);
      })
    );
  }
}
