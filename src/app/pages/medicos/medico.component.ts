import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  medico: Medico = new Medico('', '', '', '', '');
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .cargarHospitales(0, 0)
      .subscribe(({ hospitales }) => (this.hospitales = hospitales));
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      console.log(medico);
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this._router.navigate(['/medico', medico._id]);
    });
  }
  cambioHospital(id: string) {
    this._hospitalService
      .obtenerHospital(id)
      .subscribe(hospital => (this.hospital = hospital));
  }
}
