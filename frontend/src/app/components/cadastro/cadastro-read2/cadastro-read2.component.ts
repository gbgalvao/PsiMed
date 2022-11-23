import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Cadastro } from '../cadastro.model';
import { CadastroRead2DataSource } from './cadastro-read2-datasource';

@Component({
  selector: 'app-cadastro-read2',
  templateUrl: './cadastro-read2.component.html',
  styleUrls: ['./cadastro-read2.component.css']
})
export class CadastroRead2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Cadastro>;
  dataSource: CadastroRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'idade', 'cpf'];

  constructor() {
    this.dataSource = new CadastroRead2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
