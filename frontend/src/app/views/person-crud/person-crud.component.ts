import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-crud',
  templateUrl: './person-crud.component.html',
  styleUrls: ['./person-crud.component.css']
})
export class PersonCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToCadastroCreate(): void {
    this.router.navigate(['cadastro']);
  }

}
