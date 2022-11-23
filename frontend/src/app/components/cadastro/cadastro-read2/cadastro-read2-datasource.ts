import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Cadastro } from '../cadastro.model';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Cadastro[] = [
  {id: 1, name: 'Hydrogen', idade: 30, cpf: 99999999999},
  {id: 2, name: 'Helium', idade: 30, cpf: 99999999999},
  {id: 3, name: 'Lithium', idade: 30, cpf: 99999999999},
  {id: 4, name: 'Beryllium', idade: 30, cpf: 99999999999},
  {id: 5, name: 'Boron', idade: 30, cpf: 99999999999},
  {id: 6, name: 'Carbon', idade: 30, cpf: 99999999999},
  {id: 7, name: 'Nitrogen', idade: 30, cpf: 99999999999},
  {id: 8, name: 'Oxygen', idade: 30, cpf: 99999999999},
  {id: 9, name: 'Fluorine', idade: 30, cpf: 99999999999},
  {id: 10, name: 'Neon', idade: 30, cpf: 99999999999},
  {id: 11, name: 'Sodium', idade: 30, cpf: 99999999999},
  {id: 12, name: 'Magnesium', idade: 30, cpf: 99999999999},
  {id: 13, name: 'Aluminum', idade: 30, cpf: 99999999999},
  {id: 14, name: 'Silicon', idade: 30, cpf: 99999999999},
  {id: 15, name: 'Phosphorus', idade: 30, cpf: 99999999999},
  {id: 16, name: 'Sulfur', idade: 30, cpf: 99999999999},
  {id: 17, name: 'Chlorine', idade: 30, cpf: 99999999999},
  {id: 18, name: 'Argon', idade: 30, cpf: 99999999999},
  {id: 19, name: 'Potassium', idade: 30, cpf: 99999999999},
  {id: 20, name: 'Calcium', idade: 30, cpf: 99999999999},
];

/**
 * Data source for the CadastroRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CadastroRead2DataSource extends DataSource<Cadastro> {
  data: Cadastro[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Cadastro[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Cadastro[]): Cadastro[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Cadastro[]): Cadastro[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id!, +b.id!, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
