import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from './people';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private path = 'api/people'

  constructor(private httpClient: HttpClient) { }

  getPeople() {
    return this.httpClient.get<People[]>(this.path).pipe(shareReplay())
  }
}
