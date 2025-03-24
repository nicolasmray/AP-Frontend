import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../model/currency';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

baseUrl: string = "http://localhost:5038/api";
  constructor(private http: HttpClient) { }
 
   getCurrencies(): Observable<Currency[]> {
     return this.http.get<Currency[]>(`${this.baseUrl}/currency`);
   }
   getCurrency(id: number): Observable<Currency> {
     return this.http.get<Currency>(`${this.baseUrl}/currency/${id}`);
   }
   createCurrency(currency: Currency): Observable<any> {
     return this.http.post(`${this.baseUrl}/currency`, currency);
   }
   deleteCurrency(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/currency/${id}`);
   }

}
