import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }


  //GET para obtener arreglo de todos los heroes
  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  //GET para obtener un heroe mediante su id
  getHeroePorId( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  //GET para obtener arreglo de heroes sugeridos
  getSugerencias( termino: string ): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
  }

  //POST para crear un heroe en la BD
  agregarHeroe( heroe: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe );
  }


  //PUT para actualizar un heroe mediante su id
  actualizarrHeroe( heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`, heroe );
  }

  //DELETE para borrar un heroe mediante su id
  borarHeroe( id: string): Observable<any>{
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${ id }`);
  }


}
