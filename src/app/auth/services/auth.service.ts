import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap, map } from "rxjs/operators";
import { Observable, of } from "rxjs"; //of sirve para crear observable en base al argumento que se le pone

import { environment } from "../../../environments/environment";

import { Auth } from "../interfaces/auth.interface";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor( private http: HttpClient) { }

  verificarAutenticacion(): Observable<boolean>{
    if( !localStorage.getItem('token') ){
      return of (false);
    }
    return this.http.get<Auth>(` ${ this.baseUrl }/usuarios/1 `)
      .pipe(
        map( auth => {
          //console.log('map', auth);
          this._auth = auth;
          return true
        })
      );
  }

  get auth(): Auth{
    return { ...this._auth! }
  }

  login(){
   return  this.http.get<Auth>(` ${ this.baseUrl }/usuarios/1 `)
     .pipe(
       //tap( resp => console.log('AUTHSERVICE', resp) ) //obtengo el auth antes de retornar
       tap( auth => this._auth = auth ),
       tap( auth => localStorage.setItem('token',auth.id ) ) //usado para mantener la sesion una vez logueados
     );
  }

  logout(){
    this._auth = undefined;
  }

}
