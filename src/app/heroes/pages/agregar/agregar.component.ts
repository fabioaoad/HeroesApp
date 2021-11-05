import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

import { Heroe, Publisher } from '../../interfaces/heroes.interface';

import { HeroesService } from '../../services/heroes.service';

import {ConfirmarComponent} from "../../components/confirmar/confirmar.component";




@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 70%;
    border-radius: 5px;
  }`
  ]
})
export class AgregarComponent implements OnInit {


  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];


  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: ''
  }


  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog) { }

  ngOnInit(): void {

    //imprime por consola la url donde me encuentro
    //console.log(this.router.url);

    //imprime por consola true or false si en la url incluye el "editar"
    //console.log(this.router.url.includes('editar'));

    if ( !this.router.url.includes('editar') ){
      return;
    }

  this.activatedRoute.params
  .pipe(
    switchMap( ({id}) => this.heroesService.getHeroePorId( id ) )
  )
  .subscribe( heroe => this.heroe = heroe );

  }


  guardar(){
   // console.log(this.heroe);

   if( this.heroe.superhero.trim().length === 0 ){
     return;
   }

   //console.log(this.heroe.id);
  if( this.heroe.id ){
    //actualizar, editar
    this.heroesService.actualizarrHeroe( this.heroe )
      .subscribe( heroe => this.mostrarSnakBar('Registro Actualizado'));
  }else{
    //crear nuevo registro
   this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar',heroe.id]);
        this.mostrarSnakBar('Registro creado');
  });

}

  }


  borrarHeroe(){

   const dialog =  this.dialog.open(ConfirmarComponent, {
      width: '550px',
      data: { ...this.heroe }
    });

  dialog.afterClosed().subscribe(
    (result) => {
     // console.log(result); // desde el componente padre "confirmar", imprime true del metodo borrar o false del metodo cerrar.
      if(result){
        this.heroesService.borarHeroe( this.heroe.id! )
          .subscribe( resp =>{
            this.router.navigate(['/heroes']);
          });
      }
    });


  }

  mostrarSnakBar( mensaje: string ){
    this.snackBar.open( mensaje, 'OK!', {
      duration: 2500
    });
  }




}


