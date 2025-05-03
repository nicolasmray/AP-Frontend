import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {


  get authHeader(): string {
    return localStorage["headerValue"]; //"Basic am9objpzZWNyZXQ=";
  }   

 baseUrl: string = "http://localhost:5038/api";
   constructor(private http: HttpClient) { }
 
   getExpenses(userId: number): Observable<Expense[]> {
     return this.http.get<Expense[]>(`${this.baseUrl}/expense?userId=${userId}`, {
      headers: {
        "Authorization": this.authHeader
      } 
    });
   }
   getExpense(id: number): Observable<Expense> {
     return this.http.get<Expense>(`${this.baseUrl}/expense/${id}`, {
      headers: {
        "Authorization": this.authHeader
      } 
    });
   }
   createExpense(expense: Expense): Observable<any> {
     return this.http.post(`${this.baseUrl}/expense`, expense, {
      headers: {
        "Authorization": this.authHeader,
         "Content-Type": "application/json"
      }
  });
   }
   deleteExpense(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/expense/${id}`, {
      headers: {
        "Authorization": this.authHeader
     }
    });
   }
}
