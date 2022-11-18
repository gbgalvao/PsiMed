import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { Cadastro } from '../cadastro.model';

@Component({
  selector: 'app-cadastro-update',
  templateUrl: './cadastro-update.component.html',
  styleUrls: ['./cadastro-update.component.css']
})
export class CadastroUpdateComponent implements OnInit {

  cadastros: Cadastro = { 
    name:'',
    idade: null,
    cpf: null
  }

  constructor(
    private cadastroService: CadastroService,
     private router: Router,
     private route: ActivatedRoute) 
     { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.cadastroService.readById(id).subscribe(cadastros => {
      this.cadastros = cadastros
    });
  }

  updateCadastro(): void {
    this.cadastroService.update(this.cadastros).subscribe (() => {
      this.cadastroService.showMessage("Agenda atualizada com sucesso!")
      this.router.navigate(['person'])
    })
  }

  cancel(): void {
    this.router.navigate(['person'])
  }
    
}
