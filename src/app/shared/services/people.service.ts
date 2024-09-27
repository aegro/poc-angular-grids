import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from './people';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private path = 'api/people'

  constructor(private httpClient: HttpClient) { }

  getPeople(): Observable<People[]> {
    return this.httpClient.get<{ people: People[] }>('poc-angular-grids/db.json').pipe(map(item => item.people));
  }
}
