import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  oculto: string = '';
  imagenSubir: File;
  imagenTemp: any;
  constructor(
    public _subirArchivo: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
    console.log('modal listo');
  }

  ngOnInit() {}

  subitImagen() {}

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return null;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal(
        'Solo imágenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }
}
