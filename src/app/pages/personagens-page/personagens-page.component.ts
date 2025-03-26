import { Component, OnInit } from '@angular/core';
import { PersonagensService } from '../../services/personagens.service';
import { Personagem } from '../../models/personagem';
import { Result } from '../../models/result';
import { PersonagemFiltro } from '../../models/personagem-filtro';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personagens-page',
  standalone: false,
  templateUrl: './personagens-page.component.html',
  styleUrl: './personagens-page.component.css'
})
export class PersonagensPageComponent implements OnInit {

  personagens: Personagem[] = [];
  prev?: string;
  next?: string;
  totalPage: number = 0;
  nome: string = '';
  genero: string = '';
  status: string = '';
  existeRegistro: boolean = true;
  filter!: FormGroup;

  constructor(
    private personagemService: PersonagensService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filter = this.formBuilder.group({ 
      nome: [''],
      genero: [''],
      status: ['']
    });

    this.firstPage();
  }

  prevPage(): void {
    this.personagemService.prev(this.prev!).subscribe((response: Result) => {
      this.personagens = response.results;
      this.prev = response.info.prev;
      this.next = response.info.next;
    });
  }

  nextPage(): void {
    this.personagemService.next(this.next!).subscribe((response: Result) => {
      this.personagens = response.results;
      this.prev = response.info.prev;
      this.next = response.info.next;
    });
  }

  firstPage(): void {
    const filtro: PersonagemFiltro = this.filter?.getRawValue();
    
    if (!filtro.nome && !filtro.genero && !filtro.status) {
      this.personagemService.getAll().subscribe((response: Result) => {
        this.personagens = response.results;
        this.prev = response.info.prev;
        this.next = response.info.next;
        this.totalPage = response.info.pages;
      });
    } else {
      this.filtrar();
    }
  }

  lastPage(): void {
    const filtro: PersonagemFiltro = this.filter.getRawValue();
    
    if (!filtro.nome && !filtro.genero && !filtro.status) {
      this.personagemService.getAll(this.totalPage).subscribe((response: Result) => {
        this.personagens = response.results;
        this.prev = response.info.prev;
        this.next = response.info.next;
      });
    } else {
      this.filtrar(true);
    }
  }
  /*
  onEnterName(event: any): void {
    const name = event.target.value

    this.personagemService.filter(name).subscribe((response: Result) => {
      this.personagens = response.results;
      this.prev = response.info.prev;
      this.next = response.info.next;
      this.totalPage = response.info.pages;
    });
  } */

  filtrar(ultimaPagina: boolean = false): void {
      const filtro: PersonagemFiltro = this.filter.getRawValue();

      if (ultimaPagina) {
        filtro.pagina = this.totalPage;
      }
  
      this.personagemService.filter(filtro).subscribe({
        next: (response: Result) => {
          this.personagens = response.results;
          this.prev = response.info.prev;
          this.next = response.info.next;
          this.totalPage = response.info.pages;
          this.existeRegistro = true;
        },
        error: () => {
          this.existeRegistro = false;
        }
      }
    );
  }
}
