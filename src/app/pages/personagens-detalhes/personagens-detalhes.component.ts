import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonagensService } from '../../services/personagens.service';
import { Personagem } from '../../models/personagem';

@Component({
  selector: 'app-personagens-detalhes',
  standalone: false,
  templateUrl: './personagens-detalhes.component.html',
  styleUrl: './personagens-detalhes.component.css'
})
export class PersonagensDetalhesComponent implements OnInit {

  private idPersonagem!: number;
  public personagem!: Personagem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personagensService: PersonagensService
  ) {}

  ngOnInit(): void {
    this.idPersonagem = this.activatedRoute.snapshot.params['id']
    this.personagensService.getById(this.idPersonagem).subscribe(response => this.personagem = response)
  }

}
