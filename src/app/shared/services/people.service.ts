import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from './people';
import { map, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';

// var json = require('./db.json');

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private path = 'api/people'

  constructor(private httpClient: HttpClient) { }

  // getPeople() {
  //   return this.httpClient.get<People[]>(this.path).pipe(shareReplay())
  // }

  getPeople() {
    return this.httpClient.get<{ people: People[] }>(`${environment.basePath}/assets/db.json`).pipe(
      map(json => json.people),
      shareReplay()
    )
  }

}
