import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cadastro } from './cadastro.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseUrl = "http://localhost:3001/cadastros"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(cadastros: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(this.baseUrl, cadastros)
  }

  read(): Observable<Cadastro[]> {
    return this.http.get<Cadastro[]>(this.baseUrl)
  }

  readById(id: number): Observable<Cadastro> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Cadastro>(url)
  }

  update(cadastros: Cadastro): Observable<Cadastro>{
    const url = `${this.baseUrl}/${cadastros.id}`
    return this.http.put<Cadastro>(url, cadastros)
  }

  delete(id: number ): Observable<Cadastro> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Cadastro>(url);
  }
}
