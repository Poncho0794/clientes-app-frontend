import { Injectable } from "@angular/core";
import { Cliente } from "./cliente";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import swal from "sweetalert2";

import { Router } from '@angular/router'

@Injectable()
export class ClienteService {
  private urlEndpoint: string = "http://localhost:8080/api/clientes";

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    //Manera 1 de castear el response
    return this.http
      .get(this.urlEndpoint)
      .pipe(map(response => response as Cliente[]));
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        swal("Error al editar", e.error.mensaje, "error");
        console.error(e.error.mensaje);
        return throwError(e);

      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    //manera 2 de castear el response
    return this.http.post(this.urlEndpoint, cliente, {
      headers: this.httpHeaders
    }). pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status === 400) {
          return throwError(e)
        }
        swal(e.error.mensaje, e.error.error, "error");
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(
      `${this.urlEndpoint}/${cliente.id}`,
      cliente,
      { headers: this.httpHeaders }
    ).pipe(
      catchError(e => {
        if(e.status === 400) {
          return throwError(e)
        }
        swal(e.error.mensaje, e.error.error, "error");
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {
      headers: this.httpHeaders
    }).pipe(
      catchError(e => {
        swal(e.error.mensaje, e.error.error, "error");
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
}
