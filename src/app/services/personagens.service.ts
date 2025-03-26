import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Personagem } from '../models/personagem';
import { Result } from '../models/result';
import { Observable } from 'rxjs';
import { PersonagemFiltro } from '../models/personagem-filtro';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {

  private urlBase: string = 'https://rickandmortyapi.com/api/character';

  constructor(private httpClient: HttpClient ) {}

  getAll(page?: number): Observable<Result> {
    let url: string = this.urlBase;

    if (page) {
      url += '?page=' + page;
    }

    return this.httpClient.get<Result>(url);
  }

  prev(url: string): Observable<Result> {
    return this.httpClient.get<Result>(url);
  }  

  next(url: string): Observable<Result> {
    return this.httpClient.get<Result>(url);
  } 

  getPage(url: string): Observable<Result> {
    return this.httpClient.get<Result>(url);
  } 

  /*
  filter(name: string): Observable<Result> {
    let url: string = this.urlBase;

    if (name) {
      url += '?name=' + name;
    }

    return this.httpClient.get<Result>(url);
  } */

  filter(filtro: PersonagemFiltro): Observable<Result> {
    let url: string = this.urlBase; 
    let maisDeUmFiltro = false;

    if(filtro.pagina) {
      url +='?page=' + filtro.pagina;
      maisDeUmFiltro = true;
    }

    if(filtro.nome) {
      url += (maisDeUmFiltro ? '&name=' : '?name=') + filtro.nome;
      maisDeUmFiltro = true;
    }

    if(filtro.genero) {
      url += (maisDeUmFiltro ? '&gender=' : '?gender=') + filtro.genero;
      maisDeUmFiltro = true;
    }

    if(filtro.status) {      
      url += (maisDeUmFiltro ? '&status=' : '?status=') + filtro.status;
    }

    console.log(url);

    return this.httpClient.get<Result>(url);    
  } 

}
