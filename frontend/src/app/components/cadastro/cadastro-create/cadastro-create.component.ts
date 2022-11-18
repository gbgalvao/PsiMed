import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CadastroService } from './../cadastro.service';
import { Router } from '@angular/router';
import { Cadastro } from '../cadastro.model';


@Component({
  selector: 'app-cadastro-create',
  templateUrl: './cadastro-create.component.html',
  styleUrls: ['./cadastro-create.component.css']
})
export class CadastroCreateComponent implements OnInit {

  cadastros: Cadastro = {
    name:'',
    idade: null,
    cpf: null
  }

  constructor(private cadastroService: CadastroService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  createCadastro(): void {
    this.cadastroService.create(this.cadastros).subscribe(() => {
      this.cadastroService.showMessage('Cadastro Criado!')
      this.router.navigate(['/person'])

    })

    this.cadastroService.showMessage('Agendado!')
  }

  cancel(): void {
    this.router.navigate(['/person'])
  }

}
