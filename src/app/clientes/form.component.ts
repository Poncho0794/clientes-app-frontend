import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";

import { Router, ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2'

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html"
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear Cliente";
  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente)
      }
    })
  }

  public create(): void {
    console.log("Clicked");
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      //Redirigir al listado de clientes cuando responda
      cliente => {
        this.router.navigate(["/clientes"])

        swal('Nuevo Cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success')
      }
    );
  }
  update(): void {
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal('Nuevo Cliente', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success')
    })
  }
}