import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

 baseUrl: string = "http://localhost:5038/api";
   constructor(private http: HttpClient) { }
 
   getExpenses(): Observable<Expense[]> {
     return this.http.get<Expense[]>(`${this.baseUrl}/expense`);
   }
   getExpense(id: number): Observable<Expense> {
     return this.http.get<Expense>(`${this.baseUrl}/expense/${id}`);
   }
   createExpense(expense: Expense): Observable<any> {
     return this.http.post(`${this.baseUrl}/expense`, expense);
   }
   deleteExpense(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/expense/${id}`);
   }
}
