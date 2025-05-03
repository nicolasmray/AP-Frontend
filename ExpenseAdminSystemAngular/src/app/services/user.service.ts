import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:5038/api";
  //authHeader: string = "Basic am9objpzZWNyZXQ=";

  get authHeader(): string {
    return localStorage["headerValue"]; //"Basic am9objpzZWNyZXQ=";
  }    

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`, {
      headers: {
        "Authorization": this.authHeader
      } 
    });
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`, {
      headers: {
        "Authorization": this.authHeader
     }
    });
  }
  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, user, {
        headers: {
          "Authorization": this.authHeader,
           "Content-Type": "application/json"
        }
    });
  }
  updateUser(user: User): Observable<any> {
    //console.log('--- UPDATE USER REQUEST ---');
    //console.log('URL:',`${this.baseUrl}/user`);
    //console.log('Headers:', this.authHeader);
    //console.log('Payload:', user);
    //console.log('---------------------------');
    return this.http.put(`${this.baseUrl}/user`, user, {
      headers: {
        "Authorization": this.authHeader,
         "Content-Type": "application/json"
      }
    });
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`, {
      headers: {
        "Authorization": this.authHeader
     }
    });
  }

}
