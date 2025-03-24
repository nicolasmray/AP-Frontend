import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

baseUrl: string = "http://localhost:5038/api";
  constructor(private http: HttpClient) { }
 
   getCategories(): Observable<Category[]> {
     return this.http.get<Category[]>(`${this.baseUrl}/category`);
   }
   getCategory(id: number): Observable<Category> {
     return this.http.get<Category>(`${this.baseUrl}/category/${id}`);
   }
   createCategory(category: Category): Observable<any> {
     return this.http.post(`${this.baseUrl}/category`, category);
   }
   deleteCategory(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/category/${id}`);
   }

}
