import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}
  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      console.log('paso por el loginGuard');
      return true;
    }
    this.router.navigate(['/login']);
    console.log('bloqueado por el loginGuard');
    return false;
  }
}
