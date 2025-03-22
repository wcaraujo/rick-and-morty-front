import { Component, OnInit } from '@angular/core';
import { PersonagensService } from '../../services/personagens.service';
import { Personagem } from '../../models/personagem';
import { Result } from '../../models/result';

@Component({
  selector: 'app-personagens-page',
  standalone: false,
  templateUrl: './personagens-page.component.html',
  styleUrl: './personagens-page.component.css'
})
export class PersonagensPageComponent implements OnInit {

  personagens: Personagem[] = [];

  constructor(private personagemService: PersonagensService) {}
  
  ngOnInit(): void {
    this.personagemService.getAll().subscribe((response: Result) => {
      this.personagens = response.results;
    });
  }
}
