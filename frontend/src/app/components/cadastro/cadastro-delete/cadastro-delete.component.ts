import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cadastro } from '../cadastro.model';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-cadastro-delete',
  templateUrl: './cadastro-delete.component.html',
  styleUrls: ['./cadastro-delete.component.css']
})
export class CadastroDeleteComponent implements OnInit {

  cadastros: Cadastro = {
    name: '',
    idade: null,
    cpf: null
  }

  constructor(private cadastroService: CadastroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.cadastroService.readById(id).subscribe(cadastros => {
      this.cadastros = cadastros
    })
  }

  deleteCadastro(): void {
    this.cadastroService.delete(this.cadastros.id!).subscribe (() => {
      this.cadastroService.showMessage("Agendamento apagadado com sucesso.")
      this.router.navigate(['person'])
    })
  }

  cancel(): void {
    this.router.navigate(['person']);
    }
}
