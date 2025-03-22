import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Personagem } from '../models/personagem';
import { Result } from '../models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {

  private urlBase: string = 'https://rickandmortyapi.com/api/character';

  constructor(private httpClient: HttpClient ) {}

  getAll(): Observable<Result> {

    return this.httpClient.get<Result>(this.urlBase);
  }
}
