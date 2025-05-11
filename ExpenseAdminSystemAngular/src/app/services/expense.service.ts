import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  get authHeader(): string {
    return localStorage["headerValue"];
  }

  baseUrl: string = "http://localhost:5038/api";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('ExpenseService error:', error);
    const transformedError = new Error(error.error?.message || error.message);
    (transformedError as any).status = error.status;
    return throwError(() => transformedError);
  }

  getExpenses(userId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/expense?userId=${userId}`, {
      headers: {
        "Authorization": this.authHeader
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/expense/${id}`, {
      headers: {
        "Authorization": this.authHeader
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  createExpense(expense: Expense): Observable<any> {
    console.log('--- CREATE EXPENSE REQUEST ---');
    console.log('URL:', `${this.baseUrl}/expense`);
    console.log('Headers:', this.authHeader);
    console.log('Payload:', expense);
    console.log('---------------------------');
    
    return this.http.post(`${this.baseUrl}/expense`, expense, {
      headers: {
        "Authorization": this.authHeader,
        "Content-Type": "application/json"
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateExpense(expense: Expense): Observable<any> {
    return this.http.put(`${this.baseUrl}/expense`, expense, {
      headers: {
        "Authorization": this.authHeader,
        "Content-Type": "application/json"
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/expense/${id}`, {
      headers: {
        "Authorization": this.authHeader
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
}