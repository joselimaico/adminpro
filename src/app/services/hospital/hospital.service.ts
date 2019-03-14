import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  // totalHospitales: number = 0;
  hospital: Hospital;
  constructor(
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) {}

  cargarHospitales(desde: number = 0, limite: number = 5) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde + '&limite=' + limite;
    return this.http.get(url).pipe(
      map((resp: any) => {
        // this.totalHospitales = resp.total;
        return { hospitales: resp.hospitales, total: resp.total };
      })
    );
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }
  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(
      map(resp => {
        swal(
          'Hospital borrado',
          'El hospital ha sido borrado correctamente',
          'success'
        );
        return true;
      })
    );
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, { nombre }).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }
  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return resp.hospital;
      })
    );
  }

  /*  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, 'hospitales', id)
      .then((resp: any) => {
        this.hospital.img = resp.hospital.img;
        swal('Imagen Actualizada', this.hospital.nombre, 'success');
        this.guardarStorage(id, this.token, this.hospital);
      })
      .catch(resp => {
        console.log(resp);
      });
  } */
}
