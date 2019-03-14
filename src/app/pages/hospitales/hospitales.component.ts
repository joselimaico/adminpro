import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp =>
      this.cargarHospitales()
    );
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
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
    this.cargarHospitales();
  }
  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService
      .buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService
      .cargarHospitales(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      });
  }
  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._hospitalService
          .borrarHospital(hospital._id)
          .subscribe(borrado => {
            this.cargarHospitales();
          });
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',

      text: 'Ingrese el nombre del hospital',

      content: {
        element: 'input',

        attributes: {
          placeholder: '',

          type: 'text'
        }
      },

      icon: 'info',

      buttons: ['Cancelar', 'Guardar'],

      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService
        .crearHospital(valor)
        .subscribe(() => this.cargarHospitales());
    });
  }
}
