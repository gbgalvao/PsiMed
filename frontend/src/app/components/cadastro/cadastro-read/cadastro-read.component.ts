import { Component, OnInit } from '@angular/core';
import { CadastroService } from './../cadastro.service';
import { Cadastro } from '../cadastro.model';

import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-cadastro-read',
  templateUrl: './cadastro-read.component.html',
  styleUrls: ['./cadastro-read.component.css']
})


export class CadastroReadComponent implements OnInit {

  cadastros: Cadastro[] = [] 
  displayedColumns = ['id', 'name', 'idade', 'cpf', 'acao']

  constructor(private cadastroService: CadastroService) { }

  ngOnInit(): void {
    this.cadastroService.read().subscribe(cadastro => {
      this.cadastros = cadastro
    })
  }

}
