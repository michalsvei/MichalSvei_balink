import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import * as _ from 'lodash'
import { User } from './home/home.model'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:5000/'
  constructor(private http: HttpClient) {}

  configUrl = 'assets/config.json'
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) 
      return of(result as T)
    }
  }

  getUsers(): Observable<User[]> {
    const url: string = this.baseUrl+'getUsers';

    return this.http
      .get<User[]>(url)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])))
  }

  updateUser(user: User): Observable<any> {
    const url: string = 'updateUser'
    return this.http.put<User>(this.baseUrl + url, user).pipe(
      tap((_) => console.log(`updated user=${user}`)),
      catchError(this.handleError<any>('updateHero')),
    )
  }

  addUser(user: User): Observable<any> {
    const url: string = 'addUser'
    return this.http.post<User>(this.baseUrl + url, user).pipe(
      tap((_) => console.log(`Added user=${user}`)),
      catchError(this.handleError<any>('Added error')),
    )
  }
}
