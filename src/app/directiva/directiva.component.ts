import { Component } from "@angular/core";

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html"
})
export class DirectivaComponent {
  constructor() {}

  listaCurso: string[] = ["TypeScript", "Javascript", "Java", "C#", "PHP"];

  habilitar: boolean = true;

  setHabilitar(): void {
    this.habilitar = !this.habilitar
  }
}
