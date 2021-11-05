import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if( this.authService.auth.id ){
    //   return true;
    // }
    // console.log('Bloqueado por el AuthGuard - CanActivate');
    // return false;

    return  this.authService.verificarAutenticacion()
            .pipe(
              tap( estaAutenticado => {
                if(!estaAutenticado){
                  this.router.navigate(['./auth/login']);
                  console.log('Bloqueado por el AuthGuard - CanActivate');
                }
              } )
            )
  }



  /* canLoad solo previene que el usuario cargue el modulo.
  Pero si el modulo estaba previamente cargado podra ingresar
  por ell hay que usar el canActivate */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {


    return  this.authService.verificarAutenticacion()
            .pipe(
              tap( estaAutenticado => {
                if(!estaAutenticado){
                  this.router.navigate(['./auth/login']);
                  console.log('Bloqueado por el AuthGuard - CanLoad');
                }
              } )
            )
    /* console.log('CanLoad', false);
    console.log('Route', route);
    console.log('Segments', segments); */
    //si existe el auth.id lo deja pasar el guard, sino no
    /*if( this.authService.auth.id ){
      return true;
    }
    console.log('Bloqueado por el AuthGuard - CanLoad');
    return false; */
  }
}
