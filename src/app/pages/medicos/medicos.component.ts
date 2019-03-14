import { Component, OnInit } from "@angular/core";
import { MedicoService } from "src/app/services/service.index";
import { Medico } from "src/app/models/medico.model";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  constructor(public _medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService
      .cargarMedicos(this.desde)
      .subscribe(({ medicos, total }) => {
        this.medicos = medicos;
        this.totalRegistros = total;
      });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService
      .buscarMedicos(termino)
      .subscribe(medicos => (this.medicos = medicos));
  }
  borrarMedico(medico: Medico) {
    this._medicoService
      .borrarMedico(medico._id)
      .subscribe(() => this.cargarMedicos());
  }
}
